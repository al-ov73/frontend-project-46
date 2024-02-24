const parseFile = (file, ext) => {
    let obj;
    switch (ext) {
        case '.json':
            obj = JSON.parse(file);
            break;
        default:
            console.log('unknown file extension :(');
    }
    return obj;
}

const generateDiff = (file1, ext1, file2, ext2) => {
    const obj1 = parseFile(file1, ext1);
    const obj2 = parseFile(file2, ext2);
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = keys1.concat(keys2).reduce((acc, item) => {
        if (acc.includes(item)) {
          return acc;
        }
        return [...acc, item];
      }, []);
    let result = '{\n';
    for (const key of allKeys.sort()) {
        if (keys1.includes(key) && !keys2.includes(key)) {
            result += `  -${key}: ${obj1[key]}\n`;
        } else if (!keys1.includes(key) && keys2.includes(key)) {
            result += `  +${key}: ${obj2[key]}\n`;
        } else if ((obj1[key] === obj2[key])) {
            result += `  ${key}: ${obj1[key]}\n`;
        } else if ((obj1[key] !== obj2[key])) {
            result += `  -${key}: ${obj1[key]}\n`;
            result += `  +${key}: ${obj2[key]}\n`;
        }
      }
    result += '}'
    console.log(result);
};

export default generateDiff;