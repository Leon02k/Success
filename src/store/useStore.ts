import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ActiveEffect,
  ActivityEntry,
  FoodEntry,
  FoodSnapshot,
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
  recentExternalFoods: FoodSnapshot[];
  username: string;

  setUsername: (name: string) => void;
  addCuratedFood: (foodId: string, grams: number) => void;
  addExternalFood: (snapshot: FoodSnapshot, grams: number) => void;
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
  return { ...stats, [key]: { ...current, xp: Math.max(0, current.xp + delta) } };
}

function applyEffects(
  state: Pick<State, "stats" | "effects">,
  snapshot: FoodSnapshot,
  grams: number,
): Pick<State, "stats" | "effects"> {
  let stats = state.stats;
  const factor = grams / 100;
  for (const [statKey, xp] of Object.entries(snapshot.effects || {})) {
    if (xp) stats = applyXp(stats, statKey as StatKey, Math.round(xp * factor));
  }
  const effects = [...state.effects];
  if (snapshot.buff) {
    effects.push({
      id: makeId(),
      name: snapshot.buff,
      kind: "buff",
      expiresAt: Date.now() + 4 * 60 * 60 * 1000,
      source: snapshot.name,
    });
  }
  if (snapshot.debuff) {
    effects.push({
      id: makeId(),
      name: snapshot.debuff,
      kind: "debuff",
      expiresAt: Date.now() + 4 * 60 * 60 * 1000,
      source: snapshot.name,
    });
  }
  return { stats, effects };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      stats: emptyStats(),
      foodLog: [],
      activityLog: [],
      logEntries: [],
      effects: [],
      recentExternalFoods: [],
      username: "Spieler",

      setUsername: (name) => set({ username: name }),

      addCuratedFood: (foodId, grams) => {
        const food = FOODS_BY_ID[foodId];
        if (!food) return;
        const snapshot: FoodSnapshot = {
          name: food.name,
          emoji: food.emoji,
          category: food.category,
          per100g: food.per100g,
          effects: food.effects,
          buff: food.buff,
          debuff: food.debuff,
          source: "curated",
        };
        const entry: FoodEntry = {
          id: makeId(), foodId, snapshot, grams, timestamp: Date.now(),
        };
        const next = applyEffects(get(), snapshot, grams);
        set({ foodLog: [...get().foodLog, entry], ...next });
      },

      addExternalFood: (snapshot, grams) => {
        const entry: FoodEntry = {
          id: makeId(), snapshot, grams, timestamp: Date.now(),
        };
        const next = applyEffects(get(), snapshot, grams);
        const recent = [snapshot, ...get().recentExternalFoods.filter(
          (s) => s.externalId !== snapshot.externalId,
        )].slice(0, 12);
        set({
          foodLog: [...get().foodLog, entry],
          recentExternalFoods: recent,
          ...next,
        });
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
          recentExternalFoods: [],
        }),
    }),
    {
      name: "success-tracker-v2",
      version: 2,
      migrate: (state: any, fromVersion: number) => {
        if (fromVersion < 2 && state) {
          // Migrate v1 food entries (foodId only, no snapshot) to v2 (snapshot embedded)
          if (Array.isArray(state.foodLog)) {
            state.foodLog = state.foodLog
              .map((e: any) => {
                if (e.snapshot) return e;
                const food = e.foodId ? FOODS_BY_ID[e.foodId] : undefined;
                if (!food) return null;
                return {
                  ...e,
                  snapshot: {
                    name: food.name,
                    emoji: food.emoji,
                    category: food.category,
                    per100g: food.per100g,
                    effects: food.effects,
                    buff: food.buff,
                    debuff: food.debuff,
                    source: "curated",
                  },
                };
              })
              .filter(Boolean);
          }
          state.recentExternalFoods = state.recentExternalFoods || [];
        }
        return state;
      },
    },
  ),
);
