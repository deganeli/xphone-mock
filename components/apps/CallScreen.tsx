"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MicOffIcon, PhoneIcon, SpeakerIcon } from "../icons";
import { tapSpring } from "@/lib/motion";
import styles from "./CallScreen.module.css";

const ANSWER_MS = 3200;

const clock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

export function CallScreen({
  phone,
  name,
  tint,
  onEnd,
}: {
  phone: string;
  name: string | null;
  tint: string;
  onEnd: () => void;
}) {
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setConnected(true), ANSWER_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!connected) return;
    const id = window.setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => window.clearInterval(id);
  }, [connected]);

  return (
    <motion.section
      className={styles.screen}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className={styles.head}>
        <span className={styles.avatarWrap}>
          {connected ? null : (
            <>
              <span className={styles.ring} style={{ borderColor: tint }} aria-hidden />
              <span className={`${styles.ring} ${styles.ringLate}`} style={{ borderColor: tint }} aria-hidden />
            </>
          )}
          <span className={styles.avatar} style={{ background: tint }}>
            {name ? name.slice(0, 1) : "?"}
          </span>
        </span>

        <h2 className={styles.name}>{name ?? phone}</h2>
        <p className={styles.number}>{name ? phone : "Número não salvo"}</p>
        <p className={styles.status} aria-live="polite">
          {connected ? clock(seconds) : "Chamando…"}
        </p>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.control} ${muted ? styles.controlOn : ""}`}
          aria-pressed={muted}
          onClick={() => setMuted(!muted)}
        >
          <MicOffIcon />
          Mudo
        </button>
        <button
          className={`${styles.control} ${speaker ? styles.controlOn : ""}`}
          aria-pressed={speaker}
          onClick={() => setSpeaker(!speaker)}
        >
          <SpeakerIcon />
          Viva-voz
        </button>
      </div>

      <motion.button
        className={styles.end}
        onClick={onEnd}
        whileTap={{ scale: 0.92 }}
        transition={tapSpring}
        aria-label="Encerrar chamada"
      >
        <PhoneIcon size={28} />
      </motion.button>
    </motion.section>
  );
}
