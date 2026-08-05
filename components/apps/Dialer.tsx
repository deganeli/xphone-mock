"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { AddContactIcon, BackspaceIcon, PhoneIcon } from "../icons";
import { useContacts } from "@/lib/contacts";
import { tapSpring } from "@/lib/motion";
import { Sheet } from "../ui/Sheet";
import styles from "./Dialer.module.css";

const keys = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
  { digit: "*", letters: "" },
  { digit: "0", letters: "+" },
  { digit: "#", letters: "" },
];

export function Dialer() {
  const { contacts, calls, saveContact, logCall } = useContacts();
  const [tab, setTab] = useState<"recentes" | "teclado">("teclado");
  const [dialed, setDialed] = useState("");
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const known = contacts.find((contact) => contact.phone === dialed) ?? null;

  const call = () => {
    if (!dialed) return;
    logCall(dialed);
    setDialed("");
    setTab("recentes");
  };

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    saveContact(name.trim(), dialed, role);
    setName("");
    setRole("");
    setSaving(false);
    setDialed("");
  };

  return (
    <>
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={tab === "recentes"}
          className={`${styles.tab} ${tab === "recentes" ? styles.tabOn : ""}`}
          onClick={() => setTab("recentes")}
        >
          Recentes
        </button>
        <button
          role="tab"
          aria-selected={tab === "teclado"}
          className={`${styles.tab} ${tab === "teclado" ? styles.tabOn : ""}`}
          onClick={() => setTab("teclado")}
        >
          Teclado
        </button>
      </div>

      {tab === "recentes" ? (
        <div className={styles.recents}>
          {calls.map((entry) => {
            const known = contacts.find((contact) => contact.phone === entry.phone) ?? null;
            return (
              <article key={entry.id} className={styles.callRow}>
                <span
                  className={styles.callAvatar}
                  style={{ background: known?.tint ?? "rgba(255,255,255,0.12)" }}
                  aria-hidden
                >
                  {entry.name ? entry.name.slice(0, 1) : "?"}
                </span>
                <div className={styles.callBody}>
                  <p className={`${styles.callName} ${entry.direction === "perdida" ? styles.missed : ""}`}>
                    {entry.name ?? entry.phone}
                  </p>
                  <p className={styles.callMeta}>
                    <span className={`${styles.arrow} ${styles[entry.direction]}`} aria-hidden>
                      {entry.direction === "efetuada" ? "↗" : "↙"}
                    </span>
                    {entry.direction} · <span className={styles.callPhone}>{entry.phone}</span>
                  </p>
                </div>
                <span className={styles.callAt}>{entry.at}</span>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.pad}>
          <div className={styles.readout}>
            <p className={styles.number}>{dialed || " "}</p>
            <p className={styles.match}>{known ? known.name : dialed ? "Número não salvo" : " "}</p>
          </div>

          <div className={styles.keys}>
            {keys.map((key) => (
              <motion.button
                key={key.digit}
                className={styles.key}
                whileTap={{ scale: 0.9 }}
                transition={tapSpring}
                onClick={() => setDialed((prev) => (prev.length < 12 ? prev + key.digit : prev))}
              >
                <span className={styles.digit}>{key.digit}</span>
                {key.letters ? <span className={styles.letters}>{key.letters}</span> : null}
              </motion.button>
            ))}
          </div>

          <div className={styles.bar}>
            <button
              className={styles.save}
              onClick={() => setSaving(true)}
              disabled={!dialed || known !== null}
            >
              <AddContactIcon />
              Salvar
            </button>

            <motion.button
              className={styles.dial}
              onClick={call}
              disabled={!dialed}
              whileTap={{ scale: 0.92 }}
              transition={tapSpring}
              aria-label="Ligar"
            >
              <PhoneIcon size={28} />
            </motion.button>

            <button
              className={styles.erase}
              onClick={() => setDialed((prev) => prev.slice(0, -1))}
              disabled={!dialed}
              aria-label="Apagar dígito"
            >
              <BackspaceIcon size={26} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {saving ? (
          <Sheet onClose={() => setSaving(false)}>
            <form className={styles.sheetForm} onSubmit={save}>
              <h2 className={styles.sheetTitle}>Salvar contato</h2>
              <p className={styles.sheetNumber}>{dialed}</p>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Nome</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Como aparece na agenda"
                  autoFocus
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Categoria</span>
                <input
                  className={styles.input}
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="Oficina, trampo, plantão…"
                />
              </label>

              <div className={styles.sheetActions}>
                <button type="button" className={styles.cancel} onClick={() => setSaving(false)}>
                  Cancelar
                </button>
                <button className={styles.confirm} disabled={!name.trim()}>
                  Salvar
                </button>
              </div>
            </form>
          </Sheet>
        ) : null}
      </AnimatePresence>
    </>
  );
}
