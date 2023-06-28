import axios from 'axios';
import {React, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';


const ViewEmployeeTasks = () => {

    const [edit, setEdit] = useState(false);
    const [Tasks, setTasks] = useState([]);
    const location = useLocation();
    const [score, setScore] = useState();
    const employeeId = location.state.employeeId;
    const employeeName = location.state.employeeName;
    console.log(employeeId);

    useEffect(() =>{

        axios.get('http://localhost:5125/api/task',{
            params: { id: employeeId}
        })
        .then(res => {
            setTasks(res.data.tasks);
        })
        .catch(err => console.log(err));
    }, []);

    const handleAwardScore = ()=>{
        setEdit(!edit);
    };

    const handleDeleteTask = async (e, Id) =>{
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete this task');

        if(confirmed){

            axios.delete('http://localhost:5125/api/task',{
                data: {"Id": Id}
            })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
        };

        console.log('handleDeleteTask');
    }

    const handleSubmitForm = (e, Id) =>{
        e.preventDefault();
        const confirmed = window.confirm('Continue with the assigned score?');

        if(confirmed){
            axios.put('http://localhost:5125/api/task',{
                "Id": Id,
                "Score": score
            })
            .then(res =>{
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
        };
        console.log('handleSubmitForm');
    };

  return (
    <div style={{marginTop: '6%'}}>
        <h3>View {employeeName} Tasks</h3>

        {
            Tasks? 
            Tasks.map((Task) =>(
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">
                            {Task.taskName}
                        </h5>
                        <p className="card-text">
                            <h6>Description:</h6> {Task.description}
                        </p>
                        <p className="card-text">
                            <h6>Due on</h6>{Task.duration}
                        </p>
                        {
                            Task.score>0 && (
                                <p className="card-text">
                                    <h6>Score:</h6>{Task.score}
                                </p>
                            )
                        }
                        {
                            Task.report && (
                                <p className="card-text">
                                    <h6>Report</h6>{Task.report}
                                </p>
                            )
                        }
                        
                        <div>
                            <button onClick={handleAwardScore} className="btn btn-primary">
                                Award score
                            </button>
                        
                            <button onClick={(e) =>handleDeleteTask(e, Task.id)} className="btn btn-primary">
                                Delete Task
                            </button>
                        </div>
                        <div>
                        {
                            edit && (<form onSubmit={(e) => handleSubmitForm(e, Task.id)}>
                            <div className="form-group">
                                <label for="report">
                                    Score
                                </label>
                                <input
                                    className="form-control" 
                                    id="report"
                                    rows="3"
                                    required={true}
                                    value={score}
                                    onChange={(e) => setScore(e.target.value.trim())}
                                    placeholder="Enter value scored"></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Report</button>
                        </form>)
                        }
                        </div>
                    </div>
                </div>
            ))
            

        :
        <div>
            <p>No tasks assigned yet</p>
        </div>
        
        }
    
    

        
    </div>
  )
}

export default ViewEmployeeTasks