import { useEffect } from "react";
import { useStore } from "../store/useStore";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "abgelaufen";
  const h = Math.floor(ms / (60 * 60 * 1000));
  const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function EffectsPanel() {
  const effects = useStore((s) => s.effects);
  const pruneEffects = useStore((s) => s.pruneEffects);

  useEffect(() => {
    pruneEffects();
    const id = setInterval(pruneEffects, 60_000);
    return () => clearInterval(id);
  }, [pruneEffects]);

  const buffs = effects.filter((e) => e.kind === "buff");
  const debuffs = effects.filter((e) => e.kind === "debuff");

  return (
    <div className="panel">
      <h2 className="panel-title">// AKTIVE EFFEKTE</h2>
      <div className="effects-grid">
        <div>
          <div className="effects-subtitle buff-color">BUFFS</div>
          {buffs.length === 0 && <div className="empty">Keine aktiven Buffs</div>}
          {buffs.map((e) => (
            <div key={e.id} className="effect-row buff">
              <div className="effect-name">↑ {e.name}</div>
              <div className="effect-meta">
                {e.source} · {formatRemaining(e.expiresAt - Date.now())}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="effects-subtitle debuff-color">DEBUFFS</div>
          {debuffs.length === 0 && <div className="empty">Keine aktiven Debuffs</div>}
          {debuffs.map((e) => (
            <div key={e.id} className="effect-row debuff">
              <div className="effect-name">↓ {e.name}</div>
              <div className="effect-meta">
                {e.source} · {formatRemaining(e.expiresAt - Date.now())}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
