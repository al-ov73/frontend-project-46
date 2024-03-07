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
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      return 'unknown file extension :(';
  }
};

export default parseData;
