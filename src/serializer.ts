/**
 * 将一个对象序列化为查询参数字符串。
 * @param params 包含查询参数的对象。
 * @returns 序列化后的查询参数字符串。
 */
export function serializeQueryParams(params: Record<string, string | number>): string {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    searchParams.append(key, String(params[key]));
  });
  return searchParams.toString();
}

/**
 * 将一个对象序列化为哈希片段的查询参数字符串。
 * @param params 包含哈希查询参数的对象。
 * @returns 序列化后的哈希查询参数字符串。
 */
export function serializeHashParams(params: Record<string, string | number>): string {
  const hashParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    hashParams.append(key, String(params[key]));
  });
  return hashParams.toString();
}
