/* eslint-disable import/prefer-default-export */
const goTheDepths = (objElement, newPath, func) => func(objElement, newPath);
const getValue = (value, newPath, func) => {
  if (typeof (value) !== 'object' || value === null) {
    return typeof (value) === 'string' ? `'${value}'` : value;
  } if (typeof (value) !== 'object' || newPath === '') {
    return goTheDepths(value, newPath, func);
  }
  return '[complex value]';
};
const addPath = (value, path, key) => {
  if (path.length === 0) {
    return `${path}${key}`;
  }
  if (!value.status) {
    return '';
  }
  return `${path}.${key}`;
};
export const plain = (item) => {
  const getDiffPlain = (value, path = '') => Object.entries(value).reduce((acc, [key, currentValue]) => {
    const correctKey = currentValue.key || key;
    const newPath = addPath(currentValue, path, correctKey);
    switch (currentValue.status) {
      case 'added':
        return `${acc}Property '${newPath}' was added with value: ${getValue(currentValue.value, newPath, getDiffPlain)}\n`;
      case 'deleted':
        return `${acc}Property '${newPath}' was removed\n`;
      case 'changed':
        return `${acc}Property '${newPath}' was updated. From ${getValue(currentValue.value, newPath, getDiffPlain)} `
          + `to ${getValue(currentValue.newValue, newPath, getDiffPlain)}\n`;
      case 'unchanged':
        return `${acc}`;
      default:
        return `${acc}${getDiffPlain(currentValue.value, newPath)}`;
    }
  }, '');
  return getValue(item, '', getDiffPlain).trim();
};
