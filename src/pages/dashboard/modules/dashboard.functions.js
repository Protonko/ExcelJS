export function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key.includes('excel')) {
      continue;
    }

    keys.push(key);
  }

  return keys;
}
