"use client";

import { createContext, useContext, useMemo, useState } from "react";

type System = {
  dnd: boolean;
  setDnd: (on: boolean) => void;
  locked: boolean;
  setLocked: (on: boolean) => void;
};

const SystemContext = createContext<System | null>(null);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [dnd, setDnd] = useState(false);
  const [locked, setLocked] = useState(true);
  const value = useMemo(() => ({ dnd, setDnd, locked, setLocked }), [dnd, locked]);

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
}

export function useSystem() {
  const system = useContext(SystemContext);
  if (!system) throw new Error("useSystem precisa estar dentro de SystemProvider");
  return system;
}
