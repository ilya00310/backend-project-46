import getParseContent from '../src/logicParser.js';
import getDiff from './diff.js';

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getDiff(contentFileOne, contentFileTwo);
};
