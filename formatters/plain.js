import { getValue } from '../src/utils.js';

export default (item) => {
  const getDiffPlain = (value, depth = '') => {
    let newPath = '';
    if (typeof (value) !== 'object' || value === null) {
      if (typeof (value) === 'string') {
        return `'${value}'`;
      }
      return value;
    }

    const entries = Object.entries(value);

    return entries.reduce((acc, [key, currentValue], currentIndex) => {
      if (((typeof (currentValue) === 'object') || typeof (currentValue.value) === 'object')) {
        newPath += `${depth}.${key}`;
      }
      newPath = newPath[0] === '.' ? newPath.slice(1) : newPath;
      let nextStr = '';
      switch (currentValue.status) {
        case 'added':
          nextStr += `Property '${newPath}' was added with value: ${getValue(currentValue.value, newPath, getDiffPlain)}\n`;
          break;
        case 'deleted':
          nextStr += `Property '${newPath}' was removed\n`;
          break;
        case 'changed':
          nextStr += `Property '${newPath}' was updated. From ${getValue(currentValue.value, newPath, getDiffPlain)} `;
          nextStr += `to ${getValue(currentValue.twoValue, newPath, getDiffPlain)}\n`;
          break;
        case 'unchanged':
          nextStr += '';
          break;
        default:
          nextStr += `${getDiffPlain(currentValue, newPath)}`;
      }
      if (typeof (currentIndex.value) !== 'object') {
        newPath = '';
      }
      return acc + nextStr;
    }, '');
  };
  const diffPlain = getDiffPlain(item);
  return diffPlain.slice(0, diffPlain.length - 1);
};
