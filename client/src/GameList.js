import { useHistory } from 'react-router-dom'

function GameList({ gameList, setGame, setGameList }) {
    const history = useHistory()

    function handleClick(game) {
        setGame(game)
        history.push("/game")
    }

    // TODO: Figure out why display isn't updating properly upon deletion
    function deleteGame(game) {
        fetch(`/games/${game.id}`,{
            method:'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
            if(res.ok) {
                let i = gameList.indexOf(game)
                let tempGameList = gameList
                tempGameList.splice(i, 1)
                console.log(tempGameList)
                setGameList(tempGameList)
            }
        })
    }
    
    return(
        <div>
            <h1>Your Games</h1>
            <div className="scroll">
                <ul>
                    {gameList ? gameList.map((game) => (
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