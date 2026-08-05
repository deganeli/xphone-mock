"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  AntennaIcon,
  BellIcon,
  ChevronLeft,
  ChevronRight,
  ChipIcon,
  MoonIcon,
  DiskIcon,
  EyeIcon,
  PinIcon,
  PlaneIcon,
  SunIcon,
} from "../icons";
import { useSystem } from "@/lib/system";
import { pushSpring } from "@/lib/motion";
import styles from "./Settings.module.css";

const knobSpring = { type: "spring", stiffness: 700, damping: 34 } as const;

const owner = {
  name: "Lukas",
  fullName: "Lukas Claude Code",
  passport: "PS-88421",
  phone: "555-0128",
};

function Tile({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={styles.tile} style={{ background: color }} aria-hidden>
      {children}
    </span>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`${styles.toggle} ${on ? styles.toggleOn : ""}`}
      onClick={() => onChange(!on)}
    >
      <motion.span className={styles.knob} animate={{ x: on ? 20 : 0 }} transition={knobSpring} />
    </button>
  );
}

export function Settings() {
  const { dnd, setDnd, setLocked } = useSystem();
  const [airplane, setAirplane] = useState(false);
  const [data, setData] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [location, setLocation] = useState(true);
  const [discoverable, setDiscoverable] = useState(false);
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(40);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={styles.stage}>
      <div className={styles.scroll}>
        <h1 className={styles.title}>Ajustes</h1>

        <button className={styles.profile} onClick={() => setProfileOpen(true)}>
          <span className={styles.avatar}>L</span>
          <span className={styles.profileBody}>
            <span className={styles.profileName}>{owner.name}</span>
            <span className={styles.profileMeta}>
              Passaporte {owner.passport} · Los Santos
            </span>
          </span>
          <span className={styles.chevron}>
            <ChevronRight />
          </span>
        </button>

        <h2 className={styles.groupTitle}>Conexões</h2>
        <section className={styles.group}>
          <div className={styles.row}>
            <Tile color="#ff9f2e">
              <PlaneIcon />
            </Tile>
            <span className={styles.label}>Modo avião</span>
            <Toggle on={airplane} onChange={setAirplane} label="Modo avião" />
          </div>
          <div className={styles.row}>
            <Tile color="var(--bay)">
              <AntennaIcon />
            </Tile>
            <span className={styles.label}>Rede</span>
            <span className={styles.value}>{airplane ? "Desconectado" : "LS-NET · 5G"}</span>
          </div>
          <div className={styles.row}>
            <Tile color="var(--cash)">
              <ChipIcon />
            </Tile>
            <span className={styles.label}>Dados móveis</span>
            <Toggle on={data && !airplane} onChange={setData} label="Dados móveis" />
          </div>
        </section>

        <h2 className={styles.groupTitle}>Tela e som</h2>
        <section className={styles.group}>
          <div className={styles.rowStack}>
            <span className={styles.stackHead}>
              <Tile color="#ffd06b">
                <SunIcon />
              </Tile>
              <span className={styles.label}>Brilho</span>
              <span className={styles.readout}>{brightness}%</span>
            </span>
            <input
              className={styles.slider}
              type="range"
              min={10}
              max={100}
              value={brightness}
              onChange={(event) => setBrightness(Number(event.target.value))}
              aria-label="Brilho"
            />
          </div>
          <div className={styles.rowStack}>
            <span className={styles.stackHead}>
              <Tile color="#ff4d8d">
                <BellIcon />
              </Tile>
              <span className={styles.label}>Toque</span>
              <span className={styles.readout}>{volume}%</span>
            </span>
            <input
              className={styles.slider}
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume do toque"
            />
          </div>
          <div className={styles.row}>
            <Tile color="var(--steel)">
              <BellIcon />
            </Tile>
            <span className={styles.label}>Vibrar ao receber</span>
            <Toggle on={vibrate} onChange={setVibrate} label="Vibrar ao receber" />
          </div>
          <div className={styles.row}>
            <Tile color="var(--dnd)">
              <MoonIcon />
            </Tile>
            <span className={styles.label}>Não perturbe</span>
            <Toggle on={dnd} onChange={setDnd} label="Não perturbe" />
          </div>
        </section>

        <h2 className={styles.groupTitle}>Privacidade</h2>
        <section className={styles.group}>
          <div className={styles.row}>
            <Tile color="#ff453a">
              <PinIcon />
            </Tile>
            <span className={styles.label}>Compartilhar localização</span>
            <Toggle on={location} onChange={setLocation} label="Compartilhar localização" />
          </div>
          <div className={styles.row}>
            <Tile color="var(--flame)">
              <EyeIcon />
            </Tile>
            <span className={styles.label}>Aparecer no Vibe</span>
            <Toggle on={discoverable} onChange={setDiscoverable} label="Aparecer no Vibe" />
          </div>
        </section>

        <h2 className={styles.groupTitle}>Sistema</h2>
        <section className={styles.group}>
          <div className={styles.rowStack}>
            <span className={styles.stackHead}>
              <Tile color="var(--market)">
                <DiskIcon />
              </Tile>
              <span className={styles.label}>Armazenamento</span>
              <span className={styles.readout}>43,2 / 64 GB</span>
            </span>
            <span className={styles.bar}>
              <span className={styles.barFill} style={{ width: "68%" }} />
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
            <Tile color="var(--steel)">
              <ChipIcon />
            </Tile>
            <span className={styles.label}>Firmware</span>
            <span className={styles.value}>XPHONE 1.2</span>
          </div>
          <button className={styles.row} onClick={() => setLocked(true)}>
            <Tile color="var(--dnd)">
              <MoonIcon />
            </Tile>
            <span className={styles.label}>Bloquear agora</span>
            <span className={styles.chevron}>
              <ChevronRight />
            </span>
          </button>
        </section>

        <p className={styles.serial}>SN 88-LS-2019-XK · build 4471</p>
      </div>

      <AnimatePresence>
        {profileOpen ? (
          <motion.section
            className={styles.profilePanel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={pushSpring}
          >
            <div className={styles.panelScroll}>
              <button className={styles.back} onClick={() => setProfileOpen(false)}>
                <ChevronLeft />
                <span>Ajustes</span>
              </button>

              <div className={styles.identity}>
                <span className={styles.bigAvatar}>L</span>
                <h2 className={styles.bigName}>{owner.fullName}</h2>
                <p className={styles.bigMeta}>Cidadão de Los Santos</p>
              </div>

              <section className={styles.group}>
                <div className={styles.row}>
                  <span className={styles.label}>Nome completo</span>
                  <span className={styles.fieldText}>{owner.fullName}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Passaporte</span>
                  <span className={styles.value}>{owner.passport}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Telefone</span>
                  <span className={styles.value}>{owner.phone}</span>
                </div>
              </section>

              <p className={styles.panelNote}>
                Passaporte e telefone são emitidos pela prefeitura e não podem ser alterados no aparelho.
              </p>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
