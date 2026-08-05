"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ChevronLeft, SendIcon } from "../../icons";
import { chats as seed, profiles, type MatchChat } from "@/lib/match";
import { pushSpring } from "@/lib/motion";
import styles from "../Match.module.css";

export function Chats({ onBack }: { onBack: () => void }) {
  const [chats, setChats] = useState<MatchChat[]>(seed);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const open = chats.find((chat) => chat.id === openId) ?? null;
  const fresh = profiles.filter((profile) => profile.mutual);

  const send = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !open) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === open.id
          ? {
              ...chat,
              unread: false,
              messages: [
                ...chat.messages,
                {
                  id: `local-${chat.messages.length}`,
                  from: "me",
                  text,
                  at: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : chat,
      ),
    );
    setDraft("");
  };

  return (
    <motion.section
      className={styles.chats}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.chatsScroll}>
        <button className={styles.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vibe</span>
        </button>

        <h2 className={styles.chatsTitle}>Conversas</h2>

        <p className={styles.stripTitle}>Novos matches</p>
        <div className={styles.strip}>
          {fresh.map((profile) => (
            <button key={profile.id} className={styles.fresh} onClick={() => setOpenId(profile.id)}>
              <span
                className={styles.freshRing}
                style={{ background: `linear-gradient(150deg, ${profile.gradient[0]}, ${profile.gradient[1]})` }}
              >
                <span className={styles.freshInitial}>{profile.name.slice(0, 1)}</span>
              </span>
              <span className={styles.freshName}>{profile.name}</span>
            </button>
          ))}
        </div>

        {chats.map((chat) => {
          const last = chat.messages[chat.messages.length - 1];
          return (
            <button key={chat.id} className={styles.chatRow} onClick={() => setOpenId(chat.id)}>
              <span
                className={styles.chatAvatar}
                style={{ background: `linear-gradient(150deg, ${chat.gradient[0]}, ${chat.gradient[1]})` }}
              >
                {chat.name.slice(0, 1)}
              </span>
              <span className={styles.chatBody}>
                <span className={styles.chatName}>
                  {chat.name}
                  <span className={styles.chatAt}>{chat.matchedAt}</span>
                </span>
                <span className={`${styles.chatPreview} ${chat.unread ? styles.chatUnread : ""}`}>
                  {last.from === "me" ? "Você: " : ""}
                  {last.text}
                </span>
              </span>
              {chat.unread ? <span className={styles.chatDot} /> : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
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
                <span>Conversas</span>
              </button>
              <span className={styles.threadName}>{open.name}</span>
              <span className={styles.threadMeta}>Match {open.matchedAt}</span>
            </header>

            <div className={styles.threadFeed}>
              {open.messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.bubble} ${message.from === "me" ? styles.mine : styles.theirs}`}
                  style={message.from === "me" ? { background: open.gradient[0] } : undefined}
                >
                  <p className={styles.bubbleText}>{message.text}</p>
                  <span className={styles.bubbleAt}>{message.at}</span>
                </div>
              ))}
            </div>

            <form className={styles.composer} onSubmit={send}>
              <input
                className={styles.composerInput}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Mensagem para ${open.name}`}
                aria-label={`Mensagem para ${open.name}`}
              />
              <button
                className={styles.composerSend}
                style={{ background: open.gradient[0] }}
                disabled={!draft.trim()}
                aria-label="Enviar"
              >
                <SendIcon size={17} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
