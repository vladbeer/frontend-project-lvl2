import json from './json.js';
import stylish from './stylish.js';

export default (tree, formatter) => {
  const format = {
    stylish,
    json,
  };
  return format[formatter](tree);
};
