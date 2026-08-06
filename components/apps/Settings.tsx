"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import {
  BankIcon,
  BellIcon,
  ChevronLeft,
  ChevronRight,
  ChipIcon,
  MessagesIcon,
  MoonIcon,
  PhoneIcon,
  PinIcon,
  PlaneIcon,
} from "../icons";
import { DEFAULT_WALLPAPER, iconStyles, themes, useSystem } from "@/lib/system";
import { pushSpring } from "@/lib/motion";
import { Switch } from "../ui/Switch";
import { parseImageUrl } from "@/lib/url";
import styles from "./Settings.module.css";
import form from "../ui/form.module.css";

const owner = {
  name: "Lukas",
  fullName: "Lukas Claude Code",
  passport: "PS-88421",
  phone: "555-0128",
};

function QuickTile({
  icon,
  label,
  state,
  on,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  state: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      className={`${styles.quickTile} ${on ? styles.quickOn : ""}`}
      aria-pressed={on}
      onClick={() => onChange(!on)}
    >
      <span className={styles.quickIcon}>{icon}</span>
      <span className={styles.quickBody}>
        <span className={styles.quickLabel}>{label}</span>
        <span className={styles.quickState}>{state}</span>
      </span>
    </button>
  );
}

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionHead}>
        <span className={styles.sectionIndex}>{index}</span>
        {title}
      </h2>
      <div className={styles.rows}>{children}</div>
    </section>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
}) {
  const pct = ((value - min) / (100 - min)) * 100;
  return (
    <div className={styles.rowStack}>
      <span className={styles.stackHead}>
        <span className={styles.label}>{label}</span>
        <span className={styles.readout}>{value}%</span>
      </span>
      <input
        className={styles.slider}
        style={{ "--pct": `${pct}%` } as CSSProperties}
        type="range"
        min={min}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </div>
  );
}

const previewApps = [
  { name: "Telefone", tint: "var(--cash)", icon: <PhoneIcon size={16} />, badge: false },
  { name: "Mensagens", tint: "var(--sunset)", icon: <MessagesIcon size={16} />, badge: true },
  { name: "Fleeca", tint: "var(--cash)", icon: <BankIcon size={16} />, badge: false },
];

function ThemePanel({ onBack }: { onBack: () => void }) {
  const { theme, setTheme, wallpaper, setWallpaper, iconStyle, setIconStyle } = useSystem();
  const [draft, setDraft] = useState("");
  const [invalid, setInvalid] = useState(false);

  const apply = () => {
    const url = parseImageUrl(draft);
    if (!url) {
      setInvalid(true);
      return;
    }
    setWallpaper(url);
    setDraft("");
    setInvalid(false);
  };

  return (
    <div className={styles.panelScroll}>
      <button className={form.back} onClick={onBack}>
        <ChevronLeft />
        <span>Ajustes</span>
      </button>

      <h2 className={styles.panelTitle}>Personalização</h2>

      <div className={styles.preview}>
        <span className={styles.previewChrome} />
        <span className={styles.previewDock}>
          {previewApps.map((app) => (
            <span key={app.name} className={styles.previewSlot}>
              <span
                className={`${styles.previewTile} ${styles[iconStyle]}`}
                style={iconStyle === "material" ? { background: app.tint } : undefined}
              >
                {app.icon}
              </span>
              {app.badge ? <span className={styles.previewBadge} /> : null}
            </span>
          ))}
        </span>
      </div>

      <h3 className={styles.panelLabel}>Cor do tema</h3>
      <div className={styles.swatches}>
        {themes.map((entry) => (
          <button
            key={entry.id}
            className={`${styles.swatch} ${theme === entry.id ? styles.swatchOn : ""}`}
            style={{ "--swatch": entry.accent } as CSSProperties}
            aria-pressed={theme === entry.id}
            onClick={() => setTheme(entry.id)}
          >
            <span className={styles.swatchDisc} />
            <span className={styles.swatchName}>{entry.name}</span>
          </button>
        ))}
      </div>

      <h3 className={styles.panelLabel}>Ícones</h3>
      <div className={styles.iconStyles}>
        {iconStyles.map((entry) => (
          <button
            key={entry.id}
            className={`${styles.iconStyle} ${iconStyle === entry.id ? styles.iconStyleOn : ""}`}
            aria-pressed={iconStyle === entry.id}
            onClick={() => setIconStyle(entry.id)}
          >
            <span className={`${styles.iconSample} ${styles[entry.id]}`} aria-hidden />
            <span className={styles.iconStyleName}>{entry.name}</span>
            <span className={styles.iconStyleNote}>{entry.note}</span>
          </button>
        ))}
      </div>

      <h3 className={styles.panelLabel}>Papel de parede</h3>
      <div className={styles.urlRow}>
        <input
          className={styles.urlInput}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setInvalid(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") apply();
          }}
          placeholder="https://…/imagem.png"
          inputMode="url"
          aria-label="URL da imagem"
        />
        <button className={styles.urlApply} onClick={apply} disabled={draft.trim() === ""}>
          Aplicar
        </button>
      </div>
      {invalid ? <p className={styles.urlError}>URL inválida. Use um endereço http ou https de imagem.</p> : null}

      <button
        className={styles.reset}
        onClick={() => setWallpaper(DEFAULT_WALLPAPER)}
        disabled={wallpaper === DEFAULT_WALLPAPER}
      >
        Restaurar papel de parede padrão
      </button>
    </div>
  );
}

