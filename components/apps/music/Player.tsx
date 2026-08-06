"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ChevronLeft, PauseIcon, PlayIcon, RepeatIcon, ShuffleIcon, SkipIcon } from "../../icons";
import { formatTime, type Track } from "@/lib/music";
import { sheetSpring, tapSpring } from "@/lib/motion";
import styles from "../Music.module.css";

export function Player({
  track,
  elapsed,
  playing,
  shuffle,
  repeat,
  onSeek,
  onToggle,
  onSkip,
  onShuffle,
  onRepeat,
  onClose,
}: {
  track: Track;
  elapsed: number;
  playing: boolean;
  shuffle: boolean;
  repeat: boolean;
  onSeek: (seconds: number) => void;
  onToggle: () => void;
  onSkip: (delta: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onClose: () => void;
}) {
  const pct = (elapsed / track.seconds) * 100;

  return (
    <motion.section
      className={styles.player}
      style={{ background: `linear-gradient(178deg, ${track.gradient[0]}33, var(--void) 46%)` }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={sheetSpring}
    >
      <button className={styles.playerBack} onClick={onClose} aria-label="Fechar player">
        <span className={styles.playerBackIcon}>
          <ChevronLeft />
        </span>
        <span className={styles.playerKicker}>Tocando agora</span>
        <span />
      </button>

      <div
        className={styles.cover}
        style={{ background: `linear-gradient(150deg, ${track.gradient[0]}, ${track.gradient[1]})` }}
        aria-hidden
      />

      <div className={styles.playerInfo}>
        <h2 className={styles.playerTitle}>{track.title}</h2>
        <p className={styles.playerArtist}>{track.artist}</p>
      </div>

      <input
        className={styles.seek}
        style={{ "--pct": `${pct}%` } as CSSProperties}
        type="range"
        min={0}
        max={track.seconds}
        value={elapsed}
        onChange={(event) => onSeek(Number(event.target.value))}
        aria-label="Posição da faixa"
      />
      <div className={styles.clock}>
        <span>{formatTime(elapsed)}</span>
        <span>−{formatTime(track.seconds - elapsed)}</span>
      </div>

      <div className={styles.transport}>
        <button
          className={`${styles.mode} ${shuffle ? styles.modeOn : ""}`}
          onClick={onShuffle}
          aria-pressed={shuffle}
          aria-label="Aleatório"
        >
          <ShuffleIcon />
        </button>

        <button className={styles.step} onClick={() => onSkip(-1)} aria-label="Faixa anterior">
          <span className={styles.flip}>
            <SkipIcon />
          </span>
        </button>

        <motion.button
          className={styles.bigPlay}
          onClick={onToggle}
          whileTap={{ scale: 0.92 }}
          transition={tapSpring}
          aria-label={playing ? "Pausar" : "Tocar"}
        >
          {playing ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
        </motion.button>

        <button className={styles.step} onClick={() => onSkip(1)} aria-label="Próxima faixa">
          <SkipIcon />
        </button>

        <button
          className={`${styles.mode} ${repeat ? styles.modeOn : ""}`}
          onClick={onRepeat}
          aria-pressed={repeat}
          aria-label="Repetir"
        >
          <RepeatIcon />
        </button>
      </div>
    </motion.section>
  );
}
