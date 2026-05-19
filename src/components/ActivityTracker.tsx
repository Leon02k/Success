import { useMemo, useState } from "react";
import { ACTIVITIES, ACTIVITIES_BY_ID } from "../data/activities";
import { STAT_META } from "../data/stats";
import { useStore } from "../store/useStore";
import { isToday } from "../lib/nutrition";
import type { StatKey } from "../types";

export function ActivityTracker() {
  const [filter, setFilter] = useState<StatKey | "all">("all");
  const addActivity = useStore((s) => s.addActivity);
  const removeActivity = useStore((s) => s.removeActivity);
  const activityLog = useStore((s) => s.activityLog);

  const filtered = useMemo(() => {
    if (filter === "all") return ACTIVITIES;
    return ACTIVITIES.filter((a) => a.stat === filter);
  }, [filter]);

  const today = activityLog.filter((e) => isToday(e.timestamp)).slice().reverse();

  return (
    <div className="panel">
      <h2 className="panel-title">// QUESTS</h2>
      <div className="quest-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Alle
        </button>
        {(Object.keys(STAT_META) as StatKey[]).map((k) => (
          <button
            key={k}
            className={filter === k ? "active" : ""}
            onClick={() => setFilter(k)}
            style={{ borderColor: filter === k ? STAT_META[k].color : undefined }}
          >
            {STAT_META[k].emoji} {STAT_META[k].label}
          </button>
        ))}
      </div>

      <div className="quest-grid">
        {filtered.map((act) => {
          const meta = STAT_META[act.stat];
          return (
            <button
              key={act.id}
              className={`quest-card cat-${act.category}`}
              onClick={() => addActivity(act.id)}
              style={{ borderColor: meta.color + "55" }}
            >
              <span className="quest-emoji">{act.emoji}</span>
              <span className="quest-name">{act.name}</span>
              <span className="quest-desc">{act.description}</span>
              <span
                className="quest-xp"
                style={{ color: act.xp > 0 ? meta.color : "#ff5577" }}
              >
                {act.xp > 0 ? "+" : ""}
                {act.xp} XP
              </span>
            </button>
          );
        })}
      </div>

      <h3 className="section-title">Heute erledigt</h3>
      {today.length === 0 && <div className="empty">Noch keine Quests heute.</div>}
      <ul className="today-list">
        {today.map((entry) => {
          const act = ACTIVITIES_BY_ID[entry.activityId];
          if (!act) return null;
          const meta = STAT_META[act.stat];
          const time = new Date(entry.timestamp).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <li key={entry.id} className={`today-row cat-${act.category}`}>
              <span className="emoji">{act.emoji}</span>
              <span className="name">{act.name}</span>
              <span className="grams" style={{ color: meta.color }}>
                {act.xp > 0 ? "+" : ""}
                {act.xp} XP {meta.label}
              </span>
              <span className="time">{time}</span>
              <button
                className="remove"
                onClick={() => removeActivity(entry.id)}
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
