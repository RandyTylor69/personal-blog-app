export default function SignUp(props) {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const [username, password] = [
      formData.get("username"),
      formData.get("password"),
    ];
    try {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const errorObj = await res.json()
        throw new Error(errorObj.error);
      }
      const data = await res.json();
      alert(data.message)
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="username" placeholder="username" name="username" required />
      <input type="password" placeholder="password" name="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
