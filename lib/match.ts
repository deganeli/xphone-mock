export type Profile = {
  id: string;
  name: string;
  age: number;
  district: string;
  distance: string;
  bio: string;
  tags: string[];
  gradient: [string, string];
  mutual: boolean;
};

export type MatchMessage = { id: string; from: "me" | "them"; text: string; at: string };

export type MatchChat = {
  id: string;
  name: string;
  matchedAt: string;
  unread: boolean;
  gradient: [string, string];
  messages: MatchMessage[];
};

export type MyProfile = {
  name: string;
  age: number;
  district: string;
  bio: string;
  /** Vazio = usa o gradiente com a inicial do nome. */
  photo: string;
  gradient: [string, string];
  showDistance: boolean;
  paused: boolean;
};

export const BIO_LIMIT = 180;

export const me: MyProfile = {
  name: "Lukas",
  age: 28,
  district: "Little Seoul",
  bio: "Plantão à noite, oficina de dia. Se puxar assunto sobre carro velho eu respondo em 2 minutos.",
  photo: "",
  gradient: ["#ff4d8d", "#3b1560"],
  showDistance: true,
  paused: false,
};

export const chats: MatchChat[] = [
  {
    id: "mila",
    name: "Mila",
    matchedAt: "há 2 dias",
    unread: true,
    gradient: ["#ff8a5c", "#7a2d5c"],
    messages: [
      { id: "m1", from: "them", text: "vi que você para no píer de madrugada também", at: "23:41" },
      { id: "m2", from: "me", text: "só quando o turno deixa. você corre lá que horas?", at: "23:44" },
      { id: "m3", from: "them", text: "umas 4h, quando não tem ninguém", at: "23:45" },
      { id: "m4", from: "them", text: "topa um café depois de um dia desses?", at: "23:46" },
    ],
  },
  {
    id: "theo",
    name: "Theo",
    matchedAt: "há 5 dias",
    unread: false,
    gradient: ["#6bffc0", "#134438"],
    messages: [
      { id: "m1", from: "me", text: "cozinha bem mesmo ou é só marketing do perfil?", at: "20:12" },
      { id: "m2", from: "them", text: "traz o vinho que eu provo o contrário", at: "20:19" },
      { id: "m3", from: "me", text: "combinado. quinta?", at: "20:21" },
    ],
  },
  {
    id: "iris",
    name: "Íris",
    matchedAt: "há 1 semana",
    unread: true,
    gradient: ["#c96bff", "#3b1560"],
    messages: [
      { id: "m1", from: "them", text: "seu nome tá na lista de quinta", at: "02:14" },
      { id: "m2", from: "them", text: "e não, não vou responder antes das 2h 😴", at: "02:14" },
    ],
  },
];

export const profiles: Profile[] = [
  {
    id: "mila",
    name: "Mila",
    age: 26,
    district: "Vespucci Beach",
    distance: "1,2 km",
    bio: "Trabalho no píer, corro na orla de madrugada. Odeio quem estaciona em fila dupla.",
    tags: ["Surf", "Turno da noite", "Sem drama"],
    gradient: ["#ff8a5c", "#7a2d5c"],
    mutual: true,
  },
  {
    id: "rafa",
    name: "Rafa",
    age: 31,
    district: "Mirror Park",
    distance: "3,8 km",
    bio: "Mecânico. Se seu carro faz um barulho estranho, já é conversa suficiente pro primeiro encontro.",
    tags: ["Oficina", "Rock", "Cachorros"],
    gradient: ["#5cc9ff", "#2a2a6e"],
    mutual: false,
  },
  {
    id: "iris",
    name: "Íris",
    age: 24,
    district: "Vinewood",
    distance: "6,1 km",
    bio: "Faço set no Galaxy às quintas. Me chama depois das 2h, antes disso não existo.",
    tags: ["DJ", "Vinil", "Coruja"],
    gradient: ["#c96bff", "#3b1560"],
    mutual: true,
  },
  {
    id: "duda",
    name: "Duda",
    age: 29,
    district: "Sandy Shores",
    distance: "42 km",
    bio: "Piloto de resgate. Sim, é longe. Não, não vou até a cidade num dia de plantão.",
    tags: ["Helicóptero", "Deserto", "Café preto"],
    gradient: ["#ffd06b", "#6e3a12"],
    mutual: false,
  },
  {
    id: "theo",
    name: "Theo",
    age: 34,
    district: "Rockford Hills",
    distance: "8,4 km",
    bio: "Advogado. Cozinho bem, discuto melhor. Procuro alguém que aguente as duas coisas.",
    tags: ["Vinho", "Corrida", "Tênis"],
    gradient: ["#6bffc0", "#134438"],
    mutual: true,
  },
];
