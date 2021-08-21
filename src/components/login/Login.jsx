import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { setUsername, getUsername } from "../../util/Storage";

const Login = () => {
  const history = useHistory();
  const [username, setUser] = useState("");
  const BASE_URL_USERS = "http://localhost:3000/users";

  const getCurrentUser = getUsername();
  /**
   * Checks if user is already logged in, the user gets re-directed to the translation page
   */
  useEffect(() => {
    if (getCurrentUser) {
      history.push("/translate");
    }
  });

  /**
   * Tries to log in user, sets the user to logged in and re-directs the user to the translation page
   */
  const handleLogInBtn = () => {
    //localStorage.clear();
    //localStorage.setItem("username", username);
    setUsername(username);
    postUser({ username: username });
    history.push("/translate");
  };

  /**
   * Checks if the user exists in the database, if the user doesn't exist, t
   * the user is added to the database
   */
  const postUser = (user) => {
    //const url = "https://polar-fortress-35611.herokuapp.com/users/";
    //const url = "http://localhost:3000/users";
    fetch(BASE_URL_USERS + "?username=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //user doesn't exist, add to database
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

  /**
   * Sets the username to the value of the username input
   * @param {e} e, event of input change
   */
  const handleUsernameChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <div>
      <div>
        <h2>Please sign in</h2>
        <input
          type="text"
          placeholder="username"
          onChange={handleUsernameChange}
        />
        <button onClick={handleLogInBtn}>Login</button>
      </div>
    </div>
  );
};

export default Login;
