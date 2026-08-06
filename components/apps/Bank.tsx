"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon } from "../icons";
import { account, formatBRL, transactions as seed, type Transaction } from "@/lib/bank";
import { Sheet } from "../ui/Sheet";
import styles from "./Bank.module.css";

type Receipt = { id: string; target: string; amount: number; balanceAfter: number; at: string };

export function Bank() {
  const [ledger, setLedger] = useState<Transaction[]>(seed);
  const [balance, setBalance] = useState(account.balance);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [masked, setMasked] = useState(false);

  const hide = masked ? styles.masked : "";

  const parsed = Number(amount.replace(",", "."));
  const valid = target.trim().length > 0 && parsed > 0 && parsed <= balance;

  const transfer = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) return;

    const recipient = target.trim();
    const at = `Hoje · ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    const id = `TX-${(ledger.length + 1).toString(16).toUpperCase().padStart(4, "0")}`;

    setLedger((prev) => [{ id, label: recipient, origin: "Transferência enviada", amount: -parsed, at }, ...prev]);
    setBalance(balance - parsed);
    setReceipt({ id, target: recipient, amount: parsed, balanceAfter: balance - parsed, at });
    setTarget("");
    setAmount("");
    setSheetOpen(false);
  };

  return (
    <>
      <div className={styles.scroll}>
        <header className={styles.head}>
          <p className={styles.bank}>{account.bank}</p>
          <h1 className={styles.holder}>{account.holder}</h1>
        </header>

        <section className={styles.card}>
          <div className={styles.cardHead}>
            <p className={styles.cardLabel}>Saldo em conta</p>
            <button
              className={styles.mask}
              onClick={() => setMasked(!masked)}
              aria-pressed={masked}
              aria-label={masked ? "Mostrar valores" : "Ocultar valores"}
            >
              {masked ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          <p className={`${styles.balance} ${hide}`}>{formatBRL(balance)}</p>
          <div className={styles.cardFoot}>
            <span className={styles.iban}>{account.iban}</span>
            <span className={styles.savings}>
              Poupança <span className={hide}>{formatBRL(account.savings)}</span>
            </span>
          </div>
        </section>

        <div className={styles.actions}>
          <button className={styles.action} onClick={() => setSheetOpen(true)}>
            Transferir
          </button>
          <button className={styles.action} disabled>
            Depositar
          </button>
          <button className={styles.action} disabled>
            Extrato
          </button>
        </div>

        <section className={styles.ledger}>
          <h2 className={styles.ledgerTitle}>Movimentações</h2>
          {ledger.map((entry) => (
            <article key={entry.id} className={styles.entry}>
              <div className={styles.entryBody}>
                <p className={styles.entryLabel}>{entry.label}</p>
                <p className={styles.entryMeta}>
                  {entry.origin} · <span className={styles.txid}>{entry.id}</span>
                </p>
              </div>
              <div className={styles.entryRight}>
                <p className={`${styles.amount} ${entry.amount > 0 ? styles.credit : styles.debit} ${hide}`}>
                  {entry.amount > 0 ? "+" : "−"}
                  {formatBRL(Math.abs(entry.amount))}
                </p>
                <p className={styles.entryAt}>{entry.at}</p>
              </div>
            </article>
          ))}
        </section>
      </div>

      <AnimatePresence>
        {sheetOpen ? (
          <Sheet onClose={() => setSheetOpen(false)}>
            <form className={styles.sheetForm} onSubmit={transfer}>
              <h2 className={styles.sheetTitle}>Nova transferência</h2>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Destinatário</span>
                <input
                  className={styles.input}
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  placeholder="Nome ou conta Fleeca"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Valor</span>
                <input
                  className={`${styles.input} ${styles.numeric}`}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value.replace(/[^\d.,]/g, ""))}
                  inputMode="decimal"
                  placeholder="0,00"
                />
              </label>

              <p className={styles.hint}>
                {parsed > balance ? "Valor acima do saldo disponível." : `Disponível ${formatBRL(balance)}`}
              </p>

              <button className={styles.confirm} disabled={!valid}>
                Transferir
              </button>
            </form>
          </Sheet>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {receipt ? (
          <motion.div
            className={styles.receipt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="status"
          >
            <motion.svg
              className={styles.check}
              viewBox="0 0 96 96"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
              aria-hidden
            >
              <motion.circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke="var(--cash)"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ rotate: -90, transformOrigin: "50% 50%" }}
              />
              <motion.path
                d="m30 49 12.5 12.5L66 38"
                fill="none"
                stroke="var(--cash)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.38 }}
              />
            </motion.svg>

            <motion.div
              className={styles.receiptBody}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              <h2 className={styles.receiptTitle}>Transferência realizada</h2>
              <p className={styles.receiptLine}>
                Você enviou <strong className={styles.receiptAmount}>{formatBRL(receipt.amount)}</strong> para{" "}
                <strong>{receipt.target}</strong>
              </p>

              <dl className={styles.summary}>
                <div className={styles.summaryRow}>
                  <dt>Comprovante</dt>
                  <dd className={styles.mono}>{receipt.id}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Data</dt>
                  <dd>{receipt.at}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Saldo restante</dt>
                  <dd className={styles.mono}>{formatBRL(receipt.balanceAfter)}</dd>
                </div>
              </dl>

              <button className={styles.receiptAction} onClick={() => setReceipt(null)} autoFocus>
                Concluir
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
