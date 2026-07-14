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
import { BadgePercent, Heart, LogIn, ShoppingCart, Store, UserPlus } from 'lucide-react';
import brandlogo from '../assets/brandlogo.png';
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
          <Navbar.Brand as={NavLink} to="/home" className="brand-logo">
            <img src={brandlogo} alt={""} width="30"height="30"/>
            <span className="brand-text fw-bold">ZEPTRA</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          
          <Navbar.Collapse id="responsive-navbar-nav">
            
            {/* Main Navigation - Always visible */}
            <Nav className="mx-auto">
              
                <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                    <BadgePercent size={18} className="me-2" color='red' />Hot
                    Deals
                </Nav.Link>
              
               <Nav.Link as={NavLink} to="/categories" className="nav-link-custom">
                Categories
               </Nav.Link>

               <Nav.Link as={NavLink} to="/store" className="nav-link-custom">
                  <span className="nav-icon"><Store size={18} className="me-2" />Shop</span>
                 
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
                  </Nav.Link>  */}
                   {/* <Nav.Link as={NavLink} to="/admin/products" className="nav-link-custom admin-link">
                    <span className="nav-icon">📦</span>
                    Products
                  </Nav.Link>  */}
                   {/* <Nav.Link as={NavLink} to="/admin/reports" className="nav-link-custom admin-link">
                    <span className="nav-icon">📊</span>
                    Reports
                  </Nav.Link> */}
                </>
              )}
            </Nav>
            
            {/* Right Side Navigation */}
            <Nav className="ms-auto align-items-lg-center">
              
              {/* Not Logged In - Show Auth Buttons */}
              {!isLoggedIn && (
                <div className="auth-buttons">
                  <Nav.Link as={NavLink} to="/login" className="btn-outline-custom me-2">
                    {/* <span className="nav-icon">🔐</span> */}
                    <LogIn size={18} className="me-2" />
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup" className="btn-primary-custom">
                    {/* <span className="nav-icon">🚀</span> */}
                     <UserPlus size={18} className="me-2" />
                    Get Started
                  </Nav.Link>
                </div>
              )}

              {/* Customer - Show Cart and Orders */}
              {isCustomer && (
                <>
                  <Nav.Link as={NavLink} to="/user/wishlist" className="nav-link-custom icon-link">
                    <span className="nav-icon"><Heart size={20} className='text-danger' fill='currentcolor' /></span>
                    <span className="d-none d-lg-inline">Wishlist</span>
                  </Nav.Link>
                  
                  <Nav.Link as={NavLink} to="/user/cart" className="nav-link-custom cart-link">
                    <span className="nav-icon"><ShoppingCart size={20} /></span>
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
                  {/* <Nav.Link as={NavLink} to="/admin/notifications" className="nav-link-custom icon-link">
                    <span className="nav-icon">🔔</span>
                    <Badge bg="danger" className="notification-badge">5</Badge>
                  </Nav.Link> */}
                  
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
{/*                   
                  <NavDropdown.Item 
                    as={NavLink} 
                    to={`/user/profile/${userContext?.userData?.user?.userId}`}
                    className="dropdown-item-custom"
                  >
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </NavDropdown.Item> */}

                  {isCustomer && (
                    <>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/user/order"
                        className="dropdown-item-custom"
                      >
                        <span className="dropdown-icon">📦</span>
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                        as={NavLink} 
                        to="/user/addresses"
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

                  {/* <NavDropdown.Item 
                    as={NavLink} 
                    to="/settings"
                    className="dropdown-item-custom"
                  >
                    <span className="dropdown-icon">⚙️</span>
                    Settings
                  </NavDropdown.Item>
                   */}
                  <NavDropdown.Item 
                    as={NavLink} 
                    to="/user/help"
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