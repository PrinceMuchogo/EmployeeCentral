import React from 'react'
import { LinkContainer,Link } from 'react-router-bootstrap';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const handleRedirect = () =>{

    navigate(-1);

  }
  return (
    <div>
       <Navbar className="navbar fixed-top navbar-dark bg-primary" expand="sm">
          <LinkContainer to='/'>
              <NavbarBrand >
                
                    <h6 style={{marginLeft: '40%'}}>EmployeeCentral</h6>
                
              </NavbarBrand>
          </LinkContainer>
          
          
          <button onClick={handleRedirect} class='btn btn-primary' style={{marginLeft: '70%'}}>Previous page</button>
          <NavbarToggle/>
       </Navbar>
    </div>
  )
}

export default Header