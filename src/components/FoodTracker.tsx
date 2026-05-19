import { useEffect, useMemo, useRef, useState } from "react";
import { FOODS } from "../data/foods";
import { useStore } from "../store/useStore";
import { isToday } from "../lib/nutrition";
import { searchFoods } from "../lib/openfoodfacts";
import type { FoodSnapshot } from "../types";

type Tab = "curated" | "search";

export function FoodTracker() {
  const [tab, setTab] = useState<Tab>("curated");
  const foodLog = useStore((s) => s.foodLog);
  const removeFood = useStore((s) => s.removeFood);

  const today = foodLog.filter((e) => isToday(e.timestamp)).slice().reverse();

  return (
    <div className="panel">
      <h2 className="panel-title">// NAHRUNGSAUFNAHME</h2>

      <div className="food-tabs">
        <button
          className={`food-tab ${tab === "curated" ? "active" : ""}`}
          onClick={() => setTab("curated")}
        >
          Schnellauswahl
        </button>
        <button
          className={`food-tab ${tab === "search" ? "active" : ""}`}
          onClick={() => setTab("search")}
        >
          Online-Suche
          <span className="tab-badge">Open Food Facts</span>
        </button>
      </div>

      {tab === "curated" && <CuratedTab />}
      {tab === "search" && <SearchTab />}

      <h3 className="section-title">Heute gegessen</h3>
      {today.length === 0 && (
        <div className="empty">Noch nichts protokolliert.</div>
      )}
      <ul className="today-list">
        {today.map((entry) => {
          const time = new Date(entry.timestamp).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const cat = entry.snapshot.category;
          return (
            <li key={entry.id} className={`today-row cat-${cat}`}>
              {entry.snapshot.emoji ? (
                <span className="emoji">{entry.snapshot.emoji}</span>
              ) : entry.snapshot.imageUrl ? (
                <img className="thumb" src={entry.snapshot.imageUrl} alt="" />
              ) : (
                <span className="emoji">🍽️</span>
              )}
              <span className="name">
                {entry.snapshot.name}
                {entry.snapshot.brand && (
                  <span className="brand"> · {entry.snapshot.brand}</span>
                )}
              </span>
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

function CuratedTab() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "good" | "bad">("all");
  const addCuratedFood = useStore((s) => s.addCuratedFood);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOODS.filter((f) => {
      if (filter !== "all" && f.category !== filter) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, filter]);

  return (
    <>
      <div className="food-controls">
        <input
          className="search"
          placeholder="In Schnellauswahl suchen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-tabs">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Alle</button>
          <button className={filter === "good" ? "active" : ""} onClick={() => setFilter("good")}>↑ Gut</button>
          <button className={filter === "bad" ? "active" : ""} onClick={() => setFilter("bad")}>↓ Schlecht</button>
        </div>
      </div>

      <div className="food-grid">
        {filtered.map((food) => (
          <CuratedCard
            key={food.id}
            id={food.id}
            name={food.name}
            emoji={food.emoji}
            category={food.category}
            calories={food.per100g.calories}
            protein={food.per100g.protein}
            defaultGrams={food.defaultGrams}
            onAdd={(grams) => addCuratedFood(food.id, grams)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="empty">Keine Treffer in der Schnellauswahl. Probier die Online-Suche.</div>
        )}
      </div>
    </>
  );
}

function CuratedCard(props: {
  id: string;
  name: string;
  emoji?: string;
  category: "good" | "neutral" | "bad";
  calories?: number;
  protein?: number;
  defaultGrams: number;
  onAdd: (grams: number) => void;
}) {
  const [grams, setGrams] = useState<number>(props.defaultGrams);
  return (
    <div className={`food-card cat-${props.category}`}>
      <div className="food-card-head">
        <span className="emoji">{props.emoji || "🍽️"}</span>
        <span className="name">{props.name}</span>
      </div>
      <div className="food-card-meta">
        {props.calories !== undefined && (
          <span>{Math.round((props.calories * grams) / 100)} kcal</span>
        )}
        {props.protein !== undefined && (
          <span>{Math.round((props.protein * grams) / 100)}g P</span>
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
        <button className="add-btn" onClick={() => props.onAdd(grams)}>+</button>
      </div>
    </div>
  );
}

function SearchTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodSnapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recent = useStore((s) => s.recentExternalFoods);
  const addExternalFood = useStore((s) => s.addExternalFood);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setError(null);
      return;
    }
    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setLoading(true);
      setError(null);
      try {
        const found = await searchFoods(q, ctrl.signal);
        setResults(found);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setError("Suche fehlgeschlagen. Versuch es nochmal.");
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <>
      <div className="food-controls">
        <input
          className="search"
          placeholder="Produkt suchen (z.B. 'Skyr', 'Haferflocken', 'Müsli')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <div className="search-status">Suche bei Open Food Facts...</div>}
      {error && <div className="search-status error">{error}</div>}

      {!loading && !error && query.trim().length < 2 && recent.length > 0 && (
        <>
          <h4 className="section-title">Zuletzt verwendet</h4>
          <div className="off-grid">
            {recent.map((s) => (
              <OffCard
                key={(s.externalId || s.name) + "-recent"}
                snapshot={s}
                onAdd={(grams) => addExternalFood(s, grams)}
              />
            ))}
          </div>
        </>
      )}

      {results.length > 0 && (
        <div className="off-grid">
          {results.map((s, i) => (
            <OffCard
              key={(s.externalId || "off") + "-" + i}
              snapshot={s}
              onAdd={(grams) => addExternalFood(s, grams)}
            />
          ))}
        </div>
      )}

      {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
        <div className="empty">Keine Treffer mit verwertbaren Nährwerten gefunden.</div>
      )}
    </>
  );
}

function OffCard({
  snapshot,
  onAdd,
}: {
  snapshot: FoodSnapshot;
  onAdd: (grams: number) => void;
}) {
  const [grams, setGrams] = useState<number>(100);
  return (
    <div className={`off-card cat-${snapshot.category}`}>
      {snapshot.imageUrl && (
        <img className="off-img" src={snapshot.imageUrl} alt="" loading="lazy" />
      )}
      <div className="off-info">
        <div className="off-name" title={snapshot.name}>{snapshot.name}</div>
        {snapshot.brand && <div className="off-brand">{snapshot.brand}</div>}
        <div className="off-meta">
          {snapshot.per100g.calories !== undefined && (
            <span>{Math.round((snapshot.per100g.calories * grams) / 100)} kcal</span>
          )}
          {snapshot.per100g.protein !== undefined && (
            <span>{Math.round((snapshot.per100g.protein * grams) / 100)}g P</span>
          )}
          {snapshot.per100g.sugar !== undefined && (
            <span>{Math.round((snapshot.per100g.sugar * grams) / 100)}g Zucker</span>
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
          <button className="add-btn" onClick={() => onAdd(grams)}>+</button>
        </div>
      </div>
    </div>
  );
}
