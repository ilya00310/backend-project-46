import getParseAndStatus from './parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

export default (file1, file2, formater) => {
  const status = getParseAndStatus(file1, file2);
  if (formater) {
    switch (formater) {
      case 'stylish':
        return stylish(status);
      case 'plain':
        return plain(status);
      case 'json':
        return json(status);
      default:
        throw new Error('unexpected formate');
    }
  }
  return stylish(status);
};
