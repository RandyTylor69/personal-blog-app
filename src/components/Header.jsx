import { Link } from "react-router-dom";

export default function Header() {
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
