import { Navigate } from "react-router-dom";
import React from "react";


export default function Login() {
  const [redirect, setRedirect] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });
      if (!res.ok) {
        // server responded a non-200 code
        const errorMsg = await res.json(); // turns res into JSON string
        alert(errorMsg.error);
      }
      // logged in: 
      const data = await res.json()
      alert(data.message)
       setRedirect(true);

      
    } catch (e) {
      console.error(e.message);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  } else return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="username" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
