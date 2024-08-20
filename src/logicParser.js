/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), `./${filename}`);
const getPathFull = (filename) => resolve(cwd(), `..${filename}`);

const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
export const getParse = (path) => {
  const condition = extname(path);
  switch (true) {
    case condition === '.json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(getPathFull(path)));
      }

      return doParseJson(fs.readFileSync(getPath(path)));
    case condition === '.yml' || condition === '.yaml':
      if (isFullPath(path)) {
        return load(fs.readFileSync(getPathFull(path)));
      }
      return load(fs.readFileSync(getPath(path)));
    default:
      throw new Error('extension don\'t provide');
  }
};
