import isObject from '../utils.js';

const replacer = ' ';

const strObject = (obj, depth) => {
  let result = isObject(obj) ? '{\n' : '';
  const indent = replacer.repeat(depth * 4);
  if (isObject(obj)) {
    Object.keys(obj).forEach((key) => {
      if (isObject(obj[key])) {
        const value = strObject(obj[key], depth + 1);
        result += `${indent}    ${key}: ${value}`;
      } else {
        result += `${indent}    ${key}: ${obj[key]}\n`;
      }
    });
    result += `${indent}}\n`;
  } else {
    result += `${obj}\n`;
  }
  return result;
};

const formatToStylish = (ast) => {
  const innerWalk = (diff, depth = 1, result = '') => {
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
        const { value } = diff[key];
        result += `${indent}- ${key}: ${strObject(value, depth)}`;
      } else if (diff[key].type === 'added') {
        const { value } = diff[key];
        result += `${indent}+ ${key}: ${strObject(value, depth)}`;
      } else if (diff[key].type === 'not changed') {
        const { value } = diff[key];
        result += `${indent}  ${key}: ${strObject(value, depth)}`;
      } else if (diff[key].type === 'changed value') {
        result += `${indent}- ${key}: ${strObject(diff[key].valueFrom, depth)}`;
        result += `${indent}+ ${key}: ${strObject(diff[key].valueTo, depth)}`;
      } else if (diff[key].type === 'changed object') {
        result += `${indent}  ${key}: {\n`;
        result += innerWalk(diff[key].value, depth + 1);
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
