export type Post = {
  id: string;
  author: string;
  handle: string;
  place: string;
  caption: string;
  likes: number;
  comments: number;
  postedAt: string;
  tint: string;
  gradient: [string, string, string];
};

export const stories = [
  { id: "voce", label: "Seu story", tint: "#8e8ea3", own: true },
  { id: "vito", label: "vito", tint: "#ff6b3d", own: false },
  { id: "iris", label: "iris", tint: "#c96bff", own: false },
  { id: "clara", label: "clara", tint: "#2fd96b", own: false },
  { id: "bennys", label: "bennys", tint: "#35c7ff", own: false },
  { id: "duda", label: "duda", tint: "#ffd06b", own: false },
];

export const posts: Post[] = [
  {
    id: "p1",
    author: "Vito Baraldi",
    handle: "vito.mirror",
    place: "Mirror Park",
    caption: "Elegy saiu do elevador andando. Suspensão nova pegou o traçado do parque inteiro sem raspar.",
    likes: 148,
    comments: 12,
    postedAt: "há 22 min",
    tint: "#ff6b3d",
    gradient: ["#ffb03a", "#ff4d3d", "#3d1206"],
  },
  {
    id: "p2",
    author: "Íris",
    handle: "iris.galaxy",
    place: "Galaxy Nightclub",
    caption: "Set das quintas até fechar. Quem apareceu ontem sabe.",
    likes: 926,
    comments: 74,
    postedAt: "há 3 h",
    tint: "#c96bff",
    gradient: ["#c96bff", "#5b2bd6", "#1a0a3d"],
  },
  {
    id: "p3",
    author: "Clara Nunes",
    handle: "clara.guincho",
    place: "Route 68",
    caption: "Terceiro capotamento da madrugada no mesmo trecho. Reduz na curva, gente.",
    likes: 312,
    comments: 41,
    postedAt: "há 6 h",
    tint: "#2fd96b",
    gradient: ["#7bffb0", "#1f9c56", "#06301c"],
  },
  {
    id: "p4",
    author: "Duda",
    handle: "duda.resgate",
    place: "Sandy Shores",
    caption: "Plantão fechando com o sol subindo no deserto. Vale cada hora.",
    likes: 205,
    comments: 9,
    postedAt: "há 9 h",
    tint: "#ffd06b",
    gradient: ["#ffd06b", "#e0752c", "#3d2408"],
  },
];

export type Comment = {
  id: string;
  handle: string;
  text: string;
  at: string;
  likes: number;
  tint: string;
};

export const comments: Record<string, Comment[]> = {
  p1: [
    { id: "c1", handle: "clara.guincho", text: "Se soltar de novo eu já sei quem vem buscar 😄", at: "20 min", likes: 14, tint: "#2fd96b" },
    { id: "c2", handle: "bennys.oficial", text: "Ficou limpo. Traz sábado que a gente alinha a câmber.", at: "18 min", likes: 31, tint: "#35c7ff" },
    { id: "c3", handle: "zeca.sandy", text: "esse escapamento é o que eu vendi?", at: "9 min", likes: 3, tint: "#ffd06b" },
  ],
  p2: [
    { id: "c1", handle: "duda.resgate", text: "Perdi por 20 minutos, plantão não deixou", at: "2 h", likes: 8, tint: "#ffd06b" },
    { id: "c2", handle: "vito.mirror", text: "melhor set do mês, sem discussão", at: "1 h", likes: 52, tint: "#ff6b3d" },
  ],
  p3: [
    { id: "c1", handle: "lspd.central", text: "Radar novo instalado no km 12 desde ontem.", at: "5 h", likes: 22, tint: "#8e8ea3" },
    { id: "c2", handle: "duda.resgate", text: "peguei os dois primeiros, o terceiro já foi você né", at: "4 h", likes: 11, tint: "#ffd06b" },
  ],
  p4: [
    { id: "c1", handle: "iris.galaxy", text: "essa luz é surreal", at: "8 h", likes: 19, tint: "#c96bff" },
  ],
};

export type Profile = {
  handle: string;
  author: string;
  place: string;
  bio: string;
  followers: number;
  following: number;
  tint: string;
  grid: [string, string][];
};

