import type { Food, FoodEntry, NutrientKey, Nutrients } from "../types";
import { FOODS_BY_ID } from "../data/foods";
import { emptyNutrients, NUTRIENT_ORDER } from "../data/nutrients";

export function nutrientsForEntry(entry: FoodEntry): Nutrients {
  const food: Food | undefined = FOODS_BY_ID[entry.foodId];
  if (!food) return emptyNutrients();
  const factor = entry.grams / 100;
  const result = emptyNutrients();
  for (const key of NUTRIENT_ORDER) {
    const v = food.per100g[key as NutrientKey];
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
