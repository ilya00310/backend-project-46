import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
const getIndentWithParen = (depth, value, index = undefined, lastIndex = undefined) => {
  const indent = 4 * depth - 2;
  if (lastIndex !== undefined) {
    if (index === lastIndex) {
      return `${' '.repeat(indent - 2)}}`;
    }
    return '';
  }
  if (value.status === 'recursion' || value.status === 'unchanged' || !value.status) {
    return index === 0 ? `{\n${' '.repeat(indent + 1)}` : ' '.repeat(indent + 1);
  }
  return index === 0 ? `{\n${' '.repeat(indent)}` : ' '.repeat(indent);
};
const doStringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const lastIndex = Object.entries(value).length - 1;
  const keys = Object.keys(value);
  const solution = keys.map((currentKey, index) => `${getIndentWithParen(depth, value, index)} ${currentKey}: ${doStringify(value[currentKey], depth + 1)}\n${getIndentWithParen(depth, value, index, lastIndex)}`).join('');
  return solution;
};
const getStrByStatus = (acc, depth, value, symbol = '', index = undefined, lastIndex = undefined) => `${acc}${getIndentWithParen(depth, value, index)}${symbol} ${value.key}: ${doStringify(value.value, depth + 1)}\n${getIndentWithParen(depth, value, index, lastIndex)}`;

export const stylish = (item) => {
  const getDiffDepth = (value, depth = 1) => {
    const lastIndex = Object.entries(value).length - 1;
    return Object.values(value).reduce((acc, currentValue, currentIndex) => {
      switch (currentValue.status) {
        case 'added':
          return getStrByStatus(acc, depth, currentValue, '+', currentIndex, lastIndex);
        case 'deleted':
          return getStrByStatus(acc, depth, currentValue, '-', currentIndex, lastIndex);
        case 'changed':
          return `${acc}${getIndentWithParen(depth, currentValue, currentIndex)}- ${currentValue.key}: ${doStringify(currentValue.value, depth + 1)}\n`
            + `${getIndentWithParen(depth, currentValue)}+ ${currentValue.key}: ${doStringify(currentValue.newValue, depth + 1)}\n${getIndentWithParen(depth, currentValue, currentIndex, lastIndex)}`;
        case 'unchanged':
          return getStrByStatus(acc, depth, currentValue, '', currentIndex, lastIndex);
        case 'recursion':
          return `${acc}${getIndentWithParen(depth, currentValue, currentIndex)} ${currentValue.key}: ${getDiffDepth(currentValue.value, depth + 1)}\n${getIndentWithParen(depth, currentValue, currentIndex, lastIndex)}`;
        default:
          throw new Error('Unexpected status');
      }
    }, '');
  };
  return getDiffDepth(item);
};
