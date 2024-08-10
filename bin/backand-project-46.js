#!/usr/bin/env node
import getStatus from './parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';

const output = [process.argv[2], process.argv[3]];
const status = getStatus(output[0], output[1]);
if (process.argv[4]) {
  switch (process.argv[4]) {
    case 'stylish':
      console.log(stylish(status));
      break;
    case 'plain':
      console.log(plain(status));
      break;
    default:
      throw new Error('unexpected formate');
  }
} else {
  console.log(stylish(status));
}
