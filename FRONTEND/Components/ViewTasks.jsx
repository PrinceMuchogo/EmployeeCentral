import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/view-tasks-component.css';

const ViewTasks = () => {

    const [Tasks, setTasks] = useState([]);
    const [TaskCount, setTask_Count] = useState(0);
    const employeeInfo = (JSON.parse(localStorage.getItem('employeeInfo')));
    const Id = employeeInfo.id;

    const [report, setReport] = useState('');

    useEffect(() =>{
        
        axios.get('http://localhost:5125/api/task',{
            params: {id: Id}
        })
        .then(res => {
            setTasks(res.data.tasks);
            setTask_Count(res.data.task_Count);
        })
        .catch(err => console.log(err))
    }, []); 


    const handleSubmitForm = async (e, taskId) =>{
        e.preventDefault();

        const confirmed = window.confirm('This information is important: Continue?');

        if(confirmed){
            axios.put('http://localhost:5125/api/task',{
            "Id": taskId,
            "Report": report
        })
        .then(res => {
            setReport(res.data.tasks);
            window.location.reload();
        });
        };
        
        
        console.log('handleSubmitForm')
    }

  return (
    <div>
        <h6>
            Assigned Tasks
        </h6>
        <div>
            {
                TaskCount == 0 ?
                <h6>No Tasks Assigned Yet</h6>
                :
                
                <h6>You Have {TaskCount} tasks assigned</h6>
            }
        </div>
        <div className='tasks'>
        {
            Tasks? 
            Tasks.map(task =>(
                
                <div class="card" >
        
                    <div class="card-body">
                    
                        <h6 class="card-title">
                            {task.taskName}
                        </h6>
                        <br></br>
                        <p class="card-text">
                            <h6>Description:</h6> {task.description}
                        </p>
                        <p class="card-text">
                        <h6>Duration:</h6> {task.duration}
                        </p>
                        {
                            task.score?  

                            <p></p>

                            :
                            
                            <p class="card-text">
                            
                            <h6>Note: Performance will be assessed!</h6>
                            </p>
                        }

                        {
                            task.report? 
                            
                                <p class="card-text">
                                    <h6>Report:</h6> {task.report}
                                </p>
                            
                                :
                                
                                <form onSubmit={(e) => handleSubmitForm(e, task.id)}>
                                    <div class="form-group" style={{textAlign:'center'}}>
                                        <label for="report">
                                            <h5>Task Detailed Report</h5>
                                        </label>
                                        <textarea 
                                            class="form-control" 
                                            id="report"
                                            value={report}
                                            onChange={(e) => setReport(e.target.value)}
                                            rows="3" 
                                            placeholder="Enter detailed report"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit Report</button>
                                </form>
                        }
                    </div>
        </div>
            ))
            
            : 
            <p>No Tasks Assigned yet</p>
        }
        </div>
    </div>
  )
}

export default ViewTasks