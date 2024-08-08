import { isKeyinObject, getSortKeys } from './utils.js';

const getDiffHowObg = (sortKeys, file1, file2) => sortKeys.reduce((acc, key) => {
  const interimObj = {};

  if (!isKeyinObject(file1, key)) {
    interimObj[key] = { status: 'added', value: file2[key] };
  } else if (!isKeyinObject(file2, key)) {
    interimObj[key] = { status: 'deleted', value: file1[key] };
  } else if (file1[key] !== file2[key]) {
    interimObj[key] = { status: 'changed', value: file1[key], newValue: file2[key] };
  } else if (isKeyinObject(file1, key) && isKeyinObject(file2, key)) {
    interimObj[key] = { status: 'unchanged', value: file1[key] };
  }
  if (typeof (file1[key]) === 'object' && typeof (file2[key]) === 'object') {
    interimObj[key] = getDiffHowObg(getSortKeys(file1, file2, key), file1[key], file2[key]);
  }

  return { ...acc, ...interimObj };
}, {});

const convertObjInStr = (item, spacesCount = 4) => {
  const subStringify = (value, subSpacesCount, depth = 1) => {
    let pointerDeep = 0;
    let newCount = subSpacesCount;
    if (typeof (value) !== 'object' || value === null) {
      // console.log(value.value)
      return value;
    }

    // console.log(value)
    const entries = Object.entries(value);
    const lastIndex = entries.length - 1;
    return entries.reduce((acc, [key, currentValue], currentIndex) => {
      let interimStr = '';
      if (currentIndex === 0) {
        interimStr += `${' '.repeat(0)}{\n`;
      }

      if (((typeof (currentValue) === 'object' && !currentValue.status) || typeof (currentValue.value) === 'object')) {
        pointerDeep = 1;
        newCount += spacesCount;
      }
      const indent = spacesCount * depth - 2;
      switch (currentValue.status) {
        case 'added':
          interimStr += `${' '.repeat(indent)}+ ${key}: ${subStringify(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        case 'deleted':
          interimStr += `${' '.repeat(indent)}- ${key}: ${subStringify(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        case 'changed':
          interimStr += `${' '.repeat(indent)}- ${key}: ${subStringify(currentValue.value, newCount, depth + pointerDeep)}\n`;
          interimStr += `${' '.repeat(indent)}+ ${key}: ${subStringify(currentValue.newValue, newCount, depth + pointerDeep)}\n`;
          break;
        case 'unchanged':
          interimStr += `${' '.repeat(indent + 1)} ${key}: ${subStringify(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        default:
          interimStr += `${' '.repeat(indent + 1)} ${key}: ${subStringify(currentValue, newCount, depth + pointerDeep)}\n`;
      }
      if ((currentIndex === lastIndex && typeof (currentValue) === 'object') || currentIndex === lastIndex) {
        interimStr += `${' '.repeat(indent - 2)}}`;
      }
      return acc + interimStr;
    }, '');
  };
  return subStringify(item, spacesCount);
};

export default (keys, file1, file2) => {
  const objDiff = getDiffHowObg(keys, file1, file2);
  console.log(objDiff);
  const strDiff = convertObjInStr(objDiff);
  return strDiff;
};
