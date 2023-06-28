import React from 'react'
import { LinkContainer,Link } from 'react-router-bootstrap';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { useSelector } from 'react-redux';

const AdminLoginHeader = () => {

  //using the hook to extract user information from redux current state objects
  const {adminInfo} = useSelector((state) => state.adminAuth);
  return (
    <div>
       <Navbar className="navbar fixed-top navbar-dark bg-primary" expand="sm">
			<LinkContainer to='/'>
				<NavbarBrand >
					
							<h6 style={{marginLeft: '40%'}}>EmployeeCentral</h6>
					
				</NavbarBrand>
                <Nav.Link>
                
                </Nav.Link>
			</LinkContainer>
		  <NavbarToggle/>
          {

          }
            
       
       </Navbar>
    </div>
  )
}

export default AdminLoginHeader