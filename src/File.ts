import { Stats } from "fs";
import fs from "fs";
import Encode from "./Types/Encode";

export default class File {
  public readonly filename: string
  public readonly extension: string
  public readonly size: number

  constructor (public readonly path: string) {
    this.filename = this.getFilename()
    this.extension = this.getExtension()
    this.size = this.getStatSync().size
  }

  private getFile (): string {
    const os: any = {
      'win32': () => this.path.split('\\'),
      darwin: () => this.path.split('/'),
      linux: () => this.path.split('/')
    }
    const path = os[process.platform]()
    return path[path.length - 1]
  }

  private getFilename (): string {
    const file = this.getFile().split('.')
    file.pop()
    return file.join('.')
  }

  private getExtension (): string {
    return this.getFile().split('.').pop()!
  }

  private getStatSync (): Stats {
    return fs.statSync(this.path)
  }

  public getStats (): Promise<Stats> {
    return fs.promises.stat(this.path)
  }

  public getContent (encode: Encode): Promise<Buffer | string | undefined> {
    return fs.promises.readFile(this.path, { encoding: encode })
  }
}