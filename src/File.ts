import fs, { Stats } from "fs";
import { sep } from 'path'
import { Encode } from "./Types/Encode";

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
    const partials = this.path.split(sep)
    return partials[partials.length - 1]
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

	public async canAccess(mode: number): Promise<boolean> {
		try {
			await fs.promises.access(this.path, mode)
			return true
		} catch {
			return false
		}
	}

	public canWrite (): Promise<boolean> {
		return this.canAccess(fs.constants.W_OK)
	}

	public canRead (): Promise<boolean> {
		return this.canAccess(fs.constants.R_OK)
	}

	public canExecute (): Promise<boolean> {
		return this.canAccess(fs.constants.X_OK)
	}
}