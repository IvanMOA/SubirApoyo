import React from "react";
import {
  RecoilRoot,
  atom, 
  useRecoilState,
  selector,
  useRecoilValue,
} from "recoil";
import { PhotoDropzone } from "./components/Dropzone/Dropzone";
import { Modal, ModalState } from "./components/Modal/Modal";
import { ErrorModalContent } from "./components/Modal/ErrorModalContent";
import { Home } from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { Location } from 'history'
import { Start } from "./Pages/Start";
import { CSSTransition, TransitionGroup } from "react-transition-group";


const MainAnimatedSwitch = withRouter(( { location} ) => {
  return  <TransitionGroup><CSSTransition key={location.key}  timeout={500} classNames="slidevertical">
        <Switch location={ location }>
          <Route exact path="/" render={() => <Start />} />
          <Route exact path="/inicio" render={() => <Home />} />
        </Switch>
      </CSSTransition></TransitionGroup>
})

const App: React.FC = () => {
  const [{ modalIsOn, child }, setModalState] = useRecoilState(ModalState);
  return (
    <div>
      <Modal />
      <Router>
    <MainAnimatedSwitch/>
      </Router>
    </div>
  );
};

export default App;
