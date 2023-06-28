import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ViewMyLeaveRequestsPage = () => {

    const [LeaveRequests, setLeaveRequests] = useState([]);
    const [leaveRequest_count, setleaveRequest_count] = useState(0);
    const navigate = useNavigate();
    const employeeInfo = JSON.parse(localStorage.getItem('employeeInfo'));
    const employeeId = employeeInfo.id;

    useEffect(() =>{

        axios.get('http://localhost:5125/api/leaveRequest',{
            params: {employeeId: employeeId}
        }).then((res => {
            setLeaveRequests(res.data.leaveRequests);
            console.log(res);
            setleaveRequest_count(res.data.count);
        }))
            .catch(err => console.log(err))
    }, []);

    const handleDeleteRequest = async (e, id) =>{

        const confirmed = window.confirm('Are you sure you want to delete this leave request?');

        if(confirmed){
            axios.delete('http://localhost:5125/api/leaveRequest',{
            data:  {id: id}
        })
        .then(res => {
            console.log(res);
            toast.success('Deleted successfully', {
                style: {
                  backgroundColor: '#1E40AF',
                  color: '#fff',
                  borderRadius: '2px',
                },
              });
            window.location.reload();})
        .catch(err =>{ 
            console.log(err);
            toast.error(err.data, {
                style: {
                  backgroundColor: '#1E40AF',
                  color: '#fff',
                  borderRadius: '2px',
                },
              })
        })
        };

        
       // console.log(id);
        console.log('handleDeleteRequest');
    }
   

  return (
    <div style={{marginTop:'6%', marginLeft:'2%', marginRight: '2%'}}>
        <h5>View Leave Requests</h5>
        <div className='requests'>
            {leaveRequest_count !=0 ?

                LeaveRequests.map(leaveRequest => (

                    <div class="card" style={{width: '18rem'}}>
                        <div class="card-body">
                            <h5 class="card-title">
                                {leaveRequest.leaveType}
                            </h5>
                            <p class="card-text">
                                <h6>Start Date:  {leaveRequest.startDate}</h6>
                            </p>
                            <p class="card-text">
                                <h6>End Date: {leaveRequest.endDate}</h6>
                            </p>
                            <p class="card-text">
                                <h5>Status:</h5> <h6>{leaveRequest.status}</h6>
                            </p>
                            <p class="card-text">
                                Click delete to remove request!
                            </p>
                            <div>
                                <button onClick={(e) => handleDeleteRequest(e,leaveRequest.id)} class="btn btn-sm btn-primary" style={{width: '100%'}}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                
                :
                <h6>No leave requests to display</h6>
            }
        </div>
        
    </div>
  )
}

export default ViewMyLeaveRequestsPage