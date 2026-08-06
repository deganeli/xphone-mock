"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type ThemeId = "padrao" | "vermelho" | "verde" | "azul";

export const themes: { id: ThemeId; name: string; accent: string; ink: string }[] = [
  { id: "padrao", name: "Padrão", accent: "#7c5cff", ink: "#0d0620" },
  { id: "vermelho", name: "Vermelho", accent: "#ff4d4d", ink: "#1f0505" },
  { id: "verde", name: "Verde", accent: "#2fd96b", ink: "#06180d" },
  { id: "azul", name: "Azul", accent: "#35c7ff", ink: "#04141f" },
];

export const DEFAULT_WALLPAPER = "/bg.png";

export type IconStyle = "material" | "solid" | "glass";

export const iconStyles: { id: IconStyle; name: string; note: string }[] = [
  { id: "material", name: "Material", note: "Cada app com a cor da própria marca." },
  { id: "solid", name: "Sólido", note: "Todos na cor do tema." },
  { id: "glass", name: "Vidro", note: "Translúcido sobre o papel de parede." },
];

type System = {
  dnd: boolean;
  setDnd: (on: boolean) => void;
  locked: boolean;
  setLocked: (on: boolean) => void;
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  wallpaper: string;
  setWallpaper: (url: string) => void;
  iconStyle: IconStyle;
  setIconStyle: (style: IconStyle) => void;
};

const SystemContext = createContext<System | null>(null);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [dnd, setDnd] = useState(false);
  const [locked, setLocked] = useState(true);
  const [theme, setTheme] = useState<ThemeId>("padrao");
  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPER);
  const [iconStyle, setIconStyle] = useState<IconStyle>("glass");

  const value = useMemo(
    () => ({ dnd, setDnd, locked, setLocked, theme, setTheme, wallpaper, setWallpaper, iconStyle, setIconStyle }),
    [dnd, locked, theme, wallpaper, iconStyle],
  );

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}

export function useSystem() {
  const system = useContext(SystemContext);
  if (!system) throw new Error("useSystem precisa estar dentro de SystemProvider");
  return system;
}
