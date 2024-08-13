import { resolve } from 'path';
import { cwd } from 'node:process';
import _ from 'lodash';

const getPath = (filename) => resolve(cwd(), '__fixtures__', filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
const getExtension = (path) => path.substring(path.lastIndexOf('.') + 1, path.length);
const isKeyinObject = (object, key) => Object.hasOwn(object, key);
const getKeys = (file, key) => Object.keys(file[key]);
const getUnion = (one, two) => _.union(one, two);
const getSortKeys = (obj1, obj2, key) => _.sortBy(getUnion(getKeys(obj1, key), getKeys(obj2, key)));
const goTheDepths = (objElement, newPath, func) => func(objElement, newPath);
const getValue = (value, newPath, func) => {
  if (typeof (value) !== 'object' || value === null) {
    return typeof (value) === 'string' ? `'${value}'` : value;
  } if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return goTheDepths(value, newPath, func);
};
const addPath = (value, path, key) => {
  if (path.length === 0) {
    return `${path}${key}`;
  }
  if (((typeof (value) === 'object') || typeof (value.value) === 'object')) {
    return `${path}.${key}`;
  }
  return '';
};

export {
  getPath,
  doParseJson,
  isFullPath,
  getExtension,
  isKeyinObject,
  getSortKeys,
  goTheDepths,
  getValue,
  addPath,
};
