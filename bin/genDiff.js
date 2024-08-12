#!/bin/bash
import { Command } from 'commander';
import generalLogic from '../src/general-logic.js';

const program = new Command();
program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(generalLogic(filepath1, filepath2, options.format));
  });
program.parse();
