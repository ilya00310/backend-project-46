/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

export const getStatus = (fileOne, fileTwo) => {
  const sortKeys = _.sortBy(_.union(Object.keys(fileOne), Object.keys(fileTwo)));
  return sortKeys.map((item) => {
    if (!Object.hasOwn(fileOne, item)) {
      return { status: 'added', key: item, value: fileTwo[item] };
    }

    if (!Object.hasOwn(fileTwo, item)) {
      return { status: 'deleted', key: item, value: fileOne[item] };
    }
    if (_.isPlainObject(fileOne[item]) && _.isPlainObject(fileTwo[item])) {
      return {
        status: 'recursion', key: item, value: getStatus(fileOne[item], fileTwo[item]),
      };
    }
    if (fileOne[item] !== fileTwo[item]) {
      return {
        status: 'changed', key: item, value: fileOne[item], newValue: fileTwo[item],
      };
    }
    return { status: 'unchanged', key: item, value: fileOne[item] };
  });
};
