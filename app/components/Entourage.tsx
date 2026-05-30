import styles from "./Entourage.module.css";

type Person = { name: string; role?: string };
type Pair = { partnerA: string; partnerB: string };
type Group = {
  label: string;
  variant?: "list" | "pairs";
  people?: Person[];
  pairs?: Pair[];
};

const groups: Group[] = [
  {
    label: "Officiant",
    people: [{ name: "TBD" }],
  },
  {
    label: "Parents of the Groom",
    variant: "pairs",
    pairs: [
      { partnerA: "Engr. Rolando M. Dolor", partnerB: "Amie E. Dolor" },
    ],
  },
  {
    label: "Parents of the Bride",
    variant: "pairs",
    pairs: [
      { partnerA: "Jeffry C. Chua", partnerB: "Hazel Gay E. Chua" },
    ],
  },
  {
    label: "Principal Sponsors",
    variant: "pairs",
    pairs: [
      { partnerA: "Cong. Gil Acosta Jr.", partnerB: "Former V. Mayor Maria Nancy M. Socrates" },
      { partnerA: 'Councilor Jonjie V. Rodriguez', partnerB: "Dra. Leah M. Dolor" },
      { partnerA: "Jerickson C. Chua", partnerB: "Sheryl Jean A. Chua" },
      { partnerA: "Hon. Miguel Aaron D. Palayon", partnerB: "Helen C. Bundal" },
      { partnerA: 'Former V. Mayor "Willy" A. Dimatatac', partnerB: "Alma A. Chua" },
      { partnerA: "Engr. Josue S. Estiandan", partnerB: "Mary Grace B. Chua" },
      { partnerA: "Rogel R. Austria", partnerB: "Joy E. Austria" },
    ],
  },
  {
    label: "Best Men",
    people: [
      { name: "Brian John Ocampo" },
      { name: "Engr. Ralph Julius Santos" },
    ],
  },
  {
    label: "Maids of Honor",
    people: [
      { name: "Hosannah Jemimah E. Chua" },
      { name: "Hanielle Jermayn E. Chua" },
    ],
  },
  {
    label: "Groomsmen",
    people: [
      { name: "Ralph Ajlen E. Dolor" },
      { name: "Engr. Patrick Jolo E. Dolor" },
      { name: "Hosea Jeffrey E. Chua" },
      { name: "Jozef Gabriel E. Chua" },
      { name: "Carlos Chester Esquivias" },
    ],
  },
  {
    label: "Bridesmaids",
    people: [
      { name: "Atty. Euna Angelica E. Dolor" },
      { name: "Mira Althea E. Dolor" },
      { name: "Julia Chanel A. Chua" },
      { name: "Zamantha Mae F. Ballares" },
      { name: "Janyx Naomi Uy" },
    ],
  },
  {
    label: "Bearers",
    people: [
      { name: "Carmelo Zion A. Veloria", role: "Ring" },
      { name: "Andreo Miguel Villanueva", role: "Bible" },
      { name: "Leonne Sebastien P. Ocampo", role: "Coin" },
    ],
  },
  {
    label: "Flower Girls",
    people: [
      { name: "Janiah Erica E. Notorio" },
      { name: "Levi Amaeli C. Cordero" },
    ],
  },
];

function LabelOrnament() {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="14"
      height="14"
    >
      <circle cx="8" cy="8" r="6" fill="#FE569B" opacity="0.2" />
      <circle cx="8" cy="8" r="3.5" fill="#D2447F" opacity="0.65" />
      <circle cx="8" cy="8" r="1.5" fill="#FFDF46" />
    </svg>
  );
}

export default function Entourage() {
  return (
    <section id="entourage" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Standing With Us</p>
        <h2 className="section-heading reveal delay-1">Our Entourage</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={styles.groups}>
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className={`${styles.group} reveal`}
              style={{ transitionDelay: `${0.08 * gi}s` }}
            >
              <div className={styles.groupLabel}>
                <span className={styles.labelRule} />
                <span className={styles.labelText}>
                  <LabelOrnament />
                  {g.label}
                  <LabelOrnament />
                </span>
                <span className={styles.labelRule} />
              </div>

              {g.variant === "pairs" ? (
                <ul className={styles.pairList}>
                  {g.pairs!.map((pair, i) => (
                    <li key={i} className={styles.pairRow}>
                      <span className={styles.pairCard}>
                        <span className={styles.pairCardName}>{pair.partnerA}</span>
                      </span>
                      <span className={styles.pairConnector} aria-hidden="true">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                          <path d="M8,14 C8,14 1.5,9.7 1.5,5.3 C1.5,3.2 3.1,1.8 5,1.8 C6.3,1.8 7.4,2.5 8,3.6 C8.6,2.5 9.7,1.8 11,1.8 C12.9,1.8 14.5,3.2 14.5,5.3 C14.5,9.7 8,14 8,14 Z" fill="#FFD1DC" />
                        </svg>
                      </span>
                      <span className={styles.pairCard}>
                        <span className={styles.pairCardName}>{pair.partnerB}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className={styles.nameList}>
                  {g.people!.map((p, i) => (
                    <li
                      key={i}
                      className={`${styles.nameItem} ${p.role ? styles.nameItemWithRole : ""}`}
                    >
                      <span className={styles.personName}>{p.name}</span>
                      {p.role && (
                        <span className={styles.personRole}>{p.role}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}