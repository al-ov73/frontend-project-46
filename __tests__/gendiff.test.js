import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDiff from '../src/index.js';

// jest.useFakeTimers();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturesPath = `${__dirname}/../__fixtures__/`;

// fixtures
const recurseJson1 = `${fixturesPath}recurseJson1.json`;
const recurseJson2 = `${fixturesPath}recurseJson2.json`;
// expected fixtures
const stylishExpected = fs.readFileSync(`${fixturesPath}stylishExpected.txt`, 'utf-8');
const plainExpected = fs.readFileSync(`${fixturesPath}plainExpected.txt`, 'utf-8');
const jsonExpected = fs.readFileSync(`${fixturesPath}jsonExpected.txt`, 'utf-8');

test.each([
  // {
  //   path1: recurseJson1, path2: recurseJson2, format: 'stylish', expected: stylishExpected,
  // },
  {
    path1: recurseJson1, path2: recurseJson2, format: 'plain', expected: plainExpected,
  },
  // {
  //   path1: recurseJson1, path2: recurseJson2, format: 'json', expected: jsonExpected,
  // },
])('recurse $format format', ({
  path1, path2, format, expected,
}) => {
  expect(generateDiff(path1, path2, format)).toEqual(expected);
});
