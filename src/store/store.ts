import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeeReducer from './Employee/slices'

export const rootReducer = combineReducers({
    employee: employeeReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default store
