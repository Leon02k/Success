import { useStore } from "../store/useStore";
import { STAT_META, STAT_ORDER } from "../data/stats";
import { levelFromXp, rank } from "../lib/leveling";

export function StatusWindow() {
  const stats = useStore((s) => s.stats);
  const username = useStore((s) => s.username);
  const setUsername = useStore((s) => s.setUsername);

  const totalXp = STAT_ORDER.reduce((sum, k) => sum + stats[k].xp, 0);
  const overall = levelFromXp(totalXp);
  const r = rank(overall.level);

  return (
    <div className="status-window">
      <div className="window-header">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="window-title">// STATUS WINDOW</span>
      </div>
      <div className="profile-block">
        <div className="profile-rank" style={{ color: r.color, boxShadow: `0 0 20px ${r.color}66` }}>
          {r.rank}
        </div>
        <div className="profile-info">
          <input
            className="profile-name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="profile-meta">
            Level <strong>{overall.level}</strong> · Aufsteiger ·{" "}
            {totalXp.toLocaleString("de-DE")} XP gesamt
          </div>
          <div className="profile-xp-bar">
            <div
              className="profile-xp-fill"
              style={{ width: `${(overall.intoLevel / overall.needed) * 100}%` }}
            />
          </div>
          <div className="profile-meta small">
            {overall.intoLevel} / {overall.needed} XP bis Level {overall.level + 1}
          </div>
        </div>
      </div>

      <div className="stat-grid">
        {STAT_ORDER.map((key) => {
          const data = stats[key];
          const meta = STAT_META[key];
          const lvl = levelFromXp(data.xp);
          const pct = (lvl.intoLevel / lvl.needed) * 100;
          return (
            <div key={key} className="stat-card" style={{ borderColor: meta.color + "55" }}>
              <div className="stat-head">
                <span className="stat-emoji">{meta.emoji}</span>
                <div className="stat-name">
                  <div style={{ color: meta.color }}>{meta.label}</div>
                  <div className="stat-desc">{meta.description}</div>
                </div>
                <div className="stat-level" style={{ color: meta.color }}>
                  Lv {lvl.level}
                </div>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)`,
                    boxShadow: `0 0 10px ${meta.color}88`,
                  }}
                />
              </div>
              <div className="stat-xp-text">
                {lvl.intoLevel} / {lvl.needed} XP
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
