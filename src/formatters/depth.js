import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const doStringify = (value, depth, funcForRecursion = undefined, spacesCount = 4) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const entries = Object.entries(value);
  const solution = entries.map(([currentKey, currentValue]) => {
    const valueAndKey = { value: currentValue, key: currentKey };
    return funcForRecursion('', depth + 1, valueAndKey);
  }).join('');
  return `{\n${solution}${getIndent(depth, spacesCount)}  }`;
};
const getStrByUnchanged = (acc, depth, value) => `${acc}${getIndent(depth)}  ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByAdded = (acc, depth, value) => `${acc}${getIndent(depth)}+ ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByDeleted = (acc, depth, value) => `${acc}${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByChanged = (acc, depth, value) => `${acc}${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`
  + `${getIndent(depth)}+ ${value.key}: ${doStringify(value.newValue, depth, getStrByUnchanged)}\n`;

export const stylish = (item) => {
  const getDiffDepth = (value, depth = 1) => value.reduce((acc, currentValue) => {
    switch (currentValue.status) {
      case 'added':
        return getStrByAdded(acc, depth, currentValue);
      case 'deleted':
        return getStrByDeleted(acc, depth, currentValue);
      case 'changed':
        return getStrByChanged(acc, depth, currentValue);
      case 'unchanged':
        return getStrByUnchanged(acc, depth, currentValue);
      case 'recursion':
        return `${acc}${getIndent(depth)}  ${currentValue.key}: {\n${getDiffDepth(currentValue.value, depth + 1)}${getIndent(depth)}  }\n`;
      default:
        throw new Error('Unexpected status');
    }
  }, '');
  return `{\n${getDiffDepth(item)}}`;
};
