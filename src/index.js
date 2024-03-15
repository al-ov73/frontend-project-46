import _ from 'lodash';
import parseData from './parsers.js';
import { getData, getExtension } from './utils.js';
import formatDiffFromAst from './formatters/index.js';

const generateAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);
  const result = sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    } if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    } if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'not changed', value: data1[key] };
    } if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: generateAst(data1[key], data2[key]) };
    }
    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });
  return result;
};

const generateDiff = (filePath1, filePath2, format = 'stylish') => {
  const filedata1 = getData(filePath1);
  const extension1 = getExtension(filePath1);
  const filedata2 = getData(filePath2);
  const extension2 = getExtension(filePath2);
  const parsedData1 = parseData(filedata1, extension1);
  const parsedData2 = parseData(filedata2, extension2);
  const ast = generateAst(parsedData1, parsedData2);
  return formatDiffFromAst(ast, format);
};

export default generateDiff;
