import { isKeyinObject, getNewObj } from './utils.js';

export default (sortKeys, fileOne, fileTwo) => {
  const getStatusDiff = (keys, file1, file2) => keys.reduce((acc, key) => {
    const interimObj = {};

    if (!isKeyinObject(file1, key)) {
      return { ...acc, ...getNewObj(key, 'added', file2) };
    } if (!isKeyinObject(file2, key)) {
      return { ...acc, ...getNewObj(key, 'deleted', file1) };
    } if (file1[key] !== file2[key]) {
      return { ...acc, ...getNewObj(key, 'changed', file1, file2, getStatusDiff) };
    } if (isKeyinObject(file1, key) && isKeyinObject(file2, key)) {
      return { ...acc, ...getNewObj(key, 'unchanged', file1) };
    }
    return { ...acc, ...interimObj };
  }, {});
  return getStatusDiff(sortKeys, fileOne, fileTwo);
};
