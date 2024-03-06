import _ from 'lodash';
import formatToPlain from './formatters/plain.js';
import formatToStylish from './formatters/stylish.js';
import parseData from './parsers.js';
import isObject from './utils.js';

const generateAst = (config1, config2) => {
  const keys1 = Object.keys(config1);
  const keys2 = Object.keys(config2);
  const allKeys = _.union(keys1, keys2);
  const result = {};
  allKeys.sort().forEach((key) => {
    if (keys1.includes(key) && !keys2.includes(key)) {
      result[key] = { type: 'removed', value: config1[key] };
    } else if (!keys1.includes(key) && keys2.includes(key)) {
      result[key] = { type: 'added', value: config2[key] };
    } else if ((config1[key] === config2[key])) {
      result[key] = { type: 'not changed', value: config1[key] };
    } else if (isObject(config1[key]) && isObject(config2[key])) {
      result[key] = { type: 'changed object', value: generateAst(config1[key], config2[key]) };
    } else {
      result[key] = { type: 'changed value', valueFrom: config1[key], valueTo: config2[key] };
    }
  });
  return result;
};

const generateDiffFromAst = (ast, format) => {
  let diff;
  switch (format) {
    case 'stylish':
      diff = formatToStylish(ast);
      return diff;
    case 'plain':
      diff = formatToPlain(ast);
      return diff.slice(0, -1);
    case 'json':
      diff = JSON.stringify(ast);
      return diff;
    default:
      return 'unknown format style :(';
  }
};

const generateDiff = (filePath1, filePath2, format = 'stylish') => {
  const config1 = parseData(filePath1);
  const config2 = parseData(filePath2);
  const ast = generateAst(config1, config2);
  return generateDiffFromAst(ast, format);
};

export default generateDiff;
