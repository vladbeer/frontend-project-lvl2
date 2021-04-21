import json from './json.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (tree, formatter) => {
  const format = {
    stylish,
    json,
    plain,
  };
  return format[formatter](tree);
};
