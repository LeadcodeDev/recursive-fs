import fs from "fs";
import File from "./File";
import path from "path";
import { Encode } from "./Types/Encode";
import { v4 as uuid } from 'uuid';

export default class FileManager {
  private static instance: FileManager

  public static getInstance (): FileManager {
    if (!FileManager.instance) {
      this.instance = new FileManager()
    }
    return this.instance
  }

  public async fetch (basePath: string, extensions: Array<string>, encode?: Encode, excludes: Array<string> = [], callback?: (file: File) => void) {
    const filesList: Map<any, File> = new Map()
    const baseDirectory: boolean = fs.existsSync(basePath)
    if (!baseDirectory) {
      return filesList
    }

    async function walk (directory: string): Promise<void> {
      const objects = await fs.promises.readdir(directory, { encoding: encode })

      await Promise.all(
        objects.map(async (object) => {
          const dir = path.join(directory, object)
          const item = await fs.promises.stat(dir)

          if (item.isDirectory()) {
            if (!excludes.includes(dir.split(path.sep).pop()!)) {
              return walk(dir)
            }
          }

          const isAllowedFile = extensions.some((extension: string) => {
            return object.endsWith(`.${extension}`)
          })

          if (isAllowedFile) {
            const file = new File(dir)
            filesList.set(uuid(), file)

            if (callback) {
              callback(file)
            }
          }
        })
      )
    }

    await walk(basePath)
    return filesList
  }

	public async fetchExpression (basePath: string, filenamePattern: RegExp, encode: Encode, excludes: Array<string> = [], callback?: (file: File) => void) {
		const filesList: Map<any, File> = new Map()
    const baseDirectory: boolean = fs.existsSync(basePath)
    if (!baseDirectory) {
      return filesList
    }

    async function walk (directory: string): Promise<void> {
      const objects = await fs.promises.readdir(directory, { encoding: encode })

      await Promise.all(
        objects.map(async (object) => {
          const dir = path.join(directory, object)
          const item = await fs.promises.stat(dir)

          if (item.isDirectory()) {
            if (!excludes.includes(dir.split(path.sep).pop()!)) {
              return walk(dir)
            }
          }

          if (filenamePattern.test(object)) {
            const file = new File(dir)
            filesList.set(uuid(), file)

            if (callback) {
              callback(file)
            }
          }
        })
      )
    }

    await walk(basePath)
    return filesList
	}
}