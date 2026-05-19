import type { NutrientKey, Nutrients } from "../types";

// Daily recommended intake (adult). Units vary by nutrient.
export const RDA: Nutrients = {
  calories: 2200,
  protein: 60,
  carbs: 275,
  fat: 70,
  fiber: 30,
  sugar: 50, // upper bound
  saturatedFat: 22, // upper bound
  salt: 6, // upper bound (g)

  // Vitamins
  vitaminA: 0.9, // mg (RAE)
  vitaminB1: 1.1, // mg (Thiamin)
  vitaminB2: 1.4, // mg (Riboflavin)
  vitaminB3: 16, // mg (Niacin)
  vitaminB6: 1.4, // mg
  vitaminB9: 0.4, // mg (Folat, 400µg)
  vitaminB12: 0.0024, // mg (2.4µg)
  vitaminC: 90, // mg
  vitaminD: 0.02, // mg (20µg)
  vitaminE: 15, // mg
  vitaminK: 0.075, // mg (75µg)

  // Minerals
  calcium: 1000, // mg
  iron: 14, // mg
  magnesium: 350, // mg
  zinc: 11, // mg
  potassium: 3500, // mg
  phosphorus: 700, // mg
  selenium: 0.055, // mg (55µg)
  iodine: 0.15, // mg (150µg)

  // Fats
  omega3: 1.6, // g

  // Hydration
  water: 2500, // ml
};

export const NUTRIENT_META: Record<
  NutrientKey,
  { label: string; unit: string; critical?: boolean; group: "macro" | "vitamin" | "mineral" | "other" }
> = {
  calories: { label: "Kalorien", unit: "kcal", group: "macro" },
  protein: { label: "Protein", unit: "g", critical: true, group: "macro" },
  carbs: { label: "Kohlenhydrate", unit: "g", group: "macro" },
  fat: { label: "Fett", unit: "g", group: "macro" },
  saturatedFat: { label: "Gesättigte Fettsäuren", unit: "g", group: "macro" },
  fiber: { label: "Ballaststoffe", unit: "g", critical: true, group: "macro" },
  sugar: { label: "Zucker", unit: "g", group: "macro" },
  salt: { label: "Salz", unit: "g", group: "macro" },

  vitaminA: { label: "Vitamin A", unit: "mg", critical: true, group: "vitamin" },
  vitaminB1: { label: "Vitamin B1 (Thiamin)", unit: "mg", critical: true, group: "vitamin" },
  vitaminB2: { label: "Vitamin B2 (Riboflavin)", unit: "mg", critical: true, group: "vitamin" },
  vitaminB3: { label: "Vitamin B3 (Niacin)", unit: "mg", critical: true, group: "vitamin" },
  vitaminB6: { label: "Vitamin B6", unit: "mg", critical: true, group: "vitamin" },
  vitaminB9: { label: "Folat (B9)", unit: "mg", critical: true, group: "vitamin" },
  vitaminB12: { label: "Vitamin B12", unit: "mg", critical: true, group: "vitamin" },
  vitaminC: { label: "Vitamin C", unit: "mg", critical: true, group: "vitamin" },
  vitaminD: { label: "Vitamin D", unit: "mg", critical: true, group: "vitamin" },
  vitaminE: { label: "Vitamin E", unit: "mg", critical: true, group: "vitamin" },
  vitaminK: { label: "Vitamin K", unit: "mg", critical: true, group: "vitamin" },

  calcium: { label: "Kalzium", unit: "mg", critical: true, group: "mineral" },
  iron: { label: "Eisen", unit: "mg", critical: true, group: "mineral" },
  magnesium: { label: "Magnesium", unit: "mg", critical: true, group: "mineral" },
  zinc: { label: "Zink", unit: "mg", critical: true, group: "mineral" },
  potassium: { label: "Kalium", unit: "mg", critical: true, group: "mineral" },
  phosphorus: { label: "Phosphor", unit: "mg", group: "mineral" },
  selenium: { label: "Selen", unit: "mg", critical: true, group: "mineral" },
  iodine: { label: "Jod", unit: "mg", critical: true, group: "mineral" },

  omega3: { label: "Omega-3", unit: "g", critical: true, group: "other" },
  water: { label: "Wasser", unit: "ml", critical: true, group: "other" },
};

export const NUTRIENT_ORDER: NutrientKey[] = [
  // Macros first
  "calories", "protein", "carbs", "fat", "saturatedFat", "fiber", "sugar", "salt", "water",
  // Vitamins
  "vitaminA", "vitaminB1", "vitaminB2", "vitaminB3", "vitaminB6", "vitaminB9",
  "vitaminB12", "vitaminC", "vitaminD", "vitaminE", "vitaminK",
  // Minerals
  "calcium", "iron", "magnesium", "zinc", "potassium", "phosphorus", "selenium", "iodine",
  // Fats
  "omega3",
];

export function emptyNutrients(): Nutrients {
  const n: Partial<Nutrients> = {};
  for (const k of NUTRIENT_ORDER) n[k] = 0;
  return n as Nutrients;
}
