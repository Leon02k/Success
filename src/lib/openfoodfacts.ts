import type { FoodCategory, FoodSnapshot, NutrientKey, StatKey } from "../types";

// Open Food Facts public API. No key needed, CORS-enabled.
// Docs: https://wiki.openfoodfacts.org/Open_Food_Facts_Search_API_Version_2

type OFFNutriments = Record<string, number | string | undefined>;

type OFFProduct = {
  code: string;
  product_name?: string;
  product_name_de?: string;
  brands?: string;
  image_thumb_url?: string;
  image_front_thumb_url?: string;
  image_small_url?: string;
  nutriments?: OFFNutriments;
  nutriscore_grade?: string;
  nova_group?: number;
};

type OFFSearchResponse = {
  products?: OFFProduct[];
  count?: number;
};

const FIELDS = [
  "code",
  "product_name",
  "product_name_de",
  "brands",
  "image_thumb_url",
  "image_front_thumb_url",
  "image_small_url",
  "nutriments",
  "nutriscore_grade",
  "nova_group",
].join(",");

// Map OFF nutriment keys (per 100g, stored in their declared unit, mostly g/mg)
// to our internal NutrientKey. OFF stores most macros in g and most vitamins/minerals in mg.
const NUTRIMENT_MAP: Array<[string, NutrientKey, number]> = [
  // [OFF key, our key, multiplier to reach our base unit]
  ["energy-kcal_100g", "calories", 1],
  ["proteins_100g", "protein", 1],
  ["carbohydrates_100g", "carbs", 1],
  ["fat_100g", "fat", 1],
  ["saturated-fat_100g", "saturatedFat", 1],
  ["fiber_100g", "fiber", 1],
  ["sugars_100g", "sugar", 1],
  ["salt_100g", "salt", 1],

  // Vitamins - OFF stores in g (per spec). Multiply by 1000 to get mg.
  ["vitamin-a_100g", "vitaminA", 1000],
  ["vitamin-b1_100g", "vitaminB1", 1000],
  ["vitamin-b2_100g", "vitaminB2", 1000],
  ["vitamin-pp_100g", "vitaminB3", 1000],
  ["vitamin-b6_100g", "vitaminB6", 1000],
  ["vitamin-b9_100g", "vitaminB9", 1000],
  ["folates_100g", "vitaminB9", 1000],
  ["vitamin-b12_100g", "vitaminB12", 1000],
  ["vitamin-c_100g", "vitaminC", 1000],
  ["vitamin-d_100g", "vitaminD", 1000],
  ["vitamin-e_100g", "vitaminE", 1000],
  ["vitamin-k_100g", "vitaminK", 1000],

  // Minerals - OFF stores in g. Multiply by 1000 to get mg.
  ["calcium_100g", "calcium", 1000],
  ["iron_100g", "iron", 1000],
  ["magnesium_100g", "magnesium", 1000],
  ["zinc_100g", "zinc", 1000],
  ["potassium_100g", "potassium", 1000],
  ["phosphorus_100g", "phosphorus", 1000],
  ["selenium_100g", "selenium", 1000],
  ["iodine_100g", "iodine", 1000],

  // Fats
  ["omega-3-fat_100g", "omega3", 1],

  // Hydration - OFF doesn't have a water field for solid foods
];

function num(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function nutriscoreToCategory(grade?: string): FoodCategory {
  if (!grade) return "neutral";
  const g = grade.toLowerCase();
  if (g === "a" || g === "b") return "good";
  if (g === "d" || g === "e") return "bad";
  return "neutral";
}

function effectsFor(category: FoodCategory, protein: number, fiber: number, sugar: number): Partial<Record<StatKey, number>> {
  if (category === "good") {
    let health = 4;
    if (protein > 15) health += 2;
    if (fiber > 5) health += 2;
    const fitness = protein > 15 ? 2 : 0;
    return { health, ...(fitness ? { fitness } : {}) };
  }
  if (category === "bad") {
    let health = -4;
    if (sugar > 20) health -= 3;
    return { health };
  }
  return {};
}

function pickName(p: OFFProduct): string {
  return p.product_name_de || p.product_name || "Unbenanntes Produkt";
}

function pickImage(p: OFFProduct): string | undefined {
  return p.image_front_thumb_url || p.image_thumb_url || p.image_small_url;
}

function toSnapshot(p: OFFProduct): FoodSnapshot | null {
  const nutr = p.nutriments;
  if (!nutr) return null;
  const per100g: Partial<Record<NutrientKey, number>> = {};
  for (const [offKey, ourKey, mult] of NUTRIMENT_MAP) {
    const v = num(nutr[offKey]);
    if (v !== undefined && v >= 0) {
      // Some OFF entries already store mg directly when the original label was in mg.
      // We bias toward correctness for macros (kept in g) and apply multiplier for micros.
      per100g[ourKey] = v * mult;
    }
  }
  // Ignore products without any nutrition data
  if (Object.keys(per100g).length < 3) return null;

  const category = nutriscoreToCategory(p.nutriscore_grade);
  const protein = per100g.protein || 0;
  const fiber = per100g.fiber || 0;
  const sugar = per100g.sugar || 0;

  return {
    name: pickName(p),
    brand: p.brands?.split(",")[0]?.trim() || undefined,
    imageUrl: pickImage(p),
    category,
    per100g,
    effects: effectsFor(category, protein, fiber, sugar),
    source: "off",
    externalId: p.code,
  };
}

export async function searchFoods(query: string, signal?: AbortSignal): Promise<FoodSnapshot[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const params = new URLSearchParams({
    search_terms: q,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "20",
    fields: FIELDS,
    lc: "de",
  });
  const url = `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`OFF API ${res.status}`);
  const data = (await res.json()) as OFFSearchResponse;
  const products = data.products || [];
  return products
    .map(toSnapshot)
    .filter((s): s is FoodSnapshot => s !== null);
}

export async function lookupBarcode(code: string, signal?: AbortSignal): Promise<FoodSnapshot | null> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}?fields=${FIELDS}`;
  const res = await fetch(url, { signal });
  if (!res.ok) return null;
  const data = (await res.json()) as { product?: OFFProduct; status?: number };
  if (data.status !== 1 || !data.product) return null;
  return toSnapshot(data.product);
}
