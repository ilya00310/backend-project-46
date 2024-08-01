import fs from 'fs';
import { resolve } from 'path';
import { cwd } from 'node:process';

const getPath = (filename) => resolve(cwd(), filename);
const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path[0] === '/';
const getExtension = (path) => path.split('.').pop();

const getParseContent = (path) => {
  console.log(getExtension(path));
  switch (getExtension(path)) {
    case 'json':
      return isFullPath(path) ? doParseJson(fs.readFileSync(path, 'utf8')) : doParseJson(fs.readFileSync(getPath(path), 'utf8'));
    default:
  }
};

export default (path1, path2) => {
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return {
    contentFileOne, contentFileTwo,
  };
};
