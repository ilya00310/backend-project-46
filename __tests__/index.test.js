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
test.each(['json', 'yml'])('.comparison(%s)', (extensions) => {
  const pathOne = getFixturePath(`file1.${extensions}`);
  const pathTwo = getFixturePath(`file2.${extensions}`);
  expect(getGeneralLogic(pathOne, pathTwo)).toEqual(expectedDeep);
  expect(getGeneralLogic(pathOne, pathTwo, 'plain')).toEqual(expectedPlain);
  expect(getGeneralLogic(pathOne, pathTwo, 'json')).toEqual(expectedJson);
});
