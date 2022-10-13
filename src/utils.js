// PRIVATE

const matchAllQuotes = new RegExp(/['"]([^'"]*)['"]/g);

// PUBLIC

const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
};

const capitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
};

const getQuotes = (str) =>
  str.match(matchAllQuotes).map((strEl) => strEl.slice(1, -1));

const toggleAndSetProperty = (obj, property, newValue) => {
  if (!obj || !property || !newValue || typeof property !== "string") {
    console.warn(`Cannot update ${obj.constructor.name}'s '${property}.'`);
    return;
  }
  // Make property editable again
  Object.defineProperties(obj, {
    [property]: { value: newValue, writable: true, configurable: true },
  });
  // update property's value
  obj[property] = newValue;
  // Make property non-editable again
  Object.defineProperties(obj, {
    [property]: { value: newValue, writable: false, configurable: true },
  });
};

module.exports = {
  capitalize,
  createEnum,
  getQuotes,
  toggleAndSetProperty,
};
