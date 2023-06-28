import {React, useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log('handleSubmit')
    }
          
  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: '70vh', width: '60vh'}} >
      <div className='border p-4 rounded'>
        <h3>Sign in to STAFFPro</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder='Enter email' 
              value = {email}
              onChange={ (e) =>setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
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
        <br></br>
        <p>New to STAFFPro? Contact your manager and get registered</p>
      </div>
    </Container>
  )
}

export default LoginForm