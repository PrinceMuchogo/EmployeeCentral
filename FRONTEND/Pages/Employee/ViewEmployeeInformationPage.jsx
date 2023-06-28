import axios from 'axios';
import {React, useState} from 'react'

const ViewEmployeeInformationPage = () => {

    const handleDeleteEvent = async (e) =>{
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete');

        


        console.log('handleDeleteTask');
    }

  return (
    <div>
        

        <div className="card" style={{width: 'justify'}}>
            <div className="card-body">
                <h5 className="card-title">
                    Name:
                </h5>
                <p className="card-text">
                    Department:
                </p>
                <p className="card-text">
                    Performance:
                </p>
                
                <div>
                    <button onClick={(e) =>handleDeleteEvent(e)} className="btn btn-primary">
                        Delete Employee
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEmployeeInformationPage