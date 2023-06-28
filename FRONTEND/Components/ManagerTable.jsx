import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ManagerTable = () => {

    const navigate = useNavigate();
    const [managers, setManagers] = useState([]);

    useEffect(() =>{

        axios
            .get('http://localhost:5125/api/manager/managers')
            .then(res => {
                setManagers(res.data.managers);
            })
            .catch(err => console.log(err));

    }, []);

    const handleDeleteEvent = async(e, Id, name) =>{
        
        //method to prevent default behaviour
        e.preventDefault();

        //confirming the deletion
        const confirmed = window.confirm(`Deleting ${name} from the records`);

        //deleting the record after confirmation 
        if(confirmed){

            //using axios to send the delete request
            axios
                .delete('http://localhost:5125/api/manager',{
                    data: {id: Id}
                })
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        };
    };
 
    //method to handle the update profile event and navigates to the update manager profile page using the nnavigate hook
    const handleUpdateProfile = (Id, name, salary) =>{

        navigate('updateManagerProfile',{
            state: {
                managerId: Id,
                managerName: name,
                managerSalary: salary
            }
        });
        console.log('handleUpdateProfile');
    };

    // method to handle view subordinates and navigates to the apge using the hook
    const handleViewSubordinates = (subordinates, name) =>{

        navigate('viewEmployees',{
            state: {
                managerSubordinates: subordinates,
                managerName: name
            }
        });
    }
    
  return (
    <div>
        <h6 style={{textAlign: 'center', paddingBottom: '20px'}}>Managers Information</h6>
        <div className='table-responsive'>
            <table class="table table-striped table-bordered table-hover"  style={{width: '50%'}}>
                <thead style={{textAlign: 'center'}}>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th colSpan={4}>More Information</th>
                </thead>
                <tbody style={{textAlign: 'center'}}>

                {
                    managers!=[] &&
                    managers.map((manager) =>(
                        <tr style={{height: '2vh'}}>
                            <td>{manager.name}</td>
                            <td>{manager.phoneNumber}</td>
                            <td>{manager.email}</td>
                            <td>{manager.salary}</td>
                            <td>{manager.role}</td>
                            <td>{manager.department}</td>
                            <td>
                                
                                    <button onClick={() => handleUpdateProfile(manager.id, manager.name, manager.salary)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                        Update Profile
                                    </button>
                                
                            </td>
                            <td>
                                    <button onClick={(e) => handleDeleteEvent(e,manager.id, manager.name)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                        Delete
                                    </button>
                            </td>
                            <td>
                                    <button onClick={() =>handleViewSubordinates(manager.employees, manager.name)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                        View Subordinates
                                    </button>
                            </td>
                        </tr>
                    )) 
                    
                }
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ManagerTable