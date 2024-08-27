/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import {
  resolve, extname,
} from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), `${filename}`);

const doParseJson = (data) => JSON.parse(data);
export const getParse = (path) => {
  const condition = extname(path);
  switch (true) {
    case condition === '.json':
      return doParseJson(fs.readFileSync(getPath(path)));
    case condition === '.yml' || condition === '.yaml':
      return load(fs.readFileSync(getPath(path)));
    default:
      throw new Error('extension don\'t provide');
  }
};
