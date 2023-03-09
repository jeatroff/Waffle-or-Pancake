import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'

function Signup({setUser}) {
   
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

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }

        fetch("/signup",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setUser(user)
                    history.push(`/`)
                })
            } else {
                res.json().then(json => setErrors(json.error))
            }
        })
     
  }


    return (
        <div className="loginForm">
            <form onSubmit={onSubmit}>
                <h2>Create an Account</h2>
                <p>{errors}</p>
                <input placeholder="Username" type='text' name='username' value={username} onChange={e => handleUsernameChange(e)} />
                <div></div>
                <input placeholder="Password" type='password' name='password' value={password} onChange={e => handlePasswordChange(e)} />
                <div></div>
                <input className="custom-btn btn-1" type='submit' value='Submit' />
            </form>
            <h3>Already have an account?</h3>
            <Link exact="true" to="/">Log in here!</Link>
        </div>
    )
}

export default Signup;