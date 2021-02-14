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
import { ErrorModalContent } from './components/Modal/ErrorModalContent'
import { Home } from './Pages/Home'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

const App : React.FC = () => {
  const [{ modalIsOn, child }, setModalState] = useRecoilState(ModalState);
  return (
    <Router>
      <Switch>
        <Route exact path="/"  render={ () => <Home /> } />
      </Switch>
    </Router>
  );
}

export default App;
