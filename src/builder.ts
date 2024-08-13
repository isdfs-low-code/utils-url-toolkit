export function buildURL(baseURL: string, path: string, params?: Record<string, string | number>): string {
  const url = new URL(baseURL);
  if (path) {
    url.pathname = path;
  }
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
  }
  return url.toString();
}
