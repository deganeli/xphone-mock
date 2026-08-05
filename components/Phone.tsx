"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AppFrame } from "./AppFrame";
import { HomeScreen } from "./HomeScreen";
import { LockScreen } from "./LockScreen";
import { StatusBar } from "./StatusBar";
import { apps, type AppId } from "./appRegistry";
import { ContactsProvider } from "@/lib/contacts";
import { SystemProvider, useSystem } from "@/lib/system";
import styles from "./Phone.module.css";

function Device() {
  const { locked, setLocked } = useSystem();
  const [activeId, setActiveId] = useState<AppId | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  useEffect(() => {
    if (locked) setActiveId(null);
  }, [locked]);

  const active = apps.find((app) => app.id === activeId) ?? null;

  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <div className={styles.screen}>
          <div className={styles.wallpaper} />
          <div className={styles.island} />

          <div className={styles.homeLayer}>
            <HomeScreen onOpen={setActiveId} />
            <span className={styles.homeBar} />
          </div>

          <AnimatePresence>
            {active ? (
              <AppFrame key={active.id} appId={active.id} tint={active.tint} onClose={() => setActiveId(null)}>
                <active.Screen />
              </AppFrame>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>{locked ? <LockScreen onUnlock={() => setLocked(false)} /> : null}</AnimatePresence>

          <div className={styles.statusLayer}>
            <StatusBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Phone() {
  return (
    <SystemProvider>
      <ContactsProvider>
        <Device />
      </ContactsProvider>
    </SystemProvider>
  );
}
