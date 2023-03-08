import { useState } from "react";
import { Link, useHistory } from 'react-router-dom'

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
            <div style={{textAlign: "center"}}>
                <button className="custom-btn btn-1" onClick={handleButton}>New Game</button>
            </div>
            <h3>Instructions</h3>
            <p>The leader of a game thinks of a noun. It can be anything they want.</p>
            <p>
                They then have to answer a simple question: is their answer more like a waffle,
                or is it more like a pancake? Everyone gets to see the answer.
            </p>
            <p>
                From there, the other players take turns suggesting additional ideas. The leader
                must decide whether the solution is more like their previous answer or the new 
                idea. Is a swordfish is more like Mount Everest or a ballerina? Is Santa Claus 
                more like sweatpants or true love? The leader might have to make some tough decisions!
            </p>
            <p>
                The goal of Waffle or Pancake is to use the leader's answers to hone in on the solution. 
                The player who finally guesses it is the winner!
            </p>
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
                    <input className="custom-btn btn-1" type='submit' value='Log In' />
                </form>
                <h3>Don't have an account yet?</h3>
                <Link exact="true" to="/signup">Sign up now!</Link>
            </div>
        )
    );
}

export default Home;