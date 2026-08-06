"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft } from "../../icons";
import { Switch } from "../../ui/Switch";
import { HANDLE_PATTERN, VISTA_BIO_LIMIT, type MyVista } from "@/lib/vista";
import { pushSpring } from "@/lib/motion";
import { parseImageUrl } from "@/lib/url";
import styles from "../Vista.module.css";
import form from "../../ui/form.module.css";

export function MyProfile({
  profile,
  onSave,
  onBack,
}: {
  profile: MyVista;
  onSave: (next: MyVista) => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [photoField, setPhotoField] = useState(profile.photo);
  const [photoInvalid, setPhotoInvalid] = useState(false);

  const patch = (values: Partial<MyVista>) => setDraft((prev) => ({ ...prev, ...values }));

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

  const handleOk = HANDLE_PATTERN.test(draft.handle);
  const nameOk = draft.name.trim() !== "";

  return (
    <motion.section
      className={styles.editor}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={pushSpring}
    >
      <div className={styles.editorScroll}>
        <button className={form.back} onClick={onBack}>
          <ChevronLeft />
          <span>Vista</span>
        </button>

        <h2 className={styles.editorTitle}>Editar perfil</h2>

        <div className={styles.editorHead}>
          <span
            className={styles.editorAvatar}
            style={{
              background: draft.photo
                ? `url("${draft.photo}") center / cover no-repeat`
                : `linear-gradient(150deg, ${draft.tint}, var(--flame))`,
            }}
          >
            {draft.photo ? null : draft.name.slice(0, 1) || "?"}
          </span>
          <span className={styles.editorIdentity}>
            <span className={styles.editorName}>{draft.name || "Sem nome"}</span>
            <span className={styles.editorHandle}>@{draft.handle}</span>
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
            maxLength={30}
          />
        </label>

        <label className={form.field}>
          <span className={form.label}>Usuário</span>
          <input
            className={form.input}
            value={draft.handle}
            onChange={(event) => patch({ handle: event.target.value.toLowerCase().replace(/[^a-z0-9._]/g, "") })}
            maxLength={24}
          />
        </label>
        {draft.handle && !handleOk ? (
          <p className={form.error}>De 3 a 24 caracteres, só letras, números, ponto e underline.</p>
        ) : null}

        <label className={form.field}>
          <span className={form.label}>Local</span>
          <input
            className={form.input}
            value={draft.place}
            onChange={(event) => patch({ place: event.target.value })}
            maxLength={28}
          />
        </label>

        <label className={form.field}>
          <span className={form.label}>
            Bio
            <span className={form.count}>
              {draft.bio.length}/{VISTA_BIO_LIMIT}
            </span>
          </span>
          <textarea
            className={form.area}
            value={draft.bio}
            maxLength={VISTA_BIO_LIMIT}
            rows={3}
            onChange={(event) => patch({ bio: event.target.value })}
          />
        </label>

        <div className={form.switchRow}>
          <span className={form.switchLabel}>Conta privada</span>
          <Switch
            on={draft.privateAccount}
            onChange={(value) => patch({ privateAccount: value })}
            label="Conta privada"
          />
        </div>
        <div className={form.switchRow}>
          <span className={form.switchLabel}>Mostrar quando estou online</span>
          <Switch
            on={draft.showActivity}
            onChange={(value) => patch({ showActivity: value })}
            label="Mostrar quando estou online"
          />
        </div>
        <p className={form.note}>
          Numa conta privada só quem você aprova vê seus posts e stories.
        </p>

        <button
          className={form.save}
          onClick={() => onSave({ ...draft, name: draft.name.trim(), place: draft.place.trim() })}
          disabled={!nameOk || !handleOk}
        >
          Salvar perfil
        </button>
      </div>
    </motion.section>
  );
}
