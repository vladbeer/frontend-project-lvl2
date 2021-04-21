import _ from 'lodash';

const buildTree = (data1, data2) => {
  const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = allKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: data1[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        oldvalue: data1[key],
        newvalue: data2[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        type: 'unchanged',
        key,
        value: data1[key],
      };
    }
  });
  return result;
};

export default buildTree;
