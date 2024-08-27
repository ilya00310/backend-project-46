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
const fullPath = (fileName) => `/home/ilya//backend-project-46/__fixtures__/${fileName}`;
test.each([
  [['file1.json', 'file2.json'], ['file1.yml', 'file2.yml'], expectedDeep],
  [['file1.json', 'file2.json', 'plain'], ['file1.yml', 'file2.yml', 'plain'], expectedPlain],
  [['file1.json', 'file2.json', 'json'], ['file1.yml', 'file2.yml', 'json'], expectedJson],
])('.comparison(%s %s)', (oneLogic, twoLogic, expected) => {
  const onePath = [fullPath(oneLogic[0]), fullPath(oneLogic[1])];
  const twoPath = [fullPath(twoLogic[0]), fullPath(twoLogic[1])];
  expect(getGeneralLogic(onePath[0], onePath[1], oneLogic[2])).toEqual(expected);
  expect(getGeneralLogic(twoPath[0], twoPath[1], twoLogic[2])).toEqual(expected);
});
