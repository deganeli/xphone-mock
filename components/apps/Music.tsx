"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CloseIcon, PauseIcon, PlayIcon } from "../icons";
import { Player } from "./music/Player";
import { PlaylistView } from "./music/PlaylistView";
import { SearchIcon } from "../icons";
import { formatTime, playlists, recent, tracks, type Track } from "@/lib/music";
import { tapSpring } from "@/lib/motion";
import styles from "./Music.module.css";

const trackById = (id: string) => tracks.find((track) => track.id === id);

export function Music() {
  const [queue, setQueue] = useState<string[]>(recent);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState<string | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const term = query.trim().toLocaleLowerCase("pt-BR");
  const hits = term
    ? tracks.filter(
        (track) =>
          track.title.toLocaleLowerCase("pt-BR").includes(term) ||
          track.artist.toLocaleLowerCase("pt-BR").includes(term),
      )
    : [];

  const current = trackById(queue[position]) ?? null;

  const play = useCallback((ids: string[], index: number) => {
    setQueue(ids);
    setPosition(index);
    setElapsed(0);
    setPlaying(true);
  }, []);

  const skip = useCallback(
    (delta: number) => {
      setElapsed(0);
      setPosition((prev) => {
        if (shuffle && delta > 0 && queue.length > 1) {
          // Sorteia entre as outras faixas: nunca repete a que acabou de tocar.
          const offset = 1 + Math.floor(Math.random() * (queue.length - 1));
          return (prev + offset) % queue.length;
        }
        const next = prev + delta;
        if (next < 0) return queue.length - 1;
        if (next >= queue.length) return repeat ? 0 : queue.length - 1;
        return next;
      });
    },
    [queue.length, repeat, shuffle],
  );

  useEffect(() => {
    if (!playing || !current) return;
    const id = window.setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => window.clearInterval(id);
  }, [playing, current]);

  useEffect(() => {
    if (!current || elapsed < current.seconds) return;
    const last = position === queue.length - 1;
    if (last && !repeat) {
      setPlaying(false);
      setElapsed(current.seconds);
      return;
    }
    skip(1);
  }, [elapsed, current, position, queue.length, repeat, skip]);

  return (
    <div className={styles.stage}>
      <div className={styles.scroll}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Los Santos · ao vivo</p>
          <h1 className={styles.title}>Onda</h1>

          <div className={styles.search}>
            <span className={styles.searchIcon} aria-hidden>
              <SearchIcon />
            </span>
            <input
              className={styles.searchInput}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar faixa ou artista"
              aria-label="Buscar"
            />
            {query ? (
              <button className={styles.searchClear} onClick={() => setQuery("")} aria-label="Limpar busca">
                <CloseIcon size={16} />
              </button>
            ) : null}
          </div>
        </header>

        {term ? (
          <div className={styles.results}>
            {hits.length === 0 ? (
              <p className={styles.noHits}>Nada com “{query.trim()}”.</p>
            ) : (
              <div className={styles.list}>
                {hits.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={index + 1}
                    active={current?.id === track.id}
                    playing={playing && current?.id === track.id}
                    onPlay={() =>
                      current?.id === track.id
                        ? setPlaying((prev) => !prev)
                        : play(
                            hits.map((entry) => entry.id),
                            index,
                          )
                    }
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
          <h2 className={styles.sectionTitle}>Coleções</h2>
          <div className={styles.shelf}>
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                className={styles.shelfCard}
                style={{ background: `linear-gradient(155deg, ${playlist.gradient[0]}, ${playlist.gradient[1]})` }}
                onClick={() => setOpenPlaylist(playlist.id)}
              >
                <span className={styles.shelfName}>{playlist.name}</span>
                <span className={styles.shelfMeta}>{playlist.trackIds.length} faixas</span>
              </button>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Ouvidas há pouco</h2>
          <div className={styles.chips}>
            {recent.map((id, index) => {
              const track = trackById(id);
              if (!track) return null;
              return (
                <button key={id} className={styles.chip} onClick={() => play(recent, index)}>
                  <span
                    className={styles.chipArt}
                    style={{ background: `linear-gradient(150deg, ${track.gradient[0]}, ${track.gradient[1]})` }}
                    aria-hidden
                  />
                  <span className={styles.chipBody}>
                    <span className={styles.chipTitle}>{track.title}</span>
                    <span className={styles.chipArtist}>{track.artist}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <h2 className={styles.sectionTitle}>Tocando na cidade</h2>
          <div className={styles.list}>
            {tracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index + 1}
                active={current?.id === track.id}
                playing={playing && current?.id === track.id}
                onPlay={() =>
                  current?.id === track.id
                    ? setPlaying((prev) => !prev)
                    : play(
                        tracks.map((entry) => entry.id),
                        index,
                      )
                }
              />
            ))}
          </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {current && !playerOpen ? (
          <motion.div
            className={styles.mini}
            initial={{ y: 70 }}
            animate={{ y: 0 }}
            exit={{ y: 70 }}
            transition={tapSpring}
          >
            <button className={styles.miniOpen} onClick={() => setPlayerOpen(true)}>
              <span
                className={styles.miniArt}
                style={{ background: `linear-gradient(150deg, ${current.gradient[0]}, ${current.gradient[1]})` }}
                aria-hidden
              />
              <span className={styles.miniBody}>
                <span className={styles.miniTitle}>{current.title}</span>
                <span className={styles.miniArtist}>{current.artist}</span>
              </span>
            </button>
            <button
              className={styles.miniAction}
              onClick={() => setPlaying((prev) => !prev)}
              aria-label={playing ? "Pausar" : "Tocar"}
            >
              {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <span className={styles.miniBar} aria-hidden>
              <span
                className={styles.miniFill}
                style={{ width: `${Math.min(100, (elapsed / current.seconds) * 100)}%` }}
              />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {openPlaylist ? (
          <PlaylistView
            playlistId={openPlaylist}
            currentId={current?.id ?? null}
            playing={playing}
            onPlay={play}
            onToggle={() => setPlaying((prev) => !prev)}
            onBack={() => setOpenPlaylist(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {playerOpen && current ? (
          <Player
            track={current}
            elapsed={Math.min(elapsed, current.seconds)}
            playing={playing}
            shuffle={shuffle}
            repeat={repeat}
            onSeek={setElapsed}
            onToggle={() => setPlaying((prev) => !prev)}
            onSkip={skip}
            onShuffle={() => setShuffle((prev) => !prev)}
            onRepeat={() => setRepeat((prev) => !prev)}
            onClose={() => setPlayerOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TrackRow({
  track,
  index,
  active,
  playing,
  onPlay,
}: {
  track: Track;
  index: number;
  active: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <button className={`${styles.row} ${active ? styles.rowActive : ""}`} onClick={onPlay}>
      <span className={styles.rowIndex}>{playing ? <Bars /> : String(index).padStart(2, "0")}</span>
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
  );
}

function Bars() {
  return (
    <span className={styles.bars} aria-hidden>
      <i />
      <i />
      <i />
    </span>
  );
}
