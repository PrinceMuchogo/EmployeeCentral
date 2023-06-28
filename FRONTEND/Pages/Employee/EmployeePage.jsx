import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//custom component to render tasks
import ViewTasks from '../../Components/ViewTasks';

//action to be dispatched when checkout event is triggered
import { logout } from '../../src/slices/employeeAuthSlice';

//functional component for the employee dashboard
const EmployeePage = () => {

    //using hook to extract employee information from current state using selector hook
    const {employeeInfo} = useSelector((state) => state.employeeAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //method to handle the checkout event
    const handleCheckout = () =>{

        dispatch(logout());
        navigate('/');

        toast.success('Hope you enjoyed your day', {
            style: {
              backgroundColor: '#1E40AF',
              color: '#fff',
              borderRadius: '2px',
            },
          });
    }

    const handleViewProfile = () =>{

        navigate('viewProfile',{
            state: {user: employeeInfo}
        })
    }

    // checking if the user is signed in
    if(employeeInfo != null){
        return (
            <div style={{marginTop: '5%', backgroundColor: 'whitesmoke', marginRight: '2%', marginLeft: '2%'}}>
                <div style={{marginBottom: '0'}}>
                    <h6 className='fixed'>Employee Page</h6>
                        <button class="btn btn-primary" onClick={handleViewProfile} style={{marginRight: '1%'}}>My Profile</button>
                        <button class="btn btn-danger" onClick={handleCheckout}>Checkout</button>
                </div>
                <div>
                    <Link to={'addleaveRequest'}><br></br>
                        <button class="btn btn-sm btn-primary"  style={{marginRight: '2%'}}>
                            Send leave request
                        </button>
                    </Link>
                    <Link to={'viewMyLeaveRequest'}>
                        <button class="btn btn-sm btn-primary" >
                            View my leave request
                        </button>
                    </Link>
                </div><br></br>
                <ViewTasks/>
            </div>
          )
    }else{

        //redirecting user to employee login page using hooks
        useEffect(() =>{
            navigate('/employeeLogin');
        })
        
    }

  
}

export default EmployeePage