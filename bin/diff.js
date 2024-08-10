import _ from 'lodash';
import getStatusDiff from '../src/logicdiff.js';

export default (file1, file2) => {
  const keyOneFile = Object.keys(file1);
  const keyTwoFile = Object.keys(file2);
  const sortKeys = _.sortBy(_.union(keyOneFile, keyTwoFile));
  return getStatusDiff(sortKeys, file1, file2);
};
