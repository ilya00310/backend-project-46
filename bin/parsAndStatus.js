import getParseContent from '../src/logicParser.js';
import getStatusDiff from './diff.js';

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  return getStatusDiff(contentFileOne, contentFileTwo);
};
