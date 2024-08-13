import { isNextDeep, getOpenParen, getCloseParen } from '../src/utils.js';

export default (item, spacesCount = 4) => {
  const getdiffDepth = (value, subSpacesCount, depth = 1) => {
    if (typeof (value) !== 'object' || value === null) {
      return value;
    }
    const entries = Object.entries(value);
    const lastIndex = entries.length - 1;
    return entries.reduce((acc, [key, currentValue], currentIndex) => {
      const pointerDeep = isNextDeep(currentValue) ? 1 : 0;
      const newCount = isNextDeep(currentValue) ? subSpacesCount + spacesCount : subSpacesCount;
      const indent = spacesCount * depth - 2;
      const openParen = getOpenParen(currentIndex);
      const closeParen = getCloseParen(currentIndex, lastIndex, indent, currentValue);
      switch (currentValue.status) {
        case 'added':
          return `${acc}${openParen}${' '.repeat(indent)}+ ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n${closeParen}`;
        case 'deleted':
          return `${acc}${openParen}${' '.repeat(indent)}- ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n${closeParen}`;
        case 'changed':
          return `${acc}${openParen}${' '.repeat(indent)}- ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n`
            + `${' '.repeat(indent)}+ ${key}: ${getdiffDepth(currentValue.twoValue, newCount, depth + pointerDeep)}\n${closeParen}`;
        case 'unchanged':
          return `${acc}${openParen}${' '.repeat(indent + 1)} ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n${closeParen}`;
        default:
          return `${acc}${openParen}${' '.repeat(indent + 1)} ${key}: ${getdiffDepth(currentValue, newCount, depth + pointerDeep)}\n${closeParen}`;
      }
    }, '');
  };
  return getdiffDepth(item, spacesCount);
};
