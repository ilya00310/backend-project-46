import { getValue, addPath } from '../src/utils.js';

export default (item) => {
  const getDiffPlain = (value, path = '') => {
    if (typeof (value) !== 'object' || value === null) {
      if (typeof (value) === 'string') {
        return `'${value}'`;
      }
      return value;
    }
    const entries = Object.entries(value);
    return entries.reduce((acc, [key, currentValue]) => {
      const newPath = addPath(currentValue, path, key);
      switch (currentValue.status) {
        case 'added':
          return `${acc}Property '${newPath}' was added with value: ${getValue(currentValue.value, newPath, getDiffPlain)}\n`;
        case 'deleted':
          return `${acc}Property '${newPath}' was removed\n`;
        case 'changed':
          return `${acc}Property '${newPath}' was updated. From ${getValue(currentValue.value, newPath, getDiffPlain)} `
            + `to ${getValue(currentValue.twoValue, newPath, getDiffPlain)}\n`;
        case 'unchanged':
          return `${acc}`;
        default:
          return `${acc}${getDiffPlain(currentValue, newPath)}`;
      }
    }, '');
  };
  return getDiffPlain(item).trim();
};
