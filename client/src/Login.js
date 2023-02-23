import { useState } from 'react'
import { useHistory, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login({setUser}){
    const [username, SetUsername] = useState("")
    const [password_digest, SetPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleUsernameChange(e){
        SetUsername(e.target.value)
    }

    function handlePasswordChange(e){
        SetPassword(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        const new_user = {
        username: username,
        password_digest: password_digest
        }
        // Logs in user
        fetch(`/login`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_user)
        })
        .then(res => {
            if(res.ok) {
                res.json().then(user => {
                    setUser(user)
                    history.push("/")
                })
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        })
    }

    return(
        <div className="form">
            <h1>Welcome to Waffle or Pancake!</h1>
            <h2>Log In</h2>
            <form onSubmit={onSubmit}>
                <input placeholder="Username"type='text' name='username' value={username} onChange={(e) => handleUsernameChange(e)} />
                <div></div>
                <input placeholder="Password" type='password' name='password' value={password_digest} onChange={(e) => handlePasswordChange(e)} />
                <div></div>
                <input type='submit' value='Log In' />
            </form>
            <h3>Don't have an account yet?</h3>
            <Link exact="true" to="/signup">Sign up now!</Link>
        </div>
    )
}
export default Login;