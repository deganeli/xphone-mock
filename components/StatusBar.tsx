"use client";

import { useEffect, useState } from "react";
import { MoonIcon } from "./icons";
import { useSystem } from "@/lib/system";
import styles from "./StatusBar.module.css";

const battery = 78;
const signal = 2;

const ARCS = [
  { d: "M2.5 7.5A4 4 0 0 1 6.5 11.5", key: "perto" },
  { d: "M2.5 4.5A7 7 0 0 1 9.5 11.5", key: "medio" },
  { d: "M2.5 1.5A10 10 0 0 1 12.5 11.5", key: "longe" },
];
const RADIUS = 6.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatusBar() {
  const { dnd } = useSystem();
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.bar}>
      <span className={styles.left}>
        <svg className={styles.signal} viewBox="0 0 14 14" role="img" aria-label={`Sinal ${signal} de ${ARCS.length}`}>
          <circle cx="2.5" cy="11.5" r="1.6" fill="currentColor" />
          {ARCS.map((arc, index) => (
            <path
              key={arc.key}
              d={arc.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity={index < signal ? 1 : 0.24}
            />
          ))}
        </svg>
        <span className={styles.clock}>{clock ?? "--:--"}</span>
      </span>

      <span className={styles.battery}>
        {dnd ? (
          <span className={styles.dnd} role="img" aria-label="Não perturbe ativo">
            <MoonIcon size={13} />
          </span>
        ) : null}
        <span className={styles.level} role="img" aria-label={`Bateria ${battery}%`}>
          {battery}%
        </span>
        <svg className={styles.ring} viewBox="0 0 18 18" aria-hidden>
          <circle cx="9" cy="9" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.24" />
          <circle
            cx="9"
            cy="9"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - battery / 100)}
            transform="rotate(-90 9 9)"
          />
        </svg>
      </span>
    </div>
  );
}
