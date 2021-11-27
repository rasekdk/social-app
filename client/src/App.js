import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  const { REACT_APP_API_URL } = process.env;

  const [user, setUser] = useState([]);

  useEffect(
    () =>
      Axios.get(`${REACT_APP_API_URL}/users`).then((res) => setUser(res.data)),
    []
  );

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
