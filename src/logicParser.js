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
