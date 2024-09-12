import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const doStringify = (value, depth, funcForRecursion = undefined, spacesCount = 4) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const solution = keys.reduce((acc, currentKey) => {
    const valueAndKey = { value: value[currentKey], key: currentKey };
    return funcForRecursion(acc, depth, valueAndKey);
  }, '');
  return `{\n${solution}${getIndent(depth - 1, spacesCount)}  }`;
};
const getStrByUnchanged = (acc, depth, value) => `${acc}${getIndent(depth)}  ${value.key}: ${doStringify(value.value, depth + 1, getStrByUnchanged)}\n`;
const getStrByAdded = (acc, depth, value) => `${acc}${getIndent(depth)}+ ${value.key}: ${doStringify(value.value, depth + 1, getStrByUnchanged)}\n`;
const getStrByDeleted = (acc, depth, value) => `${acc}${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth + 1, getStrByUnchanged)}\n`;
const getStrByChanged = (acc, depth, value) => `${acc}${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth + 1, getStrByUnchanged)}\n`
  + `${getIndent(depth)}+ ${value.key}: ${doStringify(value.newValue, depth + 1, getStrByUnchanged)}\n`;

export const stylish = (item) => {
  const getDiffDepth = (value, depth = 1) => Object.values(value).reduce((acc, currentValue) => {
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
