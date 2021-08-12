import FileManager from "./FileManager";
import { Encode } from "./Types/Encode";
import File from './File'

export {
  File
}

export function manager (): FileManager {
  return FileManager.getInstance()
}

export function fetch (path: string, extensions: Array<string>, encode: Encode, excludes?: Array<string>, callback?: (file: File) => void) {
  return FileManager.getInstance().fetch(path, extensions, encode, excludes, callback)
}

export function fetchExpression (path: string, filenamePattern: RegExp, encode: Encode, excludes?: Array<string>, callback?: (file: File) => void) {
	return FileManager.getInstance().fetchExpression(path, filenamePattern, encode, excludes, callback)
}

export async function fetchSortedExpression (path: string, filenamePattern: RegExp, sortedExtensions: Array<string>, encode: Encode, excludes?: Array<string>, callback?: (file: File) => void) {
	const fileMap = await fetchExpression(path, filenamePattern, encode, excludes, callback)
	const files = Array.from(fileMap.values())

	files.sort((a, b) => sortedExtensions.indexOf(a.extension) - sortedExtensions.indexOf(b.extension))

	return files
}