import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../bin/parser.js';
// import answer from '../__fixtures__/answer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// возвращает путь до текущей директории (/home/ilya/backend-project-46/__tests__);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
// возвращается путь до определенной фикстуры, '..' убирает последнюю директорию __tests__
// и заменяет ее на __fixtures__

const expected = fs.readFileSync(getFixturePath('twoDeepFiles.txt'), 'utf-8');

describe('only json', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.json')).toEqual(expected);
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.json', '/home/ilya/backend-project-46/file2.json')).toEqual(expected);
  });
  test('path don\'t exist', () => {
    expect(getDiff('file1.json')).toBeUndefined();
  });
});

describe('only yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.yaml', 'file2.yaml')).toEqual(expected);
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.yaml')).toEqual(expected);
  });
});
describe('json-yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.yaml')).toEqual(expected);
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.json')).toEqual(expected);
  });
});
