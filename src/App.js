import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";
import Cart from "./components/Cart/Cart";
import Menu from "./components/Menu/Menu";
import Address from "./components/Address/Address";
import End from "./components/End/End";
import NotFound from "./components/NotFound/NotFound";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/restaurant/:id">
          <Menu />
        </Route>
        <Route path="/address">
          <Address />
        </Route>
        <Route path="/end">
          <End />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
