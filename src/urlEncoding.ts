/**
 * 安全解码 URL 组件，避免因非法字符导致的错误。
 * @param component 要解码的 URL 组件字符串。
 * @returns 解码后的字符串，如果解码失败则返回原字符串。
 */
export function decodeURLComponentSafe(component: string): string {
  try {
    return decodeURIComponent(component);
  } catch (e) {
    return component;
  }
}

/**
 * 安全编码 URL 组件，确保特殊字符正确编码。
 * @param component 要编码的 URL 组件字符串。
 * @returns 编码后的字符串。
 */
export function encodeURLComponentSafe(component: string): string {
  return encodeURIComponent(component)
    .replace(/[!'()*]/g, escape) // escape 特殊字符
    .replace(/\%20/g, '+'); // 替换空格为 '+'
}
