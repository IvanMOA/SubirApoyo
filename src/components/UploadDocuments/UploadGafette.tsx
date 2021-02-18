import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { photosRef } from "../../firebase";
import { useUploadToStorage } from "../../hooks/useUploadToStorage";
import { EmployeeState, updateGafettePhotoURL, updatePhotoURL } from "../../store/EmployeeData";
import { PhotoDropzone } from "../Dropzone/Dropzone";
import { ModalState } from "../Modal/Modal";
import { Photo } from "../UploadPhotos/Photo";

export const UploadGafette = () => {
  const [employee, setEmployeeState] = useRecoilState(EmployeeState);
  const [{}, setModalIsOn] = useRecoilState(ModalState);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [imgTaken, setImgTaken] = useState(employee.gafettePhotoURL);
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
  useEffect(() => {
    const doAsync = async () => {
      debugger;
      if (photoURL) {
        try {
          await updateGafettePhotoURL(employee.employeeNumber, photoURL);
          setEmployeeState( e => ({...e, gafettePhotoURL: imgTaken }))
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
      <h1 className="text-xl text-gray-700">Subir gafete</h1>
      <div className="flex justify-center flex-col items-center p-4 h-52">
        {imgTaken !== "" ? (
            <Photo deletePhoto={ () => {}} src={imgTaken} />
        ) : (
              <PhotoDropzone onSuccessfulDrop={(str) => {
                  setImgTaken(str)
                  setPhotoTaken(true)
              }} />
        )}
      </div>
      {isUploading ? (
        <h1 className="text-center text-gray-700 text-md mt-2">
          {loadingState === 100 && allGood
            ? "Gafete subido"
            : `Subiendo gafete... ${loadingState.toFixed(2)}%`}
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
