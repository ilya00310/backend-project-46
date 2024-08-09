import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getStatus from '../bin/parsAndStatus.js';
import { stylish } from '../src/logicdiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const expected = fs.readFileSync(getFixturePath('twoDeepFiles.txt'), 'utf-8');

describe('only json', () => {
  test('two short path', () => {
    const status = getStatus('file1.json', 'file2.json');
    expect(stylish(status)).toEqual(expected);
  });
  test('two deffrent path', () => {
    const status = getStatus('file1.json', '/home/ilya/backend-project-46/file2.json');
    expect(stylish(status)).toEqual(expected);
  });
  test('path don\'t exist', () => {
    expect(getStatus('file1.json')).toBeUndefined();
  });
});

describe('only yaml', () => {
  test('two short path', () => {
    const status = getStatus('file1.yaml', 'file2.yaml');
    expect(stylish(status)).toEqual(expected);
  });
  test('two deffrent path', () => {
    const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.yaml');
    expect(stylish(status)).toEqual(expected);
  });
});
describe('json-yaml', () => {
  test('two short path', () => {
    const status = getStatus('file1.yaml', 'file2.yaml');
    expect(stylish(status)).toEqual(expected);
  });
  test('two deffrent path', () => {
    const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.json');
    expect(stylish(status)).toEqual(expected);
  });
});
