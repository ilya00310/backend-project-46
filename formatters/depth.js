export default (item, spacesCount = 4) => {
  const getdiffDepth = (value, subSpacesCount, depth = 1) => {
    let pointerDeep = 0;
    let newCount = subSpacesCount;
    if (typeof (value) !== 'object' || value === null) {
      return value;
    }
    const entries = Object.entries(value);
    const lastIndex = entries.length - 1;
    return entries.reduce((acc, [key, currentValue], currentIndex) => {
      let nextStr = '';
      if (currentIndex === 0) {
        nextStr += `${' '.repeat(0)}{\n`;
      }

      if (((typeof (currentValue) === 'object' && !currentValue.status) || typeof (currentValue.value) === 'object')) {
        pointerDeep = 1;
        newCount += spacesCount;
      }
      const indent = spacesCount * depth - 2;
      switch (currentValue.status) {
        case 'added':
          nextStr += `${' '.repeat(indent)}+ ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        case 'deleted':
          nextStr += `${' '.repeat(indent)}- ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        case 'changed':
          nextStr += `${' '.repeat(indent)}- ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n`;
          nextStr += `${' '.repeat(indent)}+ ${key}: ${getdiffDepth(currentValue.twoValue, newCount, depth + pointerDeep)}\n`;
          break;
        case 'unchanged':
          nextStr += `${' '.repeat(indent + 1)} ${key}: ${getdiffDepth(currentValue.value, newCount, depth + pointerDeep)}\n`;
          break;
        default:
          nextStr += `${' '.repeat(indent + 1)} ${key}: ${getdiffDepth(currentValue, newCount, depth + pointerDeep)}\n`;
      }
      if ((currentIndex === lastIndex && typeof (currentValue) === 'object') || currentIndex === lastIndex) {
        nextStr += `${' '.repeat(indent - 2)}}`;
      }
      return acc + nextStr;
    }, '');
  };
  const a = getdiffDepth(item, spacesCount);
  console.log(a);
  return getdiffDepth(item, spacesCount);
};
