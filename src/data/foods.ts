import type { Food } from "../types";

// Per-100g nutrient values. Vitamins/minerals in mg unless noted.
// Omega-3 in grams. Sourced from USDA SR Legacy / DGE / BLS Bundeslebensmittelschlüssel.
// All entries include macros + most relevant micronutrients.

function food(f: Food): Food {
  return f;
}

export const FOODS: Food[] = [
  // ============================ PROTEIN: FISH / SEAFOOD ============================
  food({
    id: "salmon", name: "Lachs", emoji: "🐟", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 208, protein: 20, fat: 13, saturatedFat: 3.1, omega3: 2.3,
      vitaminD: 0.011, vitaminB12: 0.0032, vitaminB6: 0.6, vitaminB3: 8.7,
      magnesium: 29, potassium: 363, phosphorus: 252, selenium: 0.036,
    },
    effects: { health: 12, mental: 5 },
    buff: "Omega-3 Fokus (+4 Geist für 4h)",
  }),
  food({
    id: "tuna", name: "Thunfisch", emoji: "🐟", category: "good", source: "curated",
    defaultGrams: 120,
    per100g: {
      calories: 144, protein: 30, fat: 1, omega3: 1.3,
      vitaminD: 0.0057, vitaminB12: 0.0094, vitaminB3: 22, selenium: 0.090,
      potassium: 444, phosphorus: 254,
    },
    effects: { health: 11, fitness: 4 },
  }),
  food({
    id: "mackerel", name: "Makrele", emoji: "🐟", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 205, protein: 19, fat: 14, saturatedFat: 3.3, omega3: 2.7,
      vitaminD: 0.0162, vitaminB12: 0.0089, selenium: 0.044, magnesium: 76,
    },
    effects: { health: 13, mental: 5 },
    buff: "Omega-3 Fokus (+4 Geist für 4h)",
  }),
  food({
    id: "sardines", name: "Sardinen", emoji: "🐟", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 208, protein: 25, fat: 11, omega3: 1.5,
      vitaminD: 0.0048, vitaminB12: 0.0089, calcium: 382, iron: 2.9,
      selenium: 0.052, phosphorus: 490, potassium: 397,
    },
    effects: { health: 12, fitness: 4 },
  }),
  food({
    id: "shrimp", name: "Garnelen", emoji: "🦐", category: "good", source: "curated",
    defaultGrams: 120,
    per100g: {
      calories: 99, protein: 24, fat: 0.3, iodine: 0.035,
      vitaminB12: 0.0011, selenium: 0.040, zinc: 1.6, calcium: 70, iron: 0.5,
    },
    effects: { health: 8, fitness: 3 },
  }),

  // ============================ PROTEIN: MEAT ============================
  food({
    id: "chicken_breast", name: "Hähnchenbrust", emoji: "🍗", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 165, protein: 31, fat: 3.6, vitaminB3: 13.7, vitaminB6: 0.6,
      vitaminB12: 0.0003, iron: 1, zinc: 1, magnesium: 29,
      potassium: 256, phosphorus: 228, selenium: 0.027,
    },
    effects: { health: 8, fitness: 7 },
    buff: "Muskelaufbau (+5 Stärke für 6h)",
  }),
  food({
    id: "beef_lean", name: "Rindfleisch (mager)", emoji: "🥩", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 217, protein: 26, fat: 12, saturatedFat: 4.8,
      iron: 2.6, zinc: 6.3, vitaminB12: 0.0027, vitaminB6: 0.5, vitaminB3: 5.5,
      selenium: 0.025, potassium: 318, phosphorus: 200,
    },
    effects: { health: 8, fitness: 8 },
    buff: "Eisen Boost (+4 Stärke für 4h)",
  }),
  food({
    id: "turkey", name: "Putenbrust", emoji: "🦃", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 135, protein: 30, fat: 1, vitaminB3: 10, vitaminB6: 0.8,
      selenium: 0.031, zinc: 1.7, potassium: 305, phosphorus: 230,
    },
    effects: { health: 8, fitness: 6 },
  }),
  food({
    id: "pork_loin", name: "Schweinefilet", emoji: "🥩", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 143, protein: 26, fat: 4, vitaminB1: 0.86, vitaminB6: 0.9,
      vitaminB12: 0.0007, zinc: 2.4, selenium: 0.040, potassium: 423,
    },
    effects: { health: 7, fitness: 5 },
  }),

  // ============================ PROTEIN: EGGS / DAIRY ============================
  food({
    id: "eggs", name: "Eier", emoji: "🥚", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 155, protein: 13, fat: 11, saturatedFat: 3.3,
      vitaminD: 0.002, vitaminB12: 0.0009, vitaminB2: 0.46, vitaminA: 0.16,
      iron: 1.2, zinc: 1.3, selenium: 0.030,
      phosphorus: 198, potassium: 138,
    },
    effects: { health: 7, fitness: 4 },
  }),
  food({
    id: "greek_yogurt", name: "Griechischer Joghurt", emoji: "🥛", category: "good", source: "curated",
    defaultGrams: 200,
    per100g: {
      calories: 97, protein: 9, carbs: 4, fat: 5, calcium: 110,
      vitaminB12: 0.0008, vitaminB2: 0.28, potassium: 141, phosphorus: 135,
    },
    effects: { health: 5, fitness: 2 },
  }),
  food({
    id: "cottage_cheese", name: "Hüttenkäse", emoji: "🧀", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 98, protein: 11, fat: 4.3, carbs: 3.4,
      calcium: 83, vitaminB12: 0.0008, vitaminB2: 0.16, selenium: 0.020, phosphorus: 159,
    },
    effects: { health: 6, fitness: 4 },
  }),
  food({
    id: "skyr", name: "Skyr", emoji: "🥛", category: "good", source: "curated",
    defaultGrams: 200,
    per100g: {
      calories: 63, protein: 11, fat: 0.2, carbs: 4, calcium: 150,
      vitaminB12: 0.0005, vitaminB2: 0.2,
    },
    effects: { health: 6, fitness: 4 },
  }),
  food({
    id: "milk", name: "Milch (1.5%)", emoji: "🥛", category: "good", source: "curated",
    defaultGrams: 250,
    per100g: {
      calories: 47, protein: 3.3, fat: 1.5, carbs: 4.8, sugar: 4.8,
      calcium: 122, vitaminD: 0.0012, vitaminB12: 0.0005, vitaminB2: 0.17, iodine: 0.012,
      potassium: 150, phosphorus: 95,
    },
    effects: { health: 4 },
  }),
  food({
    id: "parmesan", name: "Parmesan", emoji: "🧀", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 392, protein: 36, fat: 26, saturatedFat: 17,
      calcium: 1184, vitaminB12: 0.0012, zinc: 2.8, selenium: 0.022,
      salt: 1.8, phosphorus: 694,
    },
    effects: { health: 3, fitness: 3 },
  }),

  // ============================ PROTEIN: PLANT ============================
  food({
    id: "tofu", name: "Tofu", emoji: "🥡", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 144, protein: 17, carbs: 3, fat: 9,
      calcium: 350, iron: 2.7, magnesium: 58, zinc: 1.6, selenium: 0.018,
      phosphorus: 190,
    },
    effects: { health: 7, fitness: 4 },
  }),
  food({
    id: "tempeh", name: "Tempeh", emoji: "🥡", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 192, protein: 20, carbs: 8, fat: 11, fiber: 9,
      iron: 2.7, magnesium: 81, calcium: 111, zinc: 1.1, vitaminB2: 0.36,
    },
    effects: { health: 8, fitness: 5 },
  }),
  food({
    id: "lentils", name: "Linsen (gekocht)", emoji: "🫘", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 116, protein: 9, carbs: 20, fiber: 7.9,
      iron: 3.3, magnesium: 36, zinc: 1.3, vitaminB9: 0.181,
      potassium: 369, phosphorus: 180, vitaminB1: 0.17,
    },
    effects: { health: 9, fitness: 3 },
    buff: "Eisen Boost (+3 Stärke für 4h)",
  }),
  food({
    id: "chickpeas", name: "Kichererbsen (gekocht)", emoji: "🫘", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 164, protein: 8.9, carbs: 27, fiber: 7.6,
      iron: 2.9, magnesium: 48, zinc: 1.5, vitaminB9: 0.172, potassium: 291,
    },
    effects: { health: 8, fitness: 3 },
  }),
  food({
    id: "black_beans", name: "Schwarze Bohnen", emoji: "🫘", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 132, protein: 8.9, carbs: 24, fiber: 8.7,
      iron: 2.1, magnesium: 70, vitaminB9: 0.149, potassium: 355,
    },
    effects: { health: 8 },
  }),
  food({
    id: "kidney_beans", name: "Kidneybohnen", emoji: "🫘", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 127, protein: 8.7, carbs: 23, fiber: 6.4,
      iron: 2.2, magnesium: 45, potassium: 405, vitaminB9: 0.130,
    },
    effects: { health: 8 },
  }),
  food({
    id: "edamame", name: "Edamame", emoji: "🫛", category: "good", source: "curated",
    defaultGrams: 120,
    per100g: {
      calories: 122, protein: 11, carbs: 10, fiber: 5,
      vitaminK: 0.027, vitaminB9: 0.311, iron: 2.3, magnesium: 64, calcium: 63,
    },
    effects: { health: 8, fitness: 3 },
  }),

  // ============================ VEGETABLES ============================
  food({
    id: "spinach", name: "Spinat", emoji: "🥬", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 23, protein: 2.9, carbs: 3.6, fiber: 2.2,
      vitaminA: 0.469, vitaminC: 28, vitaminE: 2, vitaminK: 0.483, vitaminB9: 0.194,
      iron: 2.7, magnesium: 79, calcium: 99, potassium: 558,
    },
    effects: { health: 9 },
    buff: "Eisen Boost (+3 Stärke für 4h)",
  }),
  food({
    id: "kale", name: "Grünkohl", emoji: "🥬", category: "good", source: "curated",
    defaultGrams: 80,
    per100g: {
      calories: 35, protein: 2.9, carbs: 4.4, fiber: 4.1,
      vitaminA: 0.500, vitaminC: 93, vitaminK: 0.704, calcium: 254, magnesium: 33,
    },
    effects: { health: 10 },
    buff: "Antioxidantien (+3 Geist für 3h)",
  }),
  food({
    id: "broccoli", name: "Brokkoli", emoji: "🥦", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 34, protein: 2.8, carbs: 7, fiber: 2.6,
      vitaminC: 89, vitaminA: 0.031, vitaminK: 0.102, vitaminB9: 0.063,
      calcium: 47, iron: 0.7, potassium: 316, magnesium: 21,
    },
    effects: { health: 9 },
  }),
  food({
    id: "brussels_sprouts", name: "Rosenkohl", emoji: "🥬", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 43, protein: 3.4, carbs: 9, fiber: 3.8,
      vitaminC: 85, vitaminK: 0.177, vitaminB9: 0.061, potassium: 389,
    },
    effects: { health: 8 },
  }),
  food({
    id: "cauliflower", name: "Blumenkohl", emoji: "🥦", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 25, protein: 1.9, carbs: 5, fiber: 2,
      vitaminC: 48, vitaminB9: 0.057, vitaminK: 0.016, potassium: 299,
    },
    effects: { health: 7 },
  }),
  food({
    id: "bell_pepper", name: "Paprika (rot)", emoji: "🫑", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 31, protein: 1, carbs: 6, fiber: 2.1,
      vitaminC: 128, vitaminA: 0.157, vitaminB6: 0.29, vitaminE: 1.6, potassium: 211,
    },
    effects: { health: 7 },
  }),
  food({
    id: "carrot", name: "Karotten", emoji: "🥕", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 41, protein: 0.9, carbs: 10, fiber: 2.8,
      vitaminA: 0.835, vitaminC: 5.9, vitaminK: 0.013, potassium: 320,
    },
    effects: { health: 5 },
  }),
  food({
    id: "tomato", name: "Tomate", emoji: "🍅", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 18, protein: 0.9, carbs: 3.9, fiber: 1.2,
      vitaminC: 13.7, vitaminA: 0.042, vitaminK: 0.008, potassium: 237,
    },
    effects: { health: 4 },
  }),
  food({
    id: "cucumber", name: "Gurke", emoji: "🥒", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 15, protein: 0.7, carbs: 3.6, fiber: 0.5,
      water: 95, vitaminK: 0.016, potassium: 147,
    },
    effects: { health: 3 },
  }),
  food({
    id: "avocado", name: "Avocado", emoji: "🥑", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 160, protein: 2, carbs: 9, fat: 15, saturatedFat: 2.1, fiber: 7,
      vitaminE: 2.1, vitaminK: 0.021, vitaminB6: 0.26, vitaminB9: 0.081,
      magnesium: 29, potassium: 485,
    },
    effects: { health: 8, mental: 3 },
  }),
  food({
    id: "sweet_potato", name: "Süßkartoffel", emoji: "🍠", category: "good", source: "curated",
    defaultGrams: 200,
    per100g: {
      calories: 86, protein: 1.6, carbs: 20, fiber: 3,
      vitaminA: 0.709, vitaminC: 2.4, vitaminB6: 0.21, potassium: 337,
    },
    effects: { health: 6, fitness: 4 },
  }),
  food({
    id: "potato", name: "Kartoffel", emoji: "🥔", category: "neutral", source: "curated",
    defaultGrams: 200,
    per100g: {
      calories: 77, protein: 2, carbs: 17, fiber: 2.2,
      vitaminC: 19, vitaminB6: 0.30, potassium: 425, magnesium: 23,
    },
    effects: { health: 3 },
  }),
  food({
    id: "beetroot", name: "Rote Bete", emoji: "🟣", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 43, protein: 1.6, carbs: 10, fiber: 2.8,
      vitaminB9: 0.109, potassium: 325, iron: 0.8, magnesium: 23,
    },
    effects: { health: 7, fitness: 3 },
  }),
  food({
    id: "garlic", name: "Knoblauch", emoji: "🧄", category: "good", source: "curated",
    defaultGrams: 10,
    per100g: {
      calories: 149, protein: 6.4, carbs: 33, fiber: 2.1,
      vitaminC: 31, vitaminB6: 1.2, selenium: 0.014, calcium: 181,
    },
    effects: { health: 4 },
  }),
  food({
    id: "onion", name: "Zwiebel", emoji: "🧅", category: "good", source: "curated",
    defaultGrams: 50,
    per100g: {
      calories: 40, protein: 1.1, carbs: 9, fiber: 1.7,
      vitaminC: 7.4, vitaminB6: 0.12, potassium: 146,
    },
    effects: { health: 3 },
  }),
  food({
    id: "mushrooms", name: "Champignons", emoji: "🍄", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 22, protein: 3.1, carbs: 3.3, fiber: 1,
      vitaminD: 0.0002, vitaminB2: 0.4, vitaminB3: 3.6, selenium: 0.009, potassium: 318,
    },
    effects: { health: 5 },
  }),
  food({
    id: "seaweed", name: "Algen (Nori)", emoji: "🌿", category: "good", source: "curated",
    defaultGrams: 5,
    per100g: {
      calories: 35, protein: 6, carbs: 5, fiber: 0.3,
      iodine: 1.470, vitaminA: 0.260, vitaminB12: 0.0003,
      iron: 1.8, calcium: 70, magnesium: 2,
    },
    effects: { health: 6 },
    buff: "Jod Boost (+3 Geist für 4h)",
  }),

  // ============================ FRUITS ============================
  food({
    id: "blueberries", name: "Heidelbeeren", emoji: "🫐", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 57, carbs: 14, sugar: 10, fiber: 2.4,
      vitaminC: 9.7, vitaminE: 0.6, vitaminK: 0.019,
    },
    effects: { health: 6, mental: 4 },
    buff: "Antioxidantien (+3 Geist für 3h)",
  }),
  food({
    id: "strawberries", name: "Erdbeeren", emoji: "🍓", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 32, carbs: 7.7, sugar: 4.9, fiber: 2,
      vitaminC: 59, vitaminB9: 0.024,
    },
    effects: { health: 5 },
  }),
  food({
    id: "banana", name: "Banane", emoji: "🍌", category: "good", source: "curated",
    defaultGrams: 120,
    per100g: {
      calories: 89, carbs: 23, sugar: 12, fiber: 2.6, protein: 1.1,
      vitaminC: 8.7, vitaminB6: 0.37, potassium: 358, magnesium: 27,
    },
    effects: { health: 4, fitness: 2 },
  }),
  food({
    id: "apple", name: "Apfel", emoji: "🍎", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 52, carbs: 14, sugar: 10, fiber: 2.4,
      vitaminC: 4.6, potassium: 107,
    },
    effects: { health: 4 },
  }),
  food({
    id: "orange", name: "Orange", emoji: "🍊", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 47, carbs: 12, sugar: 9, fiber: 2.4,
      vitaminC: 53, calcium: 40, vitaminB9: 0.030, potassium: 181,
    },
    effects: { health: 5 },
  }),
  food({
    id: "kiwi", name: "Kiwi", emoji: "🥝", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 61, carbs: 15, sugar: 9, fiber: 3,
      vitaminC: 93, vitaminK: 0.040, potassium: 312, vitaminE: 1.5,
    },
    effects: { health: 6 },
  }),
  food({
    id: "raspberries", name: "Himbeeren", emoji: "🍒", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 52, carbs: 12, sugar: 4.4, fiber: 6.5,
      vitaminC: 26, vitaminK: 0.008, vitaminE: 0.9,
    },
    effects: { health: 5, mental: 2 },
  }),
  food({
    id: "mango", name: "Mango", emoji: "🥭", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 60, carbs: 15, sugar: 14, fiber: 1.6,
      vitaminC: 36, vitaminA: 0.054, vitaminB6: 0.12, potassium: 168,
    },
    effects: { health: 5 },
  }),
  food({
    id: "pineapple", name: "Ananas", emoji: "🍍", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 50, carbs: 13, sugar: 9.9, fiber: 1.4,
      vitaminC: 48, vitaminB6: 0.11, potassium: 109,
    },
    effects: { health: 5 },
  }),
  food({
    id: "grapes", name: "Weintrauben", emoji: "🍇", category: "neutral", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 69, carbs: 18, sugar: 16, fiber: 0.9,
      vitaminC: 3.2, vitaminK: 0.015, potassium: 191,
    },
    effects: { health: 3 },
  }),
  food({
    id: "watermelon", name: "Wassermelone", emoji: "🍉", category: "good", source: "curated",
    defaultGrams: 200,
    per100g: {
      calories: 30, carbs: 8, sugar: 6, fiber: 0.4,
      vitaminA: 0.028, vitaminC: 8.1, water: 91, potassium: 112,
    },
    effects: { health: 4 },
  }),
  food({
    id: "dates", name: "Datteln", emoji: "🌴", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 277, carbs: 75, sugar: 66, fiber: 6.7, protein: 1.8,
      potassium: 696, magnesium: 54, vitaminB6: 0.25, iron: 1,
    },
    effects: { health: 3, fitness: 2 },
  }),

  // ============================ GRAINS / CARBS ============================
  food({
    id: "oats", name: "Haferflocken", emoji: "🥣", category: "good", source: "curated",
    defaultGrams: 60,
    per100g: {
      calories: 389, protein: 17, carbs: 66, fiber: 11, fat: 7,
      iron: 4.7, magnesium: 177, zinc: 4, vitaminB1: 0.76, vitaminB6: 0.12,
      potassium: 429, phosphorus: 523, selenium: 0.029,
    },
    effects: { health: 8, fitness: 3 },
  }),
  food({
    id: "brown_rice", name: "Vollkornreis", emoji: "🍚", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 111, protein: 2.6, carbs: 23, fiber: 1.8,
      magnesium: 43, vitaminB3: 1.5, vitaminB6: 0.15, selenium: 0.010, potassium: 43,
    },
    effects: { health: 5 },
  }),
  food({
    id: "white_rice", name: "Weißer Reis", emoji: "🍚", category: "neutral", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 130, protein: 2.7, carbs: 28, fiber: 0.4,
      vitaminB1: 0.07, selenium: 0.009, magnesium: 12,
    },
    effects: { health: 2 },
  }),
  food({
    id: "quinoa", name: "Quinoa", emoji: "🌾", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 120, protein: 4.4, carbs: 21, fiber: 2.8, fat: 1.9,
      iron: 1.5, magnesium: 64, zinc: 1.1, vitaminB9: 0.042, potassium: 172,
    },
    effects: { health: 7, fitness: 2 },
  }),
  food({
    id: "whole_wheat_bread", name: "Vollkornbrot", emoji: "🍞", category: "good", source: "curated",
    defaultGrams: 60,
    per100g: {
      calories: 247, protein: 13, carbs: 41, fiber: 7, fat: 3.4, salt: 1.4,
      iron: 2.5, magnesium: 76, zinc: 1.8, vitaminB1: 0.39, selenium: 0.040,
    },
    effects: { health: 5 },
  }),
  food({
    id: "white_bread", name: "Weißbrot", emoji: "🍞", category: "neutral", source: "curated",
    defaultGrams: 60,
    per100g: {
      calories: 265, protein: 9, carbs: 49, fiber: 2.7, fat: 3.2, salt: 1.2,
      iron: 3.6, calcium: 144,
    },
    effects: { health: 1 },
  }),
  food({
    id: "pasta_whole", name: "Vollkornpasta", emoji: "🍝", category: "good", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 124, protein: 5, carbs: 25, fiber: 3.9, fat: 1.4,
      iron: 1.1, magnesium: 53, vitaminB3: 2.3, selenium: 0.036,
    },
    effects: { health: 5, fitness: 2 },
  }),
  food({
    id: "buckwheat", name: "Buchweizen", emoji: "🌾", category: "good", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 343, protein: 13, carbs: 72, fiber: 10, fat: 3.4,
      iron: 2.2, magnesium: 231, zinc: 2.4, potassium: 460,
    },
    effects: { health: 7, fitness: 2 },
  }),

  // ============================ NUTS / SEEDS ============================
  food({
    id: "almonds", name: "Mandeln", emoji: "🌰", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 579, protein: 21, fat: 50, saturatedFat: 3.8, fiber: 12.5,
      vitaminE: 25, magnesium: 270, calcium: 269, vitaminB2: 1.14,
      iron: 3.7, zinc: 3.1, potassium: 733,
    },
    effects: { health: 6, mental: 3 },
  }),
  food({
    id: "walnuts", name: "Walnüsse", emoji: "🌰", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 654, protein: 15, fat: 65, saturatedFat: 6.1, fiber: 6.7,
      omega3: 9, magnesium: 158, vitaminB6: 0.5, vitaminB9: 0.098,
      potassium: 441,
    },
    effects: { health: 6, mental: 5 },
    buff: "Brainfood (+3 Geist für 4h)",
  }),
  food({
    id: "cashews", name: "Cashews", emoji: "🌰", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 553, protein: 18, fat: 44, fiber: 3.3,
      iron: 6.7, magnesium: 292, zinc: 5.8, vitaminK: 0.034,
    },
    effects: { health: 5, mental: 3 },
  }),
  food({
    id: "peanuts", name: "Erdnüsse", emoji: "🥜", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 567, protein: 26, fat: 49, fiber: 8.5,
      vitaminE: 8.3, magnesium: 168, vitaminB3: 12.1, vitaminB9: 0.240,
    },
    effects: { health: 4, fitness: 2 },
  }),
  food({
    id: "chia_seeds", name: "Chia-Samen", emoji: "🌱", category: "good", source: "curated",
    defaultGrams: 20,
    per100g: {
      calories: 486, protein: 17, fat: 31, fiber: 34, omega3: 17.8,
      calcium: 631, magnesium: 335, iron: 7.7, zinc: 4.6, phosphorus: 860,
    },
    effects: { health: 8, mental: 4 },
    buff: "Omega-3 Fokus (+3 Geist für 4h)",
  }),
  food({
    id: "flax_seeds", name: "Leinsamen", emoji: "🌱", category: "good", source: "curated",
    defaultGrams: 15,
    per100g: {
      calories: 534, protein: 18, fat: 42, fiber: 27, omega3: 22.8,
      magnesium: 392, calcium: 255, iron: 5.7, vitaminB1: 1.6,
    },
    effects: { health: 7, mental: 3 },
  }),
  food({
    id: "pumpkin_seeds", name: "Kürbiskerne", emoji: "🎃", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 559, protein: 30, fat: 49, fiber: 6,
      magnesium: 592, zinc: 7.8, iron: 8.8, potassium: 809,
    },
    effects: { health: 6, fitness: 3 },
  }),
  food({
    id: "sunflower_seeds", name: "Sonnenblumenkerne", emoji: "🌻", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 584, protein: 21, fat: 52, fiber: 8.6,
      vitaminE: 35, magnesium: 325, selenium: 0.053, vitaminB1: 1.5,
    },
    effects: { health: 5, mental: 2 },
  }),
  food({
    id: "peanut_butter", name: "Erdnussbutter", emoji: "🥜", category: "good", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 588, protein: 25, fat: 50, saturatedFat: 10, fiber: 6, sugar: 9,
      vitaminE: 9, magnesium: 154, vitaminB3: 13,
    },
    effects: { health: 4, fitness: 3 },
  }),

  // ============================ FATS / OILS ============================
  food({
    id: "olive_oil", name: "Olivenöl", emoji: "🫒", category: "good", source: "curated",
    defaultGrams: 15,
    per100g: {
      calories: 884, fat: 100, saturatedFat: 14, vitaminE: 14, vitaminK: 0.060,
    },
    effects: { health: 5 },
  }),
  food({
    id: "butter", name: "Butter", emoji: "🧈", category: "neutral", source: "curated",
    defaultGrams: 15,
    per100g: {
      calories: 717, fat: 81, saturatedFat: 51,
      vitaminA: 0.684, vitaminD: 0.0015, vitaminE: 2.3,
    },
    effects: { health: 0 },
  }),

  // ============================ DRINKS ============================
  food({
    id: "water", name: "Wasser (Glas)", emoji: "💧", category: "good", source: "curated",
    defaultGrams: 250,
    per100g: { water: 100 },
    effects: { health: 2 },
  }),
  food({
    id: "green_tea", name: "Grüner Tee", emoji: "🍵", category: "good", source: "curated",
    defaultGrams: 250,
    per100g: { water: 99 },
    effects: { health: 3, mental: 2 },
    buff: "Antioxidantien (+2 Geist für 3h)",
  }),
  food({
    id: "coffee", name: "Kaffee (schwarz)", emoji: "☕", category: "neutral", source: "curated",
    defaultGrams: 250,
    per100g: { water: 99 },
    effects: { mental: 2, productivity: 2 },
    buff: "Wachheit (+2 Disziplin für 2h)",
  }),
  food({
    id: "kefir", name: "Kefir", emoji: "🥛", category: "good", source: "curated",
    defaultGrams: 250,
    per100g: {
      calories: 43, protein: 3.8, carbs: 4.5, fat: 1, calcium: 130,
      vitaminB12: 0.0005, vitaminB2: 0.16,
    },
    effects: { health: 5 },
  }),
  food({
    id: "orange_juice", name: "Orangensaft", emoji: "🧃", category: "neutral", source: "curated",
    defaultGrams: 250,
    per100g: {
      calories: 45, carbs: 10, sugar: 8.4, fiber: 0.2,
      vitaminC: 50, vitaminB9: 0.030, potassium: 200, water: 88,
    },
    effects: { health: 2 },
  }),

  // ============================ NEGATIVE / PROCESSED ============================
  food({
    id: "pizza", name: "Pizza Margherita", emoji: "🍕", category: "bad", source: "curated",
    defaultGrams: 300,
    per100g: {
      calories: 266, protein: 11, carbs: 33, fat: 10, saturatedFat: 4.5, sugar: 4, salt: 1.5,
      calcium: 188,
    },
    effects: { health: -8, fitness: -3 },
    debuff: "Träge (-3 Disziplin für 4h)",
  }),
  food({
    id: "burger", name: "Cheeseburger", emoji: "🍔", category: "bad", source: "curated",
    defaultGrams: 250,
    per100g: {
      calories: 303, protein: 16, carbs: 31, fat: 14, saturatedFat: 5.8, sugar: 6, salt: 1.7,
    },
    effects: { health: -10, fitness: -2 },
    debuff: "Schwer im Magen (-4 Stärke für 4h)",
  }),
  food({
    id: "fries", name: "Pommes", emoji: "🍟", category: "bad", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 312, protein: 3.4, carbs: 41, fat: 15, saturatedFat: 2.3, sugar: 0.3, salt: 0.6,
    },
    effects: { health: -7 },
    debuff: "Fettig (-2 Geist für 3h)",
  }),
  food({
    id: "kebab", name: "Döner", emoji: "🌯", category: "neutral", source: "curated",
    defaultGrams: 400,
    per100g: {
      calories: 215, protein: 12, carbs: 19, fat: 11, saturatedFat: 4, salt: 1.3,
    },
    effects: { health: -2, fitness: 1 },
  }),
  food({
    id: "soda", name: "Cola", emoji: "🥤", category: "bad", source: "curated",
    defaultGrams: 330,
    per100g: {
      calories: 42, carbs: 11, sugar: 10.6,
    },
    effects: { health: -6 },
    debuff: "Zucker Crash (-3 Disziplin für 2h)",
  }),
  food({
    id: "energy_drink", name: "Energy Drink", emoji: "⚡", category: "bad", source: "curated",
    defaultGrams: 250,
    per100g: {
      calories: 45, carbs: 11, sugar: 11,
      vitaminB6: 2, vitaminB12: 0.0002,
    },
    effects: { health: -5, mental: 2, productivity: 2 },
    buff: "Wachheit (+3 Disziplin für 2h)",
    debuff: "Zucker Crash (-4 Disziplin nach 3h)",
  }),
  food({
    id: "chocolate_dark", name: "Zartbitterschokolade (70%)", emoji: "🍫", category: "neutral", source: "curated",
    defaultGrams: 30,
    per100g: {
      calories: 598, carbs: 46, sugar: 24, fat: 43, saturatedFat: 24, fiber: 11,
      magnesium: 228, iron: 11.9, potassium: 715,
    },
    effects: { health: 1, mental: 3 },
  }),
  food({
    id: "chocolate", name: "Schokolade (Milch)", emoji: "🍫", category: "bad", source: "curated",
    defaultGrams: 50,
    per100g: {
      calories: 546, carbs: 59, sugar: 52, fat: 31, saturatedFat: 19, magnesium: 63,
    },
    effects: { health: -4, mental: 2 },
  }),
  food({
    id: "donut", name: "Donut", emoji: "🍩", category: "bad", source: "curated",
    defaultGrams: 60,
    per100g: {
      calories: 452, carbs: 51, sugar: 23, fat: 25, saturatedFat: 7.4,
    },
    effects: { health: -6, fitness: -2 },
    debuff: "Zucker Crash (-2 Disziplin für 2h)",
  }),
  food({
    id: "chips", name: "Kartoffelchips", emoji: "🍿", category: "bad", source: "curated",
    defaultGrams: 50,
    per100g: {
      calories: 536, protein: 7, carbs: 53, fat: 35, saturatedFat: 4, salt: 1.5,
    },
    effects: { health: -5 },
    debuff: "Salzig (-2 Geist für 3h)",
  }),
  food({
    id: "ice_cream", name: "Eiscreme", emoji: "🍦", category: "bad", source: "curated",
    defaultGrams: 100,
    per100g: {
      calories: 207, carbs: 24, sugar: 21, fat: 11, saturatedFat: 6.8, protein: 3.5,
      calcium: 128,
    },
    effects: { health: -4 },
  }),
  food({
    id: "beer", name: "Bier", emoji: "🍺", category: "bad", source: "curated",
    defaultGrams: 500,
    per100g: {
      calories: 43, carbs: 3.6, water: 90,
    },
    effects: { health: -5, mental: -3, productivity: -4 },
    debuff: "Benebelt (-5 Geist für 8h)",
  }),
  food({
    id: "wine", name: "Wein", emoji: "🍷", category: "bad", source: "curated",
    defaultGrams: 150,
    per100g: {
      calories: 83, carbs: 2.6,
    },
    effects: { health: -4, mental: -2, productivity: -3 },
    debuff: "Benebelt (-4 Geist für 6h)",
  }),
];

export const FOODS_BY_ID: Record<string, Food> = Object.fromEntries(
  FOODS.map((f) => [f.id, f]),
);
