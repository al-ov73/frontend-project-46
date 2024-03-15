import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDiff from '../src/index.js';

const getPathToFile = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fixturesPath = `${__dirname}/../__fixtures__/`;
  return `${fixturesPath}${filename}`;
};

// expected fixtures
const stylishExpected = fs.readFileSync(getPathToFile('stylishExpected.txt'), 'utf-8');
const plainExpected = fs.readFileSync(getPathToFile('plainExpected.txt'), 'utf-8');
const jsonExpected = fs.readFileSync(getPathToFile('jsonExpected.txt'), 'utf-8');
const jsonDecodedExpected = JSON.parse(jsonExpected);

test.each([
  {
    path1: getPathToFile('file1.json'),
    path2: getPathToFile('file2.json'),
    format: 'stylish',
    expected: stylishExpected,
  },
  {
    path1: getPathToFile('file1.json'),
    path2: getPathToFile('file2.json'),
    format: 'plain',
    expected: plainExpected,
  },
  {
    path1: getPathToFile('file1.json'),
    path2: getPathToFile('file2.json'),
    format: 'json',
    expected: jsonDecodedExpected,
  },
])('.json with $format format', ({
  path1, path2, format, expected,
}) => {
  expect(generateDiff(path1, path2, format)).toEqual(expected);
});

test.each([
  {
    path1: getPathToFile('file1.yml'),
    path2: getPathToFile('file2.yml'),
    format: 'stylish',
    expected: stylishExpected,
  },
  {
    path1: getPathToFile('file1.yml'),
    path2: getPathToFile('file2.yml'),
    format: 'plain',
    expected: plainExpected,
  },
  {
    path1: getPathToFile('file1.yml'),
    path2: getPathToFile('file2.yml'),
    format: 'json',
    expected: jsonDecodedExpected,
  },
])('.yml with $format format', ({
  path1, path2, format, expected,
}) => {
  expect(generateDiff(path1, path2, format)).toEqual(expected);
});

test.each([
  {
    path1: getPathToFile('file1.json'),
    path2: getPathToFile('file2.json'),
    extension: 'json',
    expected: stylishExpected,
  },
  {
    path1: getPathToFile('file1.yml'),
    path2: getPathToFile('file2.yml'),
    extension: 'yaml',
    expected: stylishExpected,
  },
])('.$extension with default format', ({
  path1, path2, expected,
}) => {
  expect(generateDiff(path1, path2, undefined)).toEqual(expected);
});
