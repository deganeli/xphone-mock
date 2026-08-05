"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LockNotifications } from "./LockNotifications";
import { FingerprintIcon } from "./icons";
import { tapSpring } from "@/lib/motion";
import styles from "./LockScreen.module.css";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      className={styles.lock}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
    >
      <header className={styles.clockBlock}>
        <p className={styles.date}>
          {now?.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }) ?? " "}
        </p>
        <p className={styles.time}>
          {now?.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) ?? " "}
        </p>
      </header>

      <div className={styles.feed}>
        <LockNotifications />

        <motion.button
          className={styles.biometric}
          onClick={onUnlock}
          whileTap={{ scale: 0.9 }}
          transition={tapSpring}
          aria-label="Desbloquear com digital"
        >
          <FingerprintIcon size={32} />
        </motion.button>
      </div>
    </motion.div>
  );
}
