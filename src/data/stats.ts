import type { StatKey } from "../types";

export const STAT_META: Record<
  StatKey,
  { label: string; emoji: string; color: string; description: string }
> = {
  health: {
    label: "Gesundheit",
    emoji: "❤️",
    color: "#ff5577",
    description: "Ernährung, Schlaf, Wasser",
  },
  fitness: {
    label: "Stärke",
    emoji: "⚔️",
    color: "#ff9944",
    description: "Krafttraining, Cardio, Bewegung",
  },
  mental: {
    label: "Geist",
    emoji: "🧠",
    color: "#a164ff",
    description: "Meditation, Fokus, mentale Stärke",
  },
  productivity: {
    label: "Disziplin",
    emoji: "⚡",
    color: "#ffd944",
    description: "Erledigte Aufgaben, tiefes Arbeiten",
  },
  knowledge: {
    label: "Wissen",
    emoji: "📚",
    color: "#5cc8ff",
    description: "Lesen, Lernen, Skills",
  },
  social: {
    label: "Charisma",
    emoji: "🤝",
    color: "#5cffaa",
    description: "Beziehungen, Gespräche, Hilfe",
  },
};

export const STAT_ORDER: StatKey[] = [
  "health",
  "fitness",
  "mental",
  "productivity",
  "knowledge",
  "social",
];
