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
const parse = (file) => JSON.parse(file);
test.each([
  [getGeneralLogic('file1.json', 'file2.json'), getGeneralLogic('file1.yml', 'file2.yml'), expectedDeep],
  [getGeneralLogic('file1.json', 'file2.json', 'plain'), getGeneralLogic('file1.yml', 'file2.yml', 'plain'), expectedPlain],
  [parse(getGeneralLogic('file1.json', 'file2.json', 'json')), parse(getGeneralLogic('file1.yml', 'file2.yml', 'json')), parse(expectedJson)],
])('.add(%i, %i) ', (oneLogic, twoLogic, expected) => {
  expect(oneLogic).toEqual(expected);
  expect(twoLogic).toEqual(expected);
});
