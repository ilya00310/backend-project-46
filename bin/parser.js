import fs from 'fs';
import _ from 'lodash';
import { join } from 'path';
import { load } from 'js-yaml';
import {
  getPath, doParseJson, isFullPath, getExtension, isKeyinObject,
} from './utils.js';

const getParseContent = (path) => {
  switch (getExtension(path)) {
    case 'json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(join('__fixtures__', path.split('/').pop()), 'utf8'));
      }
      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));
    case 'yaml' || 'yml':
      if (isFullPath(path)) {
        return load(fs.readFileSync(join('__fixtures__', path.split('/').pop()), 'utf8'));
      }
      return load(fs.readFileSync(getPath(path, 'utf8')));
    default: throw new Error('extension don\'t provide');
  }
};

const getDiff = (file1, file2) => {
  const keyOneFile = Object.keys(file1);
  const keyTwoFile = Object.keys(file2);
  const keys = _.union(keyOneFile, keyTwoFile).sort();
  const obj = keys.reduce((acc, key) => {
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
  console.log(typeof (JSON.stringify(obj)));
  return JSON.stringify(obj);
};

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getDiff(contentFileOne, contentFileTwo);
};
