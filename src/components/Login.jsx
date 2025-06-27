export default function Login(){

    function handleSubmit(formData){
        console.log(formData)
    }
    return (
        <form action={handleSubmit} className="login-form">
            <input type="username" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
    )
}