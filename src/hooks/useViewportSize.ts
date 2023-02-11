import { useState, useCallback, useEffect } from 'react';

import { UseViewportSize } from '../types';

export default () => {
  // * set undefined values to match values in server and client
  const [viewportSize, setViewportSize] = useState<UseViewportSize>({
    width: undefined,
    height: undefined,
  });

  // * a handler func for setting window inner sizes
  const setSizeHandler = useCallback(() => {
    return setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setSizeHandler, { passive: true });
    window.addEventListener('orientationchange', setSizeHandler, {
      passive: true,
    });

    // ? Call handler right away so state gets updated with initial window size
    setSizeHandler();

    return () => {
      window.removeEventListener('resize', setSizeHandler);
      window.removeEventListener('orientationchange', setSizeHandler);
    };
  }, [setSizeHandler]);

  return viewportSize;
};
