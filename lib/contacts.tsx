"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  role: string;
  tint: string;
  favorite: boolean;
};

export type Call = {
  id: string;
  name: string | null;
  phone: string;
  direction: "recebida" | "efetuada" | "perdida";
  at: string;
};

const seedContacts: Contact[] = [
  { id: "vito", name: "Vito Baraldi", phone: "555-0182", role: "Oficina Mirror Park", tint: "#ff6b3d", favorite: true },
  { id: "clara", name: "Clara Nunes", phone: "555-0347", role: "Guincho 24h", tint: "#2fd96b", favorite: true },
  { id: "benny", name: "Benny's — Plantão", phone: "555-0110", role: "Mecânica", tint: "#35c7ff", favorite: true },
  { id: "theo", name: "Theo Marchetti", phone: "555-0733", role: "Advogado", tint: "#6bffc0", favorite: false },
  { id: "iris", name: "Íris", phone: "555-0518", role: "Galaxy Nightclub", tint: "#c96bff", favorite: false },
  { id: "zeca", name: "Oficina do Zeca", phone: "555-0455", role: "Sandy Shores", tint: "#ffd06b", favorite: false },
  { id: "lspd", name: "LSPD — Central", phone: "911", role: "Emergência", tint: "#8e8ea3", favorite: true },
];

const seedCalls: Call[] = [
  { id: "c1", name: "Clara Nunes", phone: "555-0347", direction: "recebida", at: "Hoje · 21:12" },
  { id: "c2", name: null, phone: "555-0996", direction: "perdida", at: "Hoje · 20:48" },
  { id: "c3", name: "Benny's — Plantão", phone: "555-0110", direction: "efetuada", at: "Hoje · 20:15" },
  { id: "c4", name: "Vito Baraldi", phone: "555-0182", direction: "efetuada", at: "Ontem · 23:31" },
  { id: "c5", name: "LSPD — Central", phone: "911", direction: "perdida", at: "Ontem · 18:02" },
];

const palette = ["#ff6b3d", "#2fd96b", "#35c7ff", "#c96bff", "#ffd06b", "#ff4d8d"];

type Store = {
  contacts: Contact[];
  calls: Call[];
  saveContact: (name: string, phone: string, role: string) => void;
  toggleFavorite: (id: string) => void;
  logCall: (phone: string) => void;
};

const ContactsContext = createContext<Store | null>(null);

const stamp = () =>
  `Hoje · ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState(seedContacts);
  const [calls, setCalls] = useState(seedCalls);

  const saveContact = useCallback((name: string, phone: string, role: string) => {
    setContacts((prev) => {
      const id = `${phone}-${prev.length}`;
      const entry: Contact = {
        id,
        name,
        phone,
        role: role.trim() || "Sem categoria",
        tint: palette[prev.length % palette.length],
        favorite: false,
      };
      return [...prev, entry].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === id ? { ...contact, favorite: !contact.favorite } : contact)),
    );
  }, []);

  const logCall = useCallback(
    (phone: string) => {
      const known = contacts.find((contact) => contact.phone === phone);
      setCalls((prev) => [
        { id: `call-${prev.length}-${phone}`, name: known?.name ?? null, phone, direction: "efetuada", at: stamp() },
        ...prev,
      ]);
    },
    [contacts],
  );

  const value = useMemo(
    () => ({ contacts, calls, saveContact, toggleFavorite, logCall }),
    [contacts, calls, saveContact, toggleFavorite, logCall],
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const store = useContext(ContactsContext);
  if (!store) throw new Error("useContacts precisa estar dentro de ContactsProvider");
  return store;
}
