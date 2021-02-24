import { createSlice, Dispatch, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Employee } from "../EmployeeData"
import { RootState } from "../store"

export const initialState  = {
    photoURLinStorage: false,
    gafettePhotoURLinStorage: false,
    uploadingPhotoURLtoStorage: null as null | boolean,
    employee : { 
    employeeNumber: '',
    dependency: '',
    photoURL: '',
    gafettePhotoURL: '',
    supported: false,
    } as Employee
}

export type EmployeeState = typeof initialState

type EmployeeKey = {
    employeeNumber : string,
    dependency: string
}


export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setPhotoURL: (state, action: PayloadAction<string>) => {
            const photoURL = action.payload
            if(photoURL.includes('firebase')){
                state.photoURLinStorage = true
            }else{
                state.photoURLinStorage = false
            }
            state.employee.photoURL = photoURL
            return state
        },
        setGafetteURL: (state, action: PayloadAction<string>) => {
            const gafetteURL = action.payload
            if(gafetteURL.includes('firebase')){
                state.gafettePhotoURLinStorage = true
            }else{
                state.gafettePhotoURLinStorage = false
            }
            state.employee.gafettePhotoURL = gafetteURL
            return state
        },
        setUploadingPhotoURLtoStorage: (state, action: PayloadAction<boolean | null>) => {
            state.uploadingPhotoURLtoStorage = action.payload
            return state
        }
    }
})

export const { setGafetteURL, setPhotoURL, setUploadingPhotoURLtoStorage } = employeeSlice.actions

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

export const employee = (state : RootState ) => state.employee

export const getEmployeeFromFirebase = (employeeNumber : string, dependency: string) =>
    async (dispatch : Dispatch) => {
       dispatch(setUploadingPhotoURLtoStorage(false)) 
       dispatch(setUploadingPhotoURLtoStorage(true)) 
       dispatch(setUploadingPhotoURLtoStorage(null)) 
       return
    }

export default employeeSlice.reducer