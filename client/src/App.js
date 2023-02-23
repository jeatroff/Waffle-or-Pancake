// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

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
        <Switch>
          <Route exact path="/"><Home user={user} /></Route>
          <Route exact path="/login"><Login setUser={setUser}/></Route>
          <Route exact path="/signup"><Signup setUser={setUser}/></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;