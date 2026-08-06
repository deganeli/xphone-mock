"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft } from "../../icons";
import { Sheet } from "../../ui/Sheet";
import { Switch } from "../../ui/Switch";
import { BIO_LIMIT, type MyProfile } from "@/lib/match";
import { pushSpring } from "@/lib/motion";
import { parseImageUrl } from "@/lib/url";
import styles from "../Match.module.css";
import form from "../../ui/form.module.css";

const DISTRICTS = ["Little Seoul", "Vespucci Beach", "Mirror Park", "Vinewood", "Sandy Shores"];

export function Profile({
  profile,
  onSave,
  onDelete,
  onBack,
}: {
  profile: MyProfile;
  onSave: (next: MyProfile) => void;
  onDelete: () => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [photoField, setPhotoField] = useState(profile.photo);
  const [photoInvalid, setPhotoInvalid] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const patch = (values: Partial<MyProfile>) => setDraft((prev) => ({ ...prev, ...values }));

  const applyPhoto = () => {
    const raw = photoField.trim();
    if (raw === "") {
      patch({ photo: "" });
      setPhotoInvalid(false);
      return;
    }
    const url = parseImageUrl(raw);
    if (!url) {
      setPhotoInvalid(true);
      return;
    }
    patch({ photo: url });
    setPhotoInvalid(false);
  };

  const nameOk = draft.name.trim() !== "";

  return (
    <motion.section
      className={styles.me}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.meScroll}>
        <button className={form.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vibe</span>
        </button>

        <h2 className={styles.meTitle}>Meu perfil</h2>

        <div
          className={styles.mePhoto}
          style={{
            background: draft.photo
              ? `url("${draft.photo}") center / cover no-repeat`
              : `linear-gradient(168deg, ${draft.gradient[0]}, ${draft.gradient[1]})`,
          }}
        >
          {draft.photo ? null : <span className={styles.meInitial}>{draft.name.slice(0, 1) || "?"}</span>}
          <span className={styles.mePhotoInfo}>
            {draft.name || "Sem nome"}
            {draft.age ? <span className={styles.meAge}>{draft.age}</span> : null}
          </span>
        </div>

        <div className={form.row}>
          <input
            className={form.input}
            value={photoField}
            onChange={(event) => {
              setPhotoField(event.target.value);
              setPhotoInvalid(false);
            }}
            placeholder="URL da foto (vazio = cor)"
            inputMode="url"
            aria-label="URL da foto"
          />
          <button className={form.apply} onClick={applyPhoto}>
            Trocar
          </button>
        </div>
        {photoInvalid ? <p className={form.error}>URL inválida. Use um endereço http ou https.</p> : null}

        <label className={form.field}>
          <span className={form.label}>Nome</span>
          <input
            className={form.input}
            value={draft.name}
            onChange={(event) => patch({ name: event.target.value })}
            maxLength={24}
          />
        </label>

        <label className={form.field}>
          <span className={form.label}>Idade</span>
          <input
            className={form.input}
            type="number"
            min={18}
            max={99}
            value={draft.age}
            onChange={(event) => patch({ age: Number(event.target.value) })}
          />
        </label>

        <label className={form.field}>
          <span className={form.label}>Bairro</span>
          <select
            className={`${form.input} ${styles.meSelect}`}
            value={draft.district}
            onChange={(event) => patch({ district: event.target.value })}
          >
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>

        <label className={form.field}>
          <span className={form.label}>
            Bio
            <span className={form.count}>
              {draft.bio.length}/{BIO_LIMIT}
            </span>
          </span>
          <textarea
            className={form.area}
            value={draft.bio}
            maxLength={BIO_LIMIT}
            rows={4}
            onChange={(event) => patch({ bio: event.target.value })}
          />
        </label>

        <div className={form.switchRow}>
          <span className={form.switchLabel}>Mostrar distância</span>
          <Switch
            on={draft.showDistance}
            onChange={(value) => patch({ showDistance: value })}
            label="Mostrar distância"
          />
        </div>
        <div className={form.switchRow}>
          <span className={form.switchLabel}>Pausar perfil</span>
          <Switch on={draft.paused} onChange={(value) => patch({ paused: value })} label="Pausar perfil" />
        </div>
        <p className={form.note}>Com o perfil pausado ninguém novo vê você, mas as conversas continuam.</p>

        <button className={form.save} onClick={() => onSave({ ...draft, name: draft.name.trim() })} disabled={!nameOk}>
          Salvar alterações
        </button>

        <button className={styles.meDelete} onClick={() => setConfirming(true)}>
          Excluir conta do Vibe
        </button>
      </div>

      <AnimatePresence>
        {confirming ? (
          <Sheet onClose={() => setConfirming(false)}>
            <div className={styles.meConfirm}>
              <h3 className={styles.meConfirmTitle}>Excluir conta?</h3>
              <p className={styles.meConfirmBody}>
                Some com o perfil, os matches e todas as conversas. Não dá pra desfazer.
              </p>
              <button className={styles.meConfirmDelete} onClick={onDelete}>
                Excluir para sempre
              </button>
              <button className={styles.meConfirmCancel} onClick={() => setConfirming(false)}>
                Manter conta
              </button>
            </div>
          </Sheet>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
