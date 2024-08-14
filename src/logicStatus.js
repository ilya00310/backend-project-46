/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const isKeyinObject = (object, key) => Object.hasOwn(object, key);
const getKeys = (file, key) => Object.keys(file[key]);
const getUnion = (one, two) => _.union(one, two);
const getSortKeys = (obj1, obj2, key) => _.sortBy(getUnion(getKeys(obj1, key), getKeys(obj2, key)));
const getNewObj = (key, status, frstFile, scndFile = undefined, func = undefined) => {
  if (scndFile === undefined) {
    return { [key]: { status: `${status}`, value: frstFile[key] } };
  }
  if (typeof (frstFile[key]) === 'object' && typeof (scndFile[key]) === 'object') {
    return { [key]: func(getSortKeys(frstFile, scndFile, key), frstFile[key], scndFile[key]) };
  }
  return { [key]: { status: `${status}`, value: frstFile[key], twoValue: scndFile[key] } };
};
export const getStatus = (sortKeys, fileOne, fileTwo) => {
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
