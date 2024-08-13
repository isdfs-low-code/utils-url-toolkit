/**
 * 比较两个 URL 是否相等，忽略查询参数和哈希片段。
 * @param url1 第一个 URL 字符串。
 * @param url2 第二个 URL 字符串。
 * @returns 如果两个 URL 相等则返回 true，否则返回 false。
 */
export function compareURLs(url1: string, url2: string): boolean {
  const cleanURL = (url: string) => new URL(url).origin + new URL(url).pathname;
  return cleanURL(url1) === cleanURL(url2);
}

/**
 * 比较两个 URL 的查询参数是否相等。
 * @param url1 第一个 URL 字符串。
 * @param url2 第二个 URL 字符串。
 * @returns 如果两个 URL 的查询参数相等则返回 true，否则返回 false。
 */
export function compareURLParams(url1: string, url2: string): boolean {
  const params1 = new URLSearchParams(new URL(url1).search);
  const params2 = new URLSearchParams(new URL(url2).search);
  return params1.toString() === params2.toString();
}
