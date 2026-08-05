"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { notifications as seed, type Notification } from "@/lib/notifications";
import styles from "./LockScreen.module.css";

const DISMISS_PX = 110;
const DISMISS_VELOCITY = 480;

function Card({
  item,
  onDismiss,
  onClick,
  stack,
  count,
}: {
  item: Notification;
  onDismiss: () => void;
  onClick?: () => void;
  stack: boolean;
  count: number;
}) {
  return (
    <motion.div className={styles.cardWrap} layout>
      {stack ? (
        <>
          <span className={styles.stackBack} aria-hidden />
          <span className={styles.stackMid} aria-hidden />
        </>
      ) : null}

      <motion.article
        className={styles.card}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > DISMISS_PX || Math.abs(info.velocity.x) > DISMISS_VELOCITY) onDismiss();
        }}
        onClick={onClick}
      >
        <span className={styles.appDot} style={{ background: item.tint }} />
        <div className={styles.cardBody}>
          <p className={styles.cardApp}>{item.app}</p>
          <p className={styles.cardTitle}>{item.title}</p>
          <p className={styles.cardText}>{item.body}</p>
        </div>
        <div className={styles.cardSide}>
          <span className={styles.cardAt}>{item.at}</span>
          {count > 1 ? <span className={styles.count}>{count}</span> : null}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function LockNotifications() {
  const [items, setItems] = useState<Notification[]>(seed);
  const [expanded, setExpanded] = useState<string | null>(null);

  const groups = useMemo(() => {
    const byApp = new Map<string, Notification[]>();
    for (const item of items) {
      const bucket = byApp.get(item.app);
      if (bucket) bucket.push(item);
      else byApp.set(item.app, [item]);
    }
    return [...byApp.entries()];
  }, [items]);

  const dismissGroup = (app: string) => {
    setItems((prev) => prev.filter((item) => item.app !== app));
    setExpanded((prev) => (prev === app ? null : prev));
  };

  const dismissOne = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    if (!next.some((item) => item.app === expanded)) setExpanded(null);
  };

  if (items.length === 0) {
    return <p className={styles.cleared}>Sem notificações</p>;
  }

  return (
    <div className={styles.cards}>
      <AnimatePresence initial={false}>
        {groups.map(([app, group]) => {
          const dimmed = expanded !== null && expanded !== app;
          const isOpen = expanded === app;

          return (
            <motion.div
              key={app}
              className={`${styles.group} ${dimmed ? styles.dimmed : ""}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 180, transition: { duration: 0.2 } }}
            >
              {isOpen ? (
                <AnimatePresence initial={false}>
                  {group.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 180, transition: { duration: 0.2 } }}
                    >
                      <Card item={item} count={1} stack={false} onDismiss={() => dismissOne(item.id)} />
                    </motion.div>
                  ))}
                  <motion.button key="collapse" className={styles.collapse} onClick={() => setExpanded(null)} layout>
                    Agrupar
                  </motion.button>
                </AnimatePresence>
              ) : (
                <Card
                  item={group[0]}
                  count={group.length}
                  stack={group.length > 1}
                  onDismiss={() => dismissGroup(app)}
                  onClick={group.length > 1 ? () => setExpanded(app) : undefined}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
