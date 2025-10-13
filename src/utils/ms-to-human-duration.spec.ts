import { describe, expect, it } from 'vitest';

import { msToHumanDuration } from './ms-to-human-duration';

describe('msToHumanDuration', () => {
  it('should return milliseconds for values less than 1000', () => {
    expect(msToHumanDuration(500)).toBe('500ms');
  });

  it('should return seconds for values less than a minute', () => {
    expect(msToHumanDuration(1500)).toBe('1s 500ms');
    expect(msToHumanDuration(45000)).toBe('45s');
  });

  it('should return minutes and seconds for values less than an hour', () => {
    expect(msToHumanDuration(61000)).toBe('1m 1s');
    expect(msToHumanDuration(3599000)).toBe('59m 59s');
  });

  it('should return hours, minutes, and seconds for values less than a day', () => {
    expect(msToHumanDuration(3661000)).toBe('1h 1m 1s');
    expect(msToHumanDuration(86399000)).toBe('23h 59m 59s');
  });

  it('should return days, hours, minutes, and seconds for values greater than a day', () => {
    expect(msToHumanDuration(90061000)).toBe('1d 1h 1m 1s');
    expect(msToHumanDuration(172799000)).toBe('1d 23h 59m 59s');
  });

  it('should return "0s" for a duration of 0', () => {
    expect(msToHumanDuration(0)).toBe('0s');
  });

  it('should handle negative durations correctly', () => {
    expect(msToHumanDuration(-500)).toBe('-500ms');
    expect(msToHumanDuration(-1500)).toBe('-1s -500ms');
    expect(msToHumanDuration(-61000)).toBe('-1m -1s');
    expect(msToHumanDuration(-3661000)).toBe('-1h -1m -1s');
    expect(msToHumanDuration(-90061000)).toBe('-1d -1h -1m -1s');
  });
});
