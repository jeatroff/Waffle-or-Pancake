import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

function GameList({ user, gameList, setGame, setGameList }) {
    const [gameListDisplay, setGameListDisplay] = useState([])
    const history = useHistory()

    useEffect(() => (
        setGameListDisplay(gameList && user && user.games ? gameList.filter(a => user.games.some(b => a.id === b.id)) : [])
    ), [user, gameList])

    function handleClick(game) {
        setGame(game)
        history.push("/game")
    }

    // Run DELETE request and then setGameList to gameList with game filtered out
    function deleteGame(game) {
        console.log("Deleting game")
        console.log(game)
    }
    
    return(
        <div>
            <h1>Your Games</h1>
            <div className="scroll">
                <ul>
                    {gameListDisplay ? gameListDisplay.map((game) => (
                        <li>
                            <t onClick={() => handleClick(game)}>
                                Leader: {game.leader_name}, Players: {game.player_1}
                                {game.player_2 ? ", " + game.player_2 : ""}
                                {game.player_3 ? ", " + game.player_3 : ""}
                                {game.player_4 ? ", " + game.player_4 : ""}
                            </t>
                            &ensp; <button onClick={() => deleteGame(game)}>X</button>
                        </li>
                    )) : null}
                </ul>
            </div>
        </div>
    )
}
export default GameList