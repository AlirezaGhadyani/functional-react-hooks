import { useState, useEffect } from 'react';
import {
  UseCookiesOptions,
  UseStorageReturn,
  CookieAttributes,
} from '../types';
import { cookieStorage } from '../utils';

const { get, set, remove } = cookieStorage;

export default <DefaultValues>(
  options: UseCookiesOptions<DefaultValues>
): UseStorageReturn<DefaultValues> => {
  const { storageName, defaultValues, nullValue, ...restOptions } = options;

  const [storage, setStorage] = useState<DefaultValues>(() => {
    try {
      // * get cookie storage and parse it to json
      const storageValue = get(storageName);

      if (!nullValue) {
        if (storageValue === null || typeof storageValue === 'undefined') {
          return defaultValues;
        } else return JSON.parse(storageValue);
      } else return JSON.parse(storageValue || 'null');
    } catch (error) {
      console.error(error);
      return defaultValues;
    }
  });

  // * whenever state value changed set new state to local
  useEffect(() => {
    set(storageName, JSON.stringify(storage), { ...restOptions });
  }, [storage, storageName]);

  const removeStorage = (options?: CookieAttributes) => {
    return remove(storageName, options);
  };

  return [storage, setStorage, removeStorage];
};
