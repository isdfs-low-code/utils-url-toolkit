/**
 * 标准化给定的 URL 字符串，确保其格式正确。
 * @param url 要标准化的 URL 字符串。
 * @returns 标准化后的 URL 字符串。
 * @throws 如果 URL 无效，则抛出错误。
 */
export function formatURL(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch (error) {
    throw new Error(`无效的 URL: ${url}`);
  }
}

/**
 * 确保 URL 的路径以斜杠结尾。
 * @param url 要检查的 URL 字符串。
 * @returns 以斜杠结尾的 URL 字符串。
 */
export function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}
