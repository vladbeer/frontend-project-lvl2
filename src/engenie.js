import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export default (path1, path2, formType = 'stylish') => {
  const filePath1 = path.resolve('__fixtures__', path1);
  const fileObj1 = JSON.parse(fs.readFileSync(filePath1, 'utf-8'));
  const filePath2 = path.resolve('__fixtures__', path2);
  const fileObj2 = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));
  const keys = _.sortBy(_.union(Object.keys(fileObj1), Object.keys(fileObj2)));
  let result = '{\n';

  for (const key of keys) {
    if (fileObj1[key] === fileObj2[key]) {
      result += `    ${key}: ${fileObj2[key]}\n`;
    } else if (!_.has(fileObj2, key)) {
      result += `  - ${key}: ${fileObj1[key]}\n`;
    } else if (!_.has(fileObj1, key)) {
      result += `  + ${key}: ${fileObj2[key]}\n`;
    } else if (fileObj1[key] !== fileObj2[key]) {
      result += `  - ${key}: ${fileObj1[key]}\n`;
      result += `  + ${key}: ${fileObj2[key]}\n`;
    }
  }

  result += '}';
  return result;
};
