// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;