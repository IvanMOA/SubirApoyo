import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { ErrorModalContent } from "../Modal/ErrorModalContent";
import { ModalState } from "../Modal/Modal";
import { toBase64 } from "../../utilities/toBase64";

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i; 
const isPhoto = (file: File) =>
  file.name.match(imageReg) === null ? false : true;

type PhotoDropzoneProps = {
  onSuccessfulDrop: (imgData: string) => void;
};

export const PhotoDropzone = ({ onSuccessfulDrop }: PhotoDropzoneProps) => {
  const [{}, setModalState] = useRecoilState(ModalState);
  const onDrop = (acceptedFiles: File[]) => {
    const photos = acceptedFiles.filter(isPhoto);
    if (photos.length === 0)
      return setModalState((prevState) => ({
        modalIsOn: true,
        child: (
          <ErrorModalContent
            title="Error al cargar imágenes"
            message="Parece que ninguno algunos archivos no eran imágenes, por favor intentalo de nuevo."
          />
        ),
      }));
    if (photos.length > 1)
      return setModalState((prevState) => ({
        modalIsOn: true,
        child: (
          <ErrorModalContent
            title="Error al seleccionar imágenes"
            message="Selecciona una sola fotografía"
          />
        ),
      }));
    const onDropAsync = async () => {
      const photosToConvert = photos.map(toBase64);
      const base64Urls = await Promise.all(photosToConvert);
      onSuccessfulDrop(base64Urls[0]);
    };
    onDropAsync();
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-uanlBlue p-8 text-center"
    >
      <input {...getInputProps()} />
      {isDragActive
        ? "Suelta la foto aquí..."
        : "Arrastra la foto o haz click para seleccionar una"}
    </div>
  );
};
