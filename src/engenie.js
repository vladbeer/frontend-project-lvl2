import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import render from './formatters/index.js';

export default (path1, path2, formType = 'stylish') => {
  const filePath1 = path.resolve('__fixtures__', path1);
  const fileObj1 = parse(fs.readFileSync(filePath1, 'utf-8'), path1);
  const filePath2 = path.resolve('__fixtures__', path2);
  const fileObj2 = parse(fs.readFileSync(filePath2, 'utf-8'), path2);
  const result = buildTree(fileObj1, fileObj2);
  return render(result, formType);
};
