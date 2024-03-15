import formatToPlain from './plain';
import formatToStylish from './stylish';

const formatDiffFromAst = (ast, format) => {
  switch (format) {
    case 'stylish':
      return formatToStylish(ast);
    case 'plain':
      return formatToPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      return `${format} - unknown format style :(`;
  }
};

export default formatDiffFromAst;
