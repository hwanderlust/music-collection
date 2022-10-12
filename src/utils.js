const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

const capitalize = (str) => {
  if (typeof str !== 'string') { return ""; }
  return str[0].toUpperCase() + str.slice(1);
}

module.exports = { capitalize, createEnum }