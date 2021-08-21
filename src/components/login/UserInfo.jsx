import { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import styled from "styled-components";
import { clearUsername } from "../../util/Storage";
 
/**
 * This component is responsible for the current logged in user's info
 * It renders a logout button. When the button isClicked the local storage
 * gets cleared and the current user gets redirected to the homepage
 * @param {*} param0 
 * @returns 
 */
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
          <ProfileWrapper>
            <A href="/user-profile">
              {" "}
              {username} <FaUserSecret />
            </A>

            <A href="/user-profile"> Go Profile </A>
            <A onClick={onLogoutHandler} href="/homepage">
              Log Out
            </A>
          </ProfileWrapper>
        </>
      )}
    </div>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40rem;
  padding-right: 1rem;
  height: 5vh;
  font-size: 18px;
`;
const A = styled.a`
  color: #14248a;
  font-size: 2rem;
  letter-spacing: 1.3px;
`;
export default UserInfo;
