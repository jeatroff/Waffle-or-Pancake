import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom'

function NavBar({ setUser, user }) {
    const history = useHistory()

    function handleLogoutClick(){
        fetch("/logout", {
            method: "DELETE"
        }).then((res => {
            if (res.ok){
                setUser(null)
                history.push("/")
            }
        }))
    }

  return (
    user ? (
        <nav id="navbar">
            <NavLink exact to="/">Home</NavLink>
            &emsp;
            <NavLink exact to="/newgame">New Game</NavLink>
            &emsp;
            <NavLink exact to="/gamelist">Your Games</NavLink>
            &emsp;
            <NavLink exact to="/settings">Profile</NavLink>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <img src={user.avatar.image} width="30"/>&ensp;{user.username}&ensp;
            <button onClick={handleLogoutClick}>Logout</button>
        </nav>
    ) : (
        <nav>
        </nav>
    )
)};

export default NavBar;