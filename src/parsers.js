import yaml from 'js-yaml';

const parseFile = (file, ext) => {
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