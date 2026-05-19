import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { isToday, sumNutrients } from "../lib/nutrition";
import { NUTRIENT_META, NUTRIENT_ORDER, RDA } from "../data/nutrients";
import type { NutrientKey } from "../types";

const GROUPS: Array<{ key: "macro" | "vitamin" | "mineral" | "other"; label: string }> = [
  { key: "macro", label: "Makronährstoffe" },
  { key: "vitamin", label: "Vitamine" },
  { key: "mineral", label: "Mineralstoffe" },
  { key: "other", label: "Weitere" },
];

function fmtValue(v: number, unit: string): string {
  if (unit === "mg" && v < 1) return `${(v * 1000).toFixed(0)} µg`;
  if (v < 10) return v.toFixed(1);
  return Math.round(v).toString();
}

function fmtTarget(v: number, unit: string): string {
  if (unit === "mg" && v < 1) return `${(v * 1000).toFixed(0)} µg`;
  if (v < 10) return v.toFixed(1);
  return Math.round(v).toString();
}

export function NutrientPanel() {
  const foodLog = useStore((s) => s.foodLog);

  const todayTotals = useMemo(() => {
    const todays = foodLog.filter((e) => isToday(e.timestamp));
    return sumNutrients(todays);
  }, [foodLog]);

  return (
    <div className="panel">
      <h2 className="panel-title">// NÄHRSTOFFE HEUTE</h2>

      {GROUPS.map((g) => {
        const keys = NUTRIENT_ORDER.filter((k) => NUTRIENT_META[k].group === g.key);
        if (keys.length === 0) return null;
        return (
          <section key={g.key} className="nutrient-group">
            <h3 className="nutrient-group-title">{g.label}</h3>
            <div className="nutrient-grid">
              {keys.map((key) => (
                <NutrientRow key={key} k={key} value={todayTotals[key]} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function NutrientRow({ k, value }: { k: NutrientKey; value: number }) {
  const meta = NUTRIENT_META[k];
  const target = RDA[k];
  const pct = (value / target) * 100;
  const isCap = k === "sugar" || k === "saturatedFat" || k === "salt";
  const clamped = Math.min(pct, 100);
  const isOver = pct > 100;

  let color: string;
  if (isCap) {
    color = pct > 100 ? "#ff5577" : pct > 70 ? "#ffd944" : "#5cffaa";
  } else {
    if (pct < 40) color = "#ff5577";
    else if (pct < 80) color = "#ffd944";
    else color = "#5cffaa";
  }

  return (
    <div className="nutrient-row">
      <div className="nutrient-label">
        <span className="nutrient-name">{meta.label}</span>
        <span className="nutrient-value">
          {fmtValue(value, meta.unit)} / {fmtTarget(target, meta.unit)} {meta.unit === "mg" && target < 1 ? "" : meta.unit}
          <span className="pct"> · {pct.toFixed(0)}%</span>
        </span>
      </div>
      <div className="nutrient-bar">
        <div
          className="nutrient-fill"
          style={{
            width: `${clamped}%`,
            background: color,
            boxShadow: `0 0 8px ${color}99`,
          }}
        />
        {isOver && <div className="nutrient-over" />}
      </div>
    </div>
  );
}
