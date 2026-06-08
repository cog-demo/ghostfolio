/**
 * Date utilities shared across transaction-related operations.
 *
 * TODO: Consider using date-fns for more robust date handling
 */

export function isWithinRange(date: string, start?: string, end?: string): boolean {
  const d = new Date(date).getTime();

  if (start && d < new Date(start).getTime()) return false;
  if (end && d > new Date(end).getTime()) return false;

  return true;
}

export function getQuarterStart(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3, 1);
}

export function getQuarterEnd(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3 + 3, 0);
}

export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Duplicate of formatters in ops-portal — should consolidate
// into a shared package eventually
export function formatDisplayDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
