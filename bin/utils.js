import { resolve } from 'path';
import { cwd } from 'node:process';

const getPath = (filename) => resolve(cwd(), '__fixtures__', filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
const getExtension = (path) => path.split('.').pop();
const isKeyinObject = (object, key) => Object.hasOwn(object, key);

export {
  getPath,
  doParseJson,
  isFullPath,
  getExtension,
  isKeyinObject,
};
