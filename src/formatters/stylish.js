import isObject from '../utils.js';

const REPLACER = ' ';

const stringify = (rawData, currentDepth) => {
  const innerWalk = (data, depth) => {
    const indent = REPLACER.repeat(depth * 4);
    if (isObject(data)) {
      const stringifyData = Object.keys(data).map((key) => {
        if (isObject(data[key])) {
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
      } if (param.type === 'changed value') {
        return `${indent}- ${param.key}: ${stringify(param.valueFrom, depth)}${indent}+ ${param.key}: ${stringify(param.valueTo, depth)}`;
      }
      return `${indent}  ${param.key}: {\n${innerWalk(param.value, depth + 1)}${indent}  }\n`;
    }).join('');
    return result;
  };
  const stringDiff = innerWalk(ast);
  return `{\n${stringDiff}}`;
};

export default formatToStylish;
