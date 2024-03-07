import isObject from '../utils.js';

const replacer = ' ';

const stringify = (data, depth) => {
  let stringifyData = isObject(data) ? '{\n' : '';
  const indent = replacer.repeat(depth * 4);
  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      if (isObject(data[key])) {
        const value = stringify(data[key], depth + 1);
        stringifyData += `${indent}    ${key}: ${value}`;
      } else {
        stringifyData += `${indent}    ${key}: ${data[key]}\n`;
      }
    });
    stringifyData += `${indent}}\n`;
  } else {
    stringifyData += `${data}\n`;
  }
  return stringifyData;
};

const formatToStylish = (ast) => {
  let result = '';
  const innerWalk = (diff, depth = 1) => {
    const allKeys = Object.keys(diff).reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
    const indent = replacer.repeat(depth * 4 - 2);
    if (depth === 1) {
      result += '{\n';
    }

    allKeys.sort().forEach((key) => {
      if (diff[key].type === 'removed') {
        result += `${indent}- ${key}: ${stringify(diff[key].value, depth)}`;
      } else if (diff[key].type === 'added') {
        result += `${indent}+ ${key}: ${stringify(diff[key].value, depth)}`;
      } else if (diff[key].type === 'not changed') {
        result += `${indent}  ${key}: ${stringify(diff[key].value, depth)}`;
      } else if (diff[key].type === 'changed value') {
        result += `${indent}- ${key}: ${stringify(diff[key].valueFrom, depth)}`;
        result += `${indent}+ ${key}: ${stringify(diff[key].valueTo, depth)}`;
      } else if (diff[key].type === 'changed object') {
        result += `${indent}  ${key}: {\n`;
        innerWalk(diff[key].value, depth + 1);
        result += `${indent}  }\n`;
      }
    });
    if (depth === 1) {
      result += '}';
    }
    return result;
  };
  return innerWalk(ast);
};

export default formatToStylish;
