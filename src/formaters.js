import parseFile from './parsers.js';



const formatToStylish = (diff) => {
    // console.log(diff);
    const allKeys = Object.keys(diff).reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
    let result = '{\n';
    allKeys.sort().forEach((key) => {
      if (diff[key][0] === 'removed') {
        result += `  - ${key}: ${diff[key][1]}\n`;
      } else if (diff[key][0] === 'added') {
        result += `  + ${key}: ${diff[key][1]}\n`;
      } else if (diff[key][0] === 'not changed') {
        result += `    ${key}: ${diff[key][1]}\n`;
      } else if (diff[key][0] === 'changed value') {
        result += `  - ${key}: ${diff[key][1]}\n`;
        result += `  + ${key}: ${diff[key][2]}\n`;
      } else if (diff[key][0] === 'changed object') {
        // console.log('will create stylish11:', diff[key]);

        result += `    ${key}:\n`;
        result += `        ${formatToStylish(diff[key][1])}\n`;
        // result += `  + ${key}: 1${formatToStylish(diff[key][2])}\n`;  
      }
    });
    result += '}';
    return result;
  };

  
const formatToStylish1 = (diff) => {

    const allKeys = diff.reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
    let result = '{\n';
    allKeys.sort().forEach((key) => {
      if (keys1.includes(key) && !keys2.includes(key)) {
        result += `  - ${key}: ${obj1[key]}\n`;
      } else if (!keys1.includes(key) && keys2.includes(key)) {
        result += `  + ${key}: ${obj2[key]}\n`;
      } else if ((obj1[key] === obj2[key])) {
        result += `    ${key}: ${obj1[key]}\n`;
      } else if ((obj1[key] !== obj2[key])) {
        result += `  - ${key}: ${obj1[key]}\n`;
        result += `  + ${key}: ${obj2[key]}\n`;
      }
    });
    result += '}';
    return result;
  };
  
export default formatToStylish;
