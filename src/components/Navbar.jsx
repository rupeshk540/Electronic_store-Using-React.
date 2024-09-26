import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const  CustomNavbar=()=>{

  const userContext = useContext(UserContext)

  const doLogout=()=>{
    userContext.logout()
  }

    return(
        <Navbar collapseOnSelect data-bs-theme="dark" className="bg-body-tertiary" >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src="/assets/logo.png" alt="logo" height={25} width={25}/>
            <span className='ms-1 mt-1'>ElectroStore</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link as={NavLink} to="/services">Features</Nav.Link>

              <NavDropdown title="Categories" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Branded Phones</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Smart TVs
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Laptop</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  More
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link  as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link  as={NavLink} to="/contact">Contact Us</Nav.Link>
            
            </Nav>

            <Nav>

              <Nav.Link  as={NavLink} to="/store">Store</Nav.Link>
              <Nav.Link  as={NavLink} to="/cart">Cart( 20 )</Nav.Link>
              

              {
                (userContext.isLogin)?(
                <>
                    ({userContext.isAdminUser && (
                      <>
                      <Nav.Link  as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
                      </>
                    )})

                    <Nav.Link  as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>{userContext.userData.user.email}</Nav.Link>
                    <Nav.Link  as={NavLink} to="/users/order">Orders</Nav.Link>
                    <Nav.Link  onClick={doLogout}>Logout</Nav.Link>
                </>
                ):(
                <>
                  <Nav.Link  as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link  as={NavLink} to="/signup">Sign Up</Nav.Link>
                </>
                )

              }
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
       
    )
}

export default CustomNavbar;