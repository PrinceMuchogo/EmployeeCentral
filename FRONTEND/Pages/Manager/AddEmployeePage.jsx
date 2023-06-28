import axios from 'axios';
import React, { useState } from 'react'

const AddEmployeePage = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
    const managerId = managerInfo.id;

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm('Continuing to save new employee?');

        if(confirmed){

            axios.post('http://localhost:5125/api/employee',{
                "Name": name,
                "PhoneNumber": phoneNumber,
                "Email": email,
                "PasswordHarsh": password,
                "Role": role,
                "Salary": salary,
                "Department": department,
                "ManagerId": managerId
            })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
        };
    }

  return (
    <div style={{marginTop: '6%'}}>
        <h3 style={{ maxWidth: "500px", margin: "0 auto" }}>
            Add Employee
        </h3>
        <div style={{ maxWidth: "500px", margin: "0 auto", marginTop: '2%' }}>
            <form onSubmit={(e) => handleSubmitForm(e)} >
                <div class="form-group">
                    <label for="name">
                        Fullname
                    </label>
                    <input 
                        type="text" 
                        rows="3" 
                        class="form-control" 
                        id="name" 
                        value={name}
                        required={true}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name">
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
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        rows="3" 
                        required={true}
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        id="role" rows="3" 
                        value={role}
                        required={true}
                        onChange={(e) => setRole(e.target.value)}
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
                        required={true}
                        onChange={(e) => setPassword(e.target.value)} 
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
                        required={true}
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
                        required={true} 
                        onChange={(e) => setSalary(e.target.value)}
                        rows="3" 
                        placeholder="Enter salary">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary">Add Employee</button>
            </form>
        </div>
    </div>
  )
}

export default AddEmployeePage