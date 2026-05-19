"use client";
import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const WEDDING = new Date("2026-07-21T14:00:00+08:00").getTime();

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export default function Countdown() {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, WEDDING - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  return (
    <div className={styles.strip}>
      <p className={styles.label}>Counting down to forever</p>
      <div className={styles.grid}>
        {[
          { n: pad(days),  u: "Days" },
          { n: pad(hours), u: "Hours" },
          { n: pad(mins),  u: "Minutes" },
          { n: pad(secs),  u: "Seconds" },
        ].map(({ n, u }, i) => (
          <div key={u} className={styles.item}>
            {i > 0 && <span className={styles.colon}>:</span>}
            <div className={styles.numWrap}>
              <span className={styles.num}>{n}</span>
              <span className={styles.unit}>{u}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
