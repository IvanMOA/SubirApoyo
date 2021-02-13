import React, { useCallback } from "react"
import {  useDropzone } from "react-dropzone"

export const PhotoDropzone : React.FC = () => {
    const onDrop = useCallback((acceptedFiles : File[]) => {
        console.log(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop})
    return <div  {...getRootProps()} className="border-2 border-dashed border-uanlBlue p-8 text-center">
        <input {...getInputProps()}/>
        { isDragActive ? 'Suelta la foto aquí...' : 'Arrastra la foto o haz click para seleccionar una'}
    </div>
}