/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import { resolve, extname } from 'path';
import fs from 'fs';
import { choiceFormat } from './formatters/logicChoiceFormat.js';
import { getParse } from './logicParser.js';
import { getStatus } from './logicStatus.js';

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
export const getGeneralLogic = (file1, file2, formatter = 'stylish') => {
  const typeOneFile = getTypeData(extname(file1));
  const typeTwoFile = getTypeData(extname(file2));
  const contentFileOne = getParse(typeOneFile, readFile(file1));
  const contentFileTwo = getParse(typeTwoFile, readFile(file2));
  const status = getStatus(contentFileOne, contentFileTwo);
  return choiceFormat(formatter, status);
};
