import { Navigate} from "react-router-dom";
import React from "react";
export default function SignUp(props) {
   const [redirect, setRedirect] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json()
      if (!res.ok) {
        alert(data.error)
        return;
      }
      alert("successful sign up!")
      props.setUsername(data.username)
      setRedirect(true)
      
    } catch (e) {
      alert(e.message);
    }
  }
  if (redirect){
    return <Navigate to ={"/"} />
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="username" placeholder="username" name="username" required />
      <input type="password" placeholder="password" name="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
