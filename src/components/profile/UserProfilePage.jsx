import { useEffect, useState } from "react";
import TranslationService from "../../services/TranslationService";
import { getUsername } from "../../util/Storage";
import { Redirect } from "react-router-dom";

const UserProfilePage = () => {
  const [translations, setTranslations] = useState(null);
  const BASE_URL_USERS = "http://localhost:3000/users/";
  const BASE_URL_SEARCHES = "http://localhost:3000/keywords/";
  const username = getUsername();

  useEffect(() => {
    if (username) {
      fetch(BASE_URL_USERS + "?username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data=", data);
          fetch(
            BASE_URL_SEARCHES +
              "?status=active&userId=" +
              data[0].id +
              "&_sort=id&_order=desc&_limit=10",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setTranslations(data);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const removeAllTranslations = async () => {
    await TranslationService.removeTranslation(translations);
    setTranslations(null);
  };

  return (
    <div>
      {!username && <Redirect to="/homepage" />}

      <div>
        <h2>Your last translations</h2>
        <div>
          <button onClick={removeAllTranslations}>
            Delete all translations
          </button>
        </div>
        <div>
          {translations &&
            translations.map((a, i) => {
              return (
                <div key={i}>
                  <p>{translations[i].text}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
