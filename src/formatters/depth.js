/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

const getOpenParen = (index) => (index === 0 ? `${' '.repeat(0)}{\n` : '');
const getCloseParen = (index, lastIndex, indent, value) => {
  if ((index === lastIndex && typeof (value) === 'object') || index === lastIndex) {
    return `${' '.repeat(indent - 2)}}`;
  }
  return '';
};
export const stylish = (item, spacesCount = 4) => {
  const getDiffDepth = (value, subSpacesCount, depth = 1) => {
    if (typeof (value) !== 'object' || value === null) {
      return value;
    }
    const lastIndex = Object.entries(value).length - 1;
    return Object.entries(value).reduce((acc, [key, currentValue], currentIndex) => {
      console.log(currentValue)
      const indent = spacesCount * depth - 2;
      const openParen = getOpenParen(currentIndex);
      const closeParen = getCloseParen(currentIndex, lastIndex, indent, currentValue);
      const status = ((_.isObject(currentValue) && !currentValue.status) || _.isObject(currentValue.value) || _.isObject(currentValue.twoValue)) ? 'recursion' : currentValue.status;
      switch (status) {
        case 'added':
          return `${acc}${openParen}${' '.repeat(indent)}+ ${key}: ${getDiffDepth(currentValue.value, subSpacesCount, depth)}\n${closeParen}`;
        case 'deleted':
          return `${acc}${openParen}${' '.repeat(indent)}- ${key}: ${getDiffDepth(currentValue.value, subSpacesCount, depth)}\n${closeParen}`;
        case 'changed':
          return `${acc}${openParen}${' '.repeat(indent)}- ${key}: ${getDiffDepth(currentValue.value, subSpacesCount, depth)}\n`
            + `${' '.repeat(indent)}+ ${key}: ${getDiffDepth(currentValue.twoValue, subSpacesCount, depth)}\n${closeParen}`;
        case 'unchanged':
          return `${acc}${openParen}${' '.repeat(indent + 1)} ${key}: ${getDiffDepth(currentValue.value, subSpacesCount, depth)}\n${closeParen}`;
        case 'recursion':
          return `${acc}${openParen}${' '.repeat(indent + 1)} ${key}: ${getDiffDepth(currentValue, subSpacesCount + spacesCount, depth + 1)}\n${closeParen}`;
        default:
          return `${acc}${openParen}${' '.repeat(indent + 1)} ${key}: ${getDiffDepth(currentValue.value, subSpacesCount + spacesCount, depth + 1)}\n${closeParen}`;
      }
    }, '');
  };
  return getDiffDepth(item, spacesCount);
};
