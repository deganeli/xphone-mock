export type Track = {
  id: string;
  title: string;
  artist: string;
  /** Duração em segundos — a barra de progresso e o relógio derivam daqui. */
  seconds: number;
  gradient: [string, string];
};

export type Playlist = {
  id: string;
  name: string;
  curator: string;
  note: string;
  gradient: [string, string];
  trackIds: string[];
};

export const tracks: Track[] = [
  { id: "t1", title: "Madrugada no Píer", artist: "Nina Correia", seconds: 214, gradient: ["#ff6b3d", "#3d1206"] },
  { id: "t2", title: "Vinewood Devagar", artist: "Os Falcões", seconds: 187, gradient: ["#c96bff", "#1a0a3d"] },
  { id: "t3", title: "Rota 68", artist: "Duda Prado", seconds: 243, gradient: ["#ffd06b", "#3d2408"] },
  { id: "t4", title: "Neon do Galaxy", artist: "Íris", seconds: 268, gradient: ["#ff4d8d", "#3a0a1e"] },
  { id: "t5", title: "Turno da Noite", artist: "Bennys Club", seconds: 199, gradient: ["#35c7ff", "#08243a"] },
  { id: "t6", title: "Sal e Ferrugem", artist: "Nina Correia", seconds: 226, gradient: ["#2fd96b", "#07351c"] },
  { id: "t7", title: "Areia de Sandy", artist: "Zeca do Deserto", seconds: 175, gradient: ["#ffb03a", "#4a3208"] },
  { id: "t8", title: "Sirene Distante", artist: "Os Falcões", seconds: 231, gradient: ["#8e8ea3", "#1c1c26"] },
];

export const playlists: Playlist[] = [
  {
    id: "pl1",
    name: "Plantão 4h",
    curator: "Onda",
    note: "Para quem só encontra a cidade vazia.",
    gradient: ["#ff6b3d", "#3d1206"],
    trackIds: ["t1", "t5", "t8", "t6"],
  },
  {
    id: "pl2",
    name: "Quinta no Galaxy",
    curator: "iris.galaxy",
    note: "O set inteiro, na ordem que tocou.",
    gradient: ["#c96bff", "#1a0a3d"],
    trackIds: ["t4", "t2", "t5", "t3"],
  },
  {
    id: "pl3",
    name: "Estrada sem pressa",
    curator: "Onda",
    note: "Route 68 do começo ao fim.",
    gradient: ["#ffd06b", "#3d2408"],
    trackIds: ["t3", "t7", "t6", "t1"],
  },
  {
    id: "pl4",
    name: "Oficina aberta",
    curator: "vito.mirror",
    note: "O que toca enquanto o elevador sobe.",
    gradient: ["#35c7ff", "#08243a"],
    trackIds: ["t8", "t2", "t7", "t4"],
  },
];

export const recent = ["t4", "t1", "t3", "t5"];

export const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
