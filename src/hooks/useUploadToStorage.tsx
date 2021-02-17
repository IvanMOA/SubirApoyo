import { Reference } from '@firebase/storage-types'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

export const useUploadToStorage = (ref: Reference, base64url: string) => {
    const [loadingState, setLoadingState] = useState<number>(0)
    const [errorUploading, setErrorUploading] = useState<boolean>(false)
    const [photoURL, setPhotoURL] = useState<string | null>(null)
    useEffect( () => {
        const upload = async () => {
            const randomUUID = v4()
            const uploadTask = ref.child(randomUUID).putString(base64url, 'base64')
            uploadTask.on('state_changed', ss => { // Uploading
                const progress = ( ss.bytesTransferred / ss.totalBytes ) * 100
                setLoadingState(progress)
            }, error => { // Error
                setErrorUploading(true)
            }, async () => { // Success
                try {
                   const url = await uploadTask.snapshot.ref.getDownloadURL()
                   setPhotoURL(url)
                } catch {
                    setErrorUploading(true)
                }
            })
        } 
        upload()
    }, [])
    return {loadingState, errorUploading, photoURL}
}