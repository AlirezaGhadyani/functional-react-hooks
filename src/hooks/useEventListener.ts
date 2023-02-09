import { useRef, useEffect } from 'react';
import { UseEventListenerOptions } from '../types';

export default (options: UseEventListenerOptions) => {
  const { eventName, handler, element = window } = options;

  // * Create a ref that stores handler
  const savedHandler = useRef(handler);

  // * Update ref.current value if handler changes.
  // ? This allows our effect below to always get latest handler
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // * Make sure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // * Create event listener that calls handler function stored in ref
    const eventListener = (event: Event): void => savedHandler.current(event);

    // * Add event listener
    element.addEventListener(eventName, eventListener);

    // * Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener);
    };

    // * Re-run if eventName or element changes
  }, [eventName, element]);

  return null;
};
