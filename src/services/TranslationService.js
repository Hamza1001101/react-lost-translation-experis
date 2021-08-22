import { getUsername } from "../util/Storage";

//const BASE_URL_USERS = "http://localhost:3000/users/";
//const BASE_URL_SEARCHES = "http:/ / localhost: 3000 / keywords / ";
const BASE_URL_USERS =
 "https://lost-in-translations-experis.herokuapp.com/users/"; //"http://localhost:3000/users/";
const BASE_URL_SEARCHES =
 "https://lost-in-translations-experis.herokuapp.com/keywords/"; //"http://localhost:3000/keywords/";
const username = getUsername();

/**
 * Retrieves the user's id
 * @param {*} name
 * @returns user's id
 */
const getUserByName = async (name) =>
 await fetch(`${BASE_URL_USERS}?username=${name}`, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });

/**
 * Retrieves all translations that are active for the logged in user
 * @param {*} userId
 * @returns Actice translations for the current user
 */
const fetchAllActiveTranslationsById = async (userId) =>
 await fetch(`${BASE_URL_SEARCHES}?status=active&userId=${userId}`, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });

/**
 * Loop thru all translations and changes their status to 'deleted'
 * @param {*} translations
 */
const removeAllActiveTranslations = async (translations) => {
 let i = 0;
 while (i < translations.length) {
  await fetch(BASE_URL_SEARCHES + translations[i].id, {
   method: "PATCH",
   headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ status: "deleted" }),
    });
   i++;
  }
};

/**
 * Removes all translations for the logged in user
 */
const removeTranslation = async () => {
 const userId = await getUserByName(username);
 const userData = await userId.json();

 const getTranslations = await fetchAllActiveTranslationsById(userData[0].id);
 const translationsData = await getTranslations.json();

 await removeAllActiveTranslations(translationsData);
};

const TranslationService = {
 removeTranslation,
};

export default TranslationService;
