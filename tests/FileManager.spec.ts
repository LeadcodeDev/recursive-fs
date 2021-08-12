import test, { ExecutionContext } from 'ava'
import * as path from "path";
import { fetch, fetchExpression, fetchSortedExpression } from "../src";
import FileManager from "../build/FileManager";

test('get instance of FileManager',  async (t) => {
  const fileManager = FileManager.getInstance()
  t.assert(fileManager instanceof FileManager)
})

test('get one file with typescript extension',  async (t) => {
  const extensions = ['ts']
  const res = await fetch(path.join(process.cwd(), 'src'), extensions, 'utf-8')
  const file = res.entries().next().value[1]

  t.is(file.extension, extensions[0])
})

test('retrieve only files with one of the defined extensions',  async (t) => {
  const extensions = ['ts']
  const files = await fetch(path.join(process.cwd(), 'src'), extensions, 'utf-8')

  files.forEach((file) => {
    t.assert(extensions.includes(file.extension))
  })
})

test('get more than one file',  async (t) => {
  const extensions = ['ts']
  const files = await fetch(path.join(process.cwd(), 'src'), extensions, 'utf-8')

  t.assert(files.size > 1)
})

test('get one file with typescript extension (using regexp)', async (t) => {
	const res = await fetchExpression(path.join(process.cwd(), 'src'), /.*\.ts$/, 'utf-8')
	const file = res.entries().next().value[1]

	t.is(file.extension, 'ts')
})

test('retrieve only files with one of the defined extensions (using regexp)',  async (t) => {
	const extensions = ['ts']
  const files = await fetchExpression(path.join(process.cwd()), /.*\.ts$/, 'utf-8')

  files.forEach((file) => {
    t.assert(extensions.includes(file.extension))
  })
})

test('get more than one file (using regexp)',  async (t) => {
  const files = await fetchExpression(path.join(process.cwd(), 'src'), /.*\.ts$/, 'utf-8')

  t.assert(files.size > 1)
})

async function getAllFilesSortedByExtension(t: ExecutionContext<unknown>, extensions: Array<string>) {
	const files = await fetchSortedExpression(process.cwd(), /.*\.(ts|js)$/, extensions, 'utf-8', ['node_modules'])

	files.forEach((file) => {
    t.assert(extensions.includes(file.extension))
  })

	let currentIndex = 0
	files.forEach(file => {
		const index = extensions.indexOf(file.extension)

		if (index < currentIndex)
			t.fail(`extension ${file.extension} is after ${extensions[currentIndex]}`)
		currentIndex = index
	})
}

test('get all files sorted by extension (ts before js)', async (t) => {
	const extensions = ['ts', 'js']

	await getAllFilesSortedByExtension(t, extensions)
})

test('get all files sorted by extension (js before ts)', async (t) => {
	const extensions = ['js', 'ts']

	await getAllFilesSortedByExtension(t, extensions)
})