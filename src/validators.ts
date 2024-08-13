export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export function isValidQueryParam(key: string): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has(key);
}
