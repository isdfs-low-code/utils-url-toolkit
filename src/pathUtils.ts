/**
 * 合并多个 URL 路径部分，确保路径之间正确连接，避免重复的斜杠。
 * @param paths 多个路径部分。
 * @returns 合并后的完整路径。
 */
export function joinURLPaths(...paths: string[]): string {
  return paths.map(path => path.replace(/(^\/+|\/+$)/g, '')).join('/');
}

/**
 * 获取从一个 URL 到另一个 URL 的相对路径。
 * @param from 起始 URL。
 * @param to 目标 URL。
 * @returns 相对路径。
 */
export function getRelativePath(from: string, to: string): string {
  const fromURL = new URL(from);
  const toURL = new URL(to);
  if (fromURL.origin !== toURL.origin) {
    throw new Error('两个 URL 不属于同一域名');
  }
  const fromParts = fromURL.pathname.split('/').filter(Boolean);
  const toParts = toURL.pathname.split('/').filter(Boolean);
  const length = Math.min(fromParts.length, toParts.length);
  let i = 0;
  while (i < length && fromParts[i] === toParts[i]) {
    i++;
  }
  const upLevels = fromParts.length - i;
  const downPath = toParts.slice(i).join('/');
  return `${'../'.repeat(upLevels)}${downPath}`;
}
