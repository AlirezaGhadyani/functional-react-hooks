import isBrowser from './isBrowser';

const setSessionStorage = <Value>(key: string, value: Value) => {
  if (isBrowser) return sessionStorage.setItem(key, JSON.stringify(value));
  return;
};

const getSessionStorage = (key: string) => {
  if (isBrowser) {
    const storageValue = sessionStorage.getItem(key);
    // * if type of value from session storage is string parse it then return
    // * else return original value
    if (typeof storageValue === 'string') return JSON.parse(storageValue);
    return storageValue;
  }

  return;
};

const removeSessionStorage = (key: string) => {
  if (isBrowser) return sessionStorage.removeItem(key);
  return;
};

export default { setSessionStorage, getSessionStorage, removeSessionStorage };
