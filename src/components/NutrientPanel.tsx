import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { isToday, sumNutrients } from "../lib/nutrition";
import { NUTRIENT_META, NUTRIENT_ORDER, RDA } from "../data/nutrients";

export function NutrientPanel() {
  const foodLog = useStore((s) => s.foodLog);

  const todayTotals = useMemo(() => {
    const todays = foodLog.filter((e) => isToday(e.timestamp));
    return sumNutrients(todays);
  }, [foodLog]);

  return (
    <div className="panel">
      <h2 className="panel-title">// NÄHRSTOFFE HEUTE</h2>
      <div className="nutrient-grid">
        {NUTRIENT_ORDER.map((key) => {
          const meta = NUTRIENT_META[key];
          const value = todayTotals[key];
          const target = RDA[key];
          const pct = (value / target) * 100;
          const isSugar = key === "sugar";
          const clamped = Math.min(pct, 100);
          const isOver = pct > 100;
          let color = "#5cc8ff";
          if (isSugar) {
            color = pct > 100 ? "#ff5577" : pct > 70 ? "#ffd944" : "#5cffaa";
          } else {
            if (pct < 40) color = "#ff5577";
            else if (pct < 80) color = "#ffd944";
            else color = "#5cffaa";
          }
          return (
            <div key={key} className="nutrient-row">
              <div className="nutrient-label">
                <span>{meta.label}</span>
                <span className="nutrient-value">
                  {value < 10 ? value.toFixed(1) : Math.round(value)}/
                  {target < 10 ? target.toFixed(2) : target}
                  {" "}{meta.unit}
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
        })}
      </div>
    </div>
  );
}
