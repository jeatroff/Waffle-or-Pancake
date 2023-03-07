import './App.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import NavBar from "./NavBar";
import NewGame from "./NewGame";
import GameList from "./GameList";
import Game from "./Game";
import Settings from "./Settings";

function App() {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [gameList, setGameList] = useState([])
  const [numGames, setNumGames] = useState(0)
  const [numWins, setNumWins] = useState(0)
  let avatarList = []

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setNumGames(user.num_games)
          setNumWins(user.num_wins)
        });
      }
    });
    fetch("/avatars").then((r) => {
      if (r.ok) {
        r.json().then((avatars) => {
          avatarList = avatars
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch("/games").then((r) => {
      if (r.ok) {
        r.json().then((allGames) => {
          setGameList(user.games ? allGames.filter(a => user.games.some(b => a.id === b.id)) : [])
        });
      }
    });
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser}/>
        <Switch>
          <Route exact path="/"><Home user={user} setUser={setUser}/></Route>
          <Route exact path="/signup"><Signup setUser={setUser}/></Route>
          <Route exact path="/newgame"><NewGame user={user} setGame={setGame} gameList={gameList} setGameList={setGameList}/></Route>
          <Route exact path="/gamelist"><GameList user={user} gameList={gameList} setGame={setGame} setGameList={setGameList}/></Route>
          <Route exact path="/game"><Game user={user} game={game} gameList={gameList} setGameList={setGameList}/></Route>
          <Route exact path="/settings"><Settings user={user} numGames={numGames} numWins={numWins}/></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;