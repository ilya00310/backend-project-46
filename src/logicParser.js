/* eslint-disable import/prefer-default-export */
import { cwd } from 'node:process';
import fs from 'fs';
import { join, resolve } from 'path';
import { load } from 'js-yaml';

const getPath = (filename) => resolve(cwd(), '__fixtures__', filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path.includes('/');
const getExtension = (path) => path.substring(path.lastIndexOf('.') + 1, path.length);
export const getParse = (path) => {
  switch (getExtension(path)) {
    case 'json':
      if (isFullPath(path)) {
        return doParseJson(fs.readFileSync(join(...path.split('/').slice(2)), 'utf8'));
      }
      return doParseJson(fs.readFileSync(getPath(path, 'utf8')));
    case 'yml':
      if (isFullPath(path)) {
        return load(fs.readFileSync(join(...path.split('/').slice(2)), 'utf8'));
      }
      return load(fs.readFileSync(getPath(path, 'utf8')));
    default: throw new Error('extension don\'t provide');
  }
};
