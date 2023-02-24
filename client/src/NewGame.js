import { useState, useEffect } from "react";

function NewGame({user}) {
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [gameUserList, setGameUserList] = useState([])

    useEffect(() => {
        fetch("/users").then((r) => {
          if (r.ok) {
            r.json().then((userList) => {
              userList.map((old_user) => (
                old_user.id === user.id ?
                  userList.splice(userList.indexOf(old_user), 1) : ""
              ))
              setUserList([...userList])
              setGameUserList([user])
            });
          }
        });
      }, []);

    const userListFiltered = userList.filter((user) => (
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value)
    }

    function addUser(new_user) {
        if(gameUserList.length >= 5) { //Magic Number: Max number of players
            return
        }
        let newGameUserList = [...gameUserList, new_user]
        newGameUserList = [...new Set(newGameUserList)];
        setGameUserList(newGameUserList)
    }

    function removeUser(new_user) {
        let newGameUserList = gameUserList
        newGameUserList.splice(newGameUserList.indexOf(new_user), 1)
        setGameUserList([...newGameUserList])
    }

    function moveUserUp(new_user) {
        let newGameUserList = gameUserList
        let userIndex = newGameUserList.indexOf(new_user)
        newGameUserList.splice(userIndex, 1)
        newGameUserList.splice(userIndex-1, 0, new_user)
        setGameUserList([...newGameUserList])
    }

    function moveUserDown(new_user) {
        let newGameUserList = gameUserList
        let userIndex = newGameUserList.indexOf(new_user)
        newGameUserList.splice(userIndex, 1)
        newGameUserList.splice(userIndex+1, 0, new_user)
        setGameUserList([...newGameUserList])
    }

    return (
        <div className="newGameForm">
            <h1>Create a New Game</h1>
            <h4>Selected Users ({gameUserList.length}/5):</h4>

            {gameUserList.map((game_user) => (
                <p>
                    {gameUserList.at(0) === game_user ? "" : <button onClick={() => moveUserUp(game_user)}>Up</button>}
                    {gameUserList.at(-1) === game_user ? "" : <button onClick={() => moveUserDown(game_user)}>Down</button>}
                    &ensp;
                    {game_user.username}
                    {gameUserList.at(0) === game_user ? " (Leader)" : ""}
                    &ensp;
                    {game_user !== user ? <button onClick={() => removeUser(game_user)}>X</button> : ""}
                </p>  
            ))}
            <button>Create Game</button>
            <p></p>
            <input placeholder="Search for a User" name='userSearch' value={searchTerm} onChange={handleSearchTermChange} />
            {userListFiltered.map((user) => (
                <p onClick={() => addUser(user)}>{user.username}</p>
            ))}
        </div>
    )
}
export default NewGame