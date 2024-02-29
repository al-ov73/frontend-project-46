const formatToPlain = (diff, result = '', path = '') => {
  const allKeys = Object.keys(diff).reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);

  allKeys.sort().forEach((key) => {
    path += `${key}`;
    if (diff[key][0] === 'removed') {
      result += `Property '${path}' was removed\n`;
      path = '';
    } else if (diff[key][0] === 'added') {
      result += `Property '${path}' was added with value: ${diff[key][1]}\n`;
      path = '';
    } else if (diff[key][0] === 'changed value') {
      result += `Property '${path}' was updated. From ${diff[key][1]} to ${diff[key][2]}\n`;
      path = '';
    } else if (diff[key][0] === 'changed object') {
      result += `Property '${path}' was updated. From ${diff[key][1]} to ${diff[key][1]}\n`;
      path = '';
    }
  });

  return result;
};

export default formatToPlain;
