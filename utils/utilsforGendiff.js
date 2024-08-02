import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'node:process';
import _ from 'lodash';

const getPath = (filename) => resolve(cwd(), filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
const getExtension = (path) => path.split('.').pop();
const isKeyinObject = (object, key) => Object.hasOwn(object, key);

const getParseContent = (path) => {
  switch (getExtension(path)) {
    case 'json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(path.split('/').pop(), 'utf8'));
      }
      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));

    default: throw new Error('extension don\'t provide');
  }
};

const getDiff = (file1, file2) => {
  const keyOneFile = Object.keys(file1);
  const keyTwoFile = Object.keys(file2);
  const keys = _.union(keyOneFile, keyTwoFile);
  return keys.reduce((acc, key) => {
    if (!isKeyinObject(file1, key)) {
      acc[`+ ${key}`] = file2[key];
    } else if (!isKeyinObject(file2, key)) {
      acc[`- ${key}`] = file1[key];
    } else if (file1[key] !== file2[key]) {
      acc[`- ${key}`] = file1[key];
      acc[`+ ${key}`] = file2[key];
    } else {
      acc[`  ${key}`] = file2[key];
    }
    return acc;
  }, {});
};

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getDiff(contentFileOne, contentFileTwo);
};

export {
  doParseJson,
};
