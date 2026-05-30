/**
 * Rahan & Jazmine — Wedding RSVP backend
 * ------------------------------------------------------------------
 * A Google Apps Script Web App that turns a Google Sheet into the
 * RSVP database for the wedding site. It does two things:
 *
 *   GET  ?action=names   → returns the list of names already saved
 *                          (names only — never contact details) so the
 *                          website can gently flag possible duplicates
 *                          while a guest is filling in the form.
 *
 *   POST  {json}         → records the RSVP. One row per person
 *                          (the respondent + each added guest). If a
 *                          name already exists and the request did not
 *                          set confirmDuplicate:true, it writes NOTHING
 *                          and replies {result:"duplicate"} so the site
 *                          can ask the guest to confirm first.
 *
 * Setup steps are in RSVP_SETUP.md.
 *
 * NOTE: The Middle Name and Special Requests columns were removed.
 * If your sheet already has the old "RSVPs" tab, delete (or rename) it
 * so this script can recreate it with the new headers — otherwise the
 * columns won't line up. Remember to deploy a NEW VERSION after editing.
 *
 * The script writes only the 10 data columns (A–J); the Flags column (K)
 * is left to your own duplicate formula. Contact, Email and Party Size
 * are written on the Primary row only — guest rows leave them blank.
 * ------------------------------------------------------------------
 */

var SHEET_NAME = 'RSVPs';
var HEADERS = [
  'Timestamp', 'Group ID', 'Type', 'First Name', 'Last Name',
  'Contact Number', 'Email', 'Attending', 'Party Size',
  'Added By', 'Flags'
];
var DATA_COLS = 10; // columns the script writes (A–J); Flags (K) is left to your formula

/* ── Helpers ───────────────────────────────────────────────────── */

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/* Find the row to write the next entry on.

   We deliberately DON'T trust sheet.getLastRow() on its own: that returns
   the last row containing content in ANY column anywhere in the sheet, so
   a single stray value far down (an errant keystroke, leftover import, a
   lone space) would push new rows thousands of lines down (e.g. row 10001).

   Instead we scan the Type column (C) — which we always populate — and
   return the row right after the last real RSVP. Stray content in other
   columns can no longer shift where new entries land. */
function nextRow_(sheet) {
  var bound = sheet.getLastRow();
  if (bound < 2) return 2; // only the header row exists
  var typeCol = sheet.getRange(2, 3, bound - 1, 1).getValues(); // col 3 = Type
  var lastData = 1; // header row
  for (var i = 0; i < typeCol.length; i++) {
    if (String(typeCol[i][0]).trim() !== '') lastData = i + 2;
  }
  return lastData + 1;
}

function normalize_(s) {
  return String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' ');
}
function key_(first, last) {
  return (normalize_(first) + ' ' + normalize_(last)).trim();
}

/* Read every (first,last) currently in the sheet → Set-like map.
   Matching uses First + Last only. */
function existingData_(sheet) {
  var last = sheet.getLastRow();
  var names = [];
  var keys = {};
  if (last < 2) return { names: names, keys: keys };
  // Columns: First Name = 4, Last Name = 5
  var values = sheet.getRange(2, 4, last - 1, 2).getValues();
  for (var i = 0; i < values.length; i++) {
    var f = values[i][0], l = values[i][1];
    if (f === '' && l === '') continue;
    names.push({ first: f, last: l });
    keys[key_(f, l)] = (f + ' ' + l).trim();
  }
  return { names: names, keys: keys };
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── GET — return saved names for the live duplicate check ──────── */

function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : '';
  if (action === 'names') {
    var sheet = getSheet_();
    var data = existingData_(sheet);
    return json_({ names: data.names });
  }
  return json_({ result: 'ok', message: 'RSVP endpoint is live.' });
}

/* ── POST — record an RSVP ─────────────────────────────────────── */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // serialize writes so the duplicate check is reliable
  } catch (err) {
    return json_({ result: 'error', message: 'Server is busy, please try again.' });
  }

  try {
    var body = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    var existing = existingData_(sheet);

    // Build the list of people this submission would add
    var people = [{
      type: 'Primary',
      first: body.firstName,
      last: body.lastName,
      addedBy: ''
    }];
    var primaryName = (String(body.firstName).trim() + ' ' + String(body.lastName).trim()).trim();
    var guests = Array.isArray(body.guests) ? body.guests : [];
    if (body.isGroup === 'Yes') {
      for (var i = 0; i < guests.length; i++) {
        people.push({
          type: 'Guest',
          first: guests[i].firstName,
          last: guests[i].lastName,
          addedBy: primaryName
        });
      }
    }

    // Detect matches against what's already saved (still powers the
    // "possible match → Submit anyway" prompt on the form).
    var matches = [];
    for (var j = 0; j < people.length; j++) {
      var k = key_(people[j].first, people[j].last);
      if (k && existing.keys[k]) matches.push(existing.keys[k]);
    }

    // If there are matches and the guest hasn't confirmed, stop and ask.
    if (matches.length > 0 && body.confirmDuplicate !== true) {
      return json_({ result: 'duplicate', matches: matches });
    }

    // Write one row per person — columns A–J only. The Flags column (K)
    // is intentionally left untouched so your sheet's duplicate formula
    // there keeps working and isn't overwritten.
    var groupId = Utilities.getUuid().slice(0, 8);
    var partySize = people.length;
    var ts = new Date();

    var rows = people.map(function (p) {
      var isPrimary = p.type === 'Primary';
      return [
        ts,
        groupId,
        p.type,
        String(p.first).trim(),
        String(p.last).trim(),
        isPrimary ? String(body.contact || '').trim() : '',
        isPrimary ? String(body.email || '').trim() : '',
        body.attending,
        isPrimary ? partySize : '',   // Party Size — primary row only; blank for guests
        p.addedBy
      ];
    });

    // Append right after the last real RSVP (immune to stray content elsewhere)
    sheet.getRange(nextRow_(sheet), 1, rows.length, DATA_COLS).setValues(rows);

    return json_({ result: 'success', groupId: groupId, partySize: partySize });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}