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

          if (typeof (currentValue.value) === 'object') {
            nextStr += `Property '${newPath}' was added with value: [complex value]\n`;
          } else {
            nextStr += `Property '${newPath}' was added with value: ${getDiffPlain(currentValue.value, newPath)}\n`;
          }
          break;
        case 'deleted':
          nextStr += `Property '${newPath}' was removed\n`;
          break;
        case 'changed':
          if (typeof (currentValue.value) === 'object') {
            nextStr += `Property '${newPath}' was updated. From [complex value] `;
            nextStr += `to ${getDiffPlain(currentValue.newValue, newPath)}\n`;
          } else {
            nextStr += `Property '${newPath}' was updated. From ${getDiffPlain(currentValue.value, newPath)} `;
            nextStr += `to ${getDiffPlain(currentValue.newValue, newPath)}\n`;
          }
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
