import axios from 'axios';
import React, { useState } from 'react'

const AddManagerPage = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm('Adding new manager');

        if(confirmed){

            axios.post('http://localhost:5125/api/manager',{
                "Name": name,
                "PhoneNumber": phoneNumber,
                "Email": email,
                "Role": role,
                "Password": password,
                "Department": department,
                "Salary": salary
            })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
        };
    };

  return (
    <div style={{marginTop: '6%'}}>
        <h3 style={{ maxWidth: "500px", margin: "0 auto" }}>Add Manager</h3>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <form onSubmit={handleSubmitForm}>
                <div class="form-group">
                    <label for="name">
                        Name
                    </label>
                    <input 
                        type="text"  
                        class="form-control" 
                        id="task-name" 
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter manager name">
                    </input>
                </div>
                <div class="form-group">
                    <label for="phonenumber">
                        Phone Number
                    </label>
                    <input 
                        class="form-control" 
                        id="phone-number" 
                        required={true}
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
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
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
                        required={true}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter Manager's role">
                    </input>
                </div>
                <div class="form-group">
                    <label for="password">
                        Password
                    </label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value.trim())}
                        placeholder="Enter Password">
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
                        required={true}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Enter Department">
                    </input>
                </div>
                <div class="form-group" style={{marginTop: '3%'}}>
                    <label for="salary">
                        Salary
                    </label>
                    <input 
                        type="number" 
                        step={100} 
                        min={0} 
                        max={100000} 
                        class="form-control" 
                        id="salary" 
                        value={salary}
                        onChange={(e) => setSalary(e.target.value.trim())}
                        required={true}
                        placeholder="Enter Salary">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary">Add Manager</button>
            </form>
        </div>
    </div>
  )
}

export default AddManagerPage