import { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { getUsername } from "../../util/Storage";
import Login from "../login/Login";

const Homepage = () => {
  const currentUser = getUsername();
  const history = useHistory();

  /**
   * If There's logged in user already it redirects to the translation page.
   */
  useEffect(() => {
    if (currentUser) {
      history.push("/translate");
    }
  });
  return (
    <div>
      <nav>
        <Ol>
          <li>
            <Logo href="/homepage">Lost in Translation</Logo>
          </li>
        </Ol>
      </nav>
      <LoginWrapper>
        <H1>Lost in Translation</H1>
        <Login />
      </LoginWrapper>
    </div>
  );
};

const Ol = styled.ol`
  padding-left: 0px;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 70vh;
`;

const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #14248a;
  letter-spacing: 1.3px;
`;
const H1 = styled.h1`
  font-family: "Love Ya Like A Sister", cursive;
`;
export default Homepage;
