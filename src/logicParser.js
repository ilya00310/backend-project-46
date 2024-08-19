/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), `./${filename}`);
const doParseJson = (file) => JSON.parse(file);
export const getParse = (path) => {
  const extension = extname(path);
  switch (true) {
    case extension === '.json':
      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));
    case extension === '.yml' || extension === '.yaml':
      return load(fs.readFileSync(getPath(path, 'utf8')));
    default:
      throw new Error('extension don\'t provide');
  }
};
