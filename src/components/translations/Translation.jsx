import { useState } from "react";
import { Redirect } from "react-router-dom";
import { getUsername } from "../../util/Storage";
import UserInfo from "../login/UserInfo";

const TranslationPage = () => {
  const [translationText, setTranslationText] = useState("");
 
  const [value, setValue] = useState(false);
  const [signImages, setSignImages] = useState(null);
  const BASE_URL_USERS = "http://localhost:3000/users/";
  const username = getUsername();

  const onTranslateHandle = (e) => {
    if (/[^a-zA-Z ]/.test(translationText)) {
      return alert("text can only contain a-z and spaces");
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

  const onChangeHandle = (e) => {
    setTranslationText(e.target.value);
  };

  const getTranslation = () => {
    setSignImages(
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
        placeholder="Write here...."
        onChange={onChangeHandle}
      />
      <button onClick={onTranslateHandle}>Translate</button>
      {value === true && (
        <>
          {signImages &&
            signImages.map((e, i) => {
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
