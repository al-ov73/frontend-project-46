import _ from 'lodash';

const REPLACER = ' ';

const stringify = (rawData, currentDepth) => {
  const innerWalk = (data, depth) => {
    const indent = REPLACER.repeat(depth * 4);
    if (_.isPlainObject(data)) {
      const stringifyData = Object.keys(data).map((key) => {
        if (_.isPlainObject(data[key])) {
          const innerValue = innerWalk(data[key], depth + 1);
          return `${indent}    ${key}: ${innerValue}`;
        }
        return `${indent}    ${key}: ${data[key]}\n`;
      }).join('');
      return `{\n${stringifyData}${indent}}\n`;
    }
    return `${data}\n`;
  };
  const result = innerWalk(rawData, currentDepth);
  return result;
};

const formatToStylish = (ast) => {
  const innerWalk = (diff, depth = 1) => {
    const indent = REPLACER.repeat(depth * 4 - 2);
    const result = diff.flatMap((param) => {
      if (param.type === 'removed') {
        return `${indent}- ${param.key}: ${stringify(param.value, depth)}`;
      } if (param.type === 'added') {
        return `${indent}+ ${param.key}: ${stringify(param.value, depth)}`;
      } if (param.type === 'not changed') {
        return `${indent}  ${param.key}: ${stringify(param.value, depth)}`;
      } if (param.type === 'changed') {
        return `${indent}- ${param.key}: ${stringify(param.valueFromData1, depth)}${indent}+ ${param.key}: ${stringify(param.valueFromData2, depth)}`;
      }
      return `${indent}  ${param.key}: {\n${innerWalk(param.children, depth + 1)}${indent}  }\n`;
    }).join('');
    return result;
  };
  const stringDiff = innerWalk(ast);
  return `{\n${stringDiff}}`;
};

export default formatToStylish;
