/* eslint-disable import/prefer-default-export */
const goTheDepths = (objElement, newPath, func) => func(objElement, newPath);
const getValue = (value, newPath, func = getValue) => {
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
  if (((typeof (value) === 'object') || typeof (value.value) === 'object')) {
    return `${path}.${key}`;
  }
  return '';
};
export const plain = (item) => {
  const getDiffPlain = (value, path = '') => Object.entries(value).reduce((acc, [key, currentValue]) => {
    const newPath = addPath(currentValue, path, key);
    switch (currentValue.status) {
      case 'added':
        return `${acc}Property '${newPath}' was added with value: ${getValue(currentValue.value, newPath)}\n`;
      case 'deleted':
        return `${acc}Property '${newPath}' was removed\n`;
      case 'changed':
        return `${acc}Property '${newPath}' was updated. From ${getValue(currentValue.value, newPath)} `
          + `to ${getValue(currentValue.twoValue, newPath)}\n`;
      case 'unchanged':
        return `${acc}`;
      default:
        return `${acc}${getDiffPlain(currentValue, newPath)}`;
    }
  }, '');
  return getValue(item, '', getDiffPlain).trim();
};
