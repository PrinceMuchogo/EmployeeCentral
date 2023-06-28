import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagerViewLeaveRequestsPage = () => {

    const location = useLocation();
    const employeeId = location.state.employeeId;
    const employeeName = location.state.employeeName;

    const [edit, setEdit] = useState(false);
    const [LeaveRequests, setLeaveRequests] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() =>{

        axios
            .get('http://localhost:5125/api/leaveRequest',{
                params: {Id: employeeId}
            })
            .then(res =>{
                setLeaveRequests(res.data.leaveRequests);
            })
            .catch(err => console.log(err));
    });

    const handleUpdateRequest = ()=>{
        
            setEdit(!edit);
        
    };

    const handleDeleteRequest = (e, Id) =>{
        e.preventDefault();

        const confirmed = window.confirm('Deleting leave request');

        if(confirmed){

            axios
                .delete('http://localhost:5125/api/leaveRequest',
                {
                    data: {"Id": Id}
                })
                .then(res =>{
                    console.log(res);
                    window.location.reload();
                    toast.success('Deleted successfully', {
                        style: {
                          backgroundColor: '#1E40AF',
                          color: '#fff',
                          borderRadius: '2px',
                        },
                      })
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.data, {
                        style: {
                          backgroundColor: '#1E40AF',
                          color: '#fff',
                          borderRadius: '2px',
                        },
                      })
                });
        };
    };

    const handleSubmitForm = async (e, Id) =>{

        e.preventDefault();

        const confirmed = window.confirm(`Sending leave request status to ${employeeName}`);

        if(confirmed){

            axios
                .put(
                    'http://localhost:5125/api/leaveRequest',
                    {
                        "Id": Id,
                        "Status": status != '' ? status.trim() : null
                    })
                .then(res =>{
                    console.log(res);
                    window.location.reload();
                    toast.success('Status send successfully', {
                        style: {
                          backgroundColor: '#1E40AF',
                          color: '#fff',
                          borderRadius: '2px',
                        },
                      });
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.data, {
                        style: {
                          backgroundColor: '#1E40AF',
                          color: '#fff',
                          borderRadius: '2px',
                        },
                      });
                });
        };


        console.log('handleSubmitForm');
    };

  return (
    <div style={{margin: '6%'}}>
        <h5>View Leave Requests</h5>

        {
            LeaveRequests != null && 
                LeaveRequests.map((leaveRequest) =>(

                    <div class="card" style={{width: '18rem'}}>
                        <div class="card-body">
                            <h6 class="card-title">
                                Leave Type: {leaveRequest.leaveType}
                            </h6>
                            <p class="card-text">
                                Start Date: {leaveRequest.startDate}
                            </p>
                            <p class="card-text">
                                End Date: {leaveRequest.endDate}
                            </p>
                            <p class="card-text">
                                Click update to approve or decline!
                            </p>
                            <div style={{margin: '3%'}}>
                                <button onClick={handleUpdateRequest} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                    Update Request
                                </button>
                            </div>
                            <div style={{margin: '3%'}}>
                                <button onClick={(e) => handleDeleteRequest(e, leaveRequest.id)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                    Delete
                                </button>
                            </div>
                            {
                                edit && <form onSubmit={(e) =>handleSubmitForm(e, leaveRequest.id)}>
                                <div class="form-group">
                                    <label for="status">
                                        Status
                                    </label>
                                    <input 
                                        class="form-control" 
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required={true}
                                        rows="3" 
                                        placeholder="Enter status"></input>
                                </div>
                                <button type="submit" class="btn btn-primary">Update Request</button>
                            </form>
                            }
                        </div>
                    </div>
                ))
        }
        
    </div>
  )
}

export default ManagerViewLeaveRequestsPage