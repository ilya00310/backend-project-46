#!/usr/bin/env node
import getStatus from './parsAndStatus.js';
import { stylish } from '../src/logicdiff.js';

const output = [process.argv[2], process.argv[3]];
const status = getStatus(output[0], output[1]);
const format = process.argv[4] ? process.argv[4] : stylish;
console.log(`${format(status)}`);
