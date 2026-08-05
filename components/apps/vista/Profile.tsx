"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft } from "../../icons";
import { formatCount, posts, profiles } from "@/lib/vista";
import { pushSpring } from "@/lib/motion";
import styles from "../Vista.module.css";

export function Profile({ handle, onBack, onMessage }: { handle: string; onBack: () => void; onMessage: () => void }) {
  const profile = profiles[handle];
  const [following, setFollowing] = useState(false);

  if (!profile) return null;

  const postCount = posts.filter((post) => post.handle === handle).length;

  return (
    <motion.section
      className={styles.panel}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.panelScroll} style={{ background: `linear-gradient(180deg, ${profile.tint}22, transparent 220px)` }}>
        <button className={styles.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vista</span>
        </button>

        <header className={styles.profileHead}>
          <span className={styles.profileRing} style={{ background: `linear-gradient(150deg, ${profile.tint}, #ff4d8d)` }}>
            <span className={styles.profileAvatar}>{profile.author.slice(0, 1)}</span>
          </span>
          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>{postCount}</dt>
              <dd>posts</dd>
            </div>
            <div className={styles.stat}>
              <dt>{formatCount(profile.followers)}</dt>
              <dd>seguidores</dd>
            </div>
            <div className={styles.stat}>
              <dt>{formatCount(profile.following)}</dt>
              <dd>seguindo</dd>
            </div>
          </dl>
        </header>

        <div className={styles.profileBio}>
          <p className={styles.profileName}>{profile.author}</p>
          <p className={styles.profilePlace}>{profile.place}</p>
          <p className={styles.profileText}>{profile.bio}</p>
        </div>

        <div className={styles.profileActions}>
          <button
            className={`${styles.follow} ${following ? styles.followingOn : ""}`}
            onClick={() => setFollowing((prev) => !prev)}
            aria-pressed={following}
          >
            {following ? "Seguindo" : "Seguir"}
          </button>
          <button className={styles.messageAction} onClick={onMessage}>
            Mensagem
          </button>
        </div>

        <div className={styles.grid}>
          {profile.grid.map(([from, to], position) => (
            <span
              key={`${from}-${position}`}
              className={styles.gridCell}
              style={{ background: `linear-gradient(155deg, ${from}, ${to})` }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
