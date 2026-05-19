# SUCCESS // Self-Improvement Tracker

Gamifizierte Self-Improvement App im RPG/litRPG-Stil. Tracke alle Bereiche deines Lebens, sieh Buffs/Debuffs in Echtzeit und bekomme tägliche Insights aus deinem Logbuch.

## Features

- **Status Window**: 6 Lebensbereiche mit Level/XP-System (Gesundheit, Stärke, Geist, Disziplin, Wissen, Charisma)
- **Aufstiegs-Rang**: E → D → C → B → A → S basierend auf Gesamt-Level
- **Nahrungs-Tracker**: Vorgepflegte Datenbank mit gesunden & ungesunden Lebensmitteln
- **Nährstoff-Anzeige**: Live-Tracking von Makros, Vitaminen & Mineralien gegen Tagesbedarf
- **Buff/Debuff-System**: Gutes Essen gibt temporäre Boosts, schlechtes Essen Debuffs
- **Quests**: Aktivitäten (Workout, Meditation, Deep Work, ...) geben XP
- **Logbuch**: Täglicher Eintrag + automatische Insights, z. B. "Du fühlst dich schlapp - Vitamin D liegt bei nur 23%"

## Tech

- React 18 + TypeScript
- Vite
- Zustand mit `persist` Middleware → LocalStorage
- Kein Backend, keine API-Keys

## Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:5173

## Build

```bash
npm run build
npm run preview
```
