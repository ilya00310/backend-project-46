#!/usr/bin/env node
import { Command } from 'commander';
import getParseAndStatus from './parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';

const program = new Command();
const getDiff = (status, foramt) => `${foramt(status)}`;

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diffStatus = getParseAndStatus(filepath1, filepath2);
    switch (options.format) {
      case 'stylish':
        console.log(getDiff(diffStatus, stylish));
        break;
      case 'plain':
        console.log(getDiff(diffStatus, plain));
        break;
      // case 'json':
      //   console.log(getDiff(diffStatus, json));
      //   break;
      default: throw new Error('unexpected format');
    }
  });
program.parse();
