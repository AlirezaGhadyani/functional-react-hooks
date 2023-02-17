import { useState, useEffect } from 'react';
import { UseStorageOptions, UseStorageReturn } from '../types';
import { localStorage } from '../utils';

const { getLocalStorage, setLocalStorage, removeLocalStorage } = localStorage;

export default <DefaultValues>(
  options: UseStorageOptions<DefaultValues>
): UseStorageReturn<DefaultValues> => {
  const [storage, setStorage] = useState<DefaultValues>(() => {
    try {
      const storageValue = getLocalStorage(options.storageName);
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

  // * whenever state value changed set new state to local
  useEffect(() => {
    setLocalStorage(options.storageName, storage);
  }, [storage, options.storageName]);

  const removeStorage = () => removeLocalStorage(options.storageName);

  return [storage, setStorage, removeStorage];
};