function ProfilePanel({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.panelScroll}>
      <button className={form.back} onClick={onBack}>
        <ChevronLeft />
        <span>Ajustes</span>
      </button>

      <div className={styles.identity}>
        <span className={styles.bigAvatar}>L</span>
        <h2 className={styles.bigName}>{owner.fullName}</h2>
        <p className={styles.bigMeta}>Cidadão de Los Santos</p>
      </div>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>Nome completo</span>
          <span className={styles.value}>{owner.fullName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Passaporte</span>
          <span className={styles.value}>{owner.passport}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Telefone</span>
          <span className={styles.value}>{owner.phone}</span>
        </div>
      </div>

      <p className={styles.panelNote}>
        Passaporte e telefone são emitidos pela prefeitura e não podem ser alterados no aparelho.
      </p>
    </div>
  );
}

export function Settings() {
  const { dnd, setDnd, setLocked, theme } = useSystem();
  const [airplane, setAirplane] = useState(false);
  const [data, setData] = useState(true);
  const [location, setLocation] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [hideNumber, setHideNumber] = useState(false);
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(40);
  const [panel, setPanel] = useState<"profile" | "theme" | null>(null);

  const palette = themes.find((entry) => entry.id === theme) ?? themes[0];

  return (
    <div className={styles.stage}>
      <div className={styles.scroll}>
        <p className={styles.eyebrow}>XPHONE · Painel</p>
        <h1 className={styles.title}>Ajustes</h1>

        <button className={styles.owner} onClick={() => setPanel("profile")}>
          <span className={styles.avatar}>L</span>
          <span className={styles.ownerBody}>
            <span className={styles.ownerName}>{owner.name}</span>
            <span className={styles.ownerMeta}>
              {owner.passport} · {owner.phone}
            </span>
          </span>
          <span className={styles.chevron}>
            <ChevronRight />
          </span>
        </button>

        <div className={styles.quick}>
          <QuickTile
            icon={<PlaneIcon />}
            label="Modo avião"
            state={airplane ? "Ligado" : "Desligado"}
            on={airplane}
            onChange={setAirplane}
          />
          <QuickTile
            icon={<ChipIcon />}
            label="Dados móveis"
            state={airplane ? "Sem sinal" : data ? "LS-NET · 5G" : "Desligado"}
            on={data && !airplane}
            onChange={setData}
          />
          <QuickTile
            icon={<MoonIcon />}
            label="Não perturbe"
            state={dnd ? "Ligado" : "Desligado"}
            on={dnd}
            onChange={setDnd}
          />
          <QuickTile
            icon={<PinIcon />}
            label="Localização"
            state={location ? "Precisa" : "Oculta"}
            on={location}
            onChange={setLocation}
          />
        </div>

        <Section index="01" title="Tela e som">
          <Slider label="Brilho" value={brightness} onChange={setBrightness} min={10} />
          <Slider label="Toque" value={volume} onChange={setVolume} min={0} />
          <div className={styles.row}>
            <span className={styles.rowIcon}>
              <BellIcon />
            </span>
            <span className={styles.label}>Vibrar ao receber</span>
            <Switch on={vibrate} onChange={setVibrate} label="Vibrar ao receber" />
          </div>
        </Section>

        <Section index="02" title="Personalização">
          <button className={styles.row} onClick={() => setPanel("theme")}>
            <span className={styles.swatchDot} style={{ background: palette.accent }} aria-hidden />
            <span className={styles.label}>Tema e papel de parede</span>
            <span className={styles.value}>{palette.name}</span>
            <span className={styles.chevron}>
              <ChevronRight />
            </span>
          </button>
        </Section>

        <Section index="03" title="Privacidade">
          <div className={styles.row}>
            <span className={styles.label}>Ocultar número em chamadas</span>
            <Switch on={hideNumber} onChange={setHideNumber} label="Ocultar número em chamadas" />
          </div>
        </Section>

        <Section index="04" title="Sistema">
          <div className={styles.rowStack}>
            <span className={styles.stackHead}>
              <span className={styles.label}>Armazenamento</span>
              <span className={styles.readout}>43,2 / 64 GB</span>
            </span>
            <span className={styles.bar}>
              <span className={styles.barApps} style={{ width: "35%" }} />
              <span className={styles.barMedia} style={{ width: "33%" }} />
            </span>
            <span className={styles.legend}>
              <span className={styles.legendItem}>
                <i className={styles.dotApps} /> Apps 22,4 GB
              </span>
              <span className={styles.legendItem}>
                <i className={styles.dotMedia} /> Mídia 20,8 GB
              </span>
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Firmware</span>
            <span className={styles.value}>XPHONE 1.2</span>
          </div>
          <button className={styles.row} onClick={() => setLocked(true)}>
            <span className={styles.label}>Bloquear agora</span>
            <span className={styles.chevron}>
              <ChevronRight />
            </span>
          </button>
        </Section>

        <p className={styles.serial}>SN 88-LS-2019-XK · build 4471</p>
      </div>

      <AnimatePresence>
        {panel ? (
          <motion.section
            key={panel}
            className={styles.panel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={pushSpring}
          >
            {panel === "profile" ? (
              <ProfilePanel onBack={() => setPanel(null)} />
            ) : (
              <ThemePanel onBack={() => setPanel(null)} />
            )}
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
