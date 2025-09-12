// import { NavLink } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import UserContext from '../context/UserContext';
// import { useContext } from 'react';
// import CartContext from '../context/CartContext';

// const  CustomNavbar=()=>{

//   const userContext = useContext(UserContext)
//   const {cart, setCart} = useContext(CartContext)

//   const doLogout=()=>{
//     userContext.logout()
//   }

//     return(
//         <Navbar collapseOnSelect data-bs-theme="dark" className="bg-body-tertiary " >
//         <Container>
//           <Navbar.Brand as={NavLink} to="/">
//             <img src="/assets/logo.png" alt="logo" height={25} width={25}/>
//             <span className='ms-1 mt-1'>ElectroStore</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="m-auto">
//               <Nav.Link as={NavLink} to="/services">Features</Nav.Link>

//               {/* <NavDropdown title="Categories" id="collapsible-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">Branded Phones</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">
//                   Smart TVs
//                 </NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">Laptop</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">
//                   More
//                 </NavDropdown.Item>
//               </NavDropdown> */}

//               <Nav.Link  as={NavLink} to="/about">About</Nav.Link>
//               <Nav.Link  as={NavLink} to="/contact">Contact Us</Nav.Link>
            
//             </Nav>

//             <Nav>

//               <Nav.Link  as={NavLink} to="/store">Store</Nav.Link>
//               <Nav.Link  as={NavLink} to="/cart">Cart {userContext.isLogin && cart && '('+cart.items.length+')'}</Nav.Link>
              

//               {
//                 (userContext.isLogin)?(
//                 <>
//                     ({userContext.isAdminUser && (
//                       <>
//                       <Nav.Link  as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
//                       </>
//                     )})

//                     <Nav.Link  as={NavLink} to={`/users/profile/${userContext?.userData?.user?.userId}`}>{userContext?.userData?.user?.email}</Nav.Link>
//                     <Nav.Link  as={NavLink} to="/users/order">Orders</Nav.Link>
//                     <Nav.Link  onClick={doLogout}>Logout</Nav.Link>
//                 </>
//                 ):(
//                 <>
//                   <Nav.Link  as={NavLink} to="/login">Login</Nav.Link>
//                   <Nav.Link  as={NavLink} to="/signup">Sign Up</Nav.Link>
//                 </>
//                 )

//               }
              
              
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
       
//     )
// }

// export default CustomNavbar;


import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import '../customcss/CustomNavbar.css'; // Import custom CSS

