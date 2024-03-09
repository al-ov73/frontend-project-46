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
      } if (param.type === 'changed') {
        const oldValue = stringify(param.valueFromData1);
        const newValue = stringify(param.valueFromData2);
        return `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
      } if (param.type === 'not changed') {
        return null;
      }
      return innerWalk(param.children, pathToKey);
    }).join('');
    return result;
  };
  const stringDiff = innerWalk(ast);
  return stringDiff.slice(0, -1);
};

export default formatToPlain;
