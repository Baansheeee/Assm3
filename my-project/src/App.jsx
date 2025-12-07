/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Policy from './pages/Policy'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import AdminRoute from './components/Routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/Auth/AdminLogin'
import AddCategory from './pages/admin/AddCategory'
import AddProduct from './pages/admin/AddProduct'
import Users from './pages/admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Settings from './pages/user/Settings'
import CategoryForm from './components/Form/CategoryForm'
import ProductPage from './pages/admin/ProductPage'
import Products from './pages/Products'
import Cart from './pages/Cart'
import SearchProduct from './pages/SearchProduct'
import ProductDesc from './pages/ProductDesc'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'
import UserDetails from './pages/admin/UserDetails'
import Checkout from './pages/Checkout'
import OrdersAdmin from './pages/admin/OrderDetailsModal'
import Likes from './pages/Likes'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchProduct/>}/>
        <Route path="/product/:slug" element={<ProductDesc />} /> {/* New route for product details */}
        <Route path="/category/:slug" element={<CategoryProducts/>} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          {/* <Route path="/category/:slug" element={<CategoryPage />} /> */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="likes" element={<Likes />} />
        </Route>
       
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/ordersadmin" element={<OrdersAdmin />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/categor" element={<CategoryForm />} />
        <Route path="/category" element={<AddCategory />} />
        <Route path="/addproducts" element={<AddProduct />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
    </>
  )
}

export default App

