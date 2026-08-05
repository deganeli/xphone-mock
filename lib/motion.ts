import type { Transition } from "framer-motion";

/** Push lateral entre telas empilhadas (lista → detalhe). */
export const pushSpring: Transition = { type: "spring", stiffness: 420, damping: 40 };

/** Sheet subindo do rodapé. Mais amortecido que o push: não pode passar do topo. */
export const sheetSpring: Transition = { type: "spring", stiffness: 420, damping: 42 };

/** Feedback de toque em botão. Rígido o bastante pra acompanhar o dedo. */
export const tapSpring: Transition = { type: "spring", stiffness: 900, damping: 26 };

/** Ícone da home expandindo para o app e voltando. */
export const appSpring: Transition = { type: "spring", stiffness: 380, damping: 34 };
