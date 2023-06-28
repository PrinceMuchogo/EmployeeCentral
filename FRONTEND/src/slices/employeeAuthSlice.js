import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeeInfo: localStorage.getItem('employeeInfo') ? JSON.parse(localStorage.getItem('employeeInfo')) : null
};

const employeeAuthSlice = createSlice({
    name: 'employeeAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.employeeInfo = action.payload;
            localStorage.setItem('employeeInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) =>{
            state.employeeInfo = null;
            localStorage.removeItem('employeeInfo');
        },
    },
});

export const {setCredentials, logout} = employeeAuthSlice.actions;

export default employeeAuthSlice.reducer;