/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import { resolve, extname } from 'path';
import fs from 'fs';
import { choiceFormat } from './formatters/index.js';
import { getParse } from './logicParser.js';
import { getDiff } from './logicDiff.js';

const getPath = (filename) => resolve(cwd(), `${filename}`);
const readFile = (path) => fs.readFileSync(getPath(path));
const getTypeData = (path) => extname(path).slice(1);
export const getGeneralLogic = (path1, path2, formatter = 'stylish') => {
  const typeOneFile = getTypeData((path1));
  const typeTwoFile = getTypeData((path2));
  const contentFileOne = getParse(typeOneFile, readFile(path1));
  const contentFileTwo = getParse(typeTwoFile, readFile(path2));
  const status = getDiff(contentFileOne, contentFileTwo);
  return choiceFormat(formatter, status);
};
