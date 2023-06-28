import React from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';
import '../styles/landingPage.css';

const LandingPage = () => {
  return (
    <div className='landing'>
        <Container style={{marginTop: '1%', marginLeft: '35%',  maxWidth: '50%',height:'10cm', padding:'10%'}}>
            <h6>How do you want to login?</h6>

            <div>
                <div style={{marginBottom: '3%'}}>
                    <LinkContainer to='/adminLogin'>
                        <button className='btn btn-warning'  >
                            Administrator
                        </button>
                    </LinkContainer>
                </div>
                <div style={{marginBottom: '3%'}}>
                    <LinkContainer to='/managerLogin'>
                        <button className='btn btn-primary' >
                            Manager  
                        </button>
                    </LinkContainer>
                </div>
                <div>
                    <LinkContainer to='/employeeLogin'>
                        <button className='btn btn-primary'>
                            Subordinate
                        </button>
                    </LinkContainer>
                </div> 
            </div>
            
        </Container>
        
    </div>
  )
}

export default LandingPage