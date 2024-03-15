import yaml from 'js-yaml';

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

export default parseData;
