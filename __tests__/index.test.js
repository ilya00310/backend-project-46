import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getStatus from '../src/parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log(__dirname, cwd());
const getFixturePath = (fileName) => path.resolve(__dirname, '..', '__fixtures__', fileName);
const expectedDeep = fs.readFileSync(getFixturePath('deepFormat.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plainFormat.txt'), 'utf-8');
describe('deepFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getStatus('file1.json', 'file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.json', '/__fixtures__/file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.yml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });
});

describe('plainFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getStatus('file1.json', 'file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.json', '/__fixtures__/file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });
});

describe('jsonFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getStatus('file1.json', 'file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.json', '/__fixtures__/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
  describe('json-yml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yml', 'file2.yml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yml', '/__fixtures__/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
});
