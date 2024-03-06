import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getDataFromFile = (dataPath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, dataPath);
  const format = path.extname(absolutePath).replace('.', '');
  const data = fs.readFileSync(absolutePath);
  return { data, format };
};

const parseData = (dataPath) => {
  const { data, format } = getDataFromFile(dataPath);
  let obj;
  switch (format) {
    case 'json':
      obj = JSON.parse(data);
      break;
    case 'yml':
    case 'yaml':
      obj = yaml.load(data);
      break;
    default:
      return 'unknown file extension :(';
  }
  return obj;
};

export default parseData;
