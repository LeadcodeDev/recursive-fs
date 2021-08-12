import test from 'ava'
import File from '../src/File'
import * as path from "path";
import { Stats } from "fs";

function getFile (filename: string): File {
  return new File(path.join(process.cwd(), 'src', filename))
}

test('get filename', (t) => {
  const file = ['File', 'ts']
  const targetFile = getFile(file.join('.'))

  t.is(targetFile.filename, file[0])
})

test('get extension', (t) => {
  const file = ['File', 'ts']
  const targetFile = getFile(file.join('.'))

  t.assert(typeof targetFile.extension == 'string')
  t.is(targetFile.extension, file[1])
})

test('get size', (t) => {
  const file = getFile('File.ts')

  t.assert(typeof file.size == 'number')
  t.assert(file.size > 0)
})

test('get stats', async (t) => {
  const file = getFile('File.ts')
  const stats = await file.getStats()

  t.assert(stats instanceof Stats)
})

test('can write', async (t) => {
	const file = getFile('File.ts')

	t.assert(await file.canWrite())
})

test('can read', async (t) => {
	const file = getFile('File.ts')

	t.assert(await file.canRead())
})

test('can execute', async (t) => {
	const file = getFile('File.ts')

	t.assert(await file.canExecute())
})