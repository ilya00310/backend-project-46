#!/usr/bin/env node
import { Command } from 'commander';
import getParseAndStatus from './parsAndStatus.js';
import { stylish } from '../src/logicdiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', stylish)
  .action((filepath1, filepath2, options) => {
    const diffStatus = getParseAndStatus(filepath1, filepath2);
    const format = options.format === 'stylish' ? stylish : options.format;
    console.log(format(diffStatus));
  });
program.parse();
