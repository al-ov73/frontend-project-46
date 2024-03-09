import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getDataFromFile = (dataPath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, dataPath);
  const datatype = path.extname(absolutePath).replace('.', '');
  const data = fs.readFileSync(absolutePath);
  return { data, datatype };
};

const parseData = (filedata, datatype) => {
  switch (datatype) {
    case 'json':
      return JSON.parse(filedata);
    case 'yml':
    case 'yaml':
      return yaml.load(filedata);
    default:
      return `${datatype} - unknown file extension :(`;
  }
};

export { getDataFromFile, parseData };
