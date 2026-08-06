"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { AppFrame } from "./AppFrame";
import { HomeScreen } from "./HomeScreen";
import { LockScreen } from "./LockScreen";
import { StatusBar } from "./StatusBar";
import { apps, type AppId } from "./appRegistry";
import { ContactsProvider } from "@/lib/contacts";
import { SystemProvider, themes, useSystem } from "@/lib/system";
import styles from "./Phone.module.css";

function Device() {
  const { locked, setLocked, theme, wallpaper, iconStyle } = useSystem();
  const [activeId, setActiveId] = useState<AppId | null>(null);
  const palette = themes.find((entry) => entry.id === theme) ?? themes[0];

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
  // A moldura que cresce é o próprio ícone: precisa sair da mesma cor que a home desenhou.
  const shellTint =
    iconStyle === "solid"
      ? "var(--accent)"
      : iconStyle === "glass"
        ? "rgba(255, 255, 255, 0.12)"
        : (active?.tint ?? "var(--void)");

  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <div
          className={styles.screen}
          style={
            {
              "--accent": palette.accent,
              "--on-accent": palette.ink,
              "--wallpaper": `url("${wallpaper}")`,
            } as CSSProperties
          }
        >
          <div className={styles.wallpaper} />
          <div className={styles.island} />

          <div className={styles.homeLayer}>
            <HomeScreen onOpen={setActiveId} />
          </div>

          <AnimatePresence>
            {active ? (
              <AppFrame key={active.id} appId={active.id} tint={shellTint} onClose={() => setActiveId(null)}>
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
