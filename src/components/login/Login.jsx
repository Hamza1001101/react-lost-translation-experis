import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { setUsername, getUsername } from "../../util/Storage";

const Login = () => {
  const history = useHistory();
  const [username, setUser] = useState("");

  const BASE_URL_USERS = "https://db-json-database.herokuapp.com/users";
  const getCurrentUser = getUsername();

  /**
   * Redirects logged-in users to the translation page if they are already logged in
   */
  useEffect(() => {
    if (getCurrentUser) {
      history.push("/translate");
    }
  });

  /**
   * It checks to see if the user exists in the database, if not, it adds the user
   * @param {*} user
   * @returns
   */

  const addUser = (user) => {
    if (username === "") return;
    try {
      fetch(`${BASE_URL_USERS}?username=${username}`, {
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
    } catch (e) {}
  };
  /**
   * sets the user to logged in and re-directs the user to the translation page
   */
  const onLoginHandler = () => {
    setUsername(username);
    addUser({ username });
    history.push("/translate");
  };

  const onUsernameChangeHandler = (e) => {
    setUser(e.target.value);
  };

  return (
    <LoginWrapper>
      <Input
        type="text"
        placeholder="username"
        onChange={onUsernameChangeHandler}
      />
      <LoginButton onClick={onLoginHandler}>Login</LoginButton>
    </LoginWrapper>
  );
};

const Input = styled.input`
  width: 30rem;
  padding: 15px;
  outline: none;
  :hover {
    background: #f9f5ff;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20vh;
`;

const LoginButton = styled.button`
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
export default Login;
