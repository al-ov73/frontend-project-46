import isObject from "./utils.js";

const replacer = ' ';

const strObject = (data, replacer, depth) => {
  let result = '';
  depth -= 1;

  const iter = (data, result, depth) => {
    const indent = replacer.repeat(depth * 4);
    if (isObject(data)) {
      for (let key of Object.keys(data)) {
        if (isObject(data[key])) {
          const value = iter(data[key], result, depth + 1);
          result += `    ${key}: {\n`
          result += `    ${value}`
          result += `    }\n`
        } else {
          result += `    ${key}: ${data[key]}\n`
        }
      }
    } else {
    result += ` ${indent}${data}\n`;
  }
  return result;
  }
  result = iter(data, result, depth);
  return result;
}

const formatToStylish = (diff, depth = 1, result = '') => {
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
    if (diff[key][0] === 'removed') {
      const value = diff[key][1]
      result += `${indent}- ${key}:${strObject(value, replacer, depth)}`;
    } else if (diff[key][0] === 'added') {
      const value = diff[key][1]
      result += `${indent}+ ${key}:${strObject(value, replacer, depth)}`;
    } else if (diff[key][0] === 'not changed') {
      const value = diff[key][1]
      result += `${indent}  ${key}:${strObject(value, replacer, depth)}`;
    } else if (diff[key][0] === 'changed value') {
      result += `${indent}- ${key}:${strObject(diff[key][1], replacer, depth)}`;
      result += `${indent}+ ${key}:${strObject(diff[key][2], replacer, depth)}`;
    } else if (diff[key][0] === 'changed object') {
      depth += 1;
      result += `${indent}  ${key}: {\n`;
      result += formatToStylish(diff[key][1], depth + 1);
    }
  });
  if (depth === 1) {
    result += '}';
  }
  return result;
};

export default formatToStylish;
