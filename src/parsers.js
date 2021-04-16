import yaml from 'js-yaml';
import path from 'path';

export default (filePath, file) => {
  const parseFile = path.extname(file).slice(1);

  if (parseFile === 'yaml' || parseFile === 'yml') {
    return yaml.load(filePath);
  }
  if (parseFile === 'json') {
    return JSON.parse(filePath);
  }
};
