import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const doStringify = (value, depth, funcForRecursion) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const entries = Object.entries(value);
  const solution = entries.map(([currentKey, currentValue]) => {
    const valueAndKey = { value: currentValue, key: currentKey };
    return funcForRecursion(depth + 1, valueAndKey);
  }).join('');
  return `{\n${solution}${getIndent(depth)}  }`;
};
const getStrByUnchanged = (depth, value) => `${getIndent(depth)}  ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByAdded = (depth, value) => `${getIndent(depth)}+ ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByDeleted = (depth, value) => `${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`;
const getStrByChanged = (depth, value) => `${getIndent(depth)}- ${value.key}: ${doStringify(value.value, depth, getStrByUnchanged)}\n`
  + `${getIndent(depth)}+ ${value.key}: ${doStringify(value.newValue, depth, getStrByUnchanged)}\n`;

export const stylish = (item) => {
  const iter = (value, depth = 1) => value.map((currentValue) => {
    switch (currentValue.status) {
      case 'added':
        return getStrByAdded(depth, currentValue);
      case 'deleted':
        return getStrByDeleted(depth, currentValue);
      case 'changed':
        return getStrByChanged(depth, currentValue);
      case 'unchanged':
        return getStrByUnchanged(depth, currentValue);
      case 'recursion':
        return `${getIndent(depth)}  ${currentValue.key}: {\n${iter(currentValue.value, depth + 1)}${getIndent(depth)}  }\n`;
      default:
        throw new Error('Unexpected status');
    }
  }).join('');
  return `{\n${iter(item)}}`;
};
