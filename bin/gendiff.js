#!/usr/bin/env node

import { Command } from 'commander';

import generateDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, option) => {
    const diff = generateDiff(filepath1, filepath2, option.format);
    console.log(diff);
  });

program.parse();
