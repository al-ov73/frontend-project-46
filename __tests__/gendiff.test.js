import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file1 = fs.readFileSync(`${__dirname}/../__fixtures__/plainJson1.json`, 'utf-8');
const ext1 = '.json';
const file2 = fs.readFileSync(`${__dirname}/../__fixtures__/plainJson2.json`, 'utf-8');
const ext2 = '.json';
const expected = fs.readFileSync(`${__dirname}/../__fixtures__/plainJsonExpected.json`, 'utf-8');

test('plain json-files', () => {
  expect(generateDiff(file1, ext1, file2, ext2)).toEqual(expected);
});
