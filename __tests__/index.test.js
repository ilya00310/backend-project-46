import getDiff from '../bin/parser.js';
import answer from '../__fixtures__/answer.js';

describe('only json', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.json')).toEqual(answer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.json', '/home/ilya/backend-project-46/file2.json')).toEqual(answer());
  });
  test('path don\'t exist', () => {
    expect(getDiff('file1.json')).toBeUndefined();
  });
});

describe('only yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.yaml', 'file2.yaml')).toEqual(answer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.yaml')).toEqual(answer());
  });
});
describe('json-yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.yaml')).toEqual(answer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.json')).toEqual(answer());
  });
});
