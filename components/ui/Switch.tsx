"use client";

import { motion } from "framer-motion";
import styles from "./Switch.module.css";

const knobSpring = { type: "spring", stiffness: 700, damping: 34 } as const;

export function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`${styles.track} ${on ? styles.trackOn : ""}`}
      onClick={() => onChange(!on)}
    >
      <motion.span className={styles.knob} animate={{ x: on ? 18 : 0 }} transition={knobSpring} />
    </button>
  );
}
