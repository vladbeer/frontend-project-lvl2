import _ from 'lodash';

const renderPlain = (tree) => {
  const stringify = (item) => {
    if (_.isObject(item) && item !== null) {
      return '[complex value]';
    }
    if (typeof (item) === 'string') {
      return `'${item}'`;
    }
    return item;
  };

  const iter = (data, pathName) => {
    const result = data.filter((elem) => elem.type !== 'unchanged')
      .map((node) => {
        const fullName = pathName ? [...pathName, node.key].join('.') : node.key;
        switch (node.type) {
          case 'added':
            return `Property '${fullName}' was added with value: ${stringify(node.value)}`;
          case 'deleted':
            return `Property '${fullName}' was removed`;
          case 'changed':
            return `Property '${fullName}' was updated. From ${stringify(node.oldvalue)} to ${stringify(node.newvalue)}`;
          case 'nested':
            return iter(node.children, [...pathName, node.key]);
          default:
            throw new Error(`Error! Type '${node.type}' is unknown.`);
        }
      });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default renderPlain;
