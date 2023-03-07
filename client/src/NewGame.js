import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

function NewGame({ user, setGame, gameList, setGameList}) {
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [gameUserList, setGameUserList] = useState([])
    const [errors, setErrors] = useState([])
    const MAX_PLAYERS = 5
    const history = useHistory()

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
      }, [user]);

    const userListFiltered = userList.filter((user) => (
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value)
    }

    function addUser(new_user) {
        if(gameUserList.length >= MAX_PLAYERS) {
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

    function createGame(e) {
        if (gameUserList.length < 2) {
            setErrors("A new game must have at least two players.")
            return
        }

        const new_game = {
            leader_name: gameUserList[0].username,
            player_1: gameUserList[1].username,
            player_2: gameUserList.length > 2 ? gameUserList[2].username : null,
            player_3: gameUserList.length > 3 ? gameUserList[3].username : null,
            player_4: gameUserList.length > 4 ? gameUserList[4].username : null
        }

        fetch(`/games`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_game)
        })
        .then(res => {
            if(res.ok) {
                res.json().then(game => {
                    setGame(game)

                    gameUserList.map((user) => (
                        fetch(`/usergames`,{
                            method:'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                user_id: user.id,
                                game_id: game.id,
                            })
                        })
                    ))
                    setGameList(gameList ? [...gameList, game] : [game])
                    history.push("/game")
                })
            } else {
                res.json().then(json => setErrors(json.error))
            }
        })
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
            <button onClick={createGame}>Create Game</button>
            <p>{errors}</p>
            <input placeholder="Search for a User" name='userSearch' value={searchTerm} onChange={handleSearchTermChange} />
            {userListFiltered.map((user) => (
                <p onClick={() => addUser(user)}>{user.username}</p>
            ))}
        </div>
    )
}
export default NewGame