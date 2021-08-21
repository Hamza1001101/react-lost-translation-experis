import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { setUsername, getUsername } from "../../util/Storage";

const Login = () => {
  const history = useHistory();
  const [username, setUser] = useState("");
  const BASE_URL_USERS = "http://localhost:3000/users";

  const getCurrentUser = getUsername();
  
  useEffect(() => {
    if (getCurrentUser) {
      history.push("/translate");
    }
  });

  const onLoginHandler = () => {
    setUsername(username);
    addUser({ username });
    history.push("/translate");
  };

  const addUser = (user) => {
    if (username === "") return;
    fetch(BASE_URL_USERS + "?username=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          fetch(BASE_URL_USERS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onUsernameChangeHandler = (e) => {
    setUser(e.target.value);
  };

  return (
    <div>
      <div>
        <h2>Please sign in</h2>
        <input
          type="text"
          placeholder="username"
          onChange={onUsernameChangeHandler}
        />
        <button onClick={onLoginHandler}>Login</button>
      </div>
    </div>
  );
};

export default Login;
