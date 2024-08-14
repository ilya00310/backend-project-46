/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { getParse } from './logicParser.js';
import { getStatus } from './logicStatus.js';

export const getParseAndStatus = (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  const contentFileOne = getParse(path1);
  const contentFileTwo = getParse(path2);
  const keyOneFile = Object.keys(contentFileOne);
  const keyTwoFile = Object.keys(contentFileTwo);
  const sortKeys = _.sortBy(_.union(keyOneFile, keyTwoFile));
  return getStatus(sortKeys, contentFileOne, contentFileTwo);
};
