const strObject = (obj) => {
  if (obj === null) {
    return 'null';
  }
  switch (typeof obj) {
    case 'string':
      return `'${obj}'`;
    case 'boolean':
      return `${obj}`;
    default:
      return '[complex value]';
  };
}

const formatToPlain = (diff, result = '', path = '') => {
  const allKeys = Object.keys(diff).reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);
  allKeys.sort().forEach((key) => {
    const pathToKey = `${path}.${key}`
    const newPath = (pathToKey).startsWith('.') ? pathToKey.slice(1) : pathToKey;
    if (diff[key][0] === 'removed') {
      result += `Property '${newPath}' was removed\n`;
    } else if (diff[key][0] === 'added') {
      const newValue = strObject(diff[key][1]);
      result += `Property '${newPath}' was added with value: ${newValue}\n`;
    } else if (diff[key][0] === 'changed value') {
      const oldValue = strObject(diff[key][1]);
      const newValue = strObject(diff[key][2]);
      result += `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
    } else if (diff[key][0] === 'changed object') {
      result = formatToPlain(diff[key][1], result, pathToKey)
    }
  });
  return result;
};

export default formatToPlain;
