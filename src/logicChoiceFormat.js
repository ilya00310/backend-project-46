/* eslint-disable import/prefer-default-export */
import { stylish } from './formatters/depth.js';
import { plain } from './formatters/plain.js';
import { json } from './formatters/json.js';

export const choiceFormat = (format, status) => {
  switch (format) {
    case 'stylish':
      return stylish(status);
    case 'plain':
      return plain(status);
    case 'json':
      return json(status);
    default:
      throw new Error('unexpected formate');
  }
};
