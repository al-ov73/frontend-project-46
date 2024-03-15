import fs from 'fs';
import path from 'path';

const getData = (dataPath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, dataPath);
  const data = fs.readFileSync(absolutePath);
  return data;
};

const getExtension = (dataPath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, dataPath);
  const extension = path.extname(absolutePath).replace('.', '');
  return extension;
};

export { getData, getExtension };
