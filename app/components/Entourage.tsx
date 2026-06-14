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
      { partnerA: "Engr. Rolando M. Dolor", partnerB: "Mrs. Amie E. Dolor" },
    ],
  },
  {
    label: "Parents of the Bride",
    variant: "pairs",
    pairs: [
      { partnerA: "Mr. Jeffry C. Chua", partnerB: "Mrs. Hazel Gay E. Chua" },
    ],
  },
  {
    label: "Principal Sponsors",
    variant: "pairs",
    pairs: [
      {
        partnerA: "Cong. Gil Acosta Jr.",
        partnerB: "Former V. Mayor Maria Nancy M. Socrates",
      },
      {
        partnerA: "Councilor Jonjie V. Rodriguez",
        partnerB: "Dra. Leah M. Dolor",
      },
      {
        partnerA: "Mr. Jerickson C. Chua",
        partnerB: "Mrs. Sheryl Jean A. Chua",
      },
      {
        partnerA: "Hon. Miguel Aaron D. Palayon",
        partnerB: "Mrs. Helen C. Bundal",
      },
      {
        partnerA: "Former V. Mayor Willy A. Dimatatac",
        partnerB: "Mrs. Alma A. Chua",
      },
      {
        partnerA: "Engr. Josue S. Estiandan",
        partnerB: "Mrs. Mary Grace B. Chua",
      },
      { partnerA: "Mr. Rogel R. Austria", partnerB: "Mrs. Joy E. Austria" },
    ],
  },
  {
    label: "Best Men",
    people: [
      { name: "Mr. Brian John Ocampo" },
      { name: "Engr. Ralph Julius Santos" },
    ],
  },
  {
    label: "Maids of Honor",
    people: [
      { name: "Ms. Hosannah Jemimah E. Chua" },
      { name: "Ms. Hanielle Jermayn E. Chua" },
    ],
  },
  {
    label: "Groomsmen",
    people: [
      { name: "Mr. Ralph Ajlen E. Dolor" },
      { name: "Engr. Patrick Jolo E. Dolor" },
      { name: "Mr. Hosea Jeffrey E. Chua" },
      { name: "Mr. Jozef Gabriel E. Chua" },
      { name: "Mr. Carlos Chester Esquivias" },
    ],
  },
  {
    label: "Bridesmaids",
    people: [
      { name: "Atty. Euna Angelica E. Dolor" },
      { name: "Ms. Mira Althea E. Dolor" },
      { name: "Ms. Julia Chanel A. Chua" },
      { name: "Mrs. Zamantha Mae F. Ballares" },
      { name: "Ms. Janyx Naomi Uy" },
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
                        <span className={styles.pairCardName}>
                          {pair.partnerA}
                        </span>
                      </span>
                      <span
                        className={styles.pairConnector}
                        aria-hidden="true"
                      ></span>
                      <span className={styles.pairCard}>
                        <span className={styles.pairCardName}>
                          {pair.partnerB}
                        </span>
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
