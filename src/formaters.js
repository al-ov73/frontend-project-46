const space = ' ';

const formatToStylish = (diff, depth = 1, result = '') => {
  const allKeys = Object.keys(diff).reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);
  const indent = space.repeat(depth * 4 - 2);
  if (depth === 1) {
    result += '{\n';
  }
  allKeys.sort().forEach((key) => {
    if (diff[key][0] === 'removed') {
      result += `${indent}- ${key}: ${diff[key][1]}\n`;
    } else if (diff[key][0] === 'added') {
      result += `${indent}+ ${key}: ${diff[key][1]}\n`;
    } else if (diff[key][0] === 'not changed') {
      result += `${indent}  ${key}: ${diff[key][1]}\n`;
    } else if (diff[key][0] === 'changed value') {
      result += `${indent}- ${key}: ${diff[key][1]}\n`;
      result += `${indent}+ ${key}: ${diff[key][2]}\n`;
    } else if (diff[key][0] === 'changed object') {
      depth += 1;
      result += `${indent}  ${key}:  {\n`;
      result += formatToStylish(diff[key][1], depth);
    }
  });
  if (depth === 1) {
    result += '}';
  }
  return result;
};

export default formatToStylish;
