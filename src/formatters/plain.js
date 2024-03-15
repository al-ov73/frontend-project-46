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
    const result = diff
      .filter((param) => param.type !== 'not changed')
      .flatMap((param) => {
        const pathToKey = `${path}.${param.key}`;
        const newPath = pathToKey.startsWith('.') ? pathToKey.slice(1) : pathToKey;
        if (param.type === 'removed') {
          return `Property '${newPath}' was removed`;
        } if (param.type === 'added') {
          const value = stringify(param.value);
          return `Property '${newPath}' was added with value: ${value}`;
        } if (param.type === 'changed') {
          const value1 = stringify(param.value1);
          const value2 = stringify(param.value2);
          return `Property '${newPath}' was updated. From ${value1} to ${value2}`;
        }
        return innerWalk(param.children, pathToKey);
      });
    return result;
  };
  const stringDiff = innerWalk(ast).join('\n');
  return stringDiff;
};

export default formatToPlain;
