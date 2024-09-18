/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const getStrValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};
const getActualPath = (path, key) => [...path, key].join('.');
export const plain = (item) => {
  const iter = (value, path = []) => value.map((currentValue) => {
    switch (currentValue.status) {
      case 'added':
        return `Property '${getActualPath(path, currentValue.key)}' was added with value: ${getStrValue(currentValue.value)}\n`;
      case 'deleted':
        return `Property '${getActualPath(path, currentValue.key)}' was removed\n`;
      case 'changed':
        return `Property '${getActualPath(path, currentValue.key)}' was updated. From ${getStrValue(currentValue.value)} `
          + `to ${getStrValue(currentValue.newValue)}\n`;
      case 'unchanged':
        return '';
      case 'recursion':
        return `${iter(currentValue.value, [...path, currentValue.key])}`;
      default:
        throw new Error('Unexpected status');
    }
  }).join('');
  return iter(item).trim();
};
