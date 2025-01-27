import React, { ReactNode, useRef } from "react";
import { atom, selector, useRecoilState } from "recoil";

interface IModalState {
  modalIsOn: boolean;
  child: ReactNode;
}

export const ModalState = atom<IModalState>({
  key: "modalIsOn",
  default: { modalIsOn: false, child: <div></div> },
});

export const Modal: React.FC = () => {
  const [{ modalIsOn, child }, setModalState] = useRecoilState(ModalState);
  const bgDiv = useRef<HTMLDivElement>(null)
  return (
    <div
    ref={ bgDiv }
      onClick={(e) =>{
        if( e.target != bgDiv.current) return
        setModalState((currState) => ({
          modalIsOn: false,
          child: currState.child,
        }))
      }}
      style={ { zIndex: modalIsOn ? 50 : -50, height: 'calc(100vh + 1px)'}}
      className={`${
        modalIsOn ? "opacity-100 bg-greyBlack30p mt-0" : "opacity-0  mt-4"
      } transition-all duration-150 absolute w-full h-screen flex justify-center items-center`}
    >
      <div className="bg-white rounded-md overflow-hidden">{child}</div> 
    </div>
  );
};
