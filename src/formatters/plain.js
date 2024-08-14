/* eslint-disable import/prefer-default-export */
const goTheDepths = (objElement, newPath, func) => func(objElement, newPath);
const getValue = (value, newPath, func) => {
  if (typeof (value) !== 'object' || value === null) {
    return typeof (value) === 'string' ? `'${value}'` : value;
  } if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return goTheDepths(value, newPath, func);
};
const addPath = (value, path, key) => {
  if (path.length === 0) {
    return `${path}${key}`;
  }
  if (((typeof (value) === 'object') || typeof (value.value) === 'object')) {
    return `${path}.${key}`;
  }
  return '';
};
export const plain = (item) => {
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
