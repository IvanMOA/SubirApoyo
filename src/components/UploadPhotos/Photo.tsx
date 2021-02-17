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
        setModalState({modalIsOn: true, child: <img style={ {maxHeight: '60vh'}} src={src} />})
    } 

    return <div className="flex relative">
        <img onClick={showImageOnModal} className="max-h-32 cursor-pointer" src={src}/>
    </div>
}