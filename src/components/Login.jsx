export default function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];

    fetch("http://localhost:3000/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => alert("Log in successful :)"));
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="username" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
