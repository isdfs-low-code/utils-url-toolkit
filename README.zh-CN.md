markdown
# utils-url-toolkit

`utils-url-toolkit` 是一个用于管理 URL 查询参数、哈希段以及路径操作的实用工具库。本库提供了一个简单而灵活的 API，用于在各种环境中处理 URL 查询参数、哈希片段、多层嵌套查询参数、路径管理、URL 编码/解码、以及导航操作，支持 UMD、CommonJS、AMD 和 ES Modules 格式。

## 功能特性

- **管理 URL 查询参数**：可以添加、更新、删除和获取 URL 中的查询参数。
- **管理哈希片段**：支持对 URL 中的哈希片段进行操作，包括哈希中的查询参数。
- **多层嵌套查询参数处理**：解析和序列化嵌套的查询参数结构，支持复杂对象的处理。
- **URL 路径操作**：支持路径的拼接、相对路径获取等功能。
- **跨环境支持**：可以在 Node.js、浏览器环境以及 AMD 和 CommonJS 模块加载器中使用。
- **TypeScript 支持**：提供了 TypeScript 定义，支持强类型检查和 IDE 提示。
- **静态方法支持**：无需实例化对象即可直接操作当前页面的 URL。
- **导航操作**：支持 URL 重定向、替换历史记录以及添加历史记录。

## 安装方法

你可以通过 npm 安装 `utils-url-toolkit`：

```bash
npm install @isdfs-low-code/utils-url-toolkit
```

或者通过 yarn 安装：

```bash
yarn add @isdfs-low-code/utils-url-toolkit
```

## 使用方法

### 导入库

你可以使用 ES Modules、CommonJS 或直接在浏览器中使用该库：

#### ES Modules

```javascript
import { URLParams } from '@isdfs-low-code/utils-url-toolkit';

const params = new URLParams();
```

#### CommonJS

```javascript
const { URLParams } = require('@isdfs-low-code/utils-url-toolkit');

const params = new URLParams();
```

#### UMD (浏览器)

```html
<script src="path/to/dist/index.js"></script>
<script>
  const params = new URLParams();
</script>
```

### 基本用法

#### 操作查询参数

```javascript
const params = new URLParams();

// 添加查询参数
params.add({ key: 'value' });
params.apply(); // 应用更改到 URL

// 获取查询参数
const value = params.get('key');

// 更新查询参数
params.update({ key: 'newValue' });
params.apply();

// 删除查询参数
params.remove(['key']);
params.apply();
```

#### 操作哈希片段

```javascript
const params = new URLParams();

// 设置哈希
params.setHash('section1');
params.apply(); // URL 将变为 #section1

// 获取当前哈希
const hash = params.getHash(); // 返回 '#section1'

// 删除哈希
params.removeHash();
params.apply(); // URL 中将不再有哈希片段
```

### 使用静态方法

`URLParams` 类还支持通过静态方法直接操作当前页面的 URL，而无需实例化对象。

#### 操作查询参数

```javascript
// 添加查询参数
URLParams.add({ key: 'value' });

// 获取查询参数
const value = URLParams.get('key');

// 更新查询参数
URLParams.update({ key: 'newValue' });

// 删除查询参数
URLParams.remove(['key']);

// 删除所有查询参数
URLParams.removeAll();
```

#### 操作哈希片段

```javascript
// 设置哈希
URLParams.setHash('section1');

// 获取当前哈希
const hash = URLParams.getHash(); // 返回 '#section1'

// 删除哈希
URLParams.removeHash();
```

### 高级用法

#### 多层嵌套查询参数处理

支持将复杂的对象结构解析为查询参数字符串，或者将查询参数字符串解析为嵌套对象。

```javascript
import { parseNestedParams, stringifyNestedParams } from '@isdfs-low-code/utils-url-toolkit';

// 解析查询参数为嵌套对象
const params = parseNestedParams('foo[bar]=baz&foo[qux]=quux');
console.log(params); // { foo: { bar: 'baz', qux: 'quux' } }

// 序列化嵌套对象为查询参数
const queryString = stringifyNestedParams({ foo: { bar: 'baz', qux: 'quux' } });
console.log(queryString); // 'foo[bar]=baz&foo[qux]=quux'
```

#### URL 路径操作

```javascript
import { joinURLPaths, getRelativePath } from '@isdfs-low-code/utils-url-toolkit';

// 合并 URL 路径
const fullPath = joinURLPaths('/api/', '/users/', '123');
console.log(fullPath); // '/api/users/123'

// 获取相对路径
const relativePath = getRelativePath('http://example.com/api/users', 'http://example.com/api/products');
console.log(relativePath); // '../products'
```

#### URL 导航操作

```javascript
import { redirectTo, replaceState, pushState } from '@isdfs-low-code/utils-url-toolkit';

// 重定向到新 URL
redirectTo('http://example.com', { ref: 'dashboard' }, 'section1');

// 替换当前历史记录
replaceState('/new-path', { ref: 'settings' }, 'section2');

// 添加新的历史记录
pushState('/another-path', { ref: 'profile' }, 'section3');
```

## API 说明

### `URLParams` 类

#### `constructor(search?: string, hash?: string)`

创建一个新的 `URLParams` 实例。

-   `search`：可选，自定义查询字符串。
-   `hash`：可选，自定义哈希片段。

#### `get(key: string): string | null`

获取指定查询参数的值。

#### `getAll(key: string): string[]`

获取指定查询参数的所有值。

#### `add(params: Record<string, string | number>): void`

添加新的查询参数。

#### `update(params: Record<string, string | number | null | undefined>): void`

更新查询参数。如果值为 `null` 或 `undefined`，则删除该参数。

#### `remove(params: string[]): void`

删除指定的查询参数。

#### `removeAll(): void`

删除所有查询参数。

#### `getHash(): string`

获取当前的哈希片段。

#### `setHash(hash: string): void`

设置哈希片段。

#### `removeHash(): void`

移除哈希片段。

#### `apply(): void`

将修改后的查询参数和哈希片段应用到当前 URL。

### 其他导出的函数

#### `parseNestedParams(query: string): Record<string, any>`

解析嵌套的查询参数字符串为对象结构。

#### `stringifyNestedParams(obj: Record<string, any>): string`

将嵌套对象结构序列化为查询参数字符串。

#### `joinURLPaths(...paths: string[]): string`

合并多个 URL 路径部分，确保路径之间正确连接。

#### `getRelativePath(from: string, to: string): string`

获取两个 URL 之间的相对路径。

#### `redirectTo(baseURL: string, params?: Record<string, string | number>, hash?: string): void`

重定向到指定的 URL，支持带查询参数和哈希片段。

#### `replaceState(baseURL: string, params?: Record<string, string | number>, hash?: string): void`

替换浏览器历史中的当前记录，不刷新页面。

#### `pushState(baseURL: string, params?: Record<string, string | number>, hash?: string): void`

向浏览器历史中添加一个新记录，不刷新页面。

## 贡献

欢迎贡献代码！请在提交 PR 之前确保所有更改都经过测试，并遵循项目的代码风格。

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE]() 文件。