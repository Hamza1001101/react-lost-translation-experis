import { useState } from "react";
import { Redirect } from "react-router-dom";
import { getUsername } from "../../util/Storage";
import UserInfo from "../login/UserInfo";

const TranslationPage = () => {
  const [translationText, setTranslationText] = useState("");
  const [clicked, setClicked] = useState(false);
  const [images, setImages] = useState(null);
  const BASE_URL_USERS = "http://localhost:3000/users/";
  const username = getUsername();

  const handleTranslateBtn = (e) => {
    if (translationText.length > 40) {
      alert("max 40 characters long text");
    } else if (/[^a-zA-Z ]/.test(translationText)) {
      alert("text can only contain a-z and spaces");
    } else if (!translationText.replace(/\s/g, "").length) {
      alert("Must contains text");
    } else {
      fetch(BASE_URL_USERS + "/?username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          fetch(BASE_URL_USERS + data[0].id + "/searches", {
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

      setClicked(true);
      translateTextToImages();
    }
  };

  const handleTranslationTextChange = (e) => {
    setTranslationText(e.target.value);
  };

  const translateTextToImages = () => {
    setImages(
      translationText.split("").map((imgs) => `../sign-images/${imgs}.png`)
    );
  };

  return (
    <div>
      {!username && <Redirect to="/homepage" />}
      <UserInfo username={username} />
      <h1>Translation Page here....</h1>
      <input
        type="text"
        name="translation"
        id="translation"
        placeholder="Please type what you wish to translate"
        onChange={handleTranslationTextChange}
      />
      <button onClick={handleTranslateBtn}>Translate</button>
      {clicked === true && (
        <>
          {images &&
            images.map((e, i) => {
              if (e !== "../media/signs/ .png") {
                return <img src={e} alt={e} key={i} />;
              }
              return <div key={i}></div>;
            })}
        </>
      )}
    </div>
  );
};

export default TranslationPage;
