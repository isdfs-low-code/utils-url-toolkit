/**
 * 解析多层嵌套的查询参数字符串，并将其转换为对象结构。
 * 支持形如 `foo[bar]=baz&foo[qux]=quux` 的查询字符串。
 * @param query 查询参数字符串。
 * @returns 解析后的对象结构。
 */
export function parseNestedParams(query: string): Record<string, any> {
  const params = new URLSearchParams(query);
  const result: Record<string, any> = {};

  params.forEach((value, key) => {
    const keys = key.split(/\[|\]/).filter(Boolean);
    keys.reduce((acc, curr, idx) => {
      if (idx === keys.length - 1) {
        acc[curr] = value;
      } else {
        acc[curr] = acc[curr] || {};
      }
      return acc[curr];
    }, result);
  });

  return result;
}

/**
 * 将嵌套的对象结构转换为 URL 查询参数字符串。
 * 支持将对象结构转换为形如 `foo[bar]=baz&foo[qux]=quux` 的查询字符串。
 * @param obj 嵌套的对象结构。
 * @param prefix 内部递归使用的前缀。
 * @returns 转换后的查询参数字符串。
 */
export function stringifyNestedParams(obj: Record<string, any>, prefix?: string): string {
  const queryParts: string[] = [];

  Object.keys(obj).forEach(key => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      queryParts.push(stringifyNestedParams(value, fullKey));
    } else {
      queryParts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
    }
  });

  return queryParts.join('&');
}
