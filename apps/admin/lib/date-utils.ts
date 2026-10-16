
export function parseUtcDate(dateInput: string | Date | null | undefined): Date | null {
  if (!dateInput) return null;
  if (dateInput instanceof Date) {
    return isNaN(dateInput.getTime()) ? null : dateInput;
  }

  let str = String(dateInput).trim();
  if (!str) return null;

  // If there's no timezone offset (neither 'Z' nor '+HH:mm' / '-HH:mm'), append 'Z'
  if (!str.endsWith('Z') && !/[+-]\d{2}(:\d{2})?$/.test(str)) {
    str += 'Z';
  }

  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Formats a UTC timestamp into the user's local date string (e.g. 10/16/2026).
 */
export function formatLocalDate(dateInput: string | Date | null | undefined, fallback = '-'): string {
  const d = parseUtcDate(dateInput);
  if (!d) return fallback;
  return d.toLocaleDateString();
}

/**
 * Formats a UTC timestamp into the user's local time string (e.g. 7:58:47 AM).
 */
export function formatLocalTime(
  dateInput: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
  fallback = '-'
): string {
  const d = parseUtcDate(dateInput);
  if (!d) return fallback;
  return d.toLocaleTimeString([], options);
}

/**
 * Formats a UTC timestamp into the user's local date and time string (e.g. 10/16/2026, 7:58:47 AM).
 */
export function formatLocalDateTime(dateInput: string | Date | null | undefined, fallback = '-'): string {
  const d = parseUtcDate(dateInput);
  if (!d) return fallback;
  return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
}

/**
 * Converts a UTC timestamp (from backend) to the local 'YYYY-MM-DDTHH:mm' string format
 * required by HTML5 <input type="datetime-local">.
 */
export function toLocalDatetimeInput(dateInput: string | Date | null | undefined): string {
  const d = parseUtcDate(dateInput);
  if (!d) return '';

  const pad = (n: number) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Converts a local 'YYYY-MM-DDTHH:mm' string from <input type="datetime-local">
 * into a UTC ISO 8601 string (e.g. '2026-10-16T01:58:00.000Z') for backend storage.
 */
export function localInputToUtcIso(localDatetimeStr: string): string {
  if (!localDatetimeStr) return '';
  // When datetime string has no 'Z', browser parses as local time
  const d = new Date(localDatetimeStr);
  return isNaN(d.getTime()) ? localDatetimeStr : d.toISOString();
}

/**
 * Returns the user's local browser timezone (e.g. "Asia/Dhaka", "UTC+6").
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
  } catch {
    return 'Local';
  }
}
