/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const isKeyInObject = (object, key) => Object.hasOwn(object, key);
const isHaveSubData = (data, key) => _.isObject(data[key]);
export const getStatus = (fileOne, fileTwo) => {
  const sortKeys = _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));
  return sortKeys.reduce((acc, key) => {
    if (!isKeyInObject(fileOne, key) && isHaveSubData(fileTwo, key)) {
      return { ...acc, [key]: { status: 'recursion', value: fileTwo[key] } };
    } if (!isKeyInObject(fileOne, key)) {
      return { ...acc, [key]: { status: 'added', value: fileTwo[key] } };
    } if (!isKeyInObject(fileTwo, key) && isHaveSubData(fileOne, key)) {
      return { ...acc, [key]: { status: 'recursion', value: fileOne[key] } };
    } if (!isKeyInObject(fileTwo, key)) {
      return { ...acc, [key]: { status: 'deleted', value: fileOne[key] } };
    }
    if (fileOne[key] === fileTwo[key]) {
      return { ...acc, [key]: { status: 'unchanged', value: fileOne[key] } };
    }
    if (!_.isEqual(fileOne[key], fileTwo[key])) {
      if (isHaveSubData(fileOne, key) && isHaveSubData(fileTwo, key)) {
        return { ...acc, status: 'recursion', [key]: getStatus(fileOne[key], fileTwo[key]) };
      }
      if (isHaveSubData(fileOne, key) || isHaveSubData(fileTwo, key)) {
        return { ...acc, [key]: { status: 'recursion', value: fileOne[key], twoValue: fileTwo[key] } };
      }
      return { ...acc, [key]: { status: 'changed', value: fileOne[key], twoValue: fileTwo[key] } };
    }
  }, {});
};

