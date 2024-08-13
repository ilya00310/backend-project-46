import { isKeyinObject, getNewObj } from './utils.js';

export default (sortKeys, fileOne, fileTwo) => {
  const getStatusDiff = (keys, file1, file2) => keys.reduce((acc, key) => {
    if (!isKeyinObject(file1, key)) {
      return { ...acc, ...getNewObj(key, 'added', file2) };
    } if (!isKeyinObject(file2, key)) {
      return { ...acc, ...getNewObj(key, 'deleted', file1) };
    } if (file1[key] !== file2[key]) {
      return { ...acc, ...getNewObj(key, 'changed', file1, file2, getStatusDiff) };
    }
    return { ...acc, ...getNewObj(key, 'unchanged', file1) };
  }, {});
  return getStatusDiff(sortKeys, fileOne, fileTwo);
};
