import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  React.useEffect(() => {
    // check if the user is logged in whenever the page refreshes.
    // this makes sure the header stays updated (showing diff components)
    async function checkLogin() {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/checkLogin`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      // successful log-in
      props.setUsername(data.username); // re-renders the entire app
    }
    checkLogin();
  }, []);

  return (
    <header className="web-header">
      <div className="header-container">
        <div className="header-left">
          <Link to={"/"}>
            <h1>Blog</h1>
          </Link>
        </div>
        <div className="header-right">
          {props.username ? (
            // if logged in
            <>
              <Link to={"/create"} title="write new blog post">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              <Link to={"/profile"} title="my profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </>
          ) : (
            // if not logged in
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
