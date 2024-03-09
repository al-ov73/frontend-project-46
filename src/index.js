import _ from 'lodash';
import formatToPlain from './formatters/plain.js';
import formatToStylish from './formatters/stylish.js';
import { getDataFromFile, parseData } from './parsers.js';

const generateAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);
  const result = sortedKeys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    } if (!Object.prototype.hasOwnProperty.call(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    } if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'not changed', value: data1[key] };
    } if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: generateAst(data1[key], data2[key]) };
    }
    return {
      key, type: 'changed', valueFromData1: data1[key], valueFromData2: data2[key],
    };
  });
  return result;
};

const formatDiffFromAst = (ast, format) => {
  switch (format) {
    case 'stylish':
      return formatToStylish(ast);
    case 'plain':
      return formatToPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      return `${format} - unknown format style :(`;
  }
};

const generateDiff = (filePath1, filePath2, format = 'stylish') => {
  const { data: filedata1, datatype: filetype1 } = getDataFromFile(filePath1);
  const { data: filedata2, datatype: filetype2 } = getDataFromFile(filePath2);
  const parsedData1 = parseData(filedata1, filetype1);
  const parsedData2 = parseData(filedata2, filetype2);
  const ast = generateAst(parsedData1, parsedData2);
  return formatDiffFromAst(ast, format);
};

export default generateDiff;
