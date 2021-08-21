import { useEffect, useState } from "react";
import TranslationService from "../../services/TranslationService";
import { getUsername } from "../../util/Storage";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import UserTranslations from "../login/UserTranslations";

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
    <>
      {!username && <Redirect to="/homepage" />}

      <Wrapper>
        <div>
          <h1>Your last 10 translations</h1>
          {translations && (
            <UserTranslations
              translations={translations}
              removeAllTranslations={removeAllTranslations}
            />
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


export default UserProfilePage;
