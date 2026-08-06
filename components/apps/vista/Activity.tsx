"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AddContactIcon, ChevronLeft, CommentIcon, HeartIcon, SendIcon } from "../../icons";
import { activity, activityBuckets, posts, type Activity as Item } from "@/lib/vista";
import { pushSpring } from "@/lib/motion";
import styles from "../Vista.module.css";
import form from "../../ui/form.module.css";

function Glyph({ kind }: { kind: Item["kind"] }) {
  if (kind === "comentario") return <CommentIcon size={12} />;
  if (kind === "mencao") return <SendIcon size={12} />;
  if (kind === "seguidor") return <AddContactIcon size={12} />;
  return <HeartIcon size={12} />;
}

export function Activity({
  onBack,
  onOpenProfile,
}: {
  onBack: () => void;
  onOpenProfile: (handle: string) => void;
}) {
  const [following, setFollowing] = useState<string[]>(() =>
    activity.filter((item) => item.followsBack).map((item) => item.id),
  );

  return (
    <motion.section
      className={styles.activity}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.activityScroll}>
        <button className={form.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vista</span>
        </button>

        <h2 className={styles.activityTitle}>Atividade</h2>

        {activityBuckets.map((bucket) => {
          const items = activity.filter((item) => item.bucket === bucket.id);
          if (items.length === 0) return null;

          return (
            <section key={bucket.id}>
              <h3 className={styles.activityBucket}>{bucket.title}</h3>

              {items.map((item) => {
                const post = item.postId ? posts.find((entry) => entry.id === item.postId) : undefined;
                const follows = following.includes(item.id);

                return (
                  <article key={item.id} className={styles.activityRow}>
                    <button
                      className={styles.activityAvatar}
                      style={{ background: item.tint }}
                      onClick={() => onOpenProfile(item.handle)}
                      aria-label={`Abrir perfil de ${item.handle}`}
                    >
                      {item.handle.slice(0, 1)}
                      <span className={`${styles.activityGlyph} ${styles[item.kind]}`} aria-hidden>
                        <Glyph kind={item.kind} />
                      </span>
                    </button>

                    <p className={styles.activityText}>
                      <button className={styles.activityHandle} onClick={() => onOpenProfile(item.handle)}>
                        {item.handle}
                      </button>{" "}
                      {item.text} <span className={styles.activityAt}>{item.at}</span>
                    </p>

                    {item.kind === "seguidor" ? (
                      <button
                        className={`${styles.follow} ${follows ? styles.following : ""}`}
                        aria-pressed={follows}
                        onClick={() =>
                          setFollowing((prev) =>
                            follows ? prev.filter((id) => id !== item.id) : [...prev, item.id],
                          )
                        }
                      >
                        {follows ? "Seguindo" : "Seguir"}
                      </button>
                    ) : null}

                    {post ? (
                      <span
                        className={styles.activityThumb}
                        style={{
                          background: `linear-gradient(160deg, ${post.gradient[0]}, ${post.gradient[1]} 52%, ${post.gradient[2]})`,
                        }}
                        aria-hidden
                      />
                    ) : null}
                  </article>
                );
              })}
            </section>
          );
        })}

        <p className={styles.end}>Atividade dos últimos 30 dias</p>
      </div>
    </motion.section>
  );
}
