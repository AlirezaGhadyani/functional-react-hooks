import { useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../hooks/useLocalStorage';
import { localStorage } from '../utils';

const storageKey = 'data';
const data = {
  name: 'alireza',
  lastname: 'ghadyani',
};

describe('useLocalStorage', () => {
  // ? Case 1 : test default value is on storage state or not
  test('default value should be in storage state', () => {
    act(() => {
      renderHook(() =>
        useLocalStorage({
          storageName: storageKey,
          defaultValues: data,
        })
      );

      renderHook(() =>
        useEffect(() => {
          const localStorageValue = localStorage.get(storageKey);
          expect(localStorageValue).toEqual(data);
        }, [])
      );
    });
  });

  // ? Case 2 : test default value is on `local` storage or not
  test('default value should be in `local` storage', () => {
    act(() => {
      const { result } = renderHook(() =>
        useLocalStorage({
          storageName: storageKey,
          defaultValues: data,
        })
      );

      renderHook(() =>
        useEffect(() => {
          expect(result.current?.[0]).toEqual(data);
        }, [])
      );
    });
  });

  // ? Case 3 : test setStorage function
  test('setStorage function should change storage value', () => {
    const { result } = renderHook(() =>
      useLocalStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });

    expect(result.current?.[0]).toHaveProperty('age');
  });

  // ? Case 4 : test setStorage function effect in `local` storage
  test('setStorage function should change storage value in `local` storage', () => {
    const { result } = renderHook(() =>
      useLocalStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });
    expect(localStorage.get(storageKey)).toHaveProperty('age');
  });

  // ? Case 5 : test removeStorage function
  test('removeStorage function should remove `local` storage', () => {
    const { result } = renderHook(() =>
      useLocalStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[2]();
    });

    expect(localStorage.get(storageKey)).toBe(null);
  });
});
