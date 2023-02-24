import { useHistory } from 'react-router-dom'
import { useState } from "react";
import { Link } from 'react-router-dom'

function Home({ user, setUser }) {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function handleUsernameChange(e){
        SetUsername(e.target.value)
    }

    function handlePasswordChange(e){
        SetPassword(e.target.value)
    }

    function handleButton(e) {
        history.push("/newgame")
    }

    function onSubmit(e){
        e.preventDefault()
        const new_user = {
            username: username,
            password: password
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
                res.json().then(json => setErrors(json.error))
            }
        })
    }

    return (
        user ? (
        <div>
            <h1>Waffle or Pancake</h1>
            <h2>A guessing game for up to five players</h2>
            <button onClick={handleButton}>New Game</button>
        </div>
        ) : (
            <div className="form">
                <h1>Welcome to Waffle or Pancake!</h1>
                <h2>Log In</h2>
                <p>{errors}</p>
                <form onSubmit={onSubmit}>
                    <input placeholder="Username"type='text' name='username' value={username} onChange={(e) => handleUsernameChange(e)} />
                    <div></div>
                    <input placeholder="Password" type='password' name='password' value={password} onChange={(e) => handlePasswordChange(e)} />
                    <div></div>
                    <input type='submit' value='Log In' />
                </form>
                <h3>Don't have an account yet?</h3>
                <Link exact="true" to="/signup">Sign up now!</Link>
            </div>
        )
    );
}

export default Home;