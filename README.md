# Recursive-fs
Easily access your files in any folder or sub-folder.

## Objective
It is often difficult to retrieve and use files stored locally at your application, `recursive-fs` allows you to retrieve any file saved in a folder or sub-folder at a defined location.

## How to use
Install the module in your project via YARN
```bash
yarn add fs-recursive
```
Or NPM
```bash
npm install fs-recursive
```

The `recursive-fs` is very simple to use, you need to use the followed function :
```ts
fetch(
  directory: string,
  extentions: Array<string>,
  encode?: Buffer | string | undefined,
  callback?: () => void
): Map<string, File> {}
```

### An example is always more telling
```ts
import { fetch } from 'fs-recursive'

const directory = path.join(process.cwd(), 'folder')
const extensions = ['ts', 'json']

const files = await fetch(directory, extensions, 'utf-8') // return Map<string, File>
console.log(files.entries().next().value[1])

/**
 * Log the followed result
 * 
 * File {
 *   path: 'E:\\WindowsData\\Desktop\\folder`\\File.ts',
 *   filename: 'File',
 *   extension: 'ts',
 *   size: 1513   👈 expredded in bytes
 * }
 */

```

Then you can access to other data like this
```ts
const files = await fetch(directory, extensions, 'utf-8') // return Map<string, File>
const file = files.entries().next().value[1]
const stats = await file.getStats()

console.log(stats)
/**
 * Stats {
 *   dev: 310369320,
 *   mode: 33206,
 *   nlink: 1,
 *   uid: 0,
 *   gid: 0,
 *   rdev: 0,
 *   blksize: 4096,
 *   ino: 562949956735823,
 *   size: 72,
 *   blocks: 0,
 *   atimeMs: 1618523067313.032,
 *   mtimeMs: 1618521064609.6714,
 *   ctimeMs: 1618521064609.6714,
 *   birthtimeMs: 1618521033264.188,
 *   atime: 2021-04-15T21:44:27.313Z,
 *   mtime: 2021-04-15T21:11:04.610Z,
 *   ctime: 2021-04-15T21:11:04.610Z,
 *   birthtime: 2021-04-15T21:10:33.264Z
 * }
 */
```