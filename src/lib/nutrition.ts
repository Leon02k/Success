import type { FoodEntry, NutrientKey, Nutrients } from "../types";
import { emptyNutrients, NUTRIENT_ORDER } from "../data/nutrients";

export function nutrientsForEntry(entry: FoodEntry): Nutrients {
  const factor = entry.grams / 100;
  const result = emptyNutrients();
  const per100g = entry.snapshot.per100g;
  for (const key of NUTRIENT_ORDER) {
    const v = per100g[key as NutrientKey];
    if (v !== undefined) result[key as NutrientKey] = v * factor;
  }
  return result;
}

export function sumNutrients(entries: FoodEntry[]): Nutrients {
  const total = emptyNutrients();
  for (const e of entries) {
    const n = nutrientsForEntry(e);
    for (const k of NUTRIENT_ORDER) total[k] += n[k];
  }
  return total;
}

export function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function isToday(ts: number): boolean {
  return startOfDay(ts) === startOfDay(Date.now());
}
