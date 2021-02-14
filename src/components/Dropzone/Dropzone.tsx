import React, { useCallback } from "react"
import {  useDropzone } from "react-dropzone"
import { useRecoilState } from 'recoil'
import { ErrorModalContent } from "../Modal/ErrorModalContent"
import { ModalState } from "../Modal/Modal"
import { Photo, PhotosState } from '../UploadPhotos/UploadPhotos'
import { toBase64 } from '../../utilities/toBase64'

let imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
const isPhoto = ( file : File) => file.name.match(imageReg) === null ? false : true

export const PhotoDropzone : React.FC = () => {
    const [{}, setModalState] = useRecoilState(ModalState)
    const [photos, setPhotosState] = useRecoilState(PhotosState)
    const onDrop = (acceptedFiles : File[]) => {
        let photos = acceptedFiles.filter(isPhoto)
        if(photos.length === 0) return setModalState( (prevState) => ({modalIsOn: true, child: <ErrorModalContent title="Error al cargar imágenes" message="Parece que ninguno algunos archivos no eran imágenes, por favor intentalo de nuevo." />}))
        const onDropAsync = async () => {
            const photosToConvert = photos.map(toBase64)
            const base64Urls = await Promise.all(photosToConvert)
            setPhotosState(prevState => [...prevState, ...base64Urls.map<Photo>( url => ({url: url, type: 'pending'}))])
        }
        onDropAsync()
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop})
    return <div  {...getRootProps()} className="border-2 border-dashed border-uanlBlue p-8 text-center">
        <input {...getInputProps()}/>
        { isDragActive ? 'Suelta la foto aquí...' : 'Arrastra la foto o haz click para seleccionar una'}
    </div>
}