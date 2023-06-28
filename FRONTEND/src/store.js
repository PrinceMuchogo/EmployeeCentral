import {configureStore} from '@reduxjs/toolkit';
import adminAuthReducer from './slices/adminAuthSlice';
import managerAuthReducer from './slices/managerAuthSlice';
import employeeAuthReducer from './slices/employeeAuthSlice';
import { adminApiSlice } from './slices/adminApiSlice';
import { managerApiSlice } from './slices/managerApiSlice';
import { employeeApiSlice } from './slices/employeeApiSlice';

const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        employeeAuth: employeeAuthReducer,
        managerAuth: managerAuthReducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
        [managerApiSlice.reducerPath]: managerApiSlice.reducer,
        [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
                .concat(adminApiSlice.middleware)
                .concat(managerApiSlice.middleware)
                .concat(employeeApiSlice.middleware),
    devTools: true
});

export default store; 