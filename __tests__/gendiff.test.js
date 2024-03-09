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

// fixtures
const recurseJson1 = getPathToFile('recurseJson1.json');
const recurseJson2 = getPathToFile('recurseJson2.json');
const recurseYaml1 = getPathToFile('recurseYaml1.yml');
const recurseYaml2 = getPathToFile('recurseYaml2.yml');
// expected fixtures
const stylishExpected = fs.readFileSync(getPathToFile('stylishExpected.txt'), 'utf-8');
const plainExpected = fs.readFileSync(getPathToFile('plainExpected.txt'), 'utf-8');
const jsonExpected = fs.readFileSync(getPathToFile('jsonExpected.txt'), 'utf-8');
const jsonDecodedExpected = JSON.parse(jsonExpected);

test.each([
  {
    path1: recurseJson1, path2: recurseJson2, format: 'stylish', expected: stylishExpected,
  },
  {
    path1: recurseJson1, path2: recurseJson2, format: 'plain', expected: plainExpected,
  },
  {
    path1: recurseJson1, path2: recurseJson2, format: 'json', expected: jsonDecodedExpected,
  },
])('recurse .json with $format format', ({
  path1, path2, format, expected,
}) => {
  expect(generateDiff(path1, path2, format)).toEqual(expected);
});

test.each([
  {
    path1: recurseYaml1, path2: recurseYaml2, format: 'stylish', expected: stylishExpected,
  },
  {
    path1: recurseYaml1, path2: recurseYaml2, format: 'plain', expected: plainExpected,
  },
  {
    path1: recurseYaml1, path2: recurseYaml2, format: 'json', expected: jsonDecodedExpected,
  },
])('recurse .yml with $format format', ({
  path1, path2, format, expected,
}) => {
  expect(generateDiff(path1, path2, format)).toEqual(expected);
});

test.each([
  {
    path1: recurseJson1, path2: recurseJson2, extension: 'json', expected: stylishExpected,
  },
  {
    path1: recurseYaml1, path2: recurseYaml2, extension: 'yaml', expected: stylishExpected,
  },
])('recurse .$extension with default format', ({
  path1, path2, expected,
}) => {
  expect(generateDiff(path1, path2)).toEqual(expected);
});
