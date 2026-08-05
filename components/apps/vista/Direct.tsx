"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ChevronLeft, SendIcon } from "../../icons";
import { directThreads as seed, type DirectThread } from "@/lib/vista";
import { pushSpring } from "@/lib/motion";
import styles from "../Vista.module.css";

export function Direct({ initialHandle, onBack }: { initialHandle: string | null; onBack: () => void }) {
  const [threads, setThreads] = useState<DirectThread[]>(seed);
  const [openId, setOpenId] = useState<string | null>(
    () => seed.find((thread) => thread.handle === initialHandle)?.id ?? null,
  );
  const [draft, setDraft] = useState("");

  const open = threads.find((thread) => thread.id === openId) ?? null;

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !open) return;

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === open.id
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  id: `local-${thread.messages.length}`,
                  from: "me",
                  text,
                  at: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : thread,
      ),
    );
    setDraft("");
  };

  return (
    <motion.section
      className={styles.panel}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.directList}>
        <button className={styles.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vista</span>
        </button>
        <h2 className={styles.directTitle}>Direct</h2>

        {threads.map((thread) => {
          const last = thread.messages[thread.messages.length - 1];
          return (
            <button key={thread.id} className={styles.directRow} onClick={() => setOpenId(thread.id)}>
              <span className={styles.directAvatar} style={{ background: thread.tint }}>
                {thread.handle.slice(0, 1)}
              </span>
              <span className={styles.directBody}>
                <span className={styles.directHandle}>{thread.handle}</span>
                <span className={styles.directPreview}>
                  {last.from === "me" ? "Você: " : ""}
                  {last.text}
                </span>
              </span>
              {thread.unread && thread.id !== openId ? <span className={styles.unread} aria-label="Não lida" /> : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={open.id}
            className={styles.directThread}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={pushSpring}
          >
            <header className={styles.directBar}>
              <button className={styles.back} onClick={() => setOpenId(null)}>
                <ChevronLeft />
                <span>Direct</span>
              </button>
              <span className={styles.directName}>{open.handle}</span>
            </header>

            <div className={styles.directFeed}>
              {open.messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.dmBubble} ${message.from === "me" ? styles.dmMine : styles.dmTheirs}`}
                  style={message.from === "me" ? { background: open.tint } : undefined}
                >
                  <p className={styles.dmText}>{message.text}</p>
                  <span className={styles.dmStamp}>{message.at}</span>
                </div>
              ))}
            </div>

            <form className={styles.commentForm} onSubmit={send}>
              <input
                className={styles.commentInput}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Mensagem"
                aria-label={`Mensagem para ${open.handle}`}
              />
              <button className={styles.commentSend} disabled={!draft.trim()} aria-label="Enviar">
                <SendIcon size={17} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
