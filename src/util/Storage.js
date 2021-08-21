/**
 * Set username and save in localstorage.
 * @param {*} value
 */

export const setUsername = (value) => {
 localStorage.setItem("username", JSON.stringify(value));
};

/**
 * Get username from the localstorage
 * @returns
 */
export const getUsername = () => {
 const storedValue = localStorage.getItem("username");

 if (storedValue) {
  return JSON.parse(storedValue);
 }

 return false;
};

/**
 * Clear username from the localstroge
 */
export const clearUsername = () => {
 localStorage.removeItem("username");
};

