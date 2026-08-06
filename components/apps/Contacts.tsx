"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, MessagesIcon, PhoneIcon, SendIcon, StarIcon } from "../icons";
import { useContacts, type Contact } from "@/lib/contacts";
import { pushSpring } from "@/lib/motion";
import styles from "./Contacts.module.css";
import form from "../ui/form.module.css";

const TOAST_MS = 1800;

export function Contacts() {
  const { contacts, logCall, toggleFavorite } = useContacts();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [called, setCalled] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  const letterRefs = useRef(new Map<string, HTMLParagraphElement>());

  const favorites = contacts.filter((contact) => contact.favorite);

  const sections = useMemo(() => {
    const term = query.trim().toLowerCase();
    const found = contacts.filter((contact) =>
      term === "" ? true : `${contact.name} ${contact.phone} ${contact.role}`.toLowerCase().includes(term),
    );

    const byLetter = new Map<string, Contact[]>();
    for (const contact of found) {
      const letter = contact.name.slice(0, 1).toLocaleUpperCase("pt-BR");
      const bucket = byLetter.get(letter);
      if (bucket) bucket.push(contact);
      else byLetter.set(letter, [contact]);
    }
    return [...byLetter.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  }, [contacts, query]);

  const jumpTo = (letter: string) => {
    const header = letterRefs.current.get(letter);
    const list = listRef.current;
    if (!header || !list) return;
    list.scrollTo({ top: header.offsetTop - 58, behavior: "smooth" });
  };

  useEffect(() => {
    if (!called) return;
    const timer = window.setTimeout(() => setCalled(null), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [called]);

  const call = (contact: Contact) => {
    logCall(contact.phone);
    setCalled(contact.id);
  };

  const open = contacts.find((contact) => contact.id === openId) ?? null;

  return (
    <>
      <div className={styles.stage}>
        <section className={styles.list} ref={listRef} aria-hidden={open !== null}>
          <div className={styles.header}>
            <h1 className={styles.title}>Contatos</h1>
            <span className={styles.count}>{contacts.length} salvos</span>
          </div>

          <input
            className={styles.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar"
            aria-label="Buscar contatos"
            tabIndex={open ? -1 : 0}
          />

          {query === "" && favorites.length > 0 ? (
            <div className={styles.favorites}>
              <p className={styles.favoritesTitle}>Favoritos</p>
              <div className={styles.favoritesRow}>
                {favorites.map((contact) => (
                  <button
                    key={contact.id}
                    className={styles.favorite}
                    onClick={() => setOpenId(contact.id)}
                    tabIndex={open ? -1 : 0}
                  >
                    <span className={styles.favoriteAvatar} style={{ background: contact.tint }}>
                      {contact.name.slice(0, 1)}
                    </span>
                    <span className={styles.favoriteName}>{contact.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {sections.map(([letter, group]) => (
            <div key={letter}>
              <p
                className={styles.letter}
                ref={(node) => {
                  if (node) letterRefs.current.set(letter, node);
                  else letterRefs.current.delete(letter);
                }}
              >
                {letter}
              </p>
              {group.map((contact) => (
                <button
                  key={contact.id}
                  className={styles.row}
                  onClick={() => setOpenId(contact.id)}
                  tabIndex={open ? -1 : 0}
                >
                  <span className={styles.avatar} style={{ background: contact.tint }}>
                    {contact.name.slice(0, 1)}
                  </span>
                  <span className={styles.rowBody}>
                    <span className={styles.name}>
                      {contact.name}
                      {contact.favorite ? (
                        <span className={styles.star} aria-label="Favorito">
                          <StarIcon size={11} />
                        </span>
                      ) : null}
                    </span>
                    <span className={styles.role}>{contact.role}</span>
                  </span>
                  <span className={styles.phone}>{contact.phone}</span>
                </button>
              ))}
            </div>
          ))}

          {sections.length === 0 ? <p className={styles.none}>Nenhum contato encontrado.</p> : null}
        </section>

        {sections.length > 1 && !open ? (
          <nav className={styles.rail} aria-label="Ir para letra">
            {sections.map(([letter]) => (
              <button key={letter} className={styles.railKey} onClick={() => jumpTo(letter)}>
                {letter}
              </button>
            ))}
          </nav>
        ) : null}

        <AnimatePresence>
          {open ? (
            <motion.section
              key={open.id}
              className={styles.detail}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={pushSpring}
            >
              <div
                className={styles.detailScroll}
                style={{ background: `linear-gradient(180deg, ${open.tint}26, transparent 240px)` }}
              >
                <div className={styles.detailBar}>
                  <button className={form.back} onClick={() => setOpenId(null)}>
                    <ChevronLeft />
                    <span>Contatos</span>
                  </button>
                  <button
                    className={`${styles.starToggle} ${open.favorite ? styles.starOn : ""}`}
                    onClick={() => toggleFavorite(open.id)}
                    aria-pressed={open.favorite}
                    aria-label="Favoritar contato"
                  >
                    <StarIcon size={17} />
                  </button>
                </div>

                <div className={styles.card}>
                  <span className={styles.bigAvatar} style={{ background: open.tint }}>
                    {open.name.slice(0, 1)}
                  </span>
                  <h2 className={styles.bigName}>{open.name}</h2>
                  <p className={styles.bigRole}>{open.role}</p>
                </div>

                <div className={styles.actions}>
                  <button className={styles.action} onClick={() => call(open)}>
                    <span className={styles.actionGlyph} style={{ color: "var(--cash)" }}>
                      <PhoneIcon size={20} />
                    </span>
                    Ligar
                  </button>
                  <button className={styles.action}>
                    <span className={styles.actionGlyph} style={{ color: "var(--sunset)" }}>
                      <MessagesIcon size={20} />
                    </span>
                    Mensagem
                  </button>
                  <button className={styles.action}>
                    <span className={styles.actionGlyph} style={{ color: "var(--accent)" }}>
                      <SendIcon size={19} />
                    </span>
                    Transferir
                  </button>
                </div>

                <div className={styles.fields}>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Celular</span>
                    <span className={styles.fieldValue}>{open.phone}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Categoria</span>
                    <span className={styles.fieldText}>{open.role}</span>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Toque</span>
                    <span className={styles.fieldText}>Padrão · LS-NET</span>
                  </div>
                </div>

                <button className={styles.share}>Compartilhar contato</button>
              </div>

              <AnimatePresence>
                {called === open.id ? (
                  <motion.p
                    className={styles.toast}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    role="status"
                  >
                    Chamando {open.name}…
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
