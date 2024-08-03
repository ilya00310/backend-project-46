import getDiff from '../bin/parser.js';
import getAnswer from '../__fixtures__/getAnswer.js';

describe('only json', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.json')).toEqual(getAnswer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.json', '/home/ilya/backend-project-46/file2.json')).toEqual(getAnswer());
  });
  test('path do\'nt exist', () => {
    expect(getDiff('file1.json')).toBeUndefined();
  });
});

describe('only yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.yaml', 'file2.yaml')).toEqual(getAnswer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.yaml')).toEqual(getAnswer());
  });
});
describe('json-yaml', () => {
  test('two short path', () => {
    expect(getDiff('file1.json', 'file2.yaml')).toEqual(getAnswer());
  });
  test('two deffrent path', () => {
    expect(getDiff('file1.yaml', '/home/ilya/backend-project-46/file2.json')).toEqual(getAnswer());
  });
});
