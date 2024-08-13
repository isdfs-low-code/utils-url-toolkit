import { URLParams } from './URLParams';

export class URLNavigator {
  private urlParams: URLParams;
  private listeners: Array<{ listener: () => void; once: boolean }> = [];

  /**
   * 创建一个新的 URLNavigator 实例。
   * @param search 可选的自定义查询字符串。默认为当前 URL 的查询字符串。
   * @param hash 可选的自定义哈希片段。默认为当前 URL 的哈希片段。
   */
  constructor(search?: string, hash?: string) {
    this.urlParams = new URLParams(search, hash);
    this.setupPopStateListener();
  }

  /**
   * 在浏览器历史记录中前进或后退指定的页面数。
   * @param delta 移动的页数。正数表示前进，负数表示后退。
   */
  go(delta: number): void {
    window.history.go(delta);
  }

  /**
   * 在浏览器历史记录中前进一页。
   */
  goForward(): void {
    this.go(1);
  }

  /**
   * 在浏览器历史记录中后退一页。
   */
  goBack(): void {
    this.go(-1);
  }

  /**
   * 跳转到指定的 URL，可以选择是否替换当前历史记录。
   * @param url 要跳转的 URL 字符串。
   * @param replace 是否替换当前历史记录。如果为 `true`，则替换当前历史记录；否则推送新的记录。默认为 `false`。
   */
  navigateTo(url: string, replace: boolean = false): void {
    if (replace) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  }

  /**
   * 推送新的 URL 到浏览器历史记录，同时跳转到该 URL。
   * 使用 `history.pushState` 方法，不会触发页面刷新。
   * @param url 要跳转的 URL 字符串。
   */
  push(url: string): void {
    window.history.pushState(null, '', url);
    this.triggerListeners();
  }

  /**
   * 重定向到指定的 URL，并可以选择保留查询参数和哈希片段。
   * @param baseURL 基础 URL 字符串。
   * @param preserveSearch 是否保留当前查询参数。默认为 `true`。
   * @param preserveHash 是否保留当前哈希片段。默认为 `true`。
   */
  redirectTo(baseURL: string, preserveSearch: boolean = true, preserveHash: boolean = true): void {
    const url = new URL(baseURL);

    if (preserveSearch) {
      url.search = this.urlParams.toStringSearch();
    }

    if (preserveHash) {
      url.hash = this.urlParams.toStringHash();
    }

    window.location.replace(url.toString());
  }

  /**
   * 在不刷新页面的情况下替换当前历史记录。
   * @param url 要替换的 URL 字符串。
   */
  replace(url: string): void {
    window.history.replaceState(null, '', url);
    this.triggerListeners();
  }

  /**
   * 添加查询参数到当前 URL，并更新 URL。
   * @param params 包含查询参数的对象。
   */
  addQueryParams(params: Record<string, string | number>): void {
    this.urlParams.add(params);
    this.replace(window.location.pathname + '?' + this.urlParams.toStringSearch() + window.location.hash);
  }

  /**
   * 移除指定的查询参数并更新 URL。
   * @param keys 要移除的查询参数键数组。
   */
  removeQueryParams(keys: string[]): void {
    this.urlParams.remove(keys);
    this.replace(window.location.pathname + '?' + this.urlParams.toStringSearch() + window.location.hash);
  }

  /**
   * 设置或更新哈希片段，并更新 URL。
   * @param hash 要设置的哈希片段。
   */
  setHash(hash: string): void {
    this.urlParams.setHash(hash);
    this.replace(window.location.pathname + window.location.search + '#' + this.urlParams.toStringHash());
  }

  /**
   * 清除当前的哈希片段，并更新 URL。
   */
  clearHash(): void {
    this.urlParams.removeHash();
    this.replace(window.location.pathname + window.location.search);
  }

  /**
   * 添加一个 URL 变化的监听器。
   * 当 URL 变化时（例如前进、后退、push 或 replace 操作），触发该回调。
   * @param listener 当 URL 变化时要调用的回调函数。
   * @param once 是否只触发一次该监听器。默认为 `false`。
   */
  addListener(listener: () => void, once: boolean = false): void {
    this.listeners.push({ listener, once });
  }

  /**
   * 移除一个已添加的 URL 变化监听器。
   * @param listener 要移除的回调函数。
   */
  removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l.listener !== listener);
  }

  /**
   * 移除所有已添加的 URL 变化监听器。
   */
  removeAllListeners(): void {
    this.listeners = [];
  }

  /**
   * 设置监听 popstate 事件，当浏览器历史记录发生变化时触发回调。
   */
  private setupPopStateListener(): void {
    window.addEventListener('popstate', () => {
      this.triggerListeners();
    });
  }

  /**
   * 触发所有注册的监听器。
   */
  private triggerListeners(): void {
    this.listeners = this.listeners.filter(({ listener, once }) => {
      listener();
      return !once;
    });
  }

  // 静态方法，使其在无需实例化的情况下调用

  /**
   * 在浏览器历史记录中前进或后退指定的页面数（静态方法）。
   * @param delta 移动的页数。正数表示前进，负数表示后退。
   */
  static go(delta: number): void {
    window.history.go(delta);
  }

  /**
   * 在浏览器历史记录中前进一页（静态方法）。
   */
  static goForward(): void {
    URLNavigator.go(1);
  }

  /**
   * 在浏览器历史记录中后退一页（静态方法）。
   */
  static goBack(): void {
    URLNavigator.go(-1);
  }

  /**
   * 跳转到指定的 URL，可以选择是否替换当前历史记录（静态方法）。
   * @param url 要跳转的 URL 字符串。
   * @param replace 是否替换当前历史记录。如果为 `true`，则替换当前历史记录；否则推送新的记录。默认为 `false`。
   */
  static navigateTo(url: string, replace: boolean = false): void {
    if (replace) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  }

  /**
   * 推送新的 URL 到浏览器历史记录，同时跳转到该 URL（静态方法）。
   * 使用 `history.pushState` 方法，不会触发页面刷新。
   * @param url 要跳转的 URL 字符串。
   */
  static push(url: string): void {
    window.history.pushState(null, '', url);
  }

  /**
   * 在不刷新页面的情况下替换当前历史记录（静态方法）。
   * @param url 要替换的 URL 字符串。
   */
  static replace(url: string): void {
    window.history.replaceState(null, '', url);
  }
}
