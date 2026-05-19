import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ActiveEffect,
  ActivityEntry,
  FoodEntry,
  LogEntry,
  StatKey,
  Stats,
} from "../types";
import { ACTIVITIES_BY_ID } from "../data/activities";
import { FOODS_BY_ID } from "../data/foods";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function emptyStats(): Stats {
  return {
    health: { xp: 0, level: 1 },
    fitness: { xp: 0, level: 1 },
    mental: { xp: 0, level: 1 },
    productivity: { xp: 0, level: 1 },
    knowledge: { xp: 0, level: 1 },
    social: { xp: 0, level: 1 },
  };
}

type State = {
  stats: Stats;
  foodLog: FoodEntry[];
  activityLog: ActivityEntry[];
  logEntries: LogEntry[];
  effects: ActiveEffect[];
  username: string;

  // actions
  setUsername: (name: string) => void;
  addFood: (foodId: string, grams: number) => void;
  removeFood: (id: string) => void;
  addActivity: (activityId: string) => void;
  removeActivity: (id: string) => void;
  addLogEntry: (entry: Omit<LogEntry, "id">) => void;
  removeLogEntry: (id: string) => void;
  pruneEffects: () => void;
  reset: () => void;
};

function applyXp(stats: Stats, key: StatKey, delta: number): Stats {
  const current = stats[key];
  const newXp = Math.max(0, current.xp + delta);
  return { ...stats, [key]: { ...current, xp: newXp } };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      stats: emptyStats(),
      foodLog: [],
      activityLog: [],
      logEntries: [],
      effects: [],
      username: "Spieler",

      setUsername: (name) => set({ username: name }),

      addFood: (foodId, grams) => {
        const food = FOODS_BY_ID[foodId];
        if (!food) return;
        const entry: FoodEntry = { id: makeId(), foodId, grams, timestamp: Date.now() };
        let stats = get().stats;
        const factor = grams / food.defaultGrams;
        for (const [statKey, xp] of Object.entries(food.effects)) {
          if (xp) stats = applyXp(stats, statKey as StatKey, Math.round(xp * factor));
        }
        const effects = [...get().effects];
        if (food.buff) {
          effects.push({
            id: makeId(),
            name: food.buff,
            kind: "buff",
            expiresAt: Date.now() + 4 * 60 * 60 * 1000,
            source: food.name,
          });
        }
        if (food.debuff) {
          effects.push({
            id: makeId(),
            name: food.debuff,
            kind: "debuff",
            expiresAt: Date.now() + 4 * 60 * 60 * 1000,
            source: food.name,
          });
        }
        set({ foodLog: [...get().foodLog, entry], stats, effects });
      },

      removeFood: (id) => {
        set({ foodLog: get().foodLog.filter((e) => e.id !== id) });
      },

      addActivity: (activityId) => {
        const act = ACTIVITIES_BY_ID[activityId];
        if (!act) return;
        const entry: ActivityEntry = { id: makeId(), activityId, timestamp: Date.now() };
        const stats = applyXp(get().stats, act.stat, act.xp);
        set({ activityLog: [...get().activityLog, entry], stats });
      },

      removeActivity: (id) => {
        set({ activityLog: get().activityLog.filter((e) => e.id !== id) });
      },

      addLogEntry: (entry) =>
        set({ logEntries: [{ ...entry, id: makeId() }, ...get().logEntries] }),

      removeLogEntry: (id) =>
        set({ logEntries: get().logEntries.filter((e) => e.id !== id) }),

      pruneEffects: () => {
        const now = Date.now();
        set({ effects: get().effects.filter((e) => e.expiresAt > now) });
      },

      reset: () =>
        set({
          stats: emptyStats(),
          foodLog: [],
          activityLog: [],
          logEntries: [],
          effects: [],
        }),
    }),
    {
      name: "success-tracker-v1",
    },
  ),
);
