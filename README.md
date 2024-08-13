# utils-url-toolkit

A utility package for managing URL parameters and hash segments. This library provides a simple and flexible API for working with URL query parameters and hash fragments in various environments, including support for UMD, CommonJS, AMD, and ES Modules.

## Features

- **Manage URL Query Parameters:** Add, update, remove, and retrieve query parameters from the URL.
- **Manage Hash Segments:** Handle URL hash segments, including hash-based query parameters.
- **Cross-Environment Support:** Use in Node.js, browser environments, or module loaders like AMD and CommonJS.
- **TypeScript Support:** Includes TypeScript definitions for strong typing and IDE support.
- **Static Method Support:** Most functionalities are accessible without instantiating an object.

## Installation

You can install `utils-url-toolkit` via npm:

```bash
npm install @isdfs-low-code/utils-url-toolkit
Or via yarn:

bash
复制代码
yarn add utils-url-toolkit
Usage
Importing the Library
You can import the library using ES Modules, CommonJS, or directly in the browser:

ES Modules
javascript
复制代码
import { URLParams } from 'utils-url-toolkit';

const params = new URLParams();
CommonJS
javascript
复制代码
const { URLParams } = require('@isdfs-low-code/utils-url-toolkit');

const params = new URLParams();
UMD (Browser)
html
复制代码
<script src="path/to/dist/index.js"></script>
<script>
  const params = new URLParams();
</script>
Basic Usage
Working with Query Parameters
javascript
复制代码
const params = new URLParams();

// Add a query parameter
params.add({ key: 'value' });
params.apply(); // Apply changes to the URL

// Get a query parameter
const value = params.get('key');

// Update a query parameter
params.update({ key: 'newValue' });
params.apply();

// Remove a query parameter
params.remove(['key']);
params.apply();
Working with Hash Segments
javascript
复制代码
const params = new URLParams();

// Set the hash segment
params.setHash('section1');
params.apply(); // URL becomes #section1

// Get the current hash segment
const hash = params.getHash(); // Returns '#section1'

// Remove the hash segment
params.removeHash();
params.apply(); // URL no longer has a hash segment
Using Static Methods
The URLParams class also supports static methods to directly manipulate the current page's URL without needing to instantiate an object.

Query Parameter Manipulation
javascript
复制代码
// Add a query parameter
URLParams.add({ key: 'value' });

// Get a query parameter
const value = URLParams.get('key');

// Update a query parameter
URLParams.update({ key: 'newValue' });

// Remove a query parameter
URLParams.remove(['key']);

// Remove all query parameters
URLParams.removeAll();
Hash Segment Manipulation
javascript
复制代码
// Set the hash segment
URLParams.setHash('section1');

// Get the current hash segment
const hash = URLParams.getHash(); // Returns '#section1'

// Remove the hash segment
URLParams.removeHash();
API Documentation
URLParams Class
constructor(search?: string, hash?: string)
Creates a new URLParams instance.

search: Optional. A custom query string.
hash: Optional. A custom hash segment.
Instance Methods
get(key: string): string | null: Retrieves the value of the specified query parameter.
getAll(key: string): string[]: Retrieves all values of the specified query parameter.
add(params: Record<string, string | number>): void: Adds new query parameters.
update(params: Record<string, string | number | null | undefined>): void: Updates query parameters. If the value is null or undefined, the parameter is removed.
remove(params: string[]): void: Removes the specified query parameters.
removeAll(): void: Removes all query parameters.
getHash(): string: Retrieves the current hash segment.
setHash(hash: string): void: Sets the hash segment.
removeHash(): void: Removes the hash segment.
apply(): void: Applies the modified query parameters and hash segment to the current URL.
Static Methods
static get(key: string): string | null: Retrieves the value of the specified query parameter.
static getAll(key: string): string[]: Retrieves all values of the specified query parameter.
static add(params: Record<string, string | number>): void: Adds new query parameters.
static update(params: Record<string, string | number | null | undefined>): void: Updates query parameters. If the value is null or undefined, the parameter is removed.
static remove(params: string[]): void: Removes the specified query parameters.
static removeAll(): void: Removes all query parameters.
static getHash(): string: Retrieves the current hash segment.
static setHash(hash: string): void: Sets the hash segment.
static removeHash(): void: Removes the hash segment.
Contribution
Contributions are welcome! Please ensure that all changes are tested and adhere to the project's code style before submitting a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

css
复制代码

### Summary

This `README.md` document provides a comprehensive guide to using the `utils-url-ha