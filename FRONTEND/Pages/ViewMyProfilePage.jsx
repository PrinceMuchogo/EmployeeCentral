import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewMyProfilePage = () => {

    const location = useLocation();
    const user = location.state.user;

    const handleMessage = () =>{
        console.log('handleMessage');
    }
  return (
    <div style={{marginTop:'6%', marginLeft:'2%', marginRight: '2%'}}>
        <h5>My Profile</h5>
        <div className='requests'>
            

                    <div class="card" style={{width: '50%', marginLeft: '20%'}}>
                        <div class="card-body">
                            <h5 class="card-title">
                                {user.name}
                            </h5>
                            <p class="card-text">
                                <h6>Phone number:  </h6>{user.phoneNumber}
                            </p>
                            <p class="card-text">
                                <h6>Email: </h6>{user.email}
                            </p>
                            <p class="card-text">
                                <h6>Password:</h6> {user.password}
                            </p>
                            <p class="card-text">
                                <h6>Department:</h6> {user.department}
                            </p>
                            <p class="card-text">
                                <h6>Position:</h6>{user.role}
                            </p>
                            <p class="card-text">
                                <h5>Salary:</h5> US${user.salary}.00
                            </p>
                            <p class="card-text">
                                <h6>Hire date:</h6> {user.hireDate}
                            </p>
                            <p class="card-text">
                                <h6>Manager:</h6> {user.manager.name}
                            </p>
                            <div>
                                <button onClick={handleMessage} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                    Message my manager
                                </button>
                            </div>
                        </div>
                    </div>
                
        </div>
        
    </div>
  )
}

export default ViewMyProfilePage