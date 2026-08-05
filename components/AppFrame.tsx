"use client";

import { motion } from "framer-motion";
import type { AppId } from "./appRegistry";
import { appSpring } from "@/lib/motion";
import styles from "./AppFrame.module.css";

export function AppFrame({
  appId,
  tint,
  onClose,
  children,
}: {
  appId: AppId;
  tint: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div layoutId={`shell-${appId}`} className={styles.shell} style={{ background: tint }} transition={appSpring}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      <motion.button
        className={styles.indicator}
        drag="y"
        dragConstraints={{ top: -70, bottom: 0 }}
        dragElastic={0.14}
        onDragEnd={(_, info) => {
          if (info.offset.y < -36 || info.velocity.y < -420) onClose();
        }}
        onClick={onClose}
        aria-label="Voltar para a tela inicial"
      >
        <span className={styles.bar} />
      </motion.button>
    </motion.div>
  );
}
