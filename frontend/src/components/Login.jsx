import { Navigate } from "react-router-dom";
import React from "react";

export default function Login(props) {
  const [redirect, setRedirect] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json()
      if (!res.ok) {
        // server responded a non-200 code
        alert(data.error);
        return;
      }
      // logged in:
      props.setUsername(data.username);

      // setting the user id for global userId context
      props.setUserId(data.userDoc._id)

      alert("successful log-in!");
      setRedirect(true);

    } catch (e) {
      console.error(e.message);
    }
  }




  if (redirect) {
    return <Navigate to={"/"} />;
  } else
    return (
      <form onSubmit={handleSubmit} className="login-form">
        <input type="username" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
      </form>
    );
}
