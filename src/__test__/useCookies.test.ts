import { useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useCookies from '../hooks/useCookies';
import { cookieStorage } from '../utils';

const storageKey = 'data';
const data = {
  name: 'alireza',
  lastname: 'ghadyani',
};

describe('useCookies', () => {
  // ? Case 1 : test default value is on storage state or not
  test('default value should be in storage state', () => {
    act(() => {
      renderHook(() =>
        useCookies({
          storageName: storageKey,
          defaultValues: data,
        })
      );

      renderHook(() =>
        useEffect(() => {
          const cookieStorageValue = cookieStorage.get(storageKey);
          expect(JSON.parse(cookieStorageValue || 'null')).toEqual(data);
        }, [])
      );
    });
  });

  // ? Case 2 : test default value is on `cookie` storage or not
  test('default value should be in `cookie` storage', () => {
    act(() => {
      const { result } = renderHook(() =>
        useCookies({
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
      useCookies({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });

    expect(result.current?.[0]).toHaveProperty('age');
  });

  // ? Case 4 : test setStorage function effect in `cookie` storage
  test('setStorage function should change storage value in `cookie` storage', () => {
    const { result } = renderHook(() =>
      useCookies({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[1]((prevValue: any) => ({ ...prevValue, age: 20 }));
    });

    expect(JSON.parse(cookieStorage.get(storageKey) || 'null')).toHaveProperty(
      'age'
    );
  });

  // ? Case 5 : test removeStorage function
  test('removeStorage function should remove `cookie` storage', () => {
    const { result } = renderHook(() =>
      useCookies({
        storageName: storageKey,
        defaultValues: data,
      })
    );

    act(() => {
      result.current?.[2]();
    });

    expect(JSON.parse(cookieStorage.get(storageKey) || 'null')).toBe(null);
  });
});
