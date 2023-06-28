import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const UpdateManagerProfilePage = () => {

    //collecting manager information from the parent component using hook
    const location = useLocation();
    const managerId = location.state.managerId;
    const managerName = location.state.managerName;
    const managerSalary = location.state.managerSalary;

    //using hook to manage the state of form values before sending http request
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState(0);

    //arrow function to handle the form submit and send an http put request using axios
    const handleSubmitForm = async(e) =>{

        //using the method to prevent default behaviour of the event
        e.preventDefault();
        
        //confirming the change
        const confirmed = window.confirm(`Updating ${managerName}'s profile`);

        if(confirmed){

            axios
                .put('http://localhost:5125/api/manager',{
                "Id": managerId,
                "Name": name != '' ? name : null,
                "PhoneNumber": phoneNumber != '' ? phoneNumber : null,
                "Email": email != '' ? email : null,
                "Role": role != '' ? role : null,
                "Password": password != '' ? password : null,
                "Department": department != '' ? department : null,
                "Salary": salary > 0 ? salary : managerSalary
                })

                .then(res =>{
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => console.log(err));
        };
    };

  return (
    <div style={{marginTop: '6%'}}>
        <h3 style={{ maxWidth: "500px", margin: "0 auto" }}>
            Update {managerName} Records
        </h3>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <form onSubmit={(e) =>handleSubmitForm(e)} >
                <div class="form-group">
                    <label for="task-name">
                        Name
                    </label>
                    <input 
                        type="text" 
                        rows="3" 
                        class="form-control" 
                        id="task-name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter task name">
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
                        onChange={(e) => setRole(e.target.value)}
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
                        onChange={(e) => setDepartment(e.target.value)}
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
                        placeholder="Enter salary">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary">Update records</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateManagerProfilePage