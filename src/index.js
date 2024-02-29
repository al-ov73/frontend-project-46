import formatToPlain from '../formatters/plain.js';
import formatToStylish from '../formatters/stylish.js';
import parseFile from './parsers.js';
import isObject from './utils.js';

const generateAst = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = keys1.concat(keys2).reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);

  const result = {};
  allKeys.sort().forEach((key) => {
    if (keys1.includes(key) && !keys2.includes(key)) {
      result[key] = ['removed', obj1[key]];
    } else if (!keys1.includes(key) && keys2.includes(key)) {
      result[key] = ['added', obj2[key]];
    } else if ((obj1[key] === obj2[key])) {
      result[key] = ['not changed', obj1[key]];
    } else if ((obj1[key] !== obj2[key])) {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        result[key] = ['changed object', generateAst(obj1[key], obj2[key])];
      } else {
        result[key] = ['changed value', obj1[key], obj2[key]];
      }
    }
  });
  return result;
};

const generateDiff = (filePath1, filePath2, format = 'stylish') => {
  const obj1 = parseFile(filePath1);
  const obj2 = parseFile(filePath2);
  const ast = generateAst(obj1, obj2);
  let diff;
  switch (format) {
    case 'stylish':
      diff = formatToStylish(ast);
      return diff;
    case 'plain':
      diff = formatToPlain(ast);
      return diff;
    default:
      return 'unknown format style :(';
  }
};

export default generateDiff;
