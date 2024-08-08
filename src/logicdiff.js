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

const convertObjInStr = (item) => {
  const subStringify = (value, subSpacesCount = 1) => {
    let newCount = subSpacesCount;
    let buffer = 0;
    if (typeof (value) !== 'object' || value === null) {
      // console.log(value.value)
      return value;
    }
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
      if ((typeof (currentValue.value) === 'object' && currentValue.value !== null) || (typeof (currentValue) === 'object' && value !== null)) {
        newCount = subSpacesCount + 1;
        buffer = newCount;
      }
      if ((typeof (currentValue.value) === 'object' && currentValue.value !== null)) {
        newCount += 3;
      }
      switch (currentValue.status) {
        case 'added':
          interimStr += `${' '.repeat(buffer)}+ ${key}: ${subStringify(currentValue.value, newCount)}\n`;
          break;
        case 'deleted':
          interimStr += `${' '.repeat(buffer)}- ${key}: ${subStringify(currentValue.value, newCount)}\n`;
          break;
        case 'changed':
          interimStr += `${' '.repeat(buffer)}- ${key}: ${subStringify(currentValue.value, newCount)}\n`;
          interimStr += `${' '.repeat(buffer)}+ ${key}: ${subStringify(currentValue.newValue, newCount)}\n`;
          break;
        case 'unchanged':
          interimStr += `${' '.repeat(buffer + 1)} ${key}: ${subStringify(currentValue.value, newCount)}\n`;
          break;
        default:
          console.log(key, currentValue);
          if (typeof (currentValue) === 'object') {
            interimStr += `${' '.repeat(buffer + 1)} ${key}: ${subStringify(currentValue, newCount + 3)}\n`;
          } else {
            interimStr += `${' '.repeat(buffer)} ${key}: ${subStringify(currentValue, newCount + 3)}\n`;
          }
      }
      if ((currentIndex === lastIndex && typeof (currentValue) === 'object') || currentIndex === lastIndex) {
        interimStr += `${' '.repeat(subSpacesCount - 1)}}`;
      }
      // console.log('acc', acc)
      return acc + interimStr;
    }, '');
  };
  return subStringify(item);
};

export default (keys, file1, file2) => {
  const objDiff = getDiffHowObg(keys, file1, file2);
  console.log(objDiff);
  const strDiff = convertObjInStr(objDiff, file1, file2);
  return strDiff;
};
