import { useState } from "react";
import { clearUsername } from "../../util/Storage";

const UserInfo = ({ username }) => {
  const [value, setValue] = useState(false);

  const onLogoutHandler = () => {
    clearUsername();
    setValue(!value);
  };

  return (
    <div>
      {username && (
        <>
          <h1>User info</h1>
          <div>
            <p> {username} </p>
            <img src="#" alt="user-pic" />
          </div>
          <div>
            <a href="/user-profile"> Go Profile </a>
            <a onClick={onLogoutHandler} href="/homepage">
              Logout
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
