import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ViewEmployeesPage = () => {

    const location = useLocation();
    const managerSubordinates = location.state.managerSubordinates;
	const managerName = location.state.managerName;

    console.log(managerSubordinates);
    const navigate = useNavigate();

    const handleViewPerformance = (id, name, performance, department, role) =>{
		
        navigate(
			'viewEmployeePerformance',
			{
				state: {
					employeeId: id,
					employeeName: name,
					employeePerformance: performance,
					employeeDepartment: department,
					employeePosition: role
				}
			}
		);
    };

	const handleUpdateEmployee = (Id, name, salary) =>{

		navigate(
			'updateEmployeeProfile',
			{
			state: {
				employeeId: Id,
				employeeName: name,
				employeeSalary: salary
			}
		});
	};

    const handleDeleteEvent = async (e, Id, name) =>{

		//method to prevent the default behaviour of the event
		e.preventDefault();

		//confirming to proceed with deletion
		const confirmed = window.confirm(`Deleting ${name} from the records`)

		//sending the delete request after confirmation
		if(confirmed){

			//using axios to make http request to delete record
			axios
				.delete('http://localhost:5125/api/employee',
				{
					data: {"Id": Id}
				})
				.then(res =>{
					console.log(res);
					window.location.reload();
				})
				.catch(err => console.log(err));
		};
    };
    
  return (
    <div style={{margin: '5%'}}>
        <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>{managerName} Subordinates Information</h4>
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
					managerSubordinates != [] && (
						managerSubordinates.map((subordinate) =>(
							<tr style={{height: '2vh'}}>
								<td>{subordinate.name}</td>
								<td>{subordinate.phoneNumber}</td>
								<td>{subordinate.email}</td>
								<td>{subordinate.salary}</td>
								<td>{subordinate.role}</td>
								<td>{subordinate.department}</td>
								<td>
									
										<button onClick={() => 
													handleUpdateEmployee(subordinate.id,subordinate.name, subordinate.salary)} 
												class="btn btn-sm btn-primary" 
												style={{width: '100%'}}
										>
											Edit
										</button>
								
								</td>
								<td>
										<button 
											onClick={(e) => 
												handleDeleteEvent(e, subordinate.id, subordinate.name)} 
											class="btn btn-sm btn-primary" 
											style={{width: '100%'}}
										>
											Delete
										</button>
								</td>
								
								<td>
									
										<button onClick={() => 
													handleViewPerformance(subordinate.id, subordinate.name, subordinate.performance, subordinate.department, subordinate.role)} 
												class="btn btn-sm btn-primary" 
												style={{width: '100%'}}
										>
											View Performance
										</button>
									
								</td>
							</tr>
						))
					)
				}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ViewEmployeesPage