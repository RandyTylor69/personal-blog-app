export default function Login(){

    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3001/test")
            .then(res => res.json())
            .then(data=>console.log(data.text))
    }

    
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input type="username" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
    )
}