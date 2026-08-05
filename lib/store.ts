export type StoreApp = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  rating: number;
  size: string;
  gradient: [string, string];
};

export const featured: StoreApp = {
  id: "radio",
  name: "Rádio LS",
  tagline: "Frequência aberta pro seu grupo, sem depender do chat de voz da cidade.",
  category: "Comunicação",
  rating: 4.8,
  size: "12 MB",
  gradient: ["#35c7ff", "#1a2f6e"],
};

export const catalog: StoreApp[] = [
  {
    id: "garage",
    name: "Garagem",
    tagline: "Veja seus veículos, seguro e multas em aberto",
    category: "Utilitários",
    rating: 4.6,
    size: "8 MB",
    gradient: ["#ff6b3d", "#5c1c08"],
  },
  {
    id: "gps",
    name: "Waypoint",
    tagline: "Rotas do servidor com pontos salvos pela galera",
    category: "Navegação",
    rating: 4.9,
    size: "24 MB",
    gradient: ["#2fd96b", "#0c3320"],
  },
  {
    id: "crypto",
    name: "BitLS",
    tagline: "Cotação da moeda do servidor em tempo real",
    category: "Finanças",
    rating: 3.9,
    size: "6 MB",
    gradient: ["#ffd06b", "#4a3208"],
  },
  {
    id: "camera",
    name: "Câmera",
    tagline: "Registra a placa e envia direto pro LSPD",
    category: "Foto e vídeo",
    rating: 4.2,
    size: "31 MB",
    gradient: ["#c96bff", "#33115c"],
  },
  {
    id: "delivery",
    name: "Entrega Já",
    tagline: "Aceite corridas de entrega e acompanhe o ganho do turno",
    category: "Trabalho",
    rating: 4.4,
    size: "17 MB",
    gradient: ["#ff4d8d", "#5c0f2c"],
  },
  {
    id: "scanner",
    name: "Scanner",
    tagline: "Escuta a frequência policial da região",
    category: "Utilitários",
    rating: 4.1,
    size: "9 MB",
    gradient: ["#8e8ea3", "#22222c"],
  },
];
