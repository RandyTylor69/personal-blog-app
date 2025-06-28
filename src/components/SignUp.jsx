export default function SignUp(props){

    async function handleSubmit(e){

        e.preventDefault()
        const formData = new FormData(e.target)
        await fetch("")
    }
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="username"
             placeholder="username"
             name="username"
             required
             />
            <input type="password"
             placeholder="password"
             name="password"
             required
             />
            <button type="submit">Sign Up</button>
        </form>
    )
}