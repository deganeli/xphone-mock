export type Notification = {
  id: string;
  app: string;
  tint: string;
  title: string;
  body: string;
  at: string;
};

export const notifications: Notification[] = [
  { id: "n1", app: "Mensagens", tint: "var(--sunset)", title: "Vito Baraldi", body: "levo as peças em 10min", at: "agora" },
  {
    id: "n2",
    app: "Mensagens",
    tint: "var(--sunset)",
    title: "Benny's — Plantão",
    body: "Chamado #4471 aberto na Route 68.",
    at: "há 2 min",
  },
  {
    id: "n3",
    app: "Mensagens",
    tint: "var(--sunset)",
    title: "Clara Nunes",
    body: "sábado tem corrida no aeroporto, cola",
    at: "há 8 min",
  },
  {
    id: "n4",
    app: "Fleeca",
    tint: "var(--cash)",
    title: "Transferência recebida",
    body: "Clara Nunes enviou R$ 12.000,00",
    at: "há 4 min",
  },
  { id: "n5", app: "Vista", tint: "#ff4d8d", title: "iris.galaxy", body: "marcou você em um story", at: "há 12 min" },
  { id: "n6", app: "Vista", tint: "#ff4d8d", title: "vito.mirror", body: "curtiu sua foto", at: "há 20 min" },
  {
    id: "n7",
    app: "Telefone",
    tint: "var(--steel)",
    title: "Chamada perdida",
    body: "555-0996 · 2 tentativas",
    at: "há 26 min",
  },
];
