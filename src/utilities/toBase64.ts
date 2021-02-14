import { read } from "node:fs"
import { resolve } from "node:path"

export const toBase64 = ( file : File) => new Promise<string>( (res, rej) => {
    const reader = new FileReader()    
    reader.readAsDataURL(file)
    reader.onload = () => res(reader.result as string)
    reader.onerror = error => rej(error)
})