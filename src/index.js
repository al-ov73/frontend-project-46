import _ from 'lodash';
import formatToPlain from './formatters/plain.js';
import formatToStylish from './formatters/stylish.js';
import parseData from './parsers.js';
import isObject from './utils.js';

const generateAst = (config1, config2) => {
  const keys1 = Object.keys(config1);
  const keys2 = Object.keys(config2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);
  const result = sortedKeys.map((key) => {
    if (keys1.includes(key) && !keys2.includes(key)) {
      return { key, type: 'removed', value: config1[key] };
    } if (!keys1.includes(key) && keys2.includes(key)) {
      return { key, type: 'added', value: config2[key] };
    } if ((config1[key] === config2[key])) {
      return { key, type: 'not changed', value: config1[key] };
    } if (isObject(config1[key]) && isObject(config2[key])) {
      return { key, type: 'changed object', value: generateAst(config1[key], config2[key]) };
    }
    return {
      key, type: 'changed value', valueFrom: config1[key], valueTo: config2[key],
    };
  });
  return result;
};

const generateDiffFromAst = (ast, format) => {
  switch (format) {
    case 'stylish':
      return formatToStylish(ast);
    case 'plain':
      return formatToPlain(ast).slice(0, -1);
    case 'json':
      return JSON.stringify(ast);
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
