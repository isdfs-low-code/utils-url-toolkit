/**
 * 提供用于管理 URL 查询参数和哈希部分的实用方法。
 */
export class URLParams {
  private searchParams: URLSearchParams;
  private hash: string;
  private hashSearchParams: URLSearchParams;

  /**
   * 构造函数，允许传入自定义的查询字符串和哈希部分。
   * @param {string} search - 自定义的查询字符串，例如 "?type=detail&id=5106"。如果不传，则使用当前页面的查询字符串。
   * @param {string} hash - 自定义的哈希部分，例如 "#/section1?param=value"。如果不传，则使用当前页面的哈希部分。
   */
  constructor(search?: string, hash?: string) {
    this.searchParams = new URLSearchParams(search || window.location.search);
    this.hash = hash || window.location.hash;
    const hashParts = this.hash.split('?');
    this.hash = hashParts[0]; // 哈希部分，不包含查询参数
    this.hashSearchParams = new URLSearchParams(hashParts[1] || '');
  }

  /**
   * 获取指定查询参数的值（适用于普通查询参数）。
   * @param {string} key - 要获取的查询参数的键。
   * @returns {string | null} 返回查询参数的值，如果没有该参数则返回 null。
   */
  get(key: string): string | null {
    return this.searchParams.get(key);
  }

  /**
   * 获取指定查询参数的所有值（如果同一个参数在 URL 中存在多个值，适用于普通查询参数）。
   * @param {string} key - 要获取的查询参数的键。
   * @returns {string[]} 返回查询参数的所有值数组，如果没有该参数则返回空数组。
   */
  getAll(key: string): string[] {
    return this.searchParams.getAll(key);
  }

  /**
   * 获取哈希部分中的查询参数值。
   * @param {string} key - 要获取的哈希查询参数的键。
   * @returns {string | null} 返回查询参数的值，如果没有该参数则返回 null。
   */
  getFromHash(key: string): string | null {
    return this.hashSearchParams.get(key);
  }

  /**
   * 获取哈希部分中的所有查询参数值（如果同一个参数在哈希部分存在多个值）。
   * @param {string} key - 要获取的哈希查询参数的键。
   * @returns {string[]} 返回查询参数的所有值数组，如果没有该参数则返回空数组。
   */
  getAllFromHash(key: string): string[] {
    return this.hashSearchParams.getAll(key);
  }

  /**
   * 添加新的查询参数到当前 URL 中（适用于普通查询参数）。
   * 如果查询参数已存在，则会保留原有参数并追加新的值（适用于参数允许多个值的情况）。
   * @param {Record<string, string | number>} params - 要添加的查询参数键值对。
   */
  add(params: Record<string, string | number>): void {
    Object.entries(params).forEach(([key, value]) => {
      this.searchParams.append(key, String(value));
    });
  }

  /**
   * 添加新的查询参数到哈希部分中。
   * 如果查询参数已存在，则会保留原有参数并追加新的值。
   * @param {Record<string, string | number>} params - 要添加的哈希查询参数键值对。
   */
  addToHash(params: Record<string, string | number>): void {
    Object.entries(params).forEach(([key, value]) => {
      this.hashSearchParams.append(key, String(value));
    });
  }

