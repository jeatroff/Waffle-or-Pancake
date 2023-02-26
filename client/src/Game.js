function Game({ game }) {
    return (
        <div>
            <h1>Game</h1>
            <h2>Leader: {game.leader_name}, Players: {game.player_1}
                {game.player_2 ? ", " + game.player_2 : ""}
                {game.player_3 ? ", " + game.player_3 : ""}
                {game.player_4 ? ", " + game.player_4 : ""}
            </h2>
        </div>
    )
}

export default Game;