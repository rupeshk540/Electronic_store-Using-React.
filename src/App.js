import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index.js';
import About from './pages/About.js';
import Services from './pages/Service.js';
import Cart from './pages/Cart.js';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import Home from './pages/users/Home.jsx';
import AboutUser from './pages/users/AboutUser.jsx';
import Order from './pages/users/Order.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CustomNavbar from './components/Navbar';
import Contact from './pages/Contact.js';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/UserProvider'; 
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import AddCategory from './pages/admin/AddCategory.jsx';
import ViewCategories from './pages/admin/ViewCategories.jsx';
import ViewProducts from './pages/admin/ViewProducts.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import StorePage from './pages/users/StorePage.jsx';
import ProductView from './pages/users/ProductView.jsx';
import CategoryStorePage from './pages/users/CategoryStorePage.jsx';
import CartProvider from './context/CartProvider.js';
import Loading from './components/Loading.jsx';
import useLoader from './hooks/useLoader.js';

function App() {

  const loading = useLoader()
  
  return (
  
    //  setting up routes
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer  position='bottom-center' theme='dark' draggable />
          <CustomNavbar/>
          <Loading show={loading}/>
          <Routes>
              <Route path='/' element={<Index/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/services' element={<Services/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Register/>}/>
              <Route path='/store' element={<StorePage/>}/>
              <Route path='store/products/:productId' element={<ProductView/>}/>
              <Route path='store/:categoryId/:categoryTitle' element={<CategoryStorePage/>}/>
              

              <Route path='/users' element={<Dashboard/>}>
                <Route path='home' element={<Home/>}/>
                <Route path='profile/:userId' element={<Profile/>}/>
                <Route path='about' element={<AboutUser/>}/>
                <Route path='order' element={<Order/>}/>
              </Route>

              <Route path="/admin" element={<AdminDashboard/>}>
                <Route path="home" element={<AdminHome/>}/>
                <Route path="add-product" element={<AddProduct/>}/>
                <Route path="add-category" element={<AddCategory/>}/>
                <Route path="categories" element={<ViewCategories/>}/>
                <Route path="products" element={<ViewProducts/>}/>
                <Route path="orders" element={<AdminOrders/>}/>
                <Route path="users" element={<AdminUsers/>}/>
                
              </Route>

           </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
