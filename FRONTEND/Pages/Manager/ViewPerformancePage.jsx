import {React, useEffect, useState} from 'react'
import ViewEmployeeInformationPage from '../Employee/ViewEmployeeInformationPage';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewPerformancePage = () => {

    //hook to use functional component props from the parent component
    const location = useLocation();

    //collecting variables from the parent component
    const employeeName = location.state.employeeName;
    const employeeId = location.state.employeeId;
    const employeePerformance = location.state.employeePerformance;
    const employeeDepartment = location.state.employeeDepartment;
    const employeePosition = location.state.employeePosition;
    console.log(employeeName);

    //using hook for state management
    const [position , setPosition] = useState(employeePosition);
    const [makeDecision, setMakeDecision] = useState(false) 
    const navigate = useNavigate();
    

    const handlePromote = () =>{

        setMakeDecision(!makeDecision);
        console.log('Promoted!');
    };

    const handleSubmitForm = async (e) =>{
        e.preventDefault();

        const confirmed = window.confirm(`Giving ${employeeName} ${position} position`);

        if(confirmed && (position != employeePosition)){

            axios.put('http://localhost:5125/api/employee',{
                "Id": employeeId,
                "Role": position
            })
            .then(res =>{
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
        }else{
            alert('positions are the same!');
            window.location.reload();
        };
    };


  return (
    <div style={{marginTop: '6%', marginLeft:'30%'}}>
        <h3>View Performance</h3>

        <div class="card" style={{width: '50%'}}>
            <div class="card-body">
                <h5 class="card-title">
                     {employeeName}
                </h5>
                <p class="card-text">
                    Department: {employeeDepartment}
                </p>
                <p class="card-text">
                    Position: {position}
                </p>
                {
                    employeePerformance? 
                        <div>
                            <p class="card-text">
                                Performance: {employeePerformance}
                            </p>
                            
                            <p class="card-text">
                                The performance was measured using a total score of 5 for each assigned task.<br></br>
                                A score was graded for each employee based on task complexity, skill level and personal behaviour
                            </p>
                            <br></br>
                            <button  className='btn btn-warning' onClick={handlePromote} style={{marginRight: '5%'}}>
                                Change Position
                            </button>
                            
                            {
                                makeDecision&& (
                                    <div>
                                        <br></br>
                                        <form onSubmit={(e) => handleSubmitForm(e)}>
                                            <div className="form-group" style={{marginBottom: '2%'}}>
                                                <label for="new-position" style={{marginBottom: '2%'}}>
                                                    New Position
                                                </label>
                                                <input
                                                    className="form-control" 
                                                    id="new-position"
                                                    rows="3"
                                                    required={true}
                                                    value={position}
                                                    onChange={(e) => setPosition(e.target.value.trim())}
                                                    placeholder="Enter new positon"></input>
                                            </div >
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                    
                                )
                            }
                            </div>

                            :

                        <p>No tasks submitted!</p>
                    
                }

               
            
            </div>
        </div>
    </div>
  )
}

export default ViewPerformancePage