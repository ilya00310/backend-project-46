/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import {
  resolve, extname,
} from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), `${filename}`);
const readFile = (path) => fs.readFileSync(getPath(path));
const getTypeData = (extension) => {
  if (extension === '.json') {
    return 'json';
  }
  if (extension === '.yml' || extension === '.yaml') {
    return 'yml';
  }
  return extension;
};
const doParseJson = (data) => JSON.parse(data);
export const getParse = (path) => {
  const typeData = getTypeData(extname(path));
  switch (true) {
    case typeData === 'json':
      return doParseJson(readFile(path));
    case typeData === 'yml':
      return load(readFile(path));
    default:
      throw new Error('extension don\'t provide');
  }
};
