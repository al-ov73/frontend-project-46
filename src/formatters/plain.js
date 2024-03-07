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
    const result = diff.flatMap((elem) => {
      const pathToKey = `${path}.${elem.key}`;
      const newPath = (pathToKey).startsWith('.') ? pathToKey.slice(1) : pathToKey;
      if (elem.type === 'removed') {
        return `Property '${newPath}' was removed\n`;
      } if (elem.type === 'added') {
        const newValue = stringify(elem.value);
        return `Property '${newPath}' was added with value: ${newValue}\n`;
      } if (elem.type === 'changed value') {
        const oldValue = stringify(elem.valueFrom);
        const newValue = stringify(elem.valueTo);
        return `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
      } if (elem.type === 'changed object') {
        return innerWalk(elem.value, pathToKey);
      }
    });
    return result;
  };
  const arrayDiff = innerWalk(ast);
  return arrayDiff.join('');
};

export default formatToPlain;
