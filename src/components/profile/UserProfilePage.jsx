import { useEffect, useState } from "react";
import TranslationService from "../../services/TranslationService";
import { getUsername } from "../../util/Storage";
import { FiArrowRight } from "react-icons/fi";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import UserTranslations from "../login/UserTranslations";

const UserProfilePage = () => {
  const [translations, setTranslations] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const BASE_URL_USERS = "https://db-json-database.herokuapp.com/users/";
  const BASE_URL_SEARCHES = "https://db-json-database.herokuapp.com/keywords/";
  const username = getUsername();

  /**
   * Gets the logged in user's 10 most recent translations
   */
  useEffect(() => {
    if (username) {
      fetch(`${BASE_URL_USERS}?username=${username}`, {
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

  /**
   * Remove all translations
   */
  const removeAllTranslations = async () => {
    await TranslationService.removeTranslation(translations);
    setTranslations(null);
    setIsDeleted(true);
  };

  return (
    <>
      {!username && <Redirect to="/homepage" />}

      <Wrapper>
        <div>
          {!isDeleted ? (
            <>
              {translations && (
                <>
                  <UserTranslations
                    translations={translations}
                    removeAllTranslations={removeAllTranslations}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <h1>You just deleted all your translations 😱 </h1>
              <A href="/translate">
                Go and Translate stuff <FiArrowRight />
              </A>
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-gap: 1rem;
  height: 70vh;

  place-items: center;
`;

const A = styled.a`
  font-size: 2.5rem;
`;
export default UserProfilePage;
