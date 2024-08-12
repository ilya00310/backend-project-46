import _ from 'lodash';
import getParseContent from './logicParser.js';
import getStatus from './logicStatus.js';

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParseContent(path1);
  const contentFileTwo = getParseContent(path2);
  const keyOneFile = Object.keys(contentFileOne);
  const keyTwoFile = Object.keys(contentFileTwo);
  const sortKeys = _.sortBy(_.union(keyOneFile, keyTwoFile));
  return getStatus(sortKeys, contentFileOne, contentFileTwo);
};
