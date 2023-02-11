import { useEffect, useState } from 'react';

export default () => {
  const [isDomReady, setIsDomReady] = useState<boolean>(false);

  useEffect(() => {
    setIsDomReady(true);
    return () => setIsDomReady(false);
  }, []);

  return isDomReady;
};
