// src/seoUtils.ts

/**
 * 向 URL 中添加 UTM 参数以进行营销追踪。
 * @param baseURL 基础 URL 字符串。
 * @param utmParams 包含 UTM 参数的对象。
 * @returns 带有 UTM 参数的完整 URL 字符串。
 */
export function addUTMParameters(baseURL: string, utmParams: Record<string, string>): string {
  const url = new URL(baseURL);
  
  Object.keys(utmParams).forEach(key => {
    url.searchParams.set(key, utmParams[key]);
  });

  return url.toString();
}

/**
 * 从 URL 中移除所有 UTM 参数。
 * @param url 要处理的 URL 字符串。
 * @returns 移除了 UTM 参数后的 URL 字符串。
 */
export function stripUTMParameters(url: string): string {
  const urlObj = new URL(url);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => urlObj.searchParams.delete(key));

  return urlObj.toString();
}
