"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "../../icons";
import { formatCount, type MyVista } from "@/lib/vista";
import { pushSpring } from "@/lib/motion";
import styles from "../Vista.module.css";
import form from "../../ui/form.module.css";

export function MyProfileView({
  profile,
  onEdit,
  onBack,
}: {
  profile: MyVista;
  onEdit: () => void;
  onBack: () => void;
}) {
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
        style={{ background: `linear-gradient(180deg, ${profile.tint}22, transparent 220px)` }}
      >
        <button className={form.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vista</span>
        </button>

        <header className={styles.profileHead}>
          <span
            className={styles.profileRing}
            style={{ background: `linear-gradient(150deg, ${profile.tint}, var(--flame))` }}
          >
            <span
              className={styles.profileAvatar}
              style={
                profile.photo ? { background: `url("${profile.photo}") center / cover no-repeat` } : undefined
              }
            >
              {profile.photo ? "" : profile.name.slice(0, 1)}
            </span>
          </span>
          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>{profile.grid.length}</dt>
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
          <p className={styles.profileName}>
            {profile.name}
            {profile.privateAccount ? <span className={styles.privateTag}>privada</span> : null}
          </p>
          <p className={styles.profilePlace}>
            @{profile.handle} · {profile.place}
          </p>
          <p className={styles.profileText}>{profile.bio}</p>
        </div>

        <div className={styles.profileActions}>
          <button className={styles.editAction} onClick={onEdit}>
            Editar perfil
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
