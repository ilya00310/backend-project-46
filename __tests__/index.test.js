import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getStatus from '../bin/parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const expectedDeep = fs.readFileSync(getFixturePath('deepFormat.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plainFormat.txt'), 'utf-8');
describe('deepFormat', () => {
  describe('only json', () => {
    test('two short path', () => {
      const status = getStatus('file1.json', 'file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.json', '/home/ilya/backend-project-46/file2.json');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.yaml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
  });
  describe('json-yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(stylish(status)).toEqual(expectedDeep);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.json');
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
      const status = getStatus('file1.json', '/home/ilya/backend-project-46/file2.json');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.yaml');
      expect(plain(status)).toEqual(expectedPlain);
    });
  });
  describe('json-yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(plain(status)).toEqual(expectedPlain);
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.json');
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
      const status = getStatus('file1.json', '/home/ilya/backend-project-46/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('path don\'t exist', () => {
      expect(getStatus('file1.json')).toBeUndefined();
    });
  });

  describe('only yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.yaml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
  describe('json-yaml', () => {
    test('two short path', () => {
      const status = getStatus('file1.yaml', 'file2.yaml');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
    test('two deffrent path', () => {
      const status = getStatus('file1.yaml', '/home/ilya/backend-project-46/file2.json');
      expect(json(status)).toEqual(JSON.stringify(status, {}, '\t'));
    });
  });
});
