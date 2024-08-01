import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'node:process';
import _ from 'lodash';

const getPath = (filename) => resolve(cwd(), filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path[0] === '/';
const getExtension = (path) => path.split('.').pop();
const isKeyinObject = (object, key) => Object.hasOwn(object, key);

const getParseContent = (path) => {
  switch (getExtension(path)) {
    case 'json':
      return isFullPath(path) ? doParseJson(fs.readFileSync(path, 'utf8')) : doParseJson(fs.readFileSync(getPath(path), 'utf8'));
    default:
  }
};

const getDiff = (file1, file2) => {
  const diffFiles = {};
  const keyOneFile = Object.keys(file1);
  const keyTwoFile = Object.keys(file2);
  const keys = _.union(keyOneFile, keyTwoFile);
  for (const key of keys.sort()) {
    if (!isKeyinObject(file1, key)) {
      diffFiles[`+ ${key}`] = file2[key];
    } else if (!isKeyinObject(file2, key)) {
      diffFiles[`- ${key}`] = file1[key];
    } else if (file1[key] !== file2[key]) {
      diffFiles[`- ${key}`] = file1[key];
      diffFiles[`+ ${key}`] = file2[key];
    } else {
      diffFiles[`  ${key}`] = file2[key];
    }
  }
  return diffFiles;
};

export default (path1, path2) => {
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getDiff(contentFileOne, contentFileTwo);
};
