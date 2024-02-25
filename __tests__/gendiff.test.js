import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plainExpected = fs.readFileSync(`${__dirname}/../__fixtures__/plainExpected.json`, 'utf-8');

const plainJson1 = fs.readFileSync(`${__dirname}/../__fixtures__/plainJson1.json`, 'utf-8');
const plainJson2 = fs.readFileSync(`${__dirname}/../__fixtures__/plainJson2.json`, 'utf-8');

const plainYml1 = fs.readFileSync(`${__dirname}/../__fixtures__/plainYml1.yml`, 'utf-8');
const plainYml2 = fs.readFileSync(`${__dirname}/../__fixtures__/plainYml2.yml`, 'utf-8');

test('plain json-files', () => {
  expect(generateDiff(plainJson1, '.json', plainJson2, '.json')).toEqual(plainExpected);
});

test('plain yaml-files', () => {
  expect(generateDiff(plainYml1, '.yml', plainYml2, '.yml')).toEqual(plainExpected);
});