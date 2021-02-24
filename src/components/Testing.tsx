import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { employee as employeeState, EmployeeState, getEmployeeFromFirebase } from '../store/Employee/slices'
import { RootState } from '../store/store'

export const Testing = () => {
    const employee = useSelector(employeeState)
    console.log(employee);
    
    
    const dispatch = useDispatch()
    return (
        <div>
            { `test: ${ employee.uploadingPhotoURLtoStorage }`}
            <button onClick={ () => dispatch(getEmployeeFromFirebase('a', 'b')) }>Hola</button>
        </div>
    )
}
