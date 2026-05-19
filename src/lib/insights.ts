import { NUTRIENT_META, RDA } from "../data/nutrients";
import type { Nutrients, NutrientKey } from "../types";

export type Insight = {
  severity: "info" | "warn" | "alert";
  nutrient?: NutrientKey;
  message: string;
};

// Map deficiencies to likely felt symptoms.
const SYMPTOMS: Partial<Record<NutrientKey, string>> = {
  vitaminD: "Müdigkeit, gedrückte Stimmung und schwache Muskeln",
  vitaminB1: "Müdigkeit, Reizbarkeit und Konzentrationsprobleme",
  vitaminB2: "rissige Mundwinkel und Lichtempfindlichkeit",
  vitaminB3: "Hautprobleme und Verdauungsbeschwerden",
  vitaminB6: "schlechte Stimmung und Schlafprobleme",
  vitaminB9: "Müdigkeit und Konzentrationsstörungen",
  vitaminB12: "Konzentrationsprobleme, Müdigkeit, kribbelnde Hände",
  vitaminC: "anfälliges Immunsystem und langsame Wundheilung",
  vitaminA: "trockene Augen, schlechte Sicht bei Dunkelheit",
  vitaminE: "schwache Muskeln und brüchige Haut",
  vitaminK: "verlangsamte Blutgerinnung und schwache Knochen",
  iron: "Erschöpfung, Blässe und Schwindel",
  magnesium: "Muskelkrämpfe, innere Unruhe und Schlafprobleme",
  zinc: "schlechte Wundheilung und geschwächte Abwehr",
  calcium: "schwache Knochen und Zähne",
  potassium: "Muskelschwäche und Herzrhythmusstörungen",
  selenium: "geschwächtes Immunsystem und Schilddrüsenprobleme",
  iodine: "Schilddrüsenprobleme und Antriebslosigkeit",
  omega3: "schlechter Fokus, gedrückte Stimmung",
  protein: "Muskelabbau und Heißhunger",
  fiber: "Verdauungsprobleme und Energietiefs",
  water: "Kopfschmerzen, Müdigkeit und Konzentrationsverlust",
};

export function analyzeDay(
  nutrients: Nutrients,
  mood: number,
): Insight[] {
  const insights: Insight[] = [];
  const deficiencies: Array<{ key: NutrientKey; pct: number }> = [];

  (Object.keys(NUTRIENT_META) as NutrientKey[]).forEach((key) => {
    if (!NUTRIENT_META[key].critical) return;
    const target = RDA[key];
    const pct = (nutrients[key] / target) * 100;
    if (pct < 60) {
      deficiencies.push({ key, pct });
    }
  });

  // Sort by worst deficiency first
  deficiencies.sort((a, b) => a.pct - b.pct);

  if (mood <= 2 && deficiencies.length > 0) {
    const top = deficiencies.slice(0, 2);
    for (const d of top) {
      const symptom = SYMPTOMS[d.key];
      const label = NUTRIENT_META[d.key].label;
      insights.push({
        severity: "alert",
        nutrient: d.key,
        message: symptom
          ? `Du fühlst dich nicht gut. Möglicher Grund: ${label} liegt bei nur ${d.pct.toFixed(0)}% deines Tagesbedarfs - das kann ${symptom} verursachen.`
          : `${label} liegt bei nur ${d.pct.toFixed(0)}% deines Tagesbedarfs.`,
      });
    }
  } else {
    for (const d of deficiencies.slice(0, 3)) {
      const label = NUTRIENT_META[d.key].label;
      insights.push({
        severity: d.pct < 30 ? "alert" : "warn",
        nutrient: d.key,
        message: `${label}: ${d.pct.toFixed(0)}% des Tagesbedarfs.${SYMPTOMS[d.key] ? ` Mangel kann ${SYMPTOMS[d.key]} verursachen.` : ""}`,
      });
    }
  }

  if (nutrients.sugar > RDA.sugar * 1.5) {
    insights.push({
      severity: "warn",
      message: `Hoher Zuckerkonsum heute (${nutrients.sugar.toFixed(0)}g). Das kann Energietiefs und schlechte Laune am nächsten Tag verursachen.`,
    });
  }

  if (mood >= 4 && deficiencies.length === 0) {
    insights.push({
      severity: "info",
      message: "Starker Tag. Alle kritischen Nährstoffe im grünen Bereich - weiter so.",
    });
  }

  if (insights.length === 0) {
    insights.push({
      severity: "info",
      message: "Solider Tag. Keine größeren Nährstofflücken erkannt.",
    });
  }

  return insights;
}
