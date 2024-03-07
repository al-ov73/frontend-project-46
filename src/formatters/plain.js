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
      let newLine;
      const pathToKey = `${path}.${elem.key}`;
      const newPath = (pathToKey).startsWith('.') ? pathToKey.slice(1) : pathToKey;
      if (elem.type === 'removed') {
        newLine = `Property '${newPath}' was removed\n`;
      } if (elem.type === 'added') {
        const newValue = stringify(elem.value);
        newLine = `Property '${newPath}' was added with value: ${newValue}\n`;
      } if (elem.type === 'changed value') {
        const oldValue = stringify(elem.valueFrom);
        const newValue = stringify(elem.valueTo);
        newLine = `Property '${newPath}' was updated. From ${oldValue} to ${newValue}\n`;
      } if (elem.type === 'changed object') {
        newLine = innerWalk(elem.value, pathToKey);
      }
      return newLine;
    });
    return result;
  };
  const arrayDiff = innerWalk(ast);
  return arrayDiff.join('');
};

export default formatToPlain;
