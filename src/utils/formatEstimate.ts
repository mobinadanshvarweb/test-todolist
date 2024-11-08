export const formatEstimate = (hours: number): string => {
  if (hours < 8) return `${hours}h`;
  if (hours % 8 === 0) {
    const days = hours / 8;
    if (days < 5) return `${days}d`;
    if (days % 5 === 0) return `${days / 5}w`;
    return `${days}d`;
  }
  return `${hours}h`;
};
