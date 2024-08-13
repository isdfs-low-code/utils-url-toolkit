// src/urlSecurity.ts

/**
 * 检查 URL 是否使用 HTTPS 协议，确保其安全性。
 * @param url 要检查的 URL 字符串。
 * @returns 如果 URL 使用 HTTPS 协议，则返回 true，否则返回 false。
 */
export function isURLSecure(url: string): boolean {
  try {
    const parsedURL = new URL(url);
    return parsedURL.protocol === 'https:';
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return false;
  }
}

/**
 * 移除 URL 中可能包含的恶意脚本或不安全内容。
 * @param url 要清理的 URL 字符串。
 * @returns 清理后的安全 URL 字符串。
 */
export function sanitizeURL(url: string): string {
  // 一个简单的示例，防止嵌入恶意 JavaScript
  return url.replace(/javascript:/gi, '');
}
