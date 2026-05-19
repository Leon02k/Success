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
  | "saturatedFat"
  | "fiber"
  | "sugar"
  | "salt"
  | "vitaminA"
  | "vitaminB1"
  | "vitaminB2"
  | "vitaminB3"
  | "vitaminB6"
  | "vitaminB9"
  | "vitaminB12"
  | "vitaminC"
  | "vitaminD"
  | "vitaminE"
  | "vitaminK"
  | "calcium"
  | "iron"
  | "magnesium"
  | "zinc"
  | "potassium"
  | "phosphorus"
  | "selenium"
  | "iodine"
  | "omega3"
  | "water";

export type Nutrients = Record<NutrientKey, number>;

export type FoodCategory = "good" | "neutral" | "bad";

// Self-contained snapshot of a food's data. Stored inside FoodEntry so logs
// remain valid even if the source DB changes or the food gets removed.
export type FoodSnapshot = {
  name: string;
  emoji?: string;
  imageUrl?: string;
  brand?: string;
  category: FoodCategory;
  per100g: Partial<Nutrients>;
  effects?: Partial<Record<StatKey, number>>;
  buff?: string;
  debuff?: string;
  source: "curated" | "off";
  externalId?: string;
};

// Curated food in the local DB.
export type Food = FoodSnapshot & {
  id: string;
  defaultGrams: number;
};

export type FoodEntry = {
  id: string;
  foodId?: string; // curated foods
  snapshot: FoodSnapshot;
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
