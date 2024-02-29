import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// const

// const absolutePath1 = path.resolve(cwd, filepath1);
// const absolutePath2 = path.resolve(cwd, filepath2);
// const extension1 = path.extname(absolutePath1);
// const extension2 = path.extname(absolutePath2);
// const file1 = fs.readFileSync(absolutePath1);
// const file2 = fs.readFileSync(absolutePath2);

const parseFile = (filePath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filePath);
  const ext = path.extname(absolutePath);
  const file = fs.readFileSync(absolutePath);
  let obj;
  switch (ext) {
    case '.json':
      obj = JSON.parse(file);
      break;
    case '.yml':
    case '.yaml':
      obj = yaml.load(file);
      break;
    default:
      return 'unknown file extension :(';
  }
  return obj;
};

export default parseFile;
