import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useViewportSize from '../hooks/useViewportSize';

describe('useViewportSize', () => {
  // ? Case 1 : with window sizes change the viewport state value must change and match
  test('viewport sizes must match window sizes when sizes change', () => {
    const { result } = renderHook(() => useViewportSize());

    renderHook(() =>
      useEffect(() => {
        window.addEventListener(
          'resize',
          () => {
            expect(window.innerWidth).toEqual(result.current.width);
            expect(window.innerHeight).toEqual(result.current.height);
          },
          { passive: true }
        );
        window.addEventListener(
          'orientationchange',
          () => {
            expect(window.innerWidth).toEqual(result.current.width);
            expect(window.innerHeight).toEqual(result.current.height);
          },
          {
            passive: true,
          }
        );
      }, [])
    );
  });
});
