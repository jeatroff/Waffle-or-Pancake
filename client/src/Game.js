import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";

function Game({ game, user, gameList, setGameList }) {
    const [show, setShow] = useState(false)
    const [solution, setSolution] = useState("")
    const [userList, setUserList] = useState([])
    const [turnList, setTurnList] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch("/users").then((r) => {
          if (r.ok) {
            r.json().then((userList) => {
              setUserList([...userList])
              setTurnList([...game.turns])
            });
          }
        });
    }, []);
    
    useEffect(() => {
        if (
            (turnList.length === 0 && user.username === game.leader_name) ||
            (turnList.length > 0 && !turnList[turnList.length-1].new_guess && user.id === turnList[turnList.length-1].user_id) ||
            (turnList.length > 0 && turnList[turnList.length-1].new_guess && user.username === game.leader_name && !turnList[turnList.length-1].is_solved) ||
            (turnList.length > 0 && turnList[turnList.length-1].is_solved)
          ) {
            showModal()
        } else {
            hideModal()
        }
    }, [turnList])

    function showModal() {
        setShow(true);
    }
    
    function hideModal() {
        setShow(false);
    }

    function handleSolutionChange(e){
        setSolution(e.target.value)
    }

    function handleGameStart(e) {
        fetch(`/games/${game.id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                solution: solution
            })
        })
        .then(res => {
            if(res.ok) {
                handleDecision(e)
            }
        })
    }

    function newTurnUser() {
        let nextUser = []
        let prevUser = turnList.length > 0 ? userList.find(user => user.id === turnList[turnList.length-1].user_id).username : ""
        if (!prevUser || prevUser === game.player_4) {
            nextUser = userList.find(user => user.username === game.player_1)
        } else if (prevUser === game.player_1) {
            nextUser = userList.find(user => user.username === game.player_2)
        } else if (prevUser === game.player_2) {
            nextUser = userList.find(user => user.username === game.player_3)
        } else {
            nextUser = userList.find(user => user.username === game.player_4)
        }

        if (!nextUser) { nextUser = userList.find(user => user.username === game.player_1) }

        return nextUser.id
    }

    function handleDecision(e) {
        let new_turn = {
            game_id: game.id,
            user_id: newTurnUser(),
            old_guess: e.target.value,
            new_guess: ""
        }
        fetch(`/turns`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_turn)
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    let tempTurnList = turnList
                    tempTurnList.push(turn)
                    setTurnList(tempTurnList)

                    game.turns = turnList
                    let tempGameList = gameList
                    tempGameList.splice(gameList.indexOf(game), 1, game)
                    setGameList(tempGameList)

                    hideModal()
                });
            }
        })
    }

    function handleNewGuess(e) {
        fetch(`/turns/${turnList[turnList.length-1].id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({new_guess: solution})
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    let tempTurnList = turnList
                    tempTurnList[turnList.length-1] = turn
                    setTurnList(tempTurnList)
                    game.turns = turnList
                    hideModal()
                    if(game.solution === turn.new_guess) {
                        handleSolved()
                    }    
                });
            }
        })
    }

    // Fix num_wins, add useState variables for them
    function handleSolved() {
        fetch(`/turns/${turnList[turnList.length-1].id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_solved: true})
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    // game.users.map((player) => (
                    //     player.id === turn.user_id ? (
                    //         fetch(`/users/${player.id}`,{
                    //             method:'PATCH',
                    //             headers: {'Content-Type': 'application/json'},
                    //             body: JSON.stringify({
                    //                 num_games: player.num_games+1,
                    //                 num_wins: player.num_wins+1
                    //             })
                    //         })
                    //     ) : (
                    //         fetch(`/users/${player.id}`,{
                    //             method:'PATCH',
                    //             headers: {'Content-Type': 'application/json'},
                    //             body: JSON.stringify({
                    //                 num_games: player.num_games+1
                    //             })
                    //         })
                    //     )
                    // ))


                    let tempTurnList = turnList
                    tempTurnList[turnList.length-1] = turn
                    setTurnList(tempTurnList)
                    game.turns = turnList

                    showModal()
                });
            }
        })
    }

    if(!game) {
        history.push("/gamelist")
    }

    return (
        <div>
            <h1>Game</h1>
            <h2>Leader: {game.leader_name}, Players: {game.player_1}
                {game.player_2 ? ", " + game.player_2 : ""}
                {game.player_3 ? ", " + game.player_3 : ""}
                {game.player_4 ? ", " + game.player_4 : ""}
            </h2>
            {user.username === game.leader_name && game.solution ? <h3>Solution: {game.solution}</h3> : null}

            <div className="scroll">
                {turnList ? turnList.map((turn) => (
                    <div>
                        <p><b>{game.leader_name}</b>: It is more like {turn.old_guess}.</p>
                        {turn.new_guess ?
                            <p><b>{userList.find(user => user.id === turn.user_id).username}</b>: Is it more like {turn.old_guess} or {turn.new_guess}?</p>
                        : null}
                    </div>
                )) : null}
            </div>

            <Modal show={show} handleClose={hideModal}>
                {turnList.length === 0 && user.username === game.leader_name ? (
                <div>
                    <p>What noun are you thinking of?</p>
                    <input type='text' value={solution} onChange={handleSolutionChange} />
                    <p>Is it more like a waffle or a pancake?</p>
                    <input type='submit' value='a Waffle' onClick={handleGameStart} />
                    <input type='submit' value='a Pancake'onClick={handleGameStart} />
                </div>
                ) : turnList.length > 0 && turnList[turnList.length-1].new_guess && user.username === game.leader_name && !turnList[turnList.length-1].is_solved ? (
                <div>
                    <p>Is <b>{game.solution}</b> more like <b>{turnList[turnList.length-1].old_guess}</b> or more like <b>{turnList[turnList.length-1].new_guess}</b>?</p>
                    <input type='submit' value={turnList[turnList.length-1].old_guess} onClick={handleDecision} />
                    <input type='submit' value={turnList[turnList.length-1].new_guess} onClick={handleDecision} />
                    <button onClick={() => handleSolved()}>{turnList[turnList.length-1].new_guess} is the solution</button>
                </div>
                ) : turnList.length > 0 && !turnList[turnList.length-1].new_guess && user.id === turnList[turnList.length-1].user_id ? (
                <div>
                    <p>Is it more like <b>{turnList[turnList.length-1].old_guess}</b> or more like __________?</p>
                    <input type='text' value={solution} onChange={handleSolutionChange} />
                    <input type='submit' onClick={handleNewGuess} />
                </div>
                ) : turnList.length > 0 && turnList[turnList.length-1].is_solved ? (
                <div>
                    <h3>{userList.find(user => user.id === turnList[turnList.length-1].user_id) ? userList.find(user => user.id === turnList[turnList.length-1].user_id).username : null} wins!</h3>
                    <p>The solution was <b>{game.solution}</b>.</p>
                    <button onClick={hideModal}>Close Window</button>
                </div>
                ) : (<div><h1>Logic Error!</h1></div>)}
            </Modal>
        </div>
    )
}

export default Game;