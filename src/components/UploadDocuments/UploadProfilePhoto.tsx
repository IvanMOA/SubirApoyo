import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { photosRef } from "../../firebase";
import { useUploadToStorage } from "../../hooks/useUploadToStorage";
import { EmployeeState, updatePhotoURL } from "../../store/EmployeeData";
import { ModalState } from "../Modal/Modal";
import { Photo } from "../UploadPhotos/Photo";
import { TakePhotoModalContent } from "./TakePhotoModalContent";

export const UploadProfilePhoto = () => {
  const [employee,setEmployeeState] = useRecoilState(EmployeeState);
  const [{}, setModalIsOn] = useRecoilState(ModalState);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [imgTaken, setImgTaken] = useState(employee.photoURL);
  const [isUploading, setIsUploading] = useState(false);
  const { errorUploading, loadingState, photoURL } = useUploadToStorage(
    isUploading,
    photosRef,
    imgTaken
  );
  const [allGood, setAllGood] = useState<boolean | null>(null);
  const uploadToStorage = () => {
    setIsUploading(true);
  };
  const takePhoto = (imgData: string) => {
    setModalIsOn({ modalIsOn: false, child: <div></div> });
    setImgTaken(imgData);
    setPhotoTaken(true);
  };
  const openTakePhotoModal = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    setModalIsOn({
      modalIsOn: true,
      child: (
        <TakePhotoModalContent
          takePhoto={takePhoto}
          videoStream={mediaStream}
        />
      ),
    });
  };
  useEffect(() => {
    const doAsync = async () => {
      if (photoURL) {
        try {
          await updatePhotoURL(employee.employeeNumber, photoURL);
          setEmployeeState( e => ({...e, photoURL }))
          setAllGood(true);
        } catch (error) {
          setAllGood(false);
        }
      }
    };
    if (!errorUploading && photoURL) {
      doAsync();
    }
  }, [errorUploading, photoURL]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl text-gray-700">Toma de fotografía</h1>
      <button
        onClick={openTakePhotoModal}
        className="bg-uanlYellow text-white rounded-md px-4 py-2 mt-2"
      >
        Tomar fotografía
      </button>
      <div className="flex justify-center flex-col items-center">
        {imgTaken !== "" ? (
          <>
            <h1 className="max-w-sm mx-4 my-2 text-center pl-4 border-l-2 border-uanlBlue">
              {imgTaken.includes("firebase")
                ? "Parece que ya has asociado una imagen, si lo deseas puedes tomar otra y cambiar la ya existente"
                : ""}
            </h1>
            <Photo deletePhoto={ () => {}} src={imgTaken} />
          </>
        ) : (
          <div className="h-32 w-32 border-dashed border-2 border-gray-700 flex items-center justify-center mt-2">
            <h1 className="text-center">Toma una fotografía</h1>
          </div>
        )}
      </div>
      {isUploading ? (
        <h1 className="text-center text-gray-700 text-md mt-2">
          {loadingState === 100 && allGood
            ? "Fotografía subida"
            : `Subiendo fotografía... ${loadingState.toFixed(2)}%`}
        </h1>
      ) : (
        <button
          onClick={uploadToStorage}
          disabled={!photoTaken}
          className={`${
            !photoTaken ? "bg-opacity-80 cursor-not-allowed" : ""
          } bg-uanlBlue px-4 py-2 text-white mt-2 rounded-md`}
        >
          Subir
        </button>
      )}
    </div>
  );
};
