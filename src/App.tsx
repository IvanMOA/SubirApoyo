import React from "react";
import { Modal } from "./components/Modal/Modal";
import { Home } from "./Pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { Start } from "./Pages/Start";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MainAnimatedSwitch = withRouter(({ location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500}
        classNames={"slidevertical"}
      >
        <Switch location={location}>
          <Route exact path="/" render={() => <Start />} />
          <Route path="/inicio" render={() => <Home />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});

const App: React.FC = () => {
  return (
    <div>
      <Modal />
      <Router>
        <MainAnimatedSwitch />
      </Router>
    </div>
  );
};

export default App;
