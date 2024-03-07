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
  const innerWalk = (diff, path = '') => {
    const result = diff.flatMap((param) => {
      const pathToKey = `${path}.${param.key}`;
      const newPath = (pathToKey).startsWith('.') ? pathToKey.slice(1) : pathToKey;
      if (param.type === 'removed') {
        return `Property '${newPath}' was removed\n`;
      } if (param.type === 'added') {
        const newValue = stringify(param.value);
        return `Property '${newPath}' was added with value: ${newValue}\n`;
      } if (param.type === 'changed value') {
        const oldValue = stringify(param.valueFrom);
        const newValue = stringify(param.valueTo);
        return `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
      } if (param.type === 'not changed') {
        return null;
      }
      return innerWalk(param.value, pathToKey);
    }).join('');
    return result;
  };
  const stringDiff = innerWalk(ast);
  return stringDiff;
};

export default formatToPlain;
