import React, { useState, useEffect } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../src/slices/employeeApiSlice';
import { setCredentials } from '../../src/slices/employeeAuthSlice';
import { toast } from 'react-toastify';


const EmployeeLoginPage = () => {

  const [email, setEmail] = useState('');
  const [passwordHarsh, setPasswordHarsh] =useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, isLoading] = useLoginMutation();

  const {employeeInfo} = useSelector((state) => state.employeeAuth);

  useEffect(() =>{
    if(employeeInfo){
      navigate('/employee')
    }
  }, [navigate, employeeInfo]);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const res = await login({email, passwordHarsh}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('employee');
      toast.success('Welcome, fresh start (:', {
        style: {
          backgroundColor: '#1E40AF',
          color: '#fff',
          borderRadius: '2px',
        },
      })
    } catch (err) {
      toast.success(err.data, {
        style: {
          backgroundColor: '#1E40AF',
          color: '#fff',
          borderRadius: '2px',
        },
      });
    }
  };


  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '70vh', width: '60vh'}} >
    <div className='border p-4 rounded'>
      <h5>Sign in to EmployeeCentral</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label style={{marginTop: '3%'}}>Email address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='Enter email' 
            value = {email}
            onChange={ (e) =>setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' style={{marginTop: '3%'}}>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter Password' 
            value = {passwordHarsh}
            onChange={ (e) => setPasswordHarsh(e.target.value)}></Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit' block = 'true' className='mt-3'>
          Sign in
        </Button>
      </Form>
    </div>
  </Container>
  )
}

export default EmployeeLoginPage