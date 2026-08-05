"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CloseIcon, SendIcon } from "../../icons";
import { reels } from "@/lib/vista";
import styles from "../Vista.module.css";

const SLIDE_MS = 4000;

export function StoryViewer({
  storyId,
  label,
  tint,
  onClose,
}: {
  storyId: string;
  label: string;
  tint: string;
  onClose: () => void;
}) {
  const slides = reels[storyId] ?? [];
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    if (!slide) return;
    const timer = window.setTimeout(() => {
      if (index + 1 < slides.length) setIndex(index + 1);
      else onClose();
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, slide, slides.length, onClose]);

  if (!slide) return null;

  const back = () => (index > 0 ? setIndex(index - 1) : onClose());
  const forward = () => (index + 1 < slides.length ? setIndex(index + 1) : onClose());

  return (
    <motion.div
      className={styles.storyView}
      style={{ background: `linear-gradient(165deg, ${slide.gradient[0]}, ${slide.gradient[1]})` }}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.storyBars}>
        {slides.map((item, position) => (
          <span key={item.caption} className={styles.storyBar}>
            {position < index ? <span className={styles.storyBarDone} /> : null}
            {position === index ? (
              <motion.span
                className={styles.storyBarDone}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              />
            ) : null}
          </span>
        ))}
      </div>

      <header className={styles.storyHead}>
        <span className={styles.storyAuthorAvatar} style={{ background: tint }}>
          {label.slice(0, 1)}
        </span>
        <span className={styles.storyAuthor}>{label}</span>
        <span className={styles.storyAgo}>
          {index + 1}/{slides.length}
        </span>
        <button className={styles.storyClose} onClick={onClose} aria-label="Fechar story">
          <CloseIcon size={22} />
        </button>
      </header>

      <button className={styles.storyPrev} onClick={back} aria-label="Story anterior" />
      <button className={styles.storyNext} onClick={forward} aria-label="Próximo story" />

      <p className={styles.storyCaption}>{slide.caption}</p>

      <form className={styles.storyReply} onSubmit={(event) => event.preventDefault()}>
        <input className={styles.storyInput} placeholder={`Responder a ${label}`} aria-label="Responder story" />
        <button className={styles.storySend} aria-label="Enviar resposta">
          <SendIcon size={18} />
        </button>
      </form>
    </motion.div>
  );
}
