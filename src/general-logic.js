/* eslint-disable import/prefer-default-export */
import { choiceFormat } from './logicChoiceFormat.js';
import { getParse } from './logicParser.js';
import { getStatus } from './logicStatus.js';

export const getGeneralLogic = (file1, file2, formatter = 'stylish') => {
  const contentFileOne = getParse(file1);
  const contentFileTwo = getParse(file2);
  const status = getStatus(contentFileOne, contentFileTwo);
  return choiceFormat(formatter, status);
};
