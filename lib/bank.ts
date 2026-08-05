export type Transaction = {
  id: string;
  label: string;
  origin: string;
  amount: number;
  at: string;
};

export const account = {
  holder: "Lukas C. Code",
  bank: "Fleeca",
  iban: "FL 8821 0043 7719",
  balance: 184_320.5,
  savings: 60_000,
};

export const transactions: Transaction[] = [
  { id: "TX-9F21", label: "Clara Nunes", origin: "Transferência recebida", amount: 12_000, at: "Hoje · 19:40" },
  { id: "TX-9E07", label: "LSPD", origin: "Multa 1102", amount: -850, at: "Hoje · 18:02" },
  { id: "TX-9D88", label: "Benny's Motorworks", origin: "Serviço #4471", amount: 3_250, at: "Hoje · 14:27" },
  { id: "TX-9C40", label: "LTD Gasoline", origin: "Abastecimento", amount: -412.9, at: "Ontem · 23:11" },
  { id: "TX-9B12", label: "Vangelico", origin: "Compra no débito", amount: -7_900, at: "Ontem · 20:35" },
  { id: "TX-9A05", label: "Prefeitura LS", origin: "Aluguel garagem", amount: -2_100, at: "12 mar · 09:00" },
];

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatBRL = (value: number) => brl.format(value);
