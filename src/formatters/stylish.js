import _ from 'lodash';

const padding = (depth) => ' '.repeat(depth);

const stringlify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = Object.keys(value).map((elem) => `${padding(depth + 8)}${elem}: ${stringlify(value[elem], depth + 4)}`);
  return ['{', ...lines, `${padding(depth + 4)}}`].join('\n');
};

const render = (data) => {
  const iter = (dataAst, depth) => {
    const lines = dataAst.map((elem) => {
      switch (elem.type) {
        case 'added':
          return `${padding(depth + 2)}+ ${elem.key}: ${stringlify(elem.value, depth)}`;
        case 'deleted':
          return `${padding(depth + 2)}- ${elem.key}: ${stringlify(elem.value, depth)}`;
        case 'changed':
          return `${padding(depth + 2)}- ${elem.key}: ${stringlify(elem.oldvalue, depth)}\n${padding(depth + 2)}+ ${elem.key}: ${stringlify(elem.newvalue, depth)}`;
        case 'nested':
          return `${padding(depth + 2)}  ${elem.key}: ${iter(elem.children, depth + 4)}`;
        case 'unchanged':
          return `${padding(depth + 2)}  ${elem.key}: ${stringlify(elem.value, depth)}`;
        default:
          throw new Error(`Error! Type '${elem.type}' is unknown.`);
      }
    });
    return ['{', ...lines, `${padding(depth)}}`].join('\n');
  };
  return iter(data, 0);
};

export default render;
