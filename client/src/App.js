import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
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
