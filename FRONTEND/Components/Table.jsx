import axios from 'axios';
import {React , useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Table = () => {

    const [employees, setEmployees] = useState([]);
    const [count, setCount] = useState(0);
    const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
    const managerId = managerInfo.id;
    const managerName = managerInfo.name;
    const navigate = useNavigate();
    console.log(employees);

    const handleViewLeaveRequest = (Id, name) =>{

        navigate(
            'viewLeaveRequests',
            {state: {
                employeeId: Id,
                employeeName: name
            }}
        );
    };

    const handleViewPerformance =  (Id, name, performance, department, role) =>{
        navigate(
            'viewEmployeePerformance',
            {state: {
                employeeId: Id,
                employeeName: name,
                employeePerformance: performance,
                employeeDepartment: department ,
                employeePosition : role
            }}
        );
    };

    const handleAssignTask = (Id, name) =>{
        navigate(
            'assignTask',
            {state: {
                employeeId: Id,
                employeeName: name
            }}
        );
    };

    const handleViewTasks = async (Id, name) =>{
        navigate(
            'viewEmployeeTasks',
            {state: {
                employeeId: Id,
                employeeName: name
            }}
        );
    };

    const handleUpdateEmployee = (Id, name, salary) =>{
        navigate(
            'updateEmployeeProfile',
            {state: {employeeId: Id,
                     employeeName: name,
                     empoyeeSalary: salary}}
        );
    }

    useEffect(() =>{

        axios.get('http://localhost:5125/api/manager/subordinates',{
            params: {managerId: managerId}
        })
        .then(res => {
            setEmployees(res.data.subordinates);
            setCount(res.data.subordinates_Count);
        })
        .catch(err => console.log(err))

    }, []);

    const handleDeleteEvent = async (e, Id, name) =>{
        e.preventDefault();

        const confirmed = window.confirm(`Are you sure you want to delete ${name}`);

        if(confirmed){

            axios.delete('http://localhost:5125/api/employee',{
                data: {"Id": Id}
            })
            .then(res =>{ 
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
        };
        console.log('handleDeletEvent');
    };
    
  return (
    <div>

        {
            employees?
            <div>
            <h6 style={{textAlign: 'center', paddingBottom: '20px'}}>Subordinates Information</h6>
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
                        
                        employees.map((employee) =>(
                            
                            <tr style={{height: '2vh'}}>
                                <td>{employee.name}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.email}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.role}</td>
                                <td>{employee.department}</td>
                                <td>
                                    
                                        <button onClick={() => handleUpdateEmployee(employee.id, employee.name,employee.salary)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            Update Profile
                                        </button>
                                    
                                </td>
                                <td>
                                        <button onClick={(e) => handleDeleteEvent(e, employee.id, employee.name)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            Delete
                                        </button>
                                </td>
                                <td>
                                        <button onClick={() => handleAssignTask(employee.id, employee.name)}  class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            Assign Task
                                        </button>
                                </td>
                                <td>
                                        <button onClick={() => handleViewTasks(employee.id, employee.name)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            View Tasks
                                        </button>
                                </td>
                                <td>
                                        <button onClick={() => handleViewPerformance(employee.id, employee.name, employee.performance, employee.department, employee.role)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            View Performance
                                        </button>
                                </td>
                                <td>
                                        <button onClick={() => handleViewLeaveRequest(employee.id, employee.name)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                            View leave requests
                                        </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
        :
        <p>No Subordinates. Contact your supervisor immediately</p>
        }
        
    </div>
  )
}

export default Table