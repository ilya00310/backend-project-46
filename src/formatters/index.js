/* eslint-disable import/prefer-default-export */
import { stylish } from './stylish.js';
import { plain } from './plain.js';

export const choiceFormat = (format, status) => {
  switch (format) {
    case 'stylish':
      return stylish(status);
    case 'plain':
      return plain(status);
    case 'json':
      return JSON.stringify(status);
    default:
      throw new Error('unexpected formate');
  }
};
