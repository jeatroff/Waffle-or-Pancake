// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import NavBar from "./NavBar";
import NewGame from "./NewGame";
import GameList from "./GameList";
import Game from "./Game";

function App() {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [gameList, setGameList] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });

    fetch("/games").then((r) => {
      if (r.ok) {
        r.json().then((games) => {
          setGameList(games)
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} setUser={setUser}/>
        <Switch>
          <Route exact path="/"><Home user={user} setUser={setUser}/></Route>
          <Route exact path="/signup"><Signup setUser={setUser}/></Route>
          <Route exact path="/newgame"><NewGame user={user} setGame={setGame} setGameList={setGameList}/></Route>
          <Route exact path="/gamelist"><GameList gameList={gameList} setGame={setGame}/></Route>
          <Route exact path="/game"><Game game={game}/></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;