export const profiles: Record<string, Profile> = {
  "vito.mirror": {
    handle: "vito.mirror",
    author: "Vito Baraldi",
    place: "Mirror Park",
    bio: "Oficina no Mirror Park. Traz o carro batido, leva andando.",
    followers: 2140,
    following: 188,
    tint: "#ff6b3d",
    grid: [
      ["#ffb03a", "#3d1206"],
      ["#ff6b3d", "#2a0c04"],
      ["#ffd06b", "#4a3208"],
      ["#ff8a5c", "#5c1c08"],
      ["#e0752c", "#331a05"],
      ["#ffb03a", "#1f0d02"],
    ],
  },
  "iris.galaxy": {
    handle: "iris.galaxy",
    author: "Íris",
    place: "Galaxy Nightclub",
    bio: "Quintas no Galaxy. Depois das 2h eu existo.",
    followers: 18_400,
    following: 312,
    tint: "#c96bff",
    grid: [
      ["#c96bff", "#1a0a3d"],
      ["#8b5cff", "#2a1060"],
      ["#ff4d8d", "#3d0a24"],
      ["#5b2bd6", "#120534"],
      ["#c96bff", "#33115c"],
      ["#9d6bff", "#1c0a42"],
    ],
  },
  "clara.guincho": {
    handle: "clara.guincho",
    author: "Clara Nunes",
    place: "Route 68",
    bio: "Guincho 24h. Chamado por telefone, pagamento na transferência.",
    followers: 894,
    following: 96,
    tint: "#2fd96b",
    grid: [
      ["#7bffb0", "#06301c"],
      ["#2fd96b", "#0c3320"],
      ["#1f9c56", "#04240f"],
      ["#5cffa0", "#0a3d24"],
      ["#2fd96b", "#062a16"],
      ["#7bffb0", "#0c3320"],
    ],
  },
  "duda.resgate": {
    handle: "duda.resgate",
    author: "Duda",
    place: "Sandy Shores",
    bio: "Piloto de resgate. O deserto é meu escritório.",
    followers: 1320,
    following: 74,
    tint: "#ffd06b",
    grid: [
      ["#ffd06b", "#3d2408"],
      ["#e0752c", "#2a1505"],
      ["#ffb03a", "#4a3208"],
      ["#ffd06b", "#1f1204"],
      ["#f0a03c", "#33200a"],
      ["#e0752c", "#3d2408"],
    ],
  },
};

export type StorySlide = { caption: string; gradient: [string, string] };

export const reels: Record<string, StorySlide[]> = {
  vito: [
    { caption: "Elevador cheio desde as 6h", gradient: ["#ffb03a", "#3d1206"] },
    { caption: "Esse aqui sai hoje", gradient: ["#ff6b3d", "#2a0c04"] },
  ],
  iris: [
    { caption: "Passagem de som", gradient: ["#c96bff", "#1a0a3d"] },
    { caption: "Fila dobrando a esquina", gradient: ["#ff4d8d", "#3d0a24"] },
    { caption: "Última música", gradient: ["#8b5cff", "#2a1060"] },
  ],
  clara: [{ caption: "Route 68 fechada no km 12", gradient: ["#7bffb0", "#06301c"] }],
  bennys: [
    { caption: "Chamado #4471 encerrado", gradient: ["#35c7ff", "#14203f"] },
    { caption: "Plantão até as 4h", gradient: ["#5cc9ff", "#0a1c3d"] },
  ],
  duda: [{ caption: "Sol subindo em Sandy", gradient: ["#ffd06b", "#3d2408"] }],
};

export type DirectMessage = { id: string; from: "me" | "them"; text: string; at: string };

export type DirectThread = {
  id: string;
  handle: string;
  tint: string;
  unread: boolean;
  messages: DirectMessage[];
};

export const directThreads: DirectThread[] = [
  {
    id: "d1",
    handle: "iris.galaxy",
    tint: "#c96bff",
    unread: true,
    messages: [
      { id: "m1", from: "them", text: "coloquei seu nome na lista de quinta", at: "22:10" },
      { id: "m2", from: "them", text: "chega antes da meia-noite que o preço muda", at: "22:10" },
    ],
  },
  {
    id: "d2",
    handle: "clara.guincho",
    tint: "#2fd96b",
    unread: true,
    messages: [
      { id: "m1", from: "me", text: "viu o post do capotamento?", at: "21:02" },
      { id: "m2", from: "them", text: "eu que puxei os três 😅", at: "21:04" },
    ],
  },
  {
    id: "d3",
    handle: "vito.mirror",
    tint: "#ff6b3d",
    unread: false,
    messages: [
      { id: "m1", from: "them", text: "manda a foto do painel antes de eu fechar", at: "19:31" },
      { id: "m2", from: "me", text: "já tá no seu direct", at: "19:33" },
      { id: "m3", from: "them", text: "fechou", at: "19:33" },
    ],
  },
];

const compact = new Intl.NumberFormat("pt-BR");

export const formatCount = (value: number) => compact.format(value);
