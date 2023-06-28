import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    managerInfo: localStorage.getItem('managerInfo') ? JSON.stringify(localStorage.getItem('managerInfo')) : null
};

const managerAuthSlice = createSlice({
    name: 'managerAuth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.managerInfo = action.payload;
            localStorage.setItem('managerInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) =>{
            state.managerInfo = null;
            localStorage.removeItem('managerInfo');
        },
    },
});

export const {setCredentials, logout} = managerAuthSlice.actions;

export default managerAuthSlice.reducer;