import type { NutrientKey, Nutrients } from "../types";

// Daily recommended intake (adult). Units vary by nutrient.
export const RDA: Nutrients = {
  calories: 2200,
  protein: 60,
  carbs: 275,
  fat: 70,
  fiber: 30,
  sugar: 50, // upper bound
  vitaminA: 0.9, // mg
  vitaminB12: 0.0024, // mg (2.4 µg)
  vitaminC: 90, // mg
  vitaminD: 0.02, // mg (20 µg)
  vitaminE: 15, // mg
  calcium: 1000, // mg
  iron: 14, // mg
  magnesium: 350, // mg
  zinc: 11, // mg
  omega3: 1.6, // g
  water: 2500, // ml
};

export const NUTRIENT_META: Record<
  NutrientKey,
  { label: string; unit: string; critical?: boolean }
> = {
  calories: { label: "Kalorien", unit: "kcal" },
  protein: { label: "Protein", unit: "g", critical: true },
  carbs: { label: "Kohlenhydrate", unit: "g" },
  fat: { label: "Fett", unit: "g" },
  fiber: { label: "Ballaststoffe", unit: "g", critical: true },
  sugar: { label: "Zucker", unit: "g" },
  vitaminA: { label: "Vitamin A", unit: "mg", critical: true },
  vitaminB12: { label: "Vitamin B12", unit: "mg", critical: true },
  vitaminC: { label: "Vitamin C", unit: "mg", critical: true },
  vitaminD: { label: "Vitamin D", unit: "mg", critical: true },
  vitaminE: { label: "Vitamin E", unit: "mg", critical: true },
  calcium: { label: "Kalzium", unit: "mg", critical: true },
  iron: { label: "Eisen", unit: "mg", critical: true },
  magnesium: { label: "Magnesium", unit: "mg", critical: true },
  zinc: { label: "Zink", unit: "mg", critical: true },
  omega3: { label: "Omega-3", unit: "g", critical: true },
  water: { label: "Wasser", unit: "ml", critical: true },
};

export const NUTRIENT_ORDER: NutrientKey[] = [
  "calories",
  "protein",
  "carbs",
  "fat",
  "fiber",
  "sugar",
  "water",
  "vitaminA",
  "vitaminB12",
  "vitaminC",
  "vitaminD",
  "vitaminE",
  "calcium",
  "iron",
  "magnesium",
  "zinc",
  "omega3",
];

export function emptyNutrients(): Nutrients {
  return {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    vitaminA: 0,
    vitaminB12: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    zinc: 0,
    omega3: 0,
    water: 0,
  };
}
