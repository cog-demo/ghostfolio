import { useState, useEffect } from 'react';

/**
 * Debounce a value by a given delay.
 * Useful for search inputs that trigger API calls.
 *
 * @example
 * const debouncedQuery = useDebounce(searchQuery, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
