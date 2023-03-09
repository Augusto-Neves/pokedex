export function generateStatsBarPercentage(statsValue: number) {
  return Math.round((statsValue / 200) * 100);
}
