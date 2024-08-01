#!/usr/bin/env node
import { Command } from 'commander';
import getContent from './utils.js'
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>')
    // .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
        console.log(getContent(filepath1));
    });
program.parse();
