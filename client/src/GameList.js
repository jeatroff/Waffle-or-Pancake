import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

function GameList({ gameList, setGame }) {
    const history = useHistory()

    function handleClick(game) {
        setGame(game)
        history.push("/game")
    }

    return(
        <div>
            <h1>Your Games</h1>
            <div className="scroll">
                {gameList.map((game) => (
                    <div onClick={() => handleClick(game)}>
                        <p>Leader: {game.leader_name}, Players: {game.player_1}
                            {game.player_2 ? ", " + game.player_2 : ""}
                            {game.player_3 ? ", " + game.player_3 : ""}
                            {game.player_4 ? ", " + game.player_4 : ""}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GameList