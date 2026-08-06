"use client";

import { motion } from "framer-motion";
import { ChevronLeft, PauseIcon, PlayIcon } from "../../icons";
import { formatTime, playlists, tracks } from "@/lib/music";
import { pushSpring } from "@/lib/motion";
import styles from "../Music.module.css";
import form from "../../ui/form.module.css";

export function PlaylistView({
  playlistId,
  currentId,
  playing,
  onPlay,
  onToggle,
  onBack,
}: {
  playlistId: string;
  currentId: string | null;
  playing: boolean;
  onPlay: (ids: string[], index: number) => void;
  onToggle: () => void;
  onBack: () => void;
}) {
  const playlist = playlists.find((entry) => entry.id === playlistId);
  if (!playlist) return null;

  const list = playlist.trackIds.map((id) => tracks.find((track) => track.id === id)).filter((track) => !!track);
  const total = list.reduce((sum, track) => sum + track.seconds, 0);
  const playingHere = playing && currentId !== null && playlist.trackIds.includes(currentId);

  return (
    <motion.section
      className={styles.panel}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div
        className={styles.panelScroll}
        style={{ background: `linear-gradient(180deg, ${playlist.gradient[0]}2e, var(--void) 300px)` }}
      >
        <button className={form.back} onClick={onBack}>
          <ChevronLeft />
          <span>Onda</span>
        </button>

        <div
          className={styles.panelCover}
          style={{ background: `linear-gradient(150deg, ${playlist.gradient[0]}, ${playlist.gradient[1]})` }}
          aria-hidden
        />

        <h2 className={styles.panelTitle}>{playlist.name}</h2>
        <p className={styles.panelNote}>{playlist.note}</p>
        <p className={styles.panelMeta}>
          {playlist.curator} · {list.length} faixas · {formatTime(total)}
        </p>

        <button
          className={styles.panelPlay}
          onClick={() => (playingHere ? onToggle() : onPlay(playlist.trackIds, 0))}
        >
          {playingHere ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          {playingHere ? "Pausar" : "Tocar tudo"}
        </button>

        <div className={styles.list}>
          {list.map((track, index) => (
            <button
              key={track.id}
              className={`${styles.row} ${currentId === track.id ? styles.rowActive : ""}`}
              onClick={() => onPlay(playlist.trackIds, index)}
            >
              <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span
                className={styles.rowArt}
                style={{ background: `linear-gradient(150deg, ${track.gradient[0]}, ${track.gradient[1]})` }}
                aria-hidden
              />
              <span className={styles.rowBody}>
                <span className={styles.rowTitle}>{track.title}</span>
                <span className={styles.rowArtist}>{track.artist}</span>
              </span>
              <span className={styles.rowTime}>{formatTime(track.seconds)}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
