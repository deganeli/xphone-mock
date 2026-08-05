"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { StarIcon } from "../icons";
import { catalog, featured, type StoreApp } from "@/lib/store";
import styles from "./Store.module.css";

type Install = "idle" | "baixando" | "instalado";

const INSTALL_MS = 1600;

function InstallButton({ state, onInstall }: { state: Install; onInstall: () => void }) {
  const reduceMotion = useReducedMotion();

  if (state === "instalado") {
    return <button className={`${styles.get} ${styles.open}`}>Abrir</button>;
  }

  if (state === "baixando") {
    return (
      <span className={styles.downloading} role="progressbar" aria-label="Baixando">
        <motion.svg
          className={styles.spinner}
          viewBox="0 0 32 32"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
          aria-hidden
        >
          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.18" />
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="22 60"
          />
        </motion.svg>
        <span className={styles.stop} />
      </span>
    );
  }

  return (
    <button className={styles.get} onClick={onInstall}>
      Obter
    </button>
  );
}

export function Store() {
  const [installs, setInstalls] = useState<Record<string, Install>>({});
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const install = (app: StoreApp) => {
    setInstalls((prev) => ({ ...prev, [app.id]: "baixando" }));
    const timer = window.setTimeout(
      () => setInstalls((prev) => ({ ...prev, [app.id]: "instalado" })),
      INSTALL_MS,
    );
    timers.current.push(timer);
  };

  const installed = Object.values(installs).filter((state) => state === "instalado").length;

  return (
    <div className={styles.scroll}>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Los Santos</p>
          <h1 className={styles.title}>Loja</h1>
        </div>
        <span className={styles.counter}>{installed} instalados hoje</span>
      </header>

      <section
        className={styles.featured}
        style={{ background: `linear-gradient(155deg, ${featured.gradient[0]}, ${featured.gradient[1]})` }}
      >
        <p className={styles.featuredKicker}>App da semana</p>
        <h2 className={styles.featuredName}>{featured.name}</h2>
        <p className={styles.featuredTagline}>{featured.tagline}</p>
        <div className={styles.featuredFoot}>
          <span className={styles.featuredMeta}>
            {featured.category} · {featured.size}
          </span>
          <InstallButton state={installs[featured.id] ?? "idle"} onInstall={() => install(featured)} />
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Apps do servidor</h2>
      <div className={styles.list}>
        {catalog.map((app) => (
          <article key={app.id} className={styles.row}>
            <span
              className={styles.icon}
              style={{ background: `linear-gradient(150deg, ${app.gradient[0]}, ${app.gradient[1]})` }}
              aria-hidden
            >
              {app.name.slice(0, 1)}
            </span>

            <div className={styles.body}>
              <p className={styles.name}>{app.name}</p>
              <p className={styles.tagline}>{app.tagline}</p>
              <p className={styles.meta}>
                <span className={styles.rating}>
                  <StarIcon size={10} />
                  {app.rating.toFixed(1).replace(".", ",")}
                </span>
                <span>{app.category}</span>
                <span>{app.size}</span>
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={installs[app.id] ?? "idle"}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.16 }}
              >
                <InstallButton state={installs[app.id] ?? "idle"} onInstall={() => install(app)} />
              </motion.div>
            </AnimatePresence>
          </article>
        ))}
      </div>

      <p className={styles.footer}>Catálogo verificado pela prefeitura de Los Santos</p>
    </div>
  );
}
