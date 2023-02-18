import { useState, useEffect } from 'react';
import { UseStorageOptions, UseStorageReturn } from '../types';
import { sessionStorage } from '../utils';

const { get, set, remove } = sessionStorage;

export default <DefaultValues>(
  options: UseStorageOptions<DefaultValues>
): UseStorageReturn<DefaultValues> => {
  const [storage, setStorage] = useState<DefaultValues>(() => {
    try {
      const storageValue = get(options.storageName);
      if (!options.nullValue) {
        if (storageValue === null || typeof storageValue === 'undefined') {
          return options.defaultValues;
        } else return storageValue;
      } else return storageValue;
    } catch (error) {
      console.error(error);
      return options?.defaultValues;
    }
  });

  // * whenever state value changed set new state to session
  useEffect(() => {
    set(options.storageName, storage);
  }, [storage, options.storageName]);

  const removeStorage = () => remove(options.storageName);

  return [storage, setStorage, removeStorage];
};
