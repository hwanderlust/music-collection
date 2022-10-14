// PRIVATE

const matchAllQuotes = new RegExp(/['"]([^'"]*)['"]/g);

// PUBLIC

const capitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
};

const createEnum = (values) => {
  const enumObject = {};
  if (Array.isArray(values)) {
    for (const val of values) {
      enumObject[val] = val;
    }
  }
  return Object.freeze(enumObject);
};

const getQuotes = (str) => {
  if (typeof str !== "string") {
    return [];
  }
  return str.match(matchAllQuotes).map((strEl) => strEl.slice(1, -1));
};

const toggleAndSetProperty = (obj, property, newValue) => {
  if (
    !obj ||
    !property ||
    !newValue ||
    typeof property !== "string" ||
    typeof obj !== "object"
  ) {
    console.warn(`Cannot update ${obj?.constructor?.name}'s '${property}.'`);
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
