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

const counter = atom({ key: "counter", default: 0 });

const counterPlus10 = selector({
  key: "counterPlus10",
  get: ({ get }) => {
    const counterV = get(counter);
    return counterV + 10;
  },
});

export function Home() {
  const [counterV, setCounter] = useRecoilState(counter);
  const [{}, setModalState] = useRecoilState(ModalState);
  return (
    <div>
      <h1>Count: {counterV}</h1>
      <button onClick={() => setCounter(counterV + 1)}>++</button>
      <button
        onClick={() =>
          setModalState((currState) => ({
            modalIsOn: true,
            child: <ErrorModalContent title="Error" message="Hubo falla bro" />,
          }))
        }
      >
        openmodal bro (:
      </button>
    </div>
  );
}

function App() {
  const [{ modalIsOn, child }, setModalState] = useRecoilState(ModalState);
  return (
    <div>
      <Modal />
      <div className="App bg-red-800">Hello world</div>
      <Home />
      <PhotoDropzone />
    </div>
  );
}

export default App;
