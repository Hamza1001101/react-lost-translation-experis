import { getUsername } from "../util/Storage";

const BASE_URL_USERS = "http://localhost:3000/users/";
const BASE_URL_SEARCHES = "http://localhost:3000/searches/";
const username = getUsername();

/*const getUserByUsername = async (name) => {
 return await fetch(BASE_URL_USERS + "?username=" + name, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });
};*/


/*const fetchAllActiveTranslationsById = async (userId) => {
 return await fetch(BASE_URL_SEARCHES + "?status=active&userId=" + userId, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });
};*/

/*const removeAllActiveTranslations = async (translations) => {
 for (let i = 0; i < translations.length; i++) {
  await fetch(BASE_URL_SEARCHES + translations[i].id, {
   method: "PATCH",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ status: "deleted" }),
  });
 }
};*/


const getUserByUsername = async (name) =>
 await fetch(BASE_URL_USERS + "?username=" + name, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });


const fetchAllActiveTranslationsById = async (userId) =>
 await fetch(BASE_URL_SEARCHES + "?status=active&userId=" + userId, {
  method: "GET",
  headers: {
   "Content-Type": "application/json",
  },
 });


const removeAllActiveTranslations = async (translations) => {
 for (let i = 0; i < translations.length; i++) {
  await fetch((BASE_URL_SEARCHES + translations[i].id), {
   method: 'PATCH',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({ "status": "deleted" })
  })
 }
};



const removeTranslation = async () => {
 const userId = await getUserByUsername(username);
 const userIdData = await userId.json();

 const getTranslations = await fetchAllActiveTranslationsById(
  userIdData[0].id
 );
 const translationsData = await getTranslations.json();

 await removeAllActiveTranslations(translationsData);

};

const TranslationService = {
 removeTranslation,

}

export default TranslationService