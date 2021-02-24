/**
 * @jest-environment node
 */

import { Employee, EmployeeAPI } from '../api/Employee'
import { EmployeeState } from '../store/Employee/slices'


describe('The Firestore API for an Employee', () => {
    it('creates users and read them', async () => {
        const employeeToCreate  = {
            dependency: 'Test',
            employeeNumber: 'Test',
            gafettePhotoURL: '',
            photoURL: '',
            supported: false 
        }
        await EmployeeAPI.createNewEmployee(employeeToCreate)
        const createdDoc = await EmployeeAPI.getEmployee('Test','Test')
        expect(createdDoc.exists).toBe(true)
        const createdEmployee = createdDoc.data() as Employee
        expect(createdEmployee.dependency).toBe('Test')
        expect(createdEmployee.employeeNumber).toBe('Test')
        expect(createdEmployee.photoURL).toBe('')
        expect(createdEmployee.gafettePhotoURL).toBe('')
        expect(createdEmployee.supported).toBe(false)
    })
    it('updates a profile photo', async () => {
        await EmployeeAPI.updatePhotoURL('Test', 'Test', 'AwesomePhoto!')
        const updatedEmployee = ( await EmployeeAPI.getEmployee('Test', 'Test')).data() as Employee
        expect(updatedEmployee.photoURL).toBe('AwesomePhoto!')
    })
    it('updates a gafette photo', async () => {
        await EmployeeAPI.updateGafetteURL('Test', 'Test', 'NiceGafette!')
        const updatedEmployee = ( await EmployeeAPI.getEmployee('Test', 'Test')).data() as Employee
        expect(updatedEmployee.gafettePhotoURL).toBe('NiceGafette!')
    })
    it('logs in with the correct credentials and data persists', async () => {
        await EmployeeAPI.loginWithEmployeeCredentials('159', 'P7')
        const loggedEmployeeDoc = await EmployeeAPI.getEmployee('159', 'P7')
        expect(loggedEmployeeDoc.exists).toBe(true)
        await EmployeeAPI.updateGafetteURL('159', 'P7', 'NewGafette')
        const loggedEmployee = ( await EmployeeAPI.getEmployee('159', 'P7') ).data() as Employee
        expect(loggedEmployee.gafettePhotoURL).toBe('NewGafette')
        
    })
    it('submits its support to a candiate', async () => {
        await EmployeeAPI.loginWithEmployeeCredentials('123', '123')
        await EmployeeAPI.submitSupport('123', '123')
        const loggedEmployee = (await EmployeeAPI.getEmployee('123', '123')).data() as Employee
        expect(loggedEmployee.supported).toBe(true)
    })
})  