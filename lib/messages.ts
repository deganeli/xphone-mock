export type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  at: string;
};

export type Thread = {
  id: string;
  contact: string;
  phone: string;
  tint: string;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    id: "vito",
    contact: "Vito Baraldi",
    phone: "555-0182",
    tint: "#ff6b3d",
    messages: [
      { id: "m1", from: "them", text: "tá na oficina de Sandy Shores?", at: "21:04" },
      { id: "m2", from: "me", text: "cheguei agora, o Sultan tá no elevador", at: "21:06" },
      { id: "m3", from: "them", text: "não mexe na suspensão ainda", at: "21:06" },
      { id: "m4", from: "them", text: "levo as peças em 10min", at: "21:07" },
      { id: "m5", from: "me", text: "beleza, deixo aberto", at: "21:09" },
    ],
  },
  {
    id: "mecanica",
    contact: "Benny's — Plantão",
    phone: "555-0110",
    tint: "#35c7ff",
    messages: [
      { id: "m1", from: "them", text: "Chamado #4471 aberto na Route 68.", at: "20:12" },
      { id: "m2", from: "them", text: "Veículo: Elegy Retro. Guincho a caminho.", at: "20:12" },
      { id: "m3", from: "me", text: "assumo esse, tô a 2km", at: "20:14" },
    ],
  },
  {
    id: "clara",
    contact: "Clara Nunes",
    phone: "555-0347",
    tint: "#2fd96b",
    messages: [
      { id: "m1", from: "them", text: "transferi os 12k do acerto", at: "19:40" },
      { id: "m2", from: "me", text: "caiu aqui, valeu", at: "19:41" },
      { id: "m3", from: "them", text: "sábado tem corrida no aeroporto, cola", at: "19:44" },
    ],
  },
  {
    id: "lspd",
    contact: "LSPD — Central",
    phone: "911",
    tint: "#8e8ea3",
    messages: [
      { id: "m1", from: "them", text: "Multa 1102 registrada em seu nome. Valor R$ 850,00.", at: "18:02" },
      { id: "m2", from: "them", text: "Prazo de pagamento: 72h.", at: "18:02" },
    ],
  },
];
