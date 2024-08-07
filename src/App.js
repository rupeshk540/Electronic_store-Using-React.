import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages';
import About from './pages/about';
import Services from './pages/service';
import Cart from './pages/cart';
import Dashboard from './pages/users/dashboard';
import Profile from './pages/users/Profile';
import Home from './pages/users/home';
import AboutUser from './pages/users/AboutUSer';
import Login from './pages/login';
import Register from './pages/register';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/user.provider';

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
      </Route>
    </Routes>
  </BrowserRouter>
</UserProvider>
  );
}

export default App;
