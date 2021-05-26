import FileManager from "./FileManager";
import Encode from "./Types/Encode";

export function manager (): FileManager {
  return FileManager.getInstance()
}

export async function fetch (path: string, extensions: Array<string>, encode: Encode, excludes: Array<string>, callback?: () => void) {
  return FileManager.getInstance().fetch(path, extensions, encode, excludes, callback)
}