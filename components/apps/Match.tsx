"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { CloseIcon, HeartIcon, MessagesIcon } from "../icons";
import { Chats } from "./match/Chats";
import { chats, profiles, type Profile } from "@/lib/match";
import { tapSpring } from "@/lib/motion";
import styles from "./Match.module.css";

type Verdict = "like" | "nope";

const SWIPE_DISTANCE = 108;
const SWIPE_VELOCITY = 520;

function Card({ profile, onDecide, fling }: { profile: Profile; onDecide: (v: Verdict) => void; fling: Verdict | null }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-16, 16]);
  const likeOpacity = useTransform(x, [30, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-130, -30], [1, 0]);

  return (
    <motion.article
      className={styles.card}
      style={{ x, rotate, background: `linear-gradient(168deg, ${profile.gradient[0]}, ${profile.gradient[1]})` }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.55}
      animate={fling ? { x: fling === "like" ? 460 : -460, opacity: 0 } : undefined}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      onAnimationComplete={() => fling && onDecide(fling)}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) onDecide("like");
        else if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) onDecide("nope");
      }}
    >
      <motion.span className={`${styles.stamp} ${styles.stampLike}`} style={{ opacity: likeOpacity }}>
        Curti
      </motion.span>
      <motion.span className={`${styles.stamp} ${styles.stampNope}`} style={{ opacity: nopeOpacity }}>
        Passo
      </motion.span>

      <div className={styles.cardInfo}>
        <p className={styles.distance}>
          {profile.district} · {profile.distance}
        </p>
        <h2 className={styles.name}>
          {profile.name} <span className={styles.age}>{profile.age}</span>
        </h2>
        <p className={styles.bio}>{profile.bio}</p>
        <ul className={styles.tags}>
          {profile.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Match() {
  const [index, setIndex] = useState(0);
  const [fling, setFling] = useState<Verdict | null>(null);
  const [matched, setMatched] = useState<Profile | null>(null);
  const [chatsOpen, setChatsOpen] = useState(false);

  const unread = chats.filter((chat) => chat.unread).length;

  const current = profiles[index] ?? null;
  const next = profiles[index + 1] ?? null;

  const decide = (verdict: Verdict) => {
    if (!current) return;
    setFling(null);
    setIndex((prev) => prev + 1);
    if (verdict === "like" && current.mutual) setMatched(current);
  };

  return (
    <div className={styles.stage}>
      <header className={styles.head}>
        <h1 className={styles.title}>Vibe</h1>
        <span className={styles.counter}>
          {Math.min(index + 1, profiles.length)}/{profiles.length}
        </span>
        <button className={styles.chatsButton} onClick={() => setChatsOpen(true)} aria-label="Abrir conversas">
          <MessagesIcon size={20} />
          {unread > 0 ? <span className={styles.chatsBadge}>{unread}</span> : null}
        </button>
      </header>

      <div className={styles.deck}>
        {next ? (
          <div
            className={`${styles.card} ${styles.behind}`}
            style={{ background: `linear-gradient(168deg, ${next.gradient[0]}, ${next.gradient[1]})` }}
            aria-hidden
          />
        ) : null}

        {current ? (
          <Card key={current.id} profile={current} fling={fling} onDecide={decide} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Acabaram os perfis por aqui</p>
            <p className={styles.emptyBody}>Volte quando estiver em outro bairro de Los Santos.</p>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <motion.button
          className={`${styles.control} ${styles.nope}`}
          onClick={() => setFling("nope")}
          disabled={!current}
          whileTap={{ scale: 0.88 }}
          transition={tapSpring}
          aria-label="Passar"
        >
          <CloseIcon />
        </motion.button>
        <motion.button
          className={`${styles.control} ${styles.like}`}
          onClick={() => setFling("like")}
          disabled={!current}
          whileTap={{ scale: 0.88 }}
          transition={tapSpring}
          aria-label="Curtir"
        >
          <HeartIcon />
        </motion.button>
      </div>

      <AnimatePresence>
        {matched ? (
          <motion.div
            className={styles.matchScrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.matchCard}
              initial={{ scale: 0.86, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <p className={styles.matchKicker}>Deu match</p>
              <h2 className={styles.matchName}>{matched.name}</h2>
              <p className={styles.matchBody}>
                {matched.name} também curtiu você. O contato já está salvo em Mensagens.
              </p>
              <button className={styles.matchAction} onClick={() => setMatched(null)}>
                Continuar deslizando
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>{chatsOpen ? <Chats onBack={() => setChatsOpen(false)} /> : null}</AnimatePresence>
    </div>
  );
}
