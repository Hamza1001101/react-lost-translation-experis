import { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { getUsername } from "../../util/Storage";
import UserInfo from "../login/UserInfo";
import SignImage from "./singImage/SignImages";

const TranslationPage = () => {
  const [translationText, setTranslationText] = useState("");

  const [value, setValue] = useState(false);
  const [signImages, setSignImages] = useState(null);
  const BASE_URL_USERS = "http://localhost:3000/users/";
  const username = getUsername();

  /**
   * * This function runs when translate btn cliked.
   * When the requirements are met, the translation text is added to the translation resource
   * @param {*} e
   * @returns
   */
  const onTranslateHandle = (e) => {
    if (/[^a-zA-Z ]/.test(translationText)) {
      return alert("Only alphabet and spaces");
    }

    fetch(BASE_URL_USERS + "/?username=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(BASE_URL_USERS + data[0].id + "/keywords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: translationText,
            status: "active",
            userId: data[0].id,
          }),
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setValue(true);
    getTranslation();
  };

  /**
   * The images array is updated with the translation text
   */

  const getTranslation = () => {
    setSignImages(
      translationText.split("").map((imgs) => `../sign-images/${imgs}.png`)
    );
  };

  /**
   * This function gets excuted when input is changed. (The translation box)
   * @param {*} e
   */
  const onChangeHandle = (e) => {
    setTranslationText(e.target.value);
  };

  return (
    <PageContainer>
      {!username && <Redirect to="/homepage" />}
      <UserInfo username={username} />
      <TranslationWrapper>
        <Content>
          <H1>Translate here....</H1>
          <Input
            type="text"
            name="translation"
            id="translation"
            placeholder="Write here...."
            onChange={onChangeHandle}
          />
          <TranslateBtn onClick={onTranslateHandle}>Translate</TranslateBtn>
        </Content>

        {value === true && (
          <>
            <SigsnWrapper>
              {signImages &&
                signImages.map((src, id) => {
                  if (src !== "../sign-images/ .png") {
                    return <SignImage key={id} src={src} />;
                  }
                  return <div key={id}></div>;
                })}
            </SigsnWrapper>
          </>
        )}
      </TranslationWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.section`
  display: grid;
  grid-gap: 1rem;
  height: 70vh;
  place-items: center;
`;

const TranslationWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30vh;
  margin-bottom: 3rem;
`;
const Input = styled.input`
  width: 30rem;
  padding: 15px;
  outline: none;
  :hover {
    background: #f9f5ff;
  }
`;
const TranslateBtn = styled.button`
  padding: 17px;
  width: 17rem;
  align-self: center;
  font-size: 15px;
  background: #14248a;
  color: #fff;
  letter-spacing: 1.3px;

  :hover {
    background: #fff;
    color: #14248a;
    border: 3px solid #14248a;
    font-weight: bold;
    box-shadow: 5px 5px 15px -1px #000000;
  }
`;

const SigsnWrapper = styled.div`
  box-shadow: 5px 5px 10px -3px #000000;
  border-radius: 4px;
  text-align: center;
`;
const H1 = styled.h1`
  font-size: 2.5rem;
`;
export default TranslationPage;
