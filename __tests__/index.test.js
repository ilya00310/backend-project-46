import getDiff from '../utils/utilsforGendiff.js';
import getAnswer from '../utils/utilsForTest.js';

test('two short path', () => {
  expect(getDiff('file1.json', 'file2.json')).toEqual(getAnswer('json-json'));
});
test('two deffrent path', () => {
  expect(getDiff('file1.json', '/home/ilya/backend-project-46/file2.json')).toEqual(getAnswer('json-json'));
});
test('path do\'nt exist', () => {
  expect(getDiff('file1.json')).toBeUndefined();
});
