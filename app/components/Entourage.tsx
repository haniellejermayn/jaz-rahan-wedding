import styles from "./Entourage.module.css";

type Person = { name: string; role: string };
const groups: { label: string; people: Person[] }[] = [
  {
    label: "Principal Sponsors",
    people: [
      { name: "Name Here", role: "Ninong" },
      { name: "Name Here", role: "Ninang" },
      { name: "Name Here", role: "Ninong" },
      { name: "Name Here", role: "Ninang" },
    ],
  },
  {
    label: "Best Man & Maid of Honor",
    people: [
      { name: "Name Here", role: "Best Man" },
      { name: "Name Here", role: "Maid of Honor" },
    ],
  },
  {
    label: "Groomsmen & Bridesmaids",
    people: [
      { name: "Name Here", role: "Groomsman" },
      { name: "Name Here", role: "Bridesmaid" },
      { name: "Name Here", role: "Groomsman" },
      { name: "Name Here", role: "Bridesmaid" },
    ],
  },
  {
    label: "Secondary Sponsors",
    people: [
      { name: "Name Here", role: "Cord" },
      { name: "Name Here", role: "Cord" },
      { name: "Name Here", role: "Veil" },
      { name: "Name Here", role: "Veil" },
    ],
  },
  {
    label: "Flower Girls & Ring Bearers",
    people: [
      { name: "Name Here", role: "Flower Girl" },
      { name: "Name Here", role: "Ring Bearer" },
    ],
  },
];

export default function Entourage() {
  return (
    <section id="entourage" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">The People Who Matter Most</p>
        <h2 className="section-heading reveal delay-1">Our Entourage</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={styles.groups}>
          {groups.map((g, gi) => (
            <div key={g.label} className={`${styles.group} reveal`} style={{ transitionDelay: `${0.1 * gi}s` }}>
              <div className={styles.groupLabel}>
                <span className={styles.labelRule} />
                <span className={styles.labelText}>{g.label}</span>
                <span className={styles.labelRule} />
              </div>
              <ul className={styles.nameList}>
                {g.people.map((p, i) => (
                  <li key={i} className={styles.nameItem}>
                    <span className={styles.personName}>{p.name}</span>
                    <span className={styles.personDot} aria-hidden="true" />
                    <span className={styles.personRole}>{p.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
