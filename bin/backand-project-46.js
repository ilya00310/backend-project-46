#!/usr/bin/env node
import getStatus from './parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';

const output = [process.argv[2], process.argv[3]];
const status = getStatus(output[0], output[1]);
const format = process.argv[4] === 'stylish' || !process.argv[4] ? stylish : plain;
console.log(`${format(status)}`);
