"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, SendIcon } from "../icons";
import { threads as seed, type Message, type Thread } from "@/lib/messages";
import { pushSpring } from "@/lib/motion";
import styles from "./Messages.module.css";

export function Messages() {
  const [threads, setThreads] = useState<Thread[]>(seed);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);

  const open = useMemo(() => threads.find((t) => t.id === openId) ?? null, [threads, openId]);

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !open) return;

    const message: Message = {
      id: `local-${open.messages.length}-${text.length}`,
      from: "me",
      text,
      at: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setThreads((prev) =>
      prev.map((t) => (t.id === open.id ? { ...t, messages: [...t.messages, message] } : t)),
    );
    setDraft("");
    requestAnimationFrame(() => {
      feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  return (
    <>
      <div className={styles.stage}>
        <section className={styles.list} aria-hidden={open !== null}>
          <h1 className={styles.title}>Mensagens</h1>
          {threads.map((thread) => {
            const last = thread.messages[thread.messages.length - 1];
            return (
              <button key={thread.id} className={styles.row} onClick={() => setOpenId(thread.id)} tabIndex={open ? -1 : 0}>
                <span className={styles.avatar} style={{ background: thread.tint }}>
                  {thread.contact.slice(0, 1)}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTop}>
                    <span className={styles.contact}>{thread.contact}</span>
                    <span className={styles.time}>{last.at}</span>
                  </span>
                  <span className={styles.preview}>{last.text}</span>
                </span>
              </button>
            );
          })}
        </section>

        <AnimatePresence>
          {open ? (
            <motion.section
              key={open.id}
              className={styles.thread}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={pushSpring}
            >
              <header className={styles.threadBar}>
                <button className={styles.back} onClick={() => setOpenId(null)}>
                  <ChevronLeft />
                  <span>Voltar</span>
                </button>
                <span className={styles.threadName}>{open.contact}</span>
                <span className={styles.threadPhone}>{open.phone}</span>
              </header>

              <div className={styles.feed} ref={feedRef}>
                {open.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.bubble} ${message.from === "me" ? styles.mine : styles.theirs}`}
                    style={message.from === "me" ? { background: open.tint } : undefined}
                  >
                    <p className={styles.text}>{message.text}</p>
                    <span className={styles.stamp}>{message.at}</span>
                  </div>
                ))}
              </div>

              <form className={styles.composer} onSubmit={send}>
                <input
                  className={styles.input}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Mensagem"
                  aria-label={`Mensagem para ${open.contact}`}
                />
                <button className={styles.send} style={{ background: open.tint }} disabled={!draft.trim()} aria-label="Enviar">
                  <SendIcon />
                </button>
              </form>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
