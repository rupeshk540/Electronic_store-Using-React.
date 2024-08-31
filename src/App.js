import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages';
import About from './pages/about';
import Services from './pages/service';
import Cart from './pages/cart';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import Home from './pages/users/Home.jsx';
import AboutUser from './pages/users/AboutUser.jsx';
import Order from './pages/users/Order.jsx';
import Login from './pages/login';
import Register from './pages/register';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/UserProvider'; 
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';

function App() {
  return (
  
    //  setting up routes
<UserProvider>
  <BrowserRouter>
   <ToastContainer 
     position='bottom-center'
     theme='dark'
     draggable />
     
  <CustomNavbar/>
    <Routes>
    <Route path='/' element={<Index/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>

      <Route path='/users' element={<Dashboard/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='about' element={<AboutUser/>}/>
        <Route path='order' element={<Order/>}/>
      </Route>

      <Route path="/admin" element={<AdminDashboard/>}>
        <Route path="home" element={<AdminHome/>}/>
        <Route path="add-product" element={<AddProduct/>}/>
      </Route>

    </Routes>
  </BrowserRouter>
</UserProvider>
  );
}

export default App;
