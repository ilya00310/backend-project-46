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
  expect(getGeneralLogic(getFixturePath(`file1.${extensions}`), getFixturePath(`file2.${extensions}`))).toEqual(expectedDeep);
  expect(getGeneralLogic(getFixturePath(`file1.${extensions}`), getFixturePath(`file2.${extensions}`), 'plain')).toEqual(expectedPlain);
  expect(getGeneralLogic(getFixturePath(`file1.${extensions}`), getFixturePath(`file2.${extensions}`), 'json')).toEqual(expectedJson);
});
