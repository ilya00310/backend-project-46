/* eslint-disable import/prefer-default-export */
import { load } from 'js-yaml';

const doParseJson = (data) => JSON.parse(data);
export const getParse = (type, data) => {
  switch (type) {
    case 'json':
      return doParseJson(data);
    case 'yml':
      return load(data);
    default:
      throw new Error('extension don\'t provide');
  }
};