const CustomNavbar = () => {
  const userContext = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const doLogout = () => {
    userContext.logout();
  };

  // Check user roles
  const isLoggedIn = userContext.isLogin;
  const isAdmin = userContext.isAdminUser;
  const isSeller = userContext.userData?.user?.role === 'SELLER'; // Assuming you have role field
  const isCustomer = userContext.userData?.user?.role === 'CUSTOMER' || (!isAdmin && !isSeller && isLoggedIn);

  return (
    <>
      <Navbar 
        collapseOnSelect 
        expand="lg" 
        className="custom-navbar sticky-top"
        data-bs-theme="light"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={NavLink} to="/" className="brand-logo">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">Zeptra</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          
          <Navbar.Collapse id="responsive-navbar-nav">
            
            {/* Main Navigation - Always visible */}
            <Nav className="mx-auto">
              
                <Nav.Link as={NavLink} to="/hotdeals" className="nav-link-custom">
                    <Badge bg="danger" className="pulse-badge">Hot</Badge>
                    Deals
                </Nav.Link>
              
               <Nav.Link as={NavLink} to="/categories" className="nav-link-custom">
                Categories
               </Nav.Link>

               <Nav.Link as={NavLink} to="/store" className="nav-link-custom">
                  <span className="nav-icon">🛍️</span>
                  Shop
                </Nav.Link>

                 <Nav.Link as={NavLink} to="/services" className="nav-link-custom">
                    Features
                 </Nav.Link>

                {/* <Nav.Link as={NavLink} to="/contact" className="nav-link-custom">
                    Contact
                </Nav.Link> */}
              
              {/* Show different sections based on user type */}
              {!isLoggedIn && (
                <>
                  {/* <Nav.Link as={NavLink} to="/about" className="nav-link-custom">
                    About
                  </Nav.Link> */}
                  
                </>
              )}

              {/* Customer Navigation */}
              {isCustomer && (
                <>
                  
                  {/* <Nav.Link as={NavLink} to="/categories" className="nav-link-custom">
                    Categories
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/deals" className="nav-link-custom">
                    <Badge bg="danger" className="pulse-badge">Hot</Badge>
                    Deals
                  </Nav.Link> */}
                </>
              )}

              {/* Seller Navigation */}
              {isSeller && (
                <>
                  <Nav.Link as={NavLink} to="/seller/dashboard" className="nav-link-custom seller-link">
                    <span className="nav-icon">📊</span>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/seller/products" className="nav-link-custom seller-link">
                    <span className="nav-icon">📦</span>
                    My Products
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/seller/orders" className="nav-link-custom seller-link">
                    <span className="nav-icon">📋</span>
                    Orders
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/seller/analytics" className="nav-link-custom seller-link">
                    <span className="nav-icon">📈</span>
                    Analytics
                  </Nav.Link>
                </>
              )}

              {/* Admin Navigation */}
              {isAdmin && (
                <>
                  <Nav.Link as={NavLink} to="/admin/home" className="nav-link-custom admin-link">
                    <span className="nav-icon">⚙️</span>
                    Admin Panel
                  </Nav.Link>
                  {/* <Nav.Link as={NavLink} to="/admin/users" className="nav-link-custom admin-link">
                    <span className="nav-icon">👥</span>
                    Users
                  </Nav.Link> */}
                  {/* <Nav.Link as={NavLink} to="/admin/products" className="nav-link-custom admin-link">
                    <span className="nav-icon">📦</span>
                    Products
                  </Nav.Link> */}
                  <Nav.Link as={NavLink} to="/admin/reports" className="nav-link-custom admin-link">
                    <span className="nav-icon">📊</span>
                    Reports
                  </Nav.Link>
                </>
              )}
            </Nav>
            
            {/* Right Side Navigation */}
            <Nav className="ms-auto align-items-lg-center">
              
              {/* Not Logged In - Show Auth Buttons */}
              {!isLoggedIn && (
                <div className="auth-buttons">
                  <Nav.Link as={NavLink} to="/login" className="btn-outline-custom me-2">
                    <span className="nav-icon">🔐</span>
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup" className="btn-primary-custom">
                    <span className="nav-icon">🚀</span>
                    Get Started
                  </Nav.Link>
                </div>
              )}

              {/* Customer - Show Cart and Orders */}
              {isCustomer && (
                <>
                  <Nav.Link as={NavLink} to="/wishlist" className="nav-link-custom icon-link">
                    <span className="nav-icon">❤️</span>
                    <span className="d-none d-lg-inline">Wishlist</span>
                  </Nav.Link>
                  
                  <Nav.Link as={NavLink} to="/cart" className="nav-link-custom cart-link">
                    <span className="nav-icon">🛒</span>
                    <span className="d-none d-lg-inline">Cart</span>
                    {cart && cart.items && cart.items.length > 0 && (
                      <Badge bg="primary" className="cart-count">
                        {cart.items.length}
                      </Badge>
                    )}
                  </Nav.Link>
                </>
              )}

              {/* Seller - Show Seller Actions */}
              {isSeller && (
                <>
                  <Nav.Link as={NavLink} to="/seller/add-product" className="btn-primary-custom me-2">
                    <span className="nav-icon">➕</span>
                    Add Product
                  </Nav.Link>
                  
                  <Nav.Link as={NavLink} to="/seller/notifications" className="nav-link-custom icon-link">
                    <span className="nav-icon">🔔</span>
                    <Badge bg="warning" className="notification-badge">3</Badge>
                  </Nav.Link>
                </>
              )}

              {/* Admin - Show Admin Actions */}
              {isAdmin && (
                <>
                  <Nav.Link as={NavLink} to="/admin/notifications" className="nav-link-custom icon-link">
                    <span className="nav-icon">🔔</span>
                    <Badge bg="danger" className="notification-badge">5</Badge>
                  </Nav.Link>
                  
                  {/* <Nav.Link as={NavLink} to="/admin/settings" className="nav-link-custom icon-link">
                    <span className="nav-icon">⚙️</span>
                  </Nav.Link> */}
                </>
              )}

              {/* User Dropdown - Show for all logged in users */}
              {isLoggedIn && (
                <NavDropdown 
                  title={
                    <span className="user-dropdown-title">
                      <span className="user-avatar">
                        {userContext?.userData?.user?.name?.charAt(0).toUpperCase() || '👤'}
                      </span>
                      <span className="d-none d-lg-inline ms-2">
                        {userContext?.userData?.user?.name || userContext?.userData?.user?.email}
                      </span>
                    </span>
                  }
                  id="user-dropdown"
                  className="user-dropdown"
                  align="end"
                >
                  <div className="dropdown-header">
                    <small className="text-muted">
                      {isAdmin ? 'Administrator' : isSeller ? 'Seller Account' : 'Customer Account'}
                    </small>
                  </div>
                  
                  <NavDropdown.Item 
                    as={NavLink} 
                    to={`/users/profile/${userContext?.userData?.user?.userId}`}
                    className="dropdown-item-custom"
                  >
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </NavDropdown.Item>

                  {isCustomer && (
                    <>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/users/order"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">📦</span>
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/users/addresses"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">📍</span>
                        Addresses
                      </NavDropdown.Item>
                    </>
                  )}

                  {isSeller && (
                    <>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/seller/profile"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">🏪</span>
                        Store Settings
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/seller/earnings"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">💰</span>
                        Earnings
                      </NavDropdown.Item>
                    </>
                  )}

                  <NavDropdown.Item 
                    as={NavLink} 
                    to="/settings"
                    className="dropdown-item-custom"
                  >
                    <span className="dropdown-icon">⚙️</span>
                    Settings
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item 
                    as={NavLink} 
                    to="/help"
                    className="dropdown-item-custom"
                  >
                    <span className="dropdown-icon">❓</span>
                    Help & Support
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item 
                    onClick={doLogout}
                    className="dropdown-item-custom logout-item"
                  >
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;