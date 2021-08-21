import { useEffect } from "react";
import { useHistory } from "react-router";
import { getUsername } from "../../util/Storage";
import Login from "../login/Login";

const Homepage = () => {
  const currentUser = getUsername();
  const history = useHistory();
  useEffect(() => {
    if (currentUser) {
      history.push("/translate");
    }
  });
  return (
    <div>
      <h1>Homepage here.....</h1>
      <Login />
    </div>
  );
};

export default Homepage;
