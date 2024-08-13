/**
 * 获取当前 URL 中的所有查询参数，并返回一个对象。
 * @returns 包含所有查询参数的对象。
 */
export function getQueryParams(): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * 获取哈希片段中的所有查询参数，并返回一个对象。
 * @returns 包含哈希查询参数的对象。
 */
export function getHashParams(): Record<string, string> {
  const params: Record<string, string> = {};
  const hash = window.location.hash.split('?')[1];
  if (hash) {
    const hashParams = new URLSearchParams(hash);
    hashParams.forEach((value, key) => {
      params[key] = value;
    });
  }
  return params;
}
