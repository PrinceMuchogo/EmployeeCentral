import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; 

//action to be dispatched when checkout event is triggered
import { logout } from '../../src/slices/adminAuthSlice';

//custom component to render managers' information in a table
import ManagerTable from '../../Components/ManagerTable';

//functional component for the admin dashboard
const AdminPage = () => {

  //hooks to extract current state and to navigate the app
  const {adminInfo} = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewProfile = () =>{

    navigate('viewProfile',{
      state: {user: adminInfo}
    });
  };

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

  // routing authentication
  if(adminInfo != null){

    return (
      <div style={{margin: '6%'}}>
        <h6>
            Administrator
        </h6>
        <div style={{marginBottom: '3%', marginRight: '3%'}}>
            <button onClick={handleViewProfile} class="btn btn-primary" style={{marginRight: '1%'}}>Profile</button>
            <button onClick={handleCheckout} class="btn btn-danger">Check out for today</button>
        </div>
        <div>
            <Link to={'addManager'}>
                <button class="btn btn-sm btn-primary" >
                    Add a new manager
                </button>
            </Link>
        </div>
        
        <ManagerTable/>
      </div>
    )
  }else{

    //redirecting to admin login page
    useEffect(() =>{
      navigate('/adminLogin');
    })
    
  }

  
}

export default AdminPage