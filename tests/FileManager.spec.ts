import test from 'ava'
import * as path from "path";
import { fetch } from "../src";

test('get one file with typescript extension',  async (t) => {
  const extensions = ['ts']
  const res = await fetch(path.join(process.cwd(), 'src'), extensions, 'utf-8')
  const file = res.entries().next().value[1]

  t.is(file.extension, extensions[0])
})

test('retrieve only files with one of the defined extensions',  async (t) => {
  const extensions = ['ts']
  const files = await fetch(path.join(process.cwd()), extensions, 'utf-8')

  files.forEach((file) => {
    t.assert(extensions.includes(file.extension))
  })
})

test('get more than one file',  async (t) => {
  const extensions = ['ts']
  const files = await fetch(path.join(process.cwd(), 'src'), extensions, 'utf-8')

  t.assert(files.size > 1)
})