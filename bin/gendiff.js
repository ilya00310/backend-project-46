#!/usr/bin/env node
import { Command } from 'commander';
import getParseAndStatus from './parsAndStatus.js';
import stylish from '../formatters/depth.js';
import plain from '../formatters/plain.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diffStatus = getParseAndStatus(filepath1, filepath2);
    const format = process.argv[4] === 'stylish' || !process.argv[4] ? stylish : plain;
    console.log(format(diffStatus));
  });
program.parse();
