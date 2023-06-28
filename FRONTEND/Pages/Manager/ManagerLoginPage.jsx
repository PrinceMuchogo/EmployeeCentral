import React, { useEffect, useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../src/slices/managerApiSlice';
import { setCredentials } from '../../src/slices/managerAuthSlice';
import { toast } from 'react-toastify';

const ManagerLoginPage = () => {

  const [email, setEmail] = useState('');
  const [passwordHarsh, setPasswordHarsh] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, isLoading] = useLoginMutation();

  const {managerInfo} = useSelector((state) => state.managerAuth);

  useEffect(() =>{
    if(managerInfo){
      navigate('/manager')
    }
  }, [navigate. managerInfo]);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const res = await login({email, passwordHarsh}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/manager');
      toast.success('Welcome, fresh start (:', {
        style: {
          backgroundColor: '#1E40AF',
          color: '#fff',
          borderRadius: '2px',
        },
      });
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
            onChange={ (e) =>setEmail(e.target.value.trim())}></Form.Control>
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

export default ManagerLoginPage