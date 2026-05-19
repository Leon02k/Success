import { useState } from "react";
import { StatusWindow } from "./components/StatusWindow";
import { EffectsPanel } from "./components/EffectsPanel";
import { FoodTracker } from "./components/FoodTracker";
import { NutrientPanel } from "./components/NutrientPanel";
import { ActivityTracker } from "./components/ActivityTracker";
import { LogBook } from "./components/LogBook";
import { useStore } from "./store/useStore";

type Tab = "status" | "food" | "quests" | "log";

const TABS: Array<{ id: Tab; label: string; icon: string }> = [
  { id: "status", label: "Status", icon: "◈" },
  { id: "food", label: "Nahrung", icon: "🍽" },
  { id: "quests", label: "Quests", icon: "⚔" },
  { id: "log", label: "Logbuch", icon: "📜" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("status");
  const reset = useStore((s) => s.reset);

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">▲</span>
          <span className="brand-name">SUCCESS</span>
          <span className="brand-sub">// Self-Improvement System</span>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <button
          className="reset-btn"
          onClick={() => {
            if (confirm("Alle Daten zurücksetzen?")) reset();
          }}
        >
          Reset
        </button>
      </header>

      <main className="app-main">
        {tab === "status" && (
          <>
            <StatusWindow />
            <EffectsPanel />
          </>
        )}
        {tab === "food" && (
          <div className="two-col">
            <FoodTracker />
            <NutrientPanel />
          </div>
        )}
        {tab === "quests" && <ActivityTracker />}
        {tab === "log" && <LogBook />}
      </main>

      <footer className="app-footer">
        ARISE. // Werde stärker, jeden Tag.
      </footer>
    </div>
  );
}
