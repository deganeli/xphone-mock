import { Bank } from "./apps/Bank";
import { Contacts } from "./apps/Contacts";
import { Dialer } from "./apps/Dialer";
import { Market } from "./apps/Market";
import { Match } from "./apps/Match";
import { Messages } from "./apps/Messages";
import { Music } from "./apps/Music";
import { Settings } from "./apps/Settings";
import { Store } from "./apps/Store";
import { Vista } from "./apps/Vista";
import {
  BankIcon,
  ContactsIcon,
  MarketIcon,
  MatchIcon,
  MessagesIcon,
  MusicIcon,
  PhoneIcon,
  SettingsIcon,
  StoreIcon,
  VistaIcon,
} from "./icons";

export type AppId =
  | "dialer"
  | "messages"
  | "contacts"
  | "bank"
  | "match"
  | "market"
  | "vista"
  | "music"
  | "store"
  | "settings";

export type AppEntry = {
  id: AppId;
  name: string;
  tint: string;
  icon: React.ReactNode;
  badge?: number;
  Screen: () => React.ReactNode;
};

export const apps: AppEntry[] = [
  { id: "dialer", name: "Telefone", tint: "var(--cash)", icon: <PhoneIcon />, badge: 2, Screen: Dialer },
  { id: "messages", name: "Mensagens", tint: "var(--sunset)", icon: <MessagesIcon />, badge: 3, Screen: Messages },
  { id: "contacts", name: "Contatos", tint: "var(--bay)", icon: <ContactsIcon />, Screen: Contacts },
  { id: "bank", name: "Fleeca", tint: "var(--cash)", icon: <BankIcon />, Screen: Bank },
  { id: "match", name: "Vibe", tint: "var(--flame)", icon: <MatchIcon />, Screen: Match },
  { id: "market", name: "Mercado LS", tint: "var(--market)", icon: <MarketIcon />, Screen: Market },
  { id: "vista", name: "Vista", tint: "linear-gradient(150deg, var(--amber), var(--flame) 55%, var(--violet))", icon: <VistaIcon />, Screen: Vista },
  { id: "music", name: "Onda", tint: "linear-gradient(155deg, var(--bay), var(--market))", icon: <MusicIcon />, Screen: Music },
  { id: "store", name: "Loja", tint: "var(--store)", icon: <StoreIcon />, Screen: Store },
  { id: "settings", name: "Ajustes", tint: "var(--steel)", icon: <SettingsIcon />, Screen: Settings },
];
