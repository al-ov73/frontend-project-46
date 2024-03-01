const formatToJson = (ast) => {
  const stringifyDiff = JSON.stringify(ast);
  return stringifyDiff;
};

export default formatToJson;
