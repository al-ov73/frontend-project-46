const stringify = (data) => {
  if (data === null) {
    return 'null';
  }
  switch (typeof data) {
    case 'string':
      return `'${data}'`;
    case 'boolean':
    case 'number':
      return `${data}`;
    default:
      return '[complex value]';
  }
};

const formatToPlain = (ast) => {
  let result = '';
  const innerWalk = (diff, path = '') => {
    const allKeys = Object.keys(diff).reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
    allKeys.sort().forEach((key) => {
      const pathToKey = `${path}.${key}`;
      const newPath = (pathToKey).startsWith('.') ? pathToKey.slice(1) : pathToKey;
      if (diff[key].type === 'removed') {
        result += `Property '${newPath}' was removed\n`;
      } else if (diff[key].type === 'added') {
        const newValue = stringify(diff[key].value);
        result += `Property '${newPath}' was added with value: ${newValue}\n`;
      } else if (diff[key].type === 'changed value') {
        const oldValue = stringify(diff[key].valueFrom);
        const newValue = stringify(diff[key].valueTo);
        result += `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
      } else if (diff[key].type === 'changed object') {
        result = innerWalk(diff[key].value, pathToKey);
      }
    });
    return result;
  };
  return innerWalk(ast);
};

export default formatToPlain;
