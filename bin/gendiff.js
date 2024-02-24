#!/usr/bin/env node

import { Command } from 'commander';
import generateDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const cwd = process.cwd();
    const absolutePath1 = path.resolve(cwd, filepath1);
    const absolutePath2 = path.resolve(cwd, filepath2);
    const extension1 = path.extname(absolutePath1);
    const extension2 = path.extname(absolutePath2);
    const file1 = fs.readFileSync(absolutePath1);
    const file2 = fs.readFileSync(absolutePath2);
    generateDiff(file1, extension1, file2, extension2);
  })

  
program.parse();