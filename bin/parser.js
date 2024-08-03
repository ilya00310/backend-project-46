import fs from 'fs';
import _ from 'lodash';
import { load } from 'js-yaml';
import {
  getPath, doParseJson, isFullPath, getExtension, isKeyinObject,
} from './utils.js';

const getParseContent = (path) => {
  switch (getExtension(path)) {
    case 'json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(path.split('/').pop(), 'utf8'));
      }
      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));
    case 'yaml':
      if (isFullPath(path)) {
        return load(fs.readFileSync(path.split('/').pop(), 'utf8'));
      }
      return load(fs.readFileSync(getPath(path, 'utf8')));
    default: throw new Error('extension don\'t provide');
  }
};

const getDiff = (file1, file2) => {
  const keyOneFile = Object.keys(file1);
  const keyTwoFile = Object.keys(file2);
  const keys = _.union(keyOneFile, keyTwoFile).sort();
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
