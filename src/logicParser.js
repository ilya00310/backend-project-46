import fs from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import {
  getPath, doParseJson, isFullPath, getExtension,
} from './utils.js';

export default (path) => {
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