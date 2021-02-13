import React from "react";
import { useRecoilState } from "recoil";
import { ModalState } from "./Modal";

type ErrorModalContentProps = {
    title: string;
  message: string;
};

export const ErrorModalContent: React.FC<ErrorModalContentProps> = ({
  message, title
}) => {
  const [{}, setModalState] = useRecoilState(ModalState);
  return (
    <div className=" flex flex-col justify-center items-center w-64 max-w overflow-hidden">
<div className="bg-uanlBlue text-white w-full p-2 relative">
      <h1 className="z-20 text-xl mb-2">{title}</h1>
      <h1>{message}</h1>
      <i className="fas fa-exclamation-triangle absolute right-8 top-4 opacity-10 text-4xl"></i>
</div>
<div className="p-2 w-full flex justify-end">
      <button
        onClick={() =>
          setModalState((currVal) => ({ ...currVal, modalIsOn: false }))
        }
        className="z-20 px-8 py-2 bg-uanlYellow text-grayBlack rounded-md"
      >
        Cerrar
      </button>
</div>
    </div>
  );
};
