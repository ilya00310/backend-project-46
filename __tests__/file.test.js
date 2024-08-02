import getDiff from '../bin/utils.js';

const rightAnswer = {
  '  host': 'hexlet.io',
  '- timeout': 50,
  '+ timeout': 20,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
};

test('two short path', () => {
  expect(getDiff('file1.json', 'file2.json')).toEqual(rightAnswer);
});
test('two deffrent path', () => {
  expect(getDiff('file1.json', '/home/ilya/backend-project-46/file2.json')).toEqual(rightAnswer);
});
