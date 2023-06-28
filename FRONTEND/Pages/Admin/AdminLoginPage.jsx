import {React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {Container, Form, Button} from 'react-bootstrap';
import { useLoginMutation } from '../../src/slices/adminApiSlice';
import { setCredentials } from '../../src/slices/adminAuthSlice';
import { toast } from 'react-toastify';

const AdminLoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const {adminInfo} = useSelector((state) => state.adminAuth);

  useEffect(() =>{
    if(adminInfo){
      navigate('/admin')
    }
  }, [navigate, adminInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await login({ email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/admin');
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
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '70vh', width: '80vh'}} >
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

          <Form.Group controlId='password' style={{marginTop: '5%'}}>
            <Form.Label  >Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Enter Password' 
              value = {password}
              onChange={ (e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit' block = 'true' className='mt-3'>
            Sign in
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default AdminLoginPage