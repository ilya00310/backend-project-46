/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

export const plain = (item) => {
  const getDiffPlain = (value, path = '') => Object.entries(value).map(([key, currentValue]) => {
    const correctKey = currentValue.key || key;
    const arrPath = path.length === 0 ? [correctKey] : [path, correctKey];
    switch (currentValue.status) {
      case 'added':
        return `Property '${arrPath.join('.')}' was added with value: ${getValue(currentValue.value)}\n`;
      case 'deleted':
        return `Property '${arrPath.join('.')}' was removed\n`;
      case 'changed':
        return `Property '${arrPath.join('.')}' was updated. From ${getValue(currentValue.value)} `
          + `to ${getValue(currentValue.newValue)}\n`;
      case 'unchanged':
        return '';
      case 'recursion':
        return `${getDiffPlain(currentValue.value, arrPath.join('.'))}`;
      default:
        throw new Error('Unexpected status');
    }
  }).join('');
  return getDiffPlain(item, '').trim();
};
