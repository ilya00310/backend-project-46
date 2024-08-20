import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getGeneralLogic from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const expectedDeep = readFile('stylishFormat.txt');
const expectedPlain = readFile('plainFormat.txt');
const expectedJson = readFile('jsonFormat.txt');
const fullPath = (fileName) => `/home/ilya/backend-project-46/__fixtures__/${fileName}`;
test.each([
  [[fullPath('file1.json'), fullPath('file2.json')], [fullPath('file1.yml'), fullPath('file2.yml')], expectedDeep],
  [[fullPath('file1.json'), fullPath('file2.json'), 'plain'], [fullPath('file1.yml'), fullPath('file2.yml'), 'plain'], expectedPlain],
  [[fullPath('file1.json'), fullPath('file2.json'), 'json'], [fullPath('file1.yml'), fullPath('file2.yml'), 'json'], expectedJson],
])('.comparison(%s %s)', (oneLogic, twoLogic, expected) => {
  expect(getGeneralLogic(...oneLogic)).toEqual(expected);
  expect(getGeneralLogic(...twoLogic)).toEqual(expected);
});
