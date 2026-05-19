export type StatKey =
  | "health"
  | "fitness"
  | "mental"
  | "productivity"
  | "knowledge"
  | "social";

export type StatData = {
  xp: number;
  level: number;
};

export type Stats = Record<StatKey, StatData>;

export type NutrientKey =
  | "calories"
  | "protein"
  | "carbs"
  | "fat"
  | "fiber"
  | "sugar"
  | "vitaminA"
  | "vitaminB12"
  | "vitaminC"
  | "vitaminD"
  | "vitaminE"
  | "calcium"
  | "iron"
  | "magnesium"
  | "zinc"
  | "omega3"
  | "water";

export type Nutrients = Record<NutrientKey, number>;

export type Food = {
  id: string;
  name: string;
  emoji: string;
  category: "good" | "neutral" | "bad";
  defaultGrams: number;
  per100g: Partial<Nutrients>;
  effects: Partial<Record<StatKey, number>>;
  buff?: string;
  debuff?: string;
};

export type FoodEntry = {
  id: string;
  foodId: string;
  grams: number;
  timestamp: number;
};

export type Activity = {
  id: string;
  name: string;
  emoji: string;
  category: "good" | "bad";
  stat: StatKey;
  xp: number;
  description: string;
};

export type ActivityEntry = {
  id: string;
  activityId: string;
  timestamp: number;
};

export type LogEntry = {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  text: string;
  insights: string[];
};

export type ActiveEffect = {
  id: string;
  name: string;
  kind: "buff" | "debuff";
  expiresAt: number;
  source: string;
};
