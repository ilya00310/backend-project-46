import { isKeyinObject, getSortKeys } from './utils.js';

export default (sortKeys, fileOne, fileTwo) => {
  const getStatusDiff = (keys, file1, file2) => keys.reduce((acc, key) => {
    const interimObj = {};

    if (!isKeyinObject(file1, key)) {
      interimObj[key] = { status: 'added', value: file2[key] };
    } else if (!isKeyinObject(file2, key)) {
      interimObj[key] = { status: 'deleted', value: file1[key] };
    } else if (file1[key] !== file2[key]) {
      interimObj[key] = { status: 'changed', value: file1[key], newValue: file2[key] };
    } else if (isKeyinObject(file1, key) && isKeyinObject(file2, key)) {
      interimObj[key] = { status: 'unchanged', value: file1[key] };
    }
    if (typeof (file1[key]) === 'object' && typeof (file2[key]) === 'object') {
      interimObj[key] = getStatusDiff(getSortKeys(file1, file2, key), file1[key], file2[key]);
    }

    return { ...acc, ...interimObj };
  }, {});
  return getStatusDiff(sortKeys, fileOne, fileTwo);
};
