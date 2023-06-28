import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const AssignTask = () => {

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDuration, setTaskDuration] = useState('');
    const location = useLocation();
    const employeeId = location.state.employeeId;
    const employeeName = location.state.employeeName;

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm(`Assigning Task to ${employeeName}`);

        if(confirmed){
            axios.post('http://localhost:5125/api/task',{
                "TaskName": taskName,
                "Description": taskDescription,
                "Duration": taskDuration,
                "EmployeeId": employeeId
            })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
        }
        
        console.log('handleSubmitForm');
    }
    
  return (
    <div style={{marginTop: '6%'}}>
        <h3 style={{ maxWidth: "500px", margin: "0 auto" }}>
            Assign Task
        </h3>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <form onSubmit={(e) => handleSubmitForm(e)}>
                <div class="form-group">
                    <label for="task-name">
                        Task Name
                    </label>
                    <input 
                        type="text"  
                        class="form-control" 
                        id="task-name" 
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value.trim())}
                        required= {true}
                        placeholder="Enter task name">
                    </input>
                </div>
                <div class="form-group">
                    <label for="task-description">
                        Task Description
                    </label>
                    <textarea 
                        class="form-control" 
                        id="task-description" 
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value.trim())}
                        required={true}
                        rows="3" placeholder="Enter task description">
                    </textarea>
                </div>
                <div class="form-group">
                    <label for="duration">
                        Due on
                    </label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="duration" 
                        value={taskDuration}
                        required={true}
                        onChange={(e) => setTaskDuration(e.target.value.trim())}
                        placeholder="Enter duration">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary">Assign</button>
            </form>
        </div>
    </div>
  );
}

export default AssignTask