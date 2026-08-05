export type Listing = {
  id: string;
  title: string;
  price: number;
  category: Category;
  district: string;
  postedAt: string;
  seller: string;
  phone: string;
  description: string;
  gradient: [string, string];
};

export const categories = ["Tudo", "Veículos", "Imóveis", "Peças", "Serviços"] as const;
export type Category = (typeof categories)[number];

export const listings: Listing[] = [
  {
    id: "elegy",
    title: "Elegy Retro Custom",
    price: 148_000,
    category: "Veículos",
    district: "Mirror Park",
    postedAt: "há 12 min",
    seller: "Vito Baraldi",
    phone: "555-0182",
    description:
      "Motor revisado na Benny's, turbo estágio 2, suspensão regulada pra circuito. Documentação limpa, sem multa pendente.",
    gradient: ["#35c7ff", "#14203f"],
  },
  {
    id: "garagem",
    title: "Garagem 4 vagas — Del Perro",
    price: 320_000,
    category: "Imóveis",
    district: "Del Perro",
    postedAt: "há 1 h",
    seller: "Imobiliária Dynasty",
    phone: "555-0900",
    description: "Portão automático, câmera na entrada, elevador hidráulico incluso. Aceito troca por veículo.",
    gradient: ["#7c5cff", "#1b1440"],
  },
  {
    id: "turbo",
    title: "Kit turbo — lote com 3",
    price: 26_500,
    category: "Peças",
    district: "Sandy Shores",
    postedAt: "há 3 h",
    seller: "Oficina do Zeca",
    phone: "555-0455",
    description: "Três kits novos na caixa. Instalo por conta da casa se levar o lote fechado.",
    gradient: ["#ff6b3d", "#421405"],
  },
  {
    id: "guincho",
    title: "Guincho 24h — Route 68",
    price: 1_800,
    category: "Serviços",
    district: "Grand Senora",
    postedAt: "há 5 h",
    seller: "Clara Nunes",
    phone: "555-0347",
    description: "Atendimento em qualquer ponto da Route 68. Valor por chamado, pagamento na transferência.",
    gradient: ["#2fd96b", "#0c3320"],
  },
  {
    id: "sultan",
    title: "Sultan RS batido — só peças",
    price: 42_000,
    category: "Veículos",
    district: "La Mesa",
    postedAt: "ontem",
    seller: "Ferro-velho LM",
    phone: "555-0621",
    description: "Frente destruída, motor e câmbio intactos. Vendo inteiro, não desmonto.",
    gradient: ["#8e8ea3", "#1a1a22"],
  },
  {
    id: "apto",
    title: "Apto mobiliado — Vinewood Hills",
    price: 890_000,
    category: "Imóveis",
    district: "Vinewood Hills",
    postedAt: "ontem",
    seller: "Theo Marchetti",
    phone: "555-0733",
    description: "Vista pra cidade inteira, dois quartos, piscina compartilhada. Só negocio à vista.",
    gradient: ["#ffd06b", "#3d2a08"],
  },
];

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => brl.format(value);
