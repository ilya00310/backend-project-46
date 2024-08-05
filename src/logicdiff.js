import { isKeyinObject } from './utils.js';

const getDiffHowObg = (sortKeys, file1, file2) => sortKeys.reduce((acc, key) => {
  const interimObj = {};
  if (!isKeyinObject(file1, key)) {
    interimObj[key] = 'added';
  } else if (!isKeyinObject(file2, key)) {
    interimObj[key] = 'deleted';
  } else if (file1[key] !== file2[key]) {
    interimObj[key] = 'changed';
  } else {
    interimObj[key] = 'unchanged';
  }
  return { ...acc, ...interimObj };
}, {});

const converObjInStr = (obj, file1, file2) => {
  const entries = Object.entries(obj);
  const strDiff = entries.reduce((acc, [key, value]) => {
    let interimStr = '';
    switch (value) {
      case 'added':
        interimStr = `+ ${key}: ${file2[key]}\n`;
        break;
      case 'deleted':
        interimStr = `- ${key}: ${file1[key]}\n`;
        break;
      case 'changed':
        interimStr = `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`;
        break;
      case 'unchanged':
        interimStr = `  ${key} : ${file2[key]}\n`;
        break;
      default: throw new Error();
    }
    return acc + interimStr;
  }, '{\n');
  return `${strDiff}}`;
};

export default (keys, file1, file2) => {
  const objDiff = getDiffHowObg(keys, file1, file2);
  console.log(objDiff);
  const strDiff = converObjInStr(objDiff, file1, file2);
  return strDiff;
};
