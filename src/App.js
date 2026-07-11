import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index.js';
import About from './pages/About.js';
import Services from './pages/Service.js';
import Cart from './pages/users/Cart.jsx';
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
import StorePage from './pages/StorePage.jsx';
import ProductView from './pages/users/SingleProductView.jsx';
import CategoryStorePage from './pages/users/CategoryStorePage.jsx';
import CartProvider from './context/CartProvider.js';
import Loading from './components/Loading.jsx';
import useLoader from './hooks/useLoader.js';
import PaymentPage from './pages/Payment.jsx';
import Footer from './components/Footer.jsx';
import CategoryPage from './pages/CategoriesPage.jsx';
import HotDealsPage from './pages/HotDealsPage.jsx';
import AddCollection from './pages/admin/AddCollection.jsx';
import ViewCollections from './pages/admin/ViewCollections.jsx';
import AdminProductView from './pages/admin/SingleProductEditView.jsx';
import CheckoutPage from './pages/users/checkoutPage.jsx';
import WishlistPage from './pages/users/WishlistPage.jsx';
import WishlistProvider from './context/WishlistProvider.js';
import UserAddressPage from './pages/users/UserAddressPage.jsx';
import AddressProvider from './context/AddressProvider.js';
import HelpSupport from './pages/users/HelpAndSupport.jsx';
import AIChatBot from './pages/AIChatbot.jsx';

function App() {

  const loading = useLoader()
  
  return (
  
    //  setting up routes
    <UserProvider>
      <AddressProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ToastContainer  position='bottom-center' theme='dark' draggable />
              <CustomNavbar/>
              <Loading show={loading}/>
              <Routes>
                  <Route path='/' element={<Index/>}/>
                  <Route path='/hotdeals' element={<HotDealsPage/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/services' element={<Services/>}/>
                  <Route path='/contact' element={<Contact/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Register/>}/>
                  <Route path='/store' element={<StorePage/>}/> 
                  <Route path='/categories' element={<CategoryPage/>}/>
                  <Route path='/products/:productId' element={<ProductView/>}/>
                  <Route path='store/:categoryId/:categoryTitle' element={<CategoryStorePage/>}/>
                  

                  <Route path='/user' element={<Dashboard/>}>
                    <Route path='home' element={<Home/>}/>
                    <Route path='profile/:userId' element={<Profile/>}/>
                    <Route path='about' element={<AboutUser/>}/>
                    <Route path='cart' element={<Cart/>}/>
                    <Route path='wishlist' element={<WishlistPage/>}/>
                    <Route path='checkout' element={<CheckoutPage/>}/>
                    <Route path='addresses' element={<UserAddressPage/>}/>
                    <Route path='order' element={<Order/>}/>
                    <Route path='help' element={<HelpSupport/>}/>
                    <Route path='payment/:orderId' element={<PaymentPage/>}/>
                  </Route>

                  <Route path="/admin" element={<AdminDashboard/>}>
                    <Route path="home" element={<AdminHome/>}/>
                    <Route path="add-product" element={<AddProduct/>}/>
                    <Route path="add-category" element={<AddCategory/>}/>
                    <Route path="categories" element={<ViewCategories/>}/>
                    <Route path="add-collection" element={<AddCollection/>}/>
                    <Route path="collections" element={<ViewCollections/>}/>
                    <Route path="products" element={<ViewProducts/>}/>
                    <Route path="products/:productId" element={<AdminProductView/>}/>
                    <Route path="orders" element={<AdminOrders/>}/>
                    <Route path="users" element={<AdminUsers/>}/>
                    
                  </Route>

              </Routes>
              <Footer/>

              <AIChatBot/>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AddressProvider>
    </UserProvider>
  );
}

export default App;
