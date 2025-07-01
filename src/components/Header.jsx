import { Link } from "react-router-dom";
import React from "react";

export default function Header() {
  React.useEffect(() => {
    async function checkLogin() {
      const res = await fetch("http://localhost:3001/profile", {
        credentials: "include",
      });
      if (!res.ok) {
        const e = await res.json();
        alert(e.error);
      }
      const data = await res.json();
      console.log(data);
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
          <Link to={"/login"}>
            <h2>Login</h2>
          </Link>
          <Link to={"/signup"}>
            <h2>Sign Up</h2>
          </Link>
        </div>
      </div>
    </header>
  );
}