  /**
   * 修改当前 URL 的查询参数（适用于普通查询参数）。
   * @param {Record<string, string | number | null | undefined>} params - 要修改的查询参数键值对。
   */
  update(params: Record<string, string | number | null | undefined>): void {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        this.searchParams.delete(key);
      } else {
        this.searchParams.set(key, String(value));
      }
    });
  }

  /**
   * 修改哈希部分中的查询参数。
   * @param {Record<string, string | number | null | undefined>} params - 要修改的哈希查询参数键值对。
   */
  updateInHash(params: Record<string, string | number | null | undefined>): void {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        this.hashSearchParams.delete(key);
      } else {
        this.hashSearchParams.set(key, String(value));
      }
    });
  }

  /**
   * 删除当前 URL 的查询参数（适用于普通查询参数）。
   * @param {string[]} params - 要删除的查询参数列表。
   */
  remove(params: string[]): void {
    params.forEach((param) => {
      this.searchParams.delete(param);
    });
  }

  /**
   * 删除哈希部分中的查询参数。
   * @param {string[]} params - 要删除的哈希查询参数列表。
   */
  removeFromHash(params: string[]): void {
    params.forEach((param) => {
      this.hashSearchParams.delete(param);
    });
  }

  /**
   * 删除所有查询参数（适用于普通查询参数）。
   */
  removeAll(): void {
    this.searchParams = new URLSearchParams(); // 清空所有参数
  }

  /**
   * 删除哈希部分中的所有查询参数。
   */
  removeAllFromHash(): void {
    this.hashSearchParams = new URLSearchParams(); // 清空所有哈希查询参数
  }

  /**
   * 获取当前的哈希部分。
   * @returns {string} 返回当前的哈希部分。
   */
  getHash(): string {
    return this.hash;
  }

  /**
   * 设置哈希部分。
   * @param {string} hash - 要设置的哈希部分。
   */
  setHash(hash: string): void {
    this.hash = hash.startsWith('#') ? hash : `#${hash}`;
  }

  /**
   * 移除哈希部分。
   */
  removeHash(): void {
    this.hash = '';
  }

  /**
   * 获取处理后的查询字符串和哈希部分。
   * @returns {string} 返回处理后的完整 URL 字符串（不包括协议和域名）。
   */
  toString(): string {
    const searchString = this.searchParams.toString();
    const hashString = this.hashSearchParams.toString();
    return `${window.location.pathname}${searchString ? '?' + searchString : ''}${this.hash}${hashString ? '?' + hashString : ''}`;
  }

  /**
   * 将修改后的查询参数和哈希部分应用到当前 URL。
   */
  apply(): void {
    const newURL = this.toString();
    window.history.replaceState(null, '', newURL);
  }

  // 静态方法部分
  private static defaultInstance = new URLParams();

  static get(key: string): string | null {
    return URLParams.defaultInstance.get(key);
  }

  static getAll(key: string): string[] {
    return URLParams.defaultInstance.getAll(key);
  }

  static getFromHash(key: string): string | null {
    return URLParams.defaultInstance.getFromHash(key);
  }

  static getAllFromHash(key: string): string[] {
    return URLParams.defaultInstance.getAllFromHash(key);
  }

  static add(params: Record<string, string | number>): void {
    URLParams.defaultInstance.add(params);
    URLParams.defaultInstance.apply();
  }

  static addToHash(params: Record<string, string | number>): void {
    URLParams.defaultInstance.addToHash(params);
    URLParams.defaultInstance.apply();
  }

  static update(params: Record<string, string | number | null | undefined>): void {
    URLParams.defaultInstance.update(params);
    URLParams.defaultInstance.apply();
  }

  static updateInHash(params: Record<string, string | number | null | undefined>): void {
    URLParams.defaultInstance.updateInHash(params);
    URLParams.defaultInstance.apply();
  }

  static remove(params: string[]): void {
    URLParams.defaultInstance.remove(params);
    URLParams.defaultInstance.apply();
  }

  static removeFromHash(params: string[]): void {
    URLParams.defaultInstance.removeFromHash(params);
    URLParams.defaultInstance.apply();
  }

  static removeAll(): void {
    URLParams.defaultInstance.removeAll();
    URLParams.defaultInstance.apply();
  }

  static removeAllFromHash(): void {
    URLParams.defaultInstance.removeAllFromHash();
    URLParams.defaultInstance.apply();
  }

  static getHash(): string {
    return URLParams.defaultInstance.getHash();
  }

  static setHash(hash: string): void {
    URLParams.defaultInstance.setHash(hash);
    URLParams.defaultInstance.apply();
  }

  static removeHash(): void {
    URLParams.defaultInstance.removeHash();
    URLParams.defaultInstance.apply();
  }
}
