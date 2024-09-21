/* eslint-disable import/prefer-default-export */
import { load } from 'js-yaml';

export const getParse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return load(data);
    case 'yaml':
      return load(data);
    default:
      throw new Error('extension don\'t provide');
  }
};
