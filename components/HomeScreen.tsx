"use client";

import { motion } from "framer-motion";
import { apps, type AppId } from "./appRegistry";
import { appSpring } from "@/lib/motion";
import { useSystem } from "@/lib/system";
import styles from "./HomeScreen.module.css";

export function HomeScreen({ onOpen }: { onOpen: (id: AppId) => void }) {
  const { iconStyle } = useSystem();

  return (
    <div className={styles.home}>
      <nav className={styles.grid} aria-label="Apps">
        {apps.map((app) => (
          <button key={app.id} className={styles.app} onClick={() => onOpen(app.id)}>
            <motion.span
              layoutId={`shell-${app.id}`}
              className={`${styles.tile} ${styles[iconStyle]}`}
              style={iconStyle === "material" ? { background: app.tint } : undefined}
              transition={appSpring}
            >
              <motion.span layoutId={`glyph-${app.id}`} className={styles.glyph}>
                {app.icon}
              </motion.span>
            </motion.span>
            {app.badge ? <span className={styles.badge}>{app.badge}</span> : null}
            <span className={styles.label}>{app.name}</span>
          </button>
        ))}
      </nav>

      <footer className={styles.dock}>
        <span className={styles.dockNote}>XPHONE - BUILD X.1</span>
      </footer>
    </div>
  );
}
