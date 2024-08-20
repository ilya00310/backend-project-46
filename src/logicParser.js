/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname, join } from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), `./${filename}`);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
export const getParse = (path) => {
  console.log('cwd =', cwd(), 'path =', path);
  const condition = extname(path);
  switch (true) {
    case condition === '.json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(path));
      }

      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));
    case condition === '.yml' || condition === 'yaml':
      if (isFullPath(path)) {
        return load(fs.readFileSync(path));
      }
      return load(fs.readFileSync(getPath(path, 'utf8')));
    default:
      throw new Error('extension don\'t provide');
  }
};
