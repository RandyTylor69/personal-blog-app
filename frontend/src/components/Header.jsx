import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faPenToSquare,
  faList,
} from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  // showing / closing the search bar upon toggle icon
  const [searchBar, setSearchBar] = React.useState(false);
  // close the search bar upon routing to a different page
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
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

  function toggleSearchBar() {
    setSearchBar((prev) => !prev);
  }

  function closeSearchBar() {
    setSearchBar(false);
  }

  return (
    <header className="web-header">
      <div className="header-container">
        <div className="header-left">
          <Link to={"/"}>
            <h1 onClick={closeSearchBar}>Blog</h1>
          </Link>
        </div>
        <div className="header-right">
          {props.username ? (
            // if logged in
            <>
              {searchBar && (
                <SearchBar
                  isSearchFocused={isSearchFocused}
                  setIsSearchFocused={setIsSearchFocused}
                  closeSearchBar={closeSearchBar}
                />
              )}
              <div className="search-icon">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={toggleSearchBar}
                />
              </div>

              <Link to={"/createPost"} title="write new blog post">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={closeSearchBar}
                />
              </Link>
              <Link to={"/lists"} title="see all lists">
                <FontAwesomeIcon
                  icon={faList}
                  onClick={closeSearchBar}
                />
              </Link>
              <Link to={"/profile"} title="my profile">
                <FontAwesomeIcon icon={faUser} onClick={closeSearchBar} />
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
