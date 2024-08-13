/**
 * 重定向到指定的 URL，可以附带查询参数和哈希片段。
 * @param baseURL 基础 URL。
 * @param params 查询参数对象，可选。
 * @param hash 哈希片段，可选。
 */
export function redirectTo(baseURL: string, params?: Record<string, string | number>, hash?: string): void {
  const url = new URL(baseURL);
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, String(params[key]));
    });
  }
  if (hash) {
    url.hash = hash;
  }
  window.location.href = url.toString();
}

/**
 * 替换浏览器历史中的当前记录，不会刷新页面。
 * @param baseURL 基础 URL。
 * @param params 查询参数对象，可选。
 * @param hash 哈希片段，可选。
 */
export function replaceState(baseURL: string, params?: Record<string, string | number>, hash?: string): void {
  const url = new URL(baseURL);
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, String(params[key]));
    });
  }
  if (hash) {
    url.hash = hash;
  }
  window.history.replaceState(null, '', url.toString());
}

/**
 * 向浏览器历史中添加一个新记录，不会刷新页面。
 * @param baseURL 基础 URL。
 * @param params 查询参数对象，可选。
 * @param hash 哈希片段，可选。
 */
export function pushState(baseURL: string, params?: Record<string, string | number>, hash?: string): void {
  const url = new URL(baseURL);
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, String(params[key]));
    });
  }
  if (hash) {
    url.hash = hash;
  }
  window.history.pushState(null, '', url.toString());
}
