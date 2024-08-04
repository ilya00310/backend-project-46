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
  const sortKeys = _.sortBy(_.union(keyOneFile, keyTwoFile));
  return sortKeys.reduce((acc, key, currentIndex) => {
    let diiffInStr = '';
    if (!isKeyinObject(file1, key)) {
      diiffInStr = `+ ${key}: ${file2[key]}\n`;
    } else if (!isKeyinObject(file2, key)) {
      diiffInStr = `- ${key}: ${file1[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      diiffInStr = `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`;
    } else {
      diiffInStr = `  ${key} : ${file2[key]}\n`;
    }
    if (currentIndex === sortKeys.length - 1) {
      return `${acc + diiffInStr}}`;
    }
    return acc + diiffInStr;
  }, '{\n');
};

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getDiff(contentFileOne, contentFileTwo);
};
