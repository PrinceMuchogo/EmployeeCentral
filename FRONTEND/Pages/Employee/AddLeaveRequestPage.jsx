import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeaveRequest = () => {

    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [response, setResponse] =useState('');
    const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
    const Id = employeeInfo.id;
    const navigate = useNavigate();

    const handleSubmitForm = async (e) =>{

        e.preventDefault();

        const confirmed = window.confirm('Send leave request?');

        if(confirmed){
            axios.post('http://localhost:5125/api/leaveRequest',{
            "LeaveType": leaveType,
            "StartDate": startDate,
            "EndDate": endDate,
            "EmployeeId": Id
        })
        .then(res => setResponse(res));
        navigate('/employee');
        };
    };

  return (
    <div style={{marginTop: '10%'}}>
        <h3 style={{ maxWidth: "500px", margin: "0 auto"}}>
            Send Leave Request
        </h3>
        <div style={{ maxWidth: "500px", margin: "0 auto", marginTop: '2%'}}>
            <form onSubmit={(e) =>handleSubmitForm(e)}>
                <div class="form-group">
                    <label for="leaveType">
                        Leave Type
                    </label>
                    <input 
                        type="text"  
                        class="form-control" 
                        id="leaveType" 
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        placeholder="Enter leave type">
                    </input>
                </div>
                <div class="form-group">
                    <label for="start-date">
                        Start Date
                    </label>
                    <input 
                        type='date' 
                        class="form-control" 
                        id="task-description" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        rows="3" 
                        placeholder="Enter start date">
                    </input>
                </div>
                <div class="form-group">
                    <label for="end-date">
                        End Date
                    </label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="end-date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Enter end date">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary">SEND</button>
            </form>
        </div>
    </div>
  )
}

export default AddLeaveRequest