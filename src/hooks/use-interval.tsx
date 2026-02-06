import { useEffect, useRef, useCallback } from 'react';

export function useInterval<C extends () => void>(
  callback: C,
  delay: number | null
): void {
  const savedCallback = useRef<C | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const tick = useCallback(() => {
    if (savedCallback.current) savedCallback.current();
  }, []);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, tick]);
}
