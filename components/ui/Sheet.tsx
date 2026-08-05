"use client";

import { motion } from "framer-motion";
import { sheetSpring } from "@/lib/motion";
import styles from "./Sheet.module.css";

export function Sheet({
  onClose,
  children,
  tall = false,
}: {
  onClose: () => void;
  children: React.ReactNode;
  /** Ocupa altura fixa com rolagem interna, para conteúdo de tamanho imprevisível. */
  tall?: boolean;
}) {
  return (
    <>
      <motion.div
        className={styles.scrim}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className={`${styles.panel} ${tall ? styles.tall : ""}`}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={sheetSpring}
      >
        <span className={styles.grabber} />
        {children}
      </motion.div>
    </>
  );
}
