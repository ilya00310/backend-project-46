/* eslint-disable import/prefer-default-export */
const getValue = (value) => {
  if (typeof (value) !== 'object' || value === null) {
    return typeof (value) === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

export const plain = (item) => {
  const getDiffPlain = (value, path = '') => Object.entries(value).reduce((acc, [key, currentValue]) => {
    const correctKey = currentValue.key || key;
    const arrPath = path.length === 0 ? [correctKey] : [path, correctKey];
    switch (currentValue.status) {
      case 'added':
        return `${acc}Property '${arrPath.join('.')}' was added with value: ${getValue(currentValue.value)}\n`;
      case 'deleted':
        return `${acc}Property '${arrPath.join('.')}' was removed\n`;
      case 'changed':
        return `${acc}Property '${arrPath.join('.')}' was updated. From ${getValue(currentValue.value)} `
          + `to ${getValue(currentValue.newValue)}\n`;
      case 'unchanged':
        return `${acc}`;
      default:
        return `${acc}${getDiffPlain(currentValue.value, arrPath.join('.'))}`;
    }
  }, '');
  return getDiffPlain(item, '').trim();
};
