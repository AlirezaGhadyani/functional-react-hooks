import isBrowser from './isBrowser';

const set = <Value>(key: string, value: Value) => {
  if (isBrowser) return localStorage.setItem(key, JSON.stringify(value));
  return;
};

const get = (key: string) => {
  if (isBrowser) {
    const storageValue = localStorage.getItem(key);
    // * if type of value from local storage is string parse it then return
    // * else return original value
    if (typeof storageValue === 'string') return JSON.parse(storageValue);
    return storageValue;
  }

  return;
};

const remove = (key: string) => {
  if (isBrowser) return localStorage.removeItem(key);
  return;
};

export default { set, get, remove };
