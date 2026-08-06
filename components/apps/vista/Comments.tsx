"use client";

import { useState, type FormEvent } from "react";
import { HeartIcon, HeartOutlineIcon, SendIcon } from "../../icons";
import { comments as seed, formatCount, type Comment, type Post } from "@/lib/vista";
import { Sheet } from "../../ui/Sheet";
import styles from "../Vista.module.css";

export function Comments({ post, onClose }: { post: Post; onClose: () => void }) {
  const [thread, setThread] = useState<Comment[]>(seed[post.id] ?? []);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState("");

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setThread((prev) => [
      ...prev,
      { id: `local-${prev.length}`, handle: "lukas.ls", text, at: "agora", likes: 0, tint: "var(--steel)" },
    ]);
    setDraft("");
  };

  return (
    <Sheet onClose={onClose} tall>
      <h2 className={styles.sheetTitle}>Comentários</h2>

        <div className={styles.commentList}>
          {thread.map((comment) => {
            const isLiked = liked[comment.id] ?? false;
            return (
              <article key={comment.id} className={styles.comment}>
                <span className={styles.commentAvatar} style={{ background: comment.tint }}>
                  {comment.handle.slice(0, 1)}
                </span>
                <div className={styles.commentBody}>
                  <p className={styles.commentText}>
                    <strong className={styles.commentHandle}>{comment.handle}</strong> {comment.text}
                  </p>
                  <p className={styles.commentMeta}>
                    <span>{comment.at}</span>
                    <span>{formatCount(comment.likes + (isLiked ? 1 : 0))} curtidas</span>
                    <button className={styles.commentReply}>Responder</button>
                  </p>
                </div>
                <button
                  className={`${styles.commentLike} ${isLiked ? styles.liked : ""}`}
                  onClick={() => setLiked((prev) => ({ ...prev, [comment.id]: !isLiked }))}
                  aria-pressed={isLiked}
                  aria-label="Curtir comentário"
                >
                  {isLiked ? <HeartIcon size={14} /> : <HeartOutlineIcon size={14} />}
                </button>
              </article>
            );
          })}

          {thread.length === 0 ? <p className={styles.commentEmpty}>Nenhum comentário ainda. Comece a conversa.</p> : null}
        </div>

        <form className={styles.commentForm} onSubmit={send}>
          <input
            className={styles.commentInput}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Comentar como lukas.ls`}
            aria-label="Escrever comentário"
          />
          <button className={styles.commentSend} disabled={!draft.trim()} aria-label="Publicar comentário">
            <SendIcon size={17} />
          </button>
      </form>
    </Sheet>
  );
}
