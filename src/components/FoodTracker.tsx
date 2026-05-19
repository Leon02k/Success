import { useMemo, useState } from "react";
import { FOODS, FOODS_BY_ID } from "../data/foods";
import { useStore } from "../store/useStore";
import { isToday } from "../lib/nutrition";

export function FoodTracker() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "good" | "bad">("all");
  const addFood = useStore((s) => s.addFood);
  const removeFood = useStore((s) => s.removeFood);
  const foodLog = useStore((s) => s.foodLog);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOODS.filter((f) => {
      if (filter !== "all" && f.category !== filter) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, filter]);

  const today = foodLog.filter((e) => isToday(e.timestamp)).slice().reverse();

  return (
    <div className="panel">
      <h2 className="panel-title">// NAHRUNGSAUFNAHME</h2>

      <div className="food-controls">
        <input
          className="search"
          placeholder="Lebensmittel suchen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-tabs">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Alle
          </button>
          <button
            className={filter === "good" ? "active" : ""}
            onClick={() => setFilter("good")}
          >
            ↑ Gut
          </button>
          <button
            className={filter === "bad" ? "active" : ""}
            onClick={() => setFilter("bad")}
          >
            ↓ Schlecht
          </button>
        </div>
      </div>

      <div className="food-grid">
        {filtered.map((f) => (
          <FoodCard
            key={f.id}
            id={f.id}
            onAdd={(grams) => addFood(f.id, grams)}
          />
        ))}
      </div>

      <h3 className="section-title">Heute gegessen</h3>
      {today.length === 0 && (
        <div className="empty">Noch nichts protokolliert.</div>
      )}
      <ul className="today-list">
        {today.map((entry) => {
          const food = FOODS_BY_ID[entry.foodId];
          if (!food) return null;
          const time = new Date(entry.timestamp).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <li key={entry.id} className={`today-row cat-${food.category}`}>
              <span className="emoji">{food.emoji}</span>
              <span className="name">{food.name}</span>
              <span className="grams">{entry.grams}g</span>
              <span className="time">{time}</span>
              <button
                className="remove"
                onClick={() => removeFood(entry.id)}
                aria-label="entfernen"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FoodCard({
  id,
  onAdd,
}: {
  id: string;
  onAdd: (grams: number) => void;
}) {
  const food = FOODS_BY_ID[id];
  const [grams, setGrams] = useState<number>(food.defaultGrams);

  if (!food) return null;
  return (
    <div className={`food-card cat-${food.category}`}>
      <div className="food-card-head">
        <span className="emoji">{food.emoji}</span>
        <span className="name">{food.name}</span>
      </div>
      <div className="food-card-meta">
        {food.per100g.calories !== undefined && (
          <span>{Math.round((food.per100g.calories * grams) / 100)} kcal</span>
        )}
        {food.per100g.protein !== undefined && (
          <span>{Math.round((food.per100g.protein * grams) / 100)}g P</span>
        )}
      </div>
      <div className="food-card-controls">
        <input
          type="number"
          min={1}
          step={10}
          value={grams}
          onChange={(e) => setGrams(Math.max(1, Number(e.target.value) || 0))}
        />
        <span className="unit">g</span>
        <button className="add-btn" onClick={() => onAdd(grams)}>
          +
        </button>
      </div>
    </div>
  );
}
