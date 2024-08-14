import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getParseAndStatus } from '../src/parsAndStatus.js';
import { stylish } from '../src/formatters/depth.js';
import { plain } from '../src/formatters/plain.js';
import { json } from '../src/formatters/json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const expectedDeep = readFile('deepFormat.txt');
const expectedPlain = readFile('plainFormat.txt');
describe('deepFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.json', 'file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.json', '/backand-project-46.js/__fixtures__/file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });
});

describe('plainFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.json', 'file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.json', '/backand-project-46.js/__fixtures__/file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });
});

describe('jsonFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.json', 'file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.json', '/backand-project-46.js/__fixtures__/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getParseAndStatus('file1.yml', 'file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getParseAndStatus('file1.yml', '/backand-project-46.js/__fixtures__/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
});
