import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";

function Game({ game, user }) {
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
              setTurnList(game.turns)
              if (
                (game.turns.length === 0 && user.username === game.leader_name) ||
                (game.turns.length > 0 && !game.turns[game.turns.length-1].new_guess && game.turns[game.turns.length-1].user_id === user.id) ||
                (game.turns.length > 0 && game.turns[game.turns.length-1].new_guess && user.username === game.leader_name) ||
                (game.turns.length > 0 && game.turns[game.turns.length-1].is_solved)
              ) {
                showModal()
              }
            });
          }
        });
      }, []);

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
                res.json().then((updated_game) => {
                });
                handleDecision(e)
            }
        })
    }
    
    // TODO: add functionality to determine the user whose turn is next
    function handleDecision(e) {
        let new_turn = {
            game_id: game.id,
            user_id: userList.find(user => user.username === game.player_1).id,
            old_guess: e.target.value,
            new_guess: ""
        }
        console.log(new_turn)
        fetch(`/turns`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_turn)
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    game.turns = [...game.turns, turn]
                    setTurnList(game.turns)
                });
                hideModal()
            }
        })
    }

    function handleNewGuess(e) {
        fetch(`/turns/${game.turns[game.turns.length-1].id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({new_guess: solution})
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    game.turns[game.turns.length-1] = turn
                    setTurnList(game.turns)
                    hideModal()
                    if(solution === turn.new_guess) {
                        handleSolved()
                    }    
                });
            }
        })
    }

    // TODO: update the winner's games_won stat
    function handleSolved() {
        fetch(`/turns/${game.turns[game.turns.length-1].id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_solved: true})
        })
        .then(res => {
            if(res.ok) {
                res.json().then((turn) => {
                    game.turns[game.turns.length-1] = turn
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
                            <p><b>{userList.find(user => user.id === game.turns[game.turns.length-1].user_id).username}</b>: Is it more like {turn.old_guess} or {turn.new_guess}?</p>
                        : null}
                    </div>
                )) : null}
            </div>

            <Modal show={show} handleClose={hideModal}>
                {game.turns.length === 0 && user.username === game.leader_name ? (
                <div>
                    <p>What noun are you thinking of?</p>
                    <input type='text' value={solution} onChange={handleSolutionChange} />
                    <p>Is it more like a waffle or a pancake?</p>
                    <input type='submit' value='a Waffle' onClick={handleGameStart} />
                    <input type='submit' value='a Pancake'onClick={handleGameStart} />
                </div>
                ) : game.turns.length > 0 && game.turns[game.turns.length-1].new_guess && user.username === game.leader_name && !game.turns[game.turns.length-1].is_solved ? (
                <div>
                    <p>Is it more like <b>{game.turns[game.turns.length-1].old_guess}</b> or more like <b>{game.turns[game.turns.length-1].new_guess}</b>?</p>
                    <input type='submit' value={game.turns[game.turns.length-1].old_guess} onClick={handleDecision} />
                    <input type='submit' value={game.turns[game.turns.length-1].new_guess} onClick={handleDecision} />
                    <button onClick={() => handleSolved()}>{game.turns[game.turns.length-1].new_guess} is the solution</button>
                </div>
                ) : game.turns.length > 0 && !game.turns[game.turns.length-1].new_guess && user.id === game.turns[game.turns.length-1].user_id ? (
                <div>
                    <p>Is it more like <b>{game.turns[game.turns.length-1].old_guess}</b> or more like __________?</p>
                    <input type='text' value={solution} onChange={handleSolutionChange} />
                    <input type='submit' onClick={handleNewGuess} />
                </div>
                ) : game.turns.length > 0 && game.turns[game.turns.length-1].is_solved ? (
                <div>
                    <h3>{userList.find(user => user.id === game.turns[game.turns.length-1].user_id) ? userList.find(user => user.id === game.turns[game.turns.length-1].user_id).username : null} wins!</h3>
                    <p>The solution was <b>{game.solution}</b>.</p>
                    <button onClick={hideModal}>Close Window</button>
                </div>
                ) : (null)}
            </Modal>
        </div>
    )
}

export default Game;