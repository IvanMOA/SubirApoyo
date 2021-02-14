import React from "react";
import { atom, useRecoilState } from "recoil";
import { photosRef } from "../../firebase";
import { Photo as PhotoComponent } from "./Photo";

export interface Photo {
  url: string;
  storageUrl?: string;
  type: "pending" | "uploading" | "uploaded";
}

export const PhotosState = atom<Photo[]>({
  key: "PhotosState",
  default: [],
});

export const UploadPhotos: React.FC = () => {
  const [photos, setPhotosState] = useRecoilState(PhotosState);

  const isPending = (p: Photo) => p.type === "pending";
  const isUploading = (p: Photo) => p.type === "uploading";
  const isUploaded = (p: Photo) => p.type === "uploaded";

  const deletePhotoFn : Function = (p: Photo) => {
    switch (p.type) {
      case "pending":
        return () =>
          setPhotosState((prevState) => [
            ...prevState.filter((pfa) => pfa.url != p.url),
          ]);
    }
  };

  const toPhotoComponent = (p: Photo) => (
    <PhotoComponent
    key={p.url}
      src={p.url}
      deletePhoto={deletePhotoFn(p)}
    />
  );
  const photosToUpload = photos.filter(isPending).map(toPhotoComponent);
  return (
    photos.length === 0 ? <h1 className="w-100 text-center text-gray-600">No se han encontrado fotografías subidas</h1>  :
    <div>
      {/* Photos to upload */}
      <div>{photosToUpload}</div>
      {/* Uploading photos */}
      {/* Already uploaded photos */}
    </div>
  );
};
