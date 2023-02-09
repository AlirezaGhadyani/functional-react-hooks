import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useIsDomReady from '../hooks/useIsDomReady';

describe('useIsDomReady', () => {
  // ? Case 1 : test isDomReady must be true after component mounts
  test('after component mounts `isDomReady` must be true', () => {
    const { result } = renderHook(() => useIsDomReady());

    renderHook(() =>
      useEffect(() => {
        expect(result.current).toEqual(true);
      }, [])
    );
  });
});
