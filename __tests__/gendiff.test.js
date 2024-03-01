import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const recurseJson1 = `${__dirname}/../__fixtures__/recurseJson1.json`;
const recurseJson2 = `${__dirname}/../__fixtures__/recurseJson2.json`;
const stylishExpected = fs.readFileSync(`${__dirname}/../__fixtures__/stylishExpected.yml`, 'utf-8');
const plainExpected = fs.readFileSync(`${__dirname}/../__fixtures__/plainExpected.yml`, 'utf-8');
const jsonExpected = fs.readFileSync(`${__dirname}/../__fixtures__/jsonExpected.json`, 'utf-8');

test('recurse stylish format', () => {
  expect(generateDiff(recurseJson1, recurseJson2, 'stylish')).toEqual(stylishExpected);
});

test('recurse plain format', () => {
  expect(generateDiff(recurseJson1, recurseJson2, 'plain')).toEqual(plainExpected);
});

test('recurse json format', () => {
  expect(generateDiff(recurseJson1, recurseJson2, 'json')).toEqual(jsonExpected);
});
