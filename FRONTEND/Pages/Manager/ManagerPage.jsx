import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

//action to be dispatched when checkout event is triggered
import { logout } from '../../src/slices/managerAuthSlice';

//a custom functional component to render employee information in a table
import Table from '../../Components/Table';

//functional component for the manager dashboard
const ManagerPage = () => {

  //extracting manager information from current state using selector hook
  const {managerInfo} = useSelector((state) => state.managerAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(managerInfo.name);
  const handleViewProfile =() =>{

    navigate('viewProfile',{
      state: {
        user: managerInfo
      }
    });
  };

  //method to handle checkout event
  const handleCheckOut =() =>{

    dispatch(logout());
    navigate('/');
    toast.success('Hope you enjoyed your day', {
      style: {
        backgroundColor: '#1E40AF',
        color: '#fff',
        borderRadius: '2px',
      },
    })


  }

  //checking if the user is signed in (routing authentication)
  if(managerInfo != null){

    return (
      <div style={{marginTop: '6%', marginRight: '2%', marginLeft: '2%'}}>
        <h6>Manager Dashboard</h6>
        <div style={{marginBottom: '3%'}}>
          <button onClick={handleViewProfile} class="btn btn-primary" style={{marginRight: '1%'}}>My profile</button>
            <button onClick={handleCheckOut} class="btn btn-danger">Checkout for today</button>
        </div>
  
        <Link to={'addEmployee'}>
            <button class="btn btn-sm btn-primary" >
                Add a new subordinate
            </button>
        </Link>
        <Table />
      </div>
    )
  }else{
    //using the hook to redirect to login page if manager information not found in current state
    useEffect(() =>{

      navigate('/managerLogin');
    })

    
  }

  
}

export default ManagerPage