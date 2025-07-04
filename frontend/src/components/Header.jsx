import { Link } from "react-router-dom";
import React from "react";

export default function Header(props) {

  React.useEffect(() => {
    async function checkLogin() {
      const res = await fetch("http://localhost:3001/profile", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      // successful log-in
      props.setUsername(data.username) // re-renders the entire app
    }
    checkLogin();
  }, []);
  
  async function logout(){
    const res = await fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include"
    })
    const data = await res.json()
    if (res.ok) alert(data.message)
    props.setUsername(null)
  }

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
              <Link to={"/create"}>
                Write New Post
              </Link>
              <a onClick={logout}>Log out</a>
            </>
          ) : (
            // if not logged in
            <>
              <Link to={"/login"}>
                Login
              </Link>
              <Link to={"/signup"}>
               Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
