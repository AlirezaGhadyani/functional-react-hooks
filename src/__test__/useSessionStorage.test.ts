import { useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useSessionStorage from '../hooks/useSessionStorage';
import { sessionStorage } from '../utils';

const storageKey = 'data';
const data = {
  name: 'alireza',
  lastname: 'ghadyani',
};

describe('useSessionStorage', () => {
  // ? Case 1 : test default value is on storage state or not
  test('default value should be in storage state', () => {
    act(() => {
      renderHook(() =>
        useSessionStorage({
          storageName: storageKey,
          defaultValues: data,
        })
      );

      renderHook(() =>
        useEffect(() => {
          const sessionStorageValue = sessionStorage.getSessionStorage(
            storageKey
          );
          expect(sessionStorageValue).toEqual(data);
        }, [])
      );
    });
  });

  // ? Case 2 : test default value is on `session` storage or not
  test('default value should be in `session` storage', () => {
    act(() => {
      const { result } = renderHook(() =>
        useSessionStorage({
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
      useSessionStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });

    expect(result.current?.[0]).toHaveProperty('age');
  });

  // ? Case 4 : test setStorage function effect in `session` storage
  test('setStorage function should change storage value in `session` storage', () => {
    const { result } = renderHook(() =>
      useSessionStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });

    expect(sessionStorage.getSessionStorage(storageKey)).toHaveProperty('age');
  });

  // ? Case 5 : test removeStorage function
  test('removeStorage function should remove `session` storage', () => {
    const { result } = renderHook(() =>
      useSessionStorage({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[2]();
    });

    expect(sessionStorage.getSessionStorage(storageKey)).toBe(null);
  });
});
