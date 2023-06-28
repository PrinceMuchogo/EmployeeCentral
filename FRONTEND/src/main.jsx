import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';


import LandingPage from '../Pages/LandingPage.jsx';

//admin pages
import UpdateManagerProfilePage from '../Pages/Admin/UpdateManagerProfilePage';
import AdminLoginPage from '../Pages/Admin/AdminLoginPage.jsx';
import AddManagerPage from '../Pages/Admin/AddManagerPage';
import AdminPage from '../Pages/Admin/AdminPage.jsx';

//View profile page
import ViewMyProfilePage from '../Pages/ViewMyProfilePage';
import ViewAdminProfilePage from '../Pages/Admin/ViewAdminProfilePage';

//manager pages
import ManagerLoginPage from '../Pages/Manager/ManagerLoginPage.jsx';
import ManagerPage from '../Pages/Manager/ManagerPage.jsx';
import AssignTaskPage from '../Pages/Manager/AssignTaskPage';
import ManagerViewLeaveRequestsPage from '../Pages/Manager/ManagerViewLeaveRequestsPage';
import ViewPerformancePage from '../Pages/Manager/ViewPerformancePage';
import ViewEmployeeTasksPage from '../Pages/Manager/ViewEmployeeTasksPage';
import AddEmployeePage from '../Pages/Manager/AddEmployeepage';
import UpdateEmployeeProfilePage from '../Pages/Manager/UpdateEmployeeProfilePage';

//employee pages
import EmployeeLoginPage from '../Pages/Employee/EmployeeLoginPage.jsx';
import EmployeePage from '../Pages/Employee/EmployeePage.jsx';
import ViewEmployeesPage from '../Pages/Employee/ViewEmployeesPage';
import ViewMyLeaveRequestsPage from '../Pages/Employee/ViewMyLeaveRequest';
import AddLeaveRequestPage from '../Pages/Employee/AddLeaveRequestPage';

//error handling not found page
import NotFoundPage from '../Pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<App />}>

          //landing page route
          <Route index={true} path='/' element={<LandingPage/>}></Route>

          //Login Routes
          <Route path='/employeeLogin' element={<EmployeeLoginPage/>}></Route>
          <Route path='/adminLogin' element={<AdminLoginPage/>}></Route>
          <Route path='/managerLogin' element={<ManagerLoginPage/>}></Route>

          //Employee Routes
          <Route path='/employee' element={<EmployeePage/>}></Route>
          <Route path='/employee/viewMyLeaveRequest' element={<ViewMyLeaveRequestsPage/>}></Route>
          <Route path='/employee/addLeaveRequest' element={<AddLeaveRequestPage/>}></Route>
          <Route path='/employee/viewProfile' element={<ViewMyProfilePage/>}></Route>

          

          //Admin Routes
          <Route path='/admin' element={<AdminPage/>}></Route>
          <Route path='/admin/addManager' element={<AddManagerPage/>}></Route>
          <Route path='/admin/viewEmployees' element={<ViewEmployeesPage/>}></Route>
          <Route path='/admin/viewEmployees/assignTask' element={<AssignTaskPage/>}></Route>
          <Route path='/admin/viewEmployees/viewLeaveRequests' element={<ManagerViewLeaveRequestsPage/>}></Route>
          <Route path='/admin/viewEmployees/viewEmployeePerformance' element={<ViewPerformancePage/>}></Route>
          <Route path='/admin/viewEmployees/viewEmployeeTasks' element={<ViewEmployeeTasksPage/>}></Route>
          <Route path='/admin/viewEmployees/addEmployee' element={<AddEmployeePage/>}></Route>
          <Route path='/admin/viewEmployees/updateEmployeeProfile' element={<UpdateEmployeeProfilePage/>}></Route>
          <Route path='/admin/updateManagerProfile' element={<UpdateManagerProfilePage/>}></Route>
          <Route path='/admin/viewProfile' element={<ViewAdminProfilePage/>}></Route>

          

          //Manager Routes
          <Route path='/manager' element={<ManagerPage/>}></Route>
          <Route path='/manager/assignTask' element={<AssignTaskPage/>}></Route>
          <Route path='/manager/viewLeaveRequests' element={<ManagerViewLeaveRequestsPage/>}></Route>
          <Route path='/manager/viewEmployeePerformance' element={<ViewPerformancePage/>}></Route>
          <Route path='/manager/viewEmployeeTasks' element={<ViewEmployeeTasksPage/>}></Route>
          <Route path='/manager/addEmployee' element={<AddEmployeePage/>}></Route>
          <Route path='/manager/updateEmployeeProfile' element={<UpdateEmployeeProfilePage/>}></Route>
          <Route path='/manager/viewProfile' element={<ViewMyProfilePage/>}></Route>
          
          //Not found page
          <Route path='*' element={<NotFoundPage/>}></Route>
    </Route>  
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
