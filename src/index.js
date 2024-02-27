import formatToStylish from './formaters.js';
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

const generateDiff = (file1, ext1, file2, ext2) => {
  const obj1 = parseFile(file1, ext1);
  const obj2 = parseFile(file2, ext2);
  const ast = generateAst(obj1, obj2);
  const diff = formatToStylish(ast);
  return diff;
};

export default generateDiff;
