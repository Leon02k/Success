import type { Activity } from "../types";

export const ACTIVITIES: Activity[] = [
  // Fitness
  { id: "workout_strength", name: "Krafttraining", emoji: "🏋️", category: "good", stat: "fitness", xp: 25, description: "60 min Gym Session" },
  { id: "workout_cardio", name: "Cardio", emoji: "🏃", category: "good", stat: "fitness", xp: 18, description: "30 min Laufen / Radfahren" },
  { id: "walk", name: "Spaziergang", emoji: "🚶", category: "good", stat: "fitness", xp: 8, description: "30 min an der frischen Luft" },
  { id: "stretch", name: "Dehnen / Yoga", emoji: "🧘", category: "good", stat: "fitness", xp: 10, description: "20 min Mobility" },

  // Mental
  { id: "meditate", name: "Meditation", emoji: "🕯️", category: "good", stat: "mental", xp: 15, description: "10 min Achtsamkeit" },
  { id: "journal", name: "Tagebuch", emoji: "📓", category: "good", stat: "mental", xp: 10, description: "Gedanken sortieren" },
  { id: "sleep_good", name: "8h Schlaf", emoji: "😴", category: "good", stat: "mental", xp: 20, description: "Volle Regeneration" },
  { id: "sleep_bad", name: "Wenig Schlaf", emoji: "🥱", category: "bad", stat: "mental", xp: -15, description: "Unter 6h Schlaf" },

  // Productivity
  { id: "deep_work", name: "Deep Work", emoji: "💻", category: "good", stat: "productivity", xp: 20, description: "90 min fokussiert" },
  { id: "task_done", name: "Aufgabe erledigt", emoji: "✅", category: "good", stat: "productivity", xp: 8, description: "Ein Todo abgehakt" },
  { id: "procrastinate", name: "Aufgeschoben", emoji: "🦥", category: "bad", stat: "productivity", xp: -10, description: "Wichtiges aufgeschoben" },
  { id: "doomscroll", name: "Doomscroll 1h+", emoji: "📱", category: "bad", stat: "productivity", xp: -8, description: "Zeit auf Social Media verschwendet" },

  // Knowledge
  { id: "read_book", name: "Buch lesen (30 min)", emoji: "📖", category: "good", stat: "knowledge", xp: 15, description: "Fokussiertes Lesen" },
  { id: "learn_skill", name: "Skill üben", emoji: "🎯", category: "good", stat: "knowledge", xp: 18, description: "Gezielt eine Fähigkeit trainieren" },
  { id: "course", name: "Kurs / Tutorial", emoji: "🎓", category: "good", stat: "knowledge", xp: 12, description: "Etwas Neues gelernt" },

  // Social
  { id: "deep_talk", name: "Tiefes Gespräch", emoji: "💬", category: "good", stat: "social", xp: 15, description: "Echter Austausch mit jemandem" },
  { id: "help_other", name: "Jemandem geholfen", emoji: "🙌", category: "good", stat: "social", xp: 12, description: "Selbstlos unterstützt" },
  { id: "call_family", name: "Familie anrufen", emoji: "📞", category: "good", stat: "social", xp: 10, description: "Verbindung gepflegt" },
  { id: "isolation", name: "Isolation", emoji: "🚪", category: "bad", stat: "social", xp: -8, description: "Tag komplett allein verbracht" },
];

export const ACTIVITIES_BY_ID: Record<string, Activity> = Object.fromEntries(
  ACTIVITIES.map((a) => [a.id, a]),
);
