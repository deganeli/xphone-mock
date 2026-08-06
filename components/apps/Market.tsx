"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft } from "../icons";
import { categories, formatPrice, listings, type Category } from "@/lib/market";
import { pushSpring } from "@/lib/motion";
import styles from "./Market.module.css";
import form from "../ui/form.module.css";

export function Market() {
  const [category, setCategory] = useState<Category>("Tudo");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return listings.filter(
      (item) =>
        (category === "Tudo" || item.category === category) &&
        (term === "" || `${item.title} ${item.district} ${item.seller}`.toLowerCase().includes(term)),
    );
  }, [category, query]);

  const open = listings.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className={styles.stage}>
        <section className={styles.browse} aria-hidden={open !== null}>
          <header className={styles.head}>
            <h1 className={styles.title}>Mercado LS</h1>
            <input
              className={styles.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar anúncio, bairro ou vendedor"
              aria-label="Buscar anúncios"
              tabIndex={open ? -1 : 0}
            />
            <div className={styles.chips}>
              {categories.map((item) => (
                <button
                  key={item}
                  className={`${styles.chip} ${item === category ? styles.chipOn : ""}`}
                  onClick={() => setCategory(item)}
                  tabIndex={open ? -1 : 0}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>

          <div className={styles.grid}>
            {visible.map((item) => (
              <button key={item.id} className={styles.item} onClick={() => setOpenId(item.id)} tabIndex={open ? -1 : 0}>
                <span
                  className={styles.thumb}
                  style={{ background: `linear-gradient(150deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
                />
                <span className={styles.price}>{formatPrice(item.price)}</span>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemMeta}>
                  {item.district} · {item.postedAt}
                </span>
              </button>
            ))}
            {visible.length === 0 ? <p className={styles.none}>Nenhum anúncio com esse filtro.</p> : null}
          </div>
        </section>

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
              <div className={styles.detailScroll}>
                <div
                  className={styles.hero}
                  style={{ background: `linear-gradient(150deg, ${open.gradient[0]}, ${open.gradient[1]})` }}
                >
                  <button className={`${form.back} ${styles.backFloat}`} onClick={() => setOpenId(null)}>
                    <ChevronLeft />
                    <span>Anúncios</span>
                  </button>
                </div>

                <div className={styles.detailBody}>
                  <p className={styles.detailPrice}>{formatPrice(open.price)}</p>
                  <h2 className={styles.detailTitle}>{open.title}</h2>
                  <p className={styles.detailMeta}>
                    {open.category} · {open.district} · {open.postedAt}
                  </p>
                  <p className={styles.description}>{open.description}</p>

                  <div className={styles.seller}>
                    <div>
                      <p className={styles.sellerName}>{open.seller}</p>
                      <p className={styles.sellerPhone}>{open.phone}</p>
                    </div>
                    <button className={styles.contact}>Chamar</button>
                  </div>
                </div>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
