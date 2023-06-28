import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewMyProfilePage = () => {

    const location = useLocation();
    const user = location.state.user;

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
                                <h6>Email: </h6>{user.email}
                            </p>
                            <p class="card-text">
                                <h6>Password:</h6> {user.password}
                            </p>
                        </div>
                    </div>
                
        </div>
        
    </div>
  )
}

export default ViewMyProfilePage