/**
 * Convert milliseconds to a human-readable duration string.
 * @param ms - Duration in milliseconds.
 * @returns A human-readable duration string.
 */
export const msToHumanDuration = (ms: number): string => {
  if (ms === 0) return '0s';
  if ((ms < 1000 && ms > 0) || (ms > -1000 && ms < 0)) return `${ms}ms`;

  const isNegative = ms < 0;
  const polarity = isNegative ? '-' : '';

  let msDuration = isNegative ? ms * -1 : ms;
  const days = Math.floor(msDuration / (1000 * 60 * 60 * 24));
  msDuration -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor((msDuration / (1000 * 60 * 60)) % 24);
  msDuration -= hours * 1000 * 60 * 60;
  const minutes = Math.floor((msDuration / (1000 * 60)) % 60);
  msDuration -= minutes * 1000 * 60;
  const seconds = Math.floor((msDuration / 1000) % 60);
  msDuration -= seconds * 1000;

  return [
    days ? `${polarity}${days}d` : null,
    hours ? `${polarity}${hours}h` : null,
    minutes ? `${polarity}${minutes}m` : null,
    seconds ? `${polarity}${seconds}s` : null,
    msDuration ? `${polarity}${msDuration}ms` : null,
  ]
    .filter(Boolean)
    .join(' ');
};
