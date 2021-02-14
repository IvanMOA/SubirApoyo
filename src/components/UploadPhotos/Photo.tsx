import React from "react";
import { useRecoilState } from "recoil";
import { ModalState } from "../Modal/Modal";
import { Photo  as IPhoto} from './UploadPhotos'

type PhotoProps = {
    src : string
    deletePhoto: () => void
}

export const Photo : React.FC<PhotoProps> = ( { src, deletePhoto }) => {
    const [{}, setModalState] = useRecoilState(ModalState)
    const showImageOnModal = () => {
        setModalState({modalIsOn: true, child: <img style={ {maxWidth: '90vw'}} src={src} />})
    }

    return <div className="flex relative w-32 h-32 md:w-40 md:h-40">
        <img onClick={showImageOnModal} src={src} className="object-cover cursor-pointer"/>
        <button onClick={() => deletePhoto()} className="absolute text-2xl text-white right-4 top-1">&times;</button>
    </div>
}