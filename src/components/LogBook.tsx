import { useMemo, useState } from "react";
import { useStore } from "../store/useStore";
import { isToday, sumNutrients } from "../lib/nutrition";
import { analyzeDay } from "../lib/insights";

const MOOD_ICONS: Record<number, string> = {
  1: "😞",
  2: "🙁",
  3: "😐",
  4: "🙂",
  5: "😄",
};

const MOOD_LABEL: Record<number, string> = {
  1: "Mies",
  2: "Schlecht",
  3: "Okay",
  4: "Gut",
  5: "Top",
};

export function LogBook() {
  const foodLog = useStore((s) => s.foodLog);
  const logEntries = useStore((s) => s.logEntries);
  const addLogEntry = useStore((s) => s.addLogEntry);
  const removeLogEntry = useStore((s) => s.removeLogEntry);

  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [text, setText] = useState("");

  const todayNutrients = useMemo(() => {
    const todays = foodLog.filter((e) => isToday(e.timestamp));
    return sumNutrients(todays);
  }, [foodLog]);

  const previewInsights = useMemo(
    () => analyzeDay(todayNutrients, mood),
    [todayNutrients, mood],
  );

  const submit = () => {
    if (!text.trim()) return;
    const date = new Date().toISOString().slice(0, 10);
    addLogEntry({
      date,
      mood,
      text: text.trim(),
      insights: previewInsights.map((i) => i.message),
    });
    setText("");
    setMood(3);
  };

  return (
    <div className="panel">
      <h2 className="panel-title">// LOGBUCH</h2>

      <div className="logbook-form">
        <div className="mood-selector">
          <span className="mood-label">Wie war dein Tag?</span>
          <div className="mood-options">
            {[1, 2, 3, 4, 5].map((m) => (
              <button
                key={m}
                className={`mood-btn ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m as 1 | 2 | 3 | 4 | 5)}
                title={MOOD_LABEL[m]}
              >
                <span>{MOOD_ICONS[m]}</span>
                <small>{MOOD_LABEL[m]}</small>
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="log-textarea"
          placeholder="Was hast du heute erlebt? Wie fühlst du dich? Was hast du gelernt?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
        />

        {previewInsights.length > 0 && (
          <div className="insights-preview">
            <div className="insights-title">// SYSTEM-ANALYSE</div>
            {previewInsights.map((ins, idx) => (
              <div key={idx} className={`insight insight-${ins.severity}`}>
                {ins.message}
              </div>
            ))}
          </div>
        )}

        <button
          className="primary-btn"
          onClick={submit}
          disabled={!text.trim()}
        >
          Eintrag speichern
        </button>
      </div>

      <h3 className="section-title">Frühere Einträge</h3>
      {logEntries.length === 0 && (
        <div className="empty">Noch keine Einträge.</div>
      )}
      <div className="log-history">
        {logEntries.map((entry) => (
          <div key={entry.id} className="log-entry">
            <div className="log-entry-head">
              <span className="log-date">{entry.date}</span>
              <span className="log-mood">
                {MOOD_ICONS[entry.mood]} {MOOD_LABEL[entry.mood]}
              </span>
              <button
                className="remove"
                onClick={() => removeLogEntry(entry.id)}
              >
                ×
              </button>
            </div>
            <div className="log-text">{entry.text}</div>
            {entry.insights.length > 0 && (
              <div className="log-insights">
                {entry.insights.map((ins, i) => (
                  <div key={i} className="log-insight">
                    › {ins}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
