// XP curve: each level needs more XP. Solo Leveling-ish exponential growth.
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) total += xpForLevel(i);
  return total;
}

export function levelFromXp(xp: number): { level: number; intoLevel: number; needed: number } {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
    if (level > 999) break;
  }
  return { level, intoLevel: remaining, needed: xpForLevel(level) };
}

export function rank(level: number): { rank: string; color: string } {
  if (level >= 80) return { rank: "S", color: "#ff5577" };
  if (level >= 60) return { rank: "A", color: "#ff9944" };
  if (level >= 40) return { rank: "B", color: "#a164ff" };
  if (level >= 25) return { rank: "C", color: "#5cc8ff" };
  if (level >= 12) return { rank: "D", color: "#5cffaa" };
  return { rank: "E", color: "#888899" };
}
