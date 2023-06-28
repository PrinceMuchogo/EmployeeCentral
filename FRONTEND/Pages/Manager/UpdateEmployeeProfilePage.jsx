import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const UpdateEmployeeProfilePage = () => {

    //using hook to manage the state of form data input
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState(0);

    //using location hook to collect employee information from parent component
    const location = useLocation();
    const employeeId =location.state.employeeId;
    const employeeName = location.state.employeeName;
    const employeeSalary = location.state.employeeSalary;

    //arrow function to handle the form submit and send an http put request using axios
    const handleSubmitForm = async (e) =>{

        //preventing the default behaviour of triggering the event
        e.preventDefault();

        //confirming the change
        const confirmed = window.confirm('Continuing with the profile update?');

        //sending a http put request after confirmation
        if(confirmed){

            //using axios to send a http put request to the server
            axios.put('http://localhost:5125/api/employee',{
            "Id": employeeId,
            "Name": name!=''? name:null,
            "PhoneNumber": phoneNumber!=''? phoneNumber:null,
            "Email": email!=''? email:null,
            "Role": role!=''? role:null,
            "Password": password!=''?password:null,
            "Department": department!=''?department:null,
            "Salary": salary>0?salary: employeeSalary
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        
        })
        .catch(err => console.log(err))
        };

        
        
    };

  return (
    <div style={{marginTop: '6%'}}>
        <h4 style={{ maxWidth: "500px", margin: "auto" }}>
            Update {employeeName} Records
        </h4>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <form onSubmit={(e) =>handleSubmitForm(e)} >
                <div class="form-group">
                    <label for="name">
                        Name
                    </label>
                    <input 
                        type="text" 
                        rows="3" 
                        class="form-control" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value.trim())} 
                        placeholder="Enter Full name">
                    </input>
                </div>
                <div class="form-group">
                    <label for="phonenumber">
                        Phone Number
                    </label>
                    <input 
                        class="form-control" 
                        id="phone-number" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.trim())}
                        rows="3" 
                        placeholder="Enter phone number">
                    </input>
                </div>
                <div class="form-group">
                    <label for="email">
                        Email
                    </label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        rows="3" 
                        placeholder="Enter email">
                    </input>
                </div>
                <div class="form-group">
                    <label for="role">
                        Role
                    </label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="role" 
                        value={role}
                        onChange={(e) => setRole(e.target.value.trim())}
                        rows="3" 
                        placeholder="Enter role">
                    </input>
                </div>
                <div class="form-group">
                    <label for="password">
                        Password
                    </label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())} 
                        rows="3" 
                        placeholder="Enter password">
                    </input>
                </div>
                <div class="form-group">
                    <label for="dept">
                        Department
                    </label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="dept" 
                        value={department}
                        onChange={(e) => setDepartment(e.target.value.trim())}
                        rows="3" 
                        placeholder="Enter department">
                    </input>
                </div>
                <div class="form-group">
                    <label for="salary">
                        Salary
                    </label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value.trim())} 
                        rows="3" 
                        placeholder="Enter salary"></input>
                </div>
                <button type="submit" class="btn btn-primary">Update records</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateEmployeeProfilePage