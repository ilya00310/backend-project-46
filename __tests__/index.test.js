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
const fixture = '/__fixtures__/';
test.each([
  [[`${fixture}file1.json`, `${fixture}file2.json`], [`${fixture}file1.yml`, `${fixture}file2.yml`], expectedDeep],
  [[`${fixture}file1.json`, `${fixture}file2.json`, 'plain'], [`${fixture}file1.yml`, `${fixture}file2.yml`, 'plain'], expectedPlain],
  [[`${fixture}file1.json`, `${fixture}file2.json`, 'json'], [`${fixture}file1.yml`, `${fixture}file2.yml`, 'json'], expectedJson],
])('.comparison(%s %s)', (oneLogic, twoLogic, expected) => {
  expect(getGeneralLogic(...oneLogic)).toEqual(expected);
  expect(getGeneralLogic(...twoLogic)).toEqual(expected);
});
