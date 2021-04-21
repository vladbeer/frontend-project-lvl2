import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileReade = (file) => fs.readFileSync(file, 'utf-8');

test('json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(fileReade(getFixturePath('stylish-format')));
});

test('yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
    .toEqual(fileReade(getFixturePath('stylish-format')));
});
