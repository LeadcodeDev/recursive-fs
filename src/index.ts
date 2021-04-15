import FileManager from "./FileManager";
import Encode from "./Types/Encode";
import path from "path";

export function manager (): FileManager {
  return FileManager.getInstance()
}

export async function fetch (path: string, extensions: Array<string>, encode: Encode, callback?: () => void) {
  return FileManager.getInstance().fetch(path, extensions, encode, callback)
}