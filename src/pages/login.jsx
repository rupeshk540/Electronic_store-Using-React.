// import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
// import { NavLink, useNavigate } from "react-router-dom"
// import Base from "../components/Base"
// import logo from "../assets/logo.png"
// import { createContext, useContext, useState } from "react"
// import { toast } from "react-toastify"
// import { loginUser } from "../services/UserService"
// import UserContext from "../context/UserContext"
// import { getTokenFromLocalStorage } from "../auth/HelperAuth"


// const Login =()=>{
     
//       const  redirect=useNavigate()
//       const userContext=useContext(UserContext);

//      let [data,setData]=useState({
//           email:'',
//           password:''
//      })
//     let[error,setError]= useState({
//          errorData:null,
//          isError:false 
//      })

//     let [loading,setLoading]= useState(false)

//     const handleChange=(event, property) => {
//      setData({
//           ...data,
//           [property]: event.target.value
//      })
//     }

//      const handleReset=()=>{
//           setData({
//                email:'',
//                password:''
//           })

//           setError({
//                errorData:null,
//                isError:false
//           })

//           setLoading(false)
//      }

//     //submit form

//     const submitForm=(event)=>{
//      event.preventDefault();

//      console.log(data)

//      //client side validation

//      if(data.email===undefined || data.email.trim()===''){
//           toast.error("Email is required")
//           return;
//      }

     
//      if(data.password===undefined || data.password.trim()===''){
//           toast.error("Password is required")
//           return;
//      }

//      //login api
//      setLoading(true)
//      loginUser(data)
//      .then((data)=>{
//           console.log(data)
//           toast.success("logged in")
//           setError({
//                errorData:null,
//                isError:false
//           })
//           //redirect to dashboard page
//        // 1.normal user: normal user ke dashboard par le jana hai
         
//          //home dashboard page
//            userContext.setIsLogin(true)
//            userContext.setUserData(data)
//            userContext.doLogin(data)
     
           
//           if (data.user.roles.includes("ROLE_ADMIN")) {
//                redirect("/admin/home");
//            } else {
//                redirect("/users/home");
//            }
           
//         //  redirect("/users/home")

//        //2.admin user: admin user ke dashboard par le jana hai


     
//      })
//      .catch((error)=>{
//           console.log(error)
//           toast.error(error.response.data.message)
//           setError({
//                errorData:error,
//                isError:true
//           })
//      })
//      .finally(()=>{
//           setLoading(false)
//      })
//     }

//      const loginForm=()=>{
//           return(
//                <Container>

                   
//                     <Row>
//                          <Col md={{span:8,offset:2}}>

//                          <Card className="my-3 border-0 shadow" style={{position:"relative",top:-60}}>

//                               <Card.Body>
 
//                               {/* {JSON.stringify(userContext)}  */}

//                                   {/* logo */}
//                                  <Container className="text-center mb-3">
//                                    <img src={logo} alt="logo" widht={80} height={80}/>
//                                  </Container>

//                                    <h3 className="text-center text-uppercase">Store Login</h3>

//                                    <Alert className="mt-3" onClose={()=>setError({
//                                          isError:false,
//                                          errorData:null
//                                    })} dismissible variant="danger" show={error.isError}>
//                                        <Alert.Heading>Hey there ,</Alert.Heading>
//                                        <p> {error.errorData?.response?.data?.message} </p>
//                                    </Alert>

//                                    <Form  noValidate onSubmit={submitForm}>
//                                         {/* email login field*/}
//                                        <Form.Group className="mb-3">
//                                           <Form.Label>Enter Email</Form.Label>
//                                           <Form.Control
//                                           type="email"
//                                           placeholder="Enter your email"
//                                           onChange={(event)=>handleChange(event,'email')}
//                                           value={data.email}
//                                         />
//                                        </Form.Group>
                                        
//                                         {/* password login field */}
//                                        <Form.Group className="mb-3">
//                                           <Form.Label>Enter Password</Form.Label>
//                                           <Form.Control
//                                           type="passwowrd"
//                                           placeholder="Enter your password"
//                                           onChange={(event)=>handleChange(event,'password')}
//                                           value={data.password}/>
//                                        </Form.Group>

                                  
                                   
//                                        <Container className="text-center">
//                                            {/* <p>Forgot Password ! <NavLink to="/forgot">Click here</NavLink></p> */}
//                                            <p>If not registered ! <NavLink to="/signup">Click here</NavLink></p>
//                                         </Container>

//                                            {/* button field */}
//                                         <Container className="text-center">

//                                           <Button type="submit" variant="success" disabled={loading}>
//                                              <Spinner
//                                                   animation="border"
//                                                   size="sm"
//                                                   hidden={!loading}
//                                                   className={"me-2"}
//                                              /> 
//                                              <span hidden={!loading}>Please wait...</span>    
//                                              <span hidden={loading} > Login </span>

//                                          </Button>

//                                         <Button onClick={handleReset} className="ms-2" variant="danger">Reset</Button>
//                                        </Container>

//                                    </Form>
//                               </Card.Body>

//                          </Card>
                         
//                          </Col>
//                     </Row>
//                </Container>
//           )
//      }
//      return(
//      <Base title="Electro Store / Login "
//       description="Login Here "
//      >
//           {loginForm()}
    
//      </Base>
//      )
// }

// export default Login;



// import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
// import { NavLink, useNavigate } from "react-router-dom"
// import Base from "../components/Base"
// import logo from "../assets/logo.png"
// import { createContext, useContext, useState } from "react"
// import { toast } from "react-toastify"
// import { loginUser } from "../services/UserService"
// import UserContext from "../context/UserContext"
//  import { getTokenFromLocalStorage } from "../auth/HelperAuth"

// const ZeptaLogin = () => {
// //   Simple state management
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   // Handle input changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
    
// //     // Clear error when user starts typing
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ''
// //       }));
// //     }
// //   };

// //   // Form validation
// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!formData.email) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     }
    
// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }
    
// //     return newErrors;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     const newErrors = validateForm();
// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }
    
// //     setIsLoading(true);
    
// //     // Simulate API call
// //     setTimeout(() => {
// //       alert(`Welcome back! Logged in as: ${formData.email}`);
// //       setIsLoading(false);
// //     }, 2000);
// //   };

// //   // Handle social login
// //   const handleSocialLogin = (provider) => {
// //     alert(`Signing in with ${provider}...`);
// //   };
     


//      const  redirect=useNavigate()
//       const userContext=useContext(UserContext);

//      let [data,setData]=useState({
//           email:'',
//           password:''
//      })
//     let[error,setError]= useState({
//          errorData:null,
//          isError:false 
//      })

//     let [loading,setLoading]= useState(false)

//     const handleChange=(event, property) => {
//      setData({
//           ...data,
//           [property]: event.target.value
//      })
//     }

//      const handleReset=()=>{
//           setData({
//                email:'',
//                password:''
//           })

//           setError({
//                errorData:null,
//                isError:false
//           })

//           setLoading(false)
//      }

//     //submit form

//     const submitForm=(event)=>{
//      event.preventDefault();

//      console.log(data)

//      //client side validation

//      if(data.email===undefined || data.email.trim()===''){
//           toast.error("Email is required")
//           return;
//      }

     
//      if(data.password===undefined || data.password.trim()===''){
//           toast.error("Password is required")
//           return;
//      }

//      //login api
//      setLoading(true)
//      loginUser(data)
//      .then((data)=>{
//           console.log(data)
//           toast.success("logged in")
//           setError({
//                errorData:null,
//                isError:false
//           })
//           //redirect to dashboard page
//        // 1.normal user: normal user ke dashboard par le jana hai
         
//          //home dashboard page
//            userContext.setIsLogin(true)
//            userContext.setUserData(data)
//            userContext.doLogin(data)
     
           
//           if (data.user.roles.includes("ROLE_ADMIN")) {
//                redirect("/admin/home");
//            } else {
//                redirect("/users/home");
//            }
           
//         //  redirect("/users/home")

//        //2.admin user: admin user ke dashboard par le jana hai


     
//      })
//      .catch((error)=>{
//           console.log(error)
//           toast.error(error.response.data.message)
//           setError({
//                errorData:error,
//                isError:true
//           })
//      })
//      .finally(()=>{
//           setLoading(false)
//      })
//     }

//   return (
//     <>
//       <style jsx>{`
//         .login-wrapper {
//           overflow:hidden;
//           min-height: 90vh;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           display: flex;
//           align-items: center;
//           font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .login-card {
//           display:flex;
//           flex-direction: column;
//           max-height:90vh;
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(10px);
//           border-radius: 20px;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           overflow: hidden;
//           transition: transform 0.3s ease;
//         }

//         .login-card:hover {
//           transform: translateY(-5px);
//         }

//         .brand-section {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 3rem 2rem;
//           text-align: center;
//           position: relative;
//         }

//         .brand-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
//           opacity: 0.3;
//         }

//         .brand-logo {
//           font-size: 3rem;
//           font-weight: 800;
//           margin-bottom: 1rem;
//           letter-spacing: -2px;
//           position: relative;
//           z-index: 1;
//         }

//         .brand-tagline {
//           font-size: 1.1rem;
//           opacity: 0.9;
//           font-weight: 400;
//           position: relative;
//           z-index: 1;
//         }

//         .shopping-icon {
//           font-size: 4rem;
//           margin-bottom: 1.5rem;
//           display: block;
//           animation: float 3s ease-in-out infinite;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         .form-section {
//           padding: 1.5rem;
//         }

//         .form-title {
//           color: #2d3748;
//           font-size: 1.8rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//         }

//         .form-subtitle {
//           color: #718096;
//           margin-bottom: 2rem;
//         }

//         .form-group {
//           margin-bottom: 1.5rem;
//           position: relative;
//         }

//         .form-label {
//           display: block;
//           margin-bottom: 0.5rem;
//           color: #4a5568;
//           font-weight: 600;
//           font-size: 0.9rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .form-control-modern {
//           width: 100%;
//           padding: 0.875rem 1rem;
//           border: 2px solid #e2e8f0;
//           border-radius: 12px;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//           background-color: #f8fafc;
//         }

//         .form-control-modern:focus {
//           outline: none;
//           border-color: #667eea;
//           box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//           background-color: white;
//           transform: translateY(-1px);
//         }

//         .form-control-modern.is-invalid {
//           border-color: #e53e3e;
//           box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
//         }

//         .password-toggle {
//           position: absolute;
//           right: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           color: #718096;
//           cursor: pointer;
//           padding: 5px;
//           font-size: 1.1rem;
//           transition: color 0.2s ease;
//         }

//         .password-toggle:hover {
//           color: #667eea;
//         }

//         .error-message {
//           color: #e53e3e;
//           font-size: 0.875rem;
//           margin-top: 0.5rem;
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//         }

//         .login-button {
//           width: 100%;
//           padding: 1rem;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           border: none;
//           border-radius: 12px;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 1.5rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .login-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
//         }

//         .login-button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .loading-spinner {
//           width: 20px;
//           height: 20px;
//           border: 2px solid transparent;
//           border-top: 2px solid white;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           display: inline-block;
//           margin-right: 8px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .divider {
//           text-align: center;
//           margin: 0.7rem 0;
//           position: relative;
//           color: #718096;
//           font-size: 0.9rem;
//         }

//         .divider::before {
//           content: '';
//           position: absolute;
//           top: 50%;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: #e2e8f0;
//         }

//         .divider span {
//           background: white;
//           padding: 0 1rem;
//           position: relative;
//         }

//         .social-buttons {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .social-button {
//           padding: 0.875rem 1rem;
//           border: 2px solid #e2e8f0;
//           background: white;
//           border-radius: 12px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           font-weight: 600;
//           color: #4a5568;
//         }

//         .social-button:hover {
//           border-color: #cbd5e0;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }

//         .signup-link {
//           text-align: center;
//           color: #718096;
//         }

//         .signup-link a {
//           color: #667eea;
//           text-decoration: none;
//           font-weight: 600;
//           transition: color 0.2s ease;
//         }

//         .signup-link a:hover {
//           color: #5a67d8;
//           text-decoration: underline;
//         }

//         .remember-forgot {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 2rem;
//           font-size: 0.9rem;
//         }

//         .form-check-custom {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .form-check-custom input {
//           width: 18px;
//           height: 18px;
//           accent-color: #667eea;
//         }

//         .forgot-link {
//           color: #667eea;
//           text-decoration: none;
//           font-weight: 600;
//           transition: color 0.2s ease;
//         }

//         .forgot-link:hover {
//           color: #5a67d8;
//         }

//         /* Responsive design */
//         @media (max-width: 768px) {
//           .login-card {
//             margin: 1rem;
//             border-radius: 16px;
//           }
          
//           .brand-section {
//             padding: 2rem 1.5rem;
//           }
          
//           .form-section {
//             padding: 1.5rem;
//           }
          
//           .brand-logo {
//             font-size: 2rem;
//           }
          
//           .welcome-text {
//             font-size: 2rem;
//           }
          
//           .social-buttons {
//             grid-template-columns: 1fr;
//           }
          
//           .features-container {
//             gap: 0.75rem;
//           }
          
//           .feature-item {
//             padding: 0.5rem 0.75rem;
//           }
//         }
//       `}</style>

//       <div className="login-wrapper fixed-scroll d-flex justify-content-center align-items-center">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-12 col-md-10 col-lg-8 col-xl-6">
//               <div className="login-card">
//                 <div className="row g-0 h-100">
//                   {/* Left Side - Brand Section */}
//                   <div className="col-12 col-lg-5">
//                     <div className="brand-section h-100">
//                       <div className="shopping-icon">🛍️</div>
//                       <h1 className="brand-logo">Zepta</h1>
//                       <p className="brand-tagline">
//                         Your smart shopping companion for the modern world
//                       </p>
//                     </div>
//                   </div>

//                   {/* Right Side - Form Section */}
//                   <div className="col-12 col-lg-7">
//                     <div className="form-section">
//                       <h2 className="form-title">Welcome back!</h2>
//                       <p className="form-subtitle">
//                         Please sign in to your account to continue
//                       </p>

//                       <form onSubmit={submitForm}>
//                         {/* Email Field */}
//                         <div className="form-group">
//                           <label className="form-label">Email Address</label>
//                           <input
//                             type="email"
//                             name="email"
//                             value={data.email}
//                             onChange={(e) => handleChange(e, "email")} 
//                             className={`form-control-modern ${error.email ? 'is-invalid' : ''}`}
//                             placeholder="Enter your email"
//                           />
//                           {error.email && (
//                             <div className="error-message">
//                               <span>⚠️</span> {error.email}
//                             </div>
//                           )}
//                         </div>

//                         {/* Password Field */}
//                         <div className="form-group">
//                           <label className="form-label">Password</label>
//                           <div style={{ position: 'relative' }}>
//                             <input
//                              // type={showPassword ? 'text' : 'password'}
//                               name="password"
//                               value={data.password}
//                               onChange={(e) => handleChange(e, "password")}   // ✅
//                               className={`form-control-modern ${error.password ? 'is-invalid' : ''}`}
//                               placeholder="Enter your password"
//                             />
//                             <button
//                               type="button"
//                               className="password-toggle"
//                              // onClick={() => setShowPassword(!showPassword)}
//                             >
//                               {/* {showPassword ? '👁️' : '👁️‍🗨️'} */}
//                             </button>
//                           </div>
//                           {error.password && (
//                             <div className="error-message">
//                               <span>⚠️</span> {error.password}
//                             </div>
//                           )}
//                         </div>

//                         {/* Remember Me & Forgot Password */}
//                         <div className="remember-forgot">
//                           <div className="form-check-custom">
//                             <input type="checkbox" id="remember" />
//                             <label htmlFor="remember">Remember me</label>
//                           </div>
//                           <a href="#" className="forgot-link">
//                             Forgot password?
//                           </a>
//                         </div>

//                         {/* Login Button */}
//                         <button
//                           type="submit"
//                           className="login-button"
//                           setLoading="false"
//                         >
//                           {loading && <span className="loading-spinner"></span>}
//                           {loading ? 'Signing in...' : 'Sign In'}
//                         </button>
//                       </form>

//                       {/* Divider */}
//                       <div className="divider">
//                         <span>Or continue with</span>
//                       </div>

//                       {/* Social Login Buttons */}
//                       <div className="social-buttons">
//                         <button
//                           className="social-button"
//                           //onClick={() => handleSocialLogin('Google')}
//                         >
//                           <span>🔍</span> Google
//                         </button>
//                         <button
//                           className="social-button"
//                           //onClick={() => handleSocialLogin('Apple')}
//                         >
//                           <span>🍎</span> Apple
//                         </button>
//                       </div>

//                       {/* Signup Link */}
//                       <div className="signup-link">
//                         Don't have an account?{' '}
//                         <a href="#" onClick={(e) => { e.preventDefault(); alert('Redirecting to signup...'); }}>
//                           Sign up here
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ZeptaLogin;



import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext"
import { loginUser } from "../services/UserService"
import { getTokenFromLocalStorage } from "../auth/HelperAuth"
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const ZeptaLogin = () => {

  const  navigate=useNavigate()
  const userContext=useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e, field) => {
    setData({ ...data,
    [field]: e.target.value });

    // simple validation
    if (field === "email") {
      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setError((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, email: "" }));
      }
    }

    if (field === "password") {
      if (e.target.value.length < 5) {
        setError((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setError((prev) => ({ ...prev, password: "" }));
      }
    }
  };

   const submitForm=(event)=>{
     event.preventDefault();

     //client side validation
     if(data.email===undefined || data.email.trim()===''){
          toast.error("Email is required")
          return;
     }

     
     if(data.password===undefined || data.password.trim()===''){
          toast.error("Password is required")
          return;
     }

     //login api
     setLoading(true)
     loginUser(data)
     .then((data)=>{
          console.log(data)
          toast.success("logged in")
          setError({
               errorData:null,
               isError:false
          })

         //home dashboard page
          
         userContext.doLogin(data)
     
           
          // if (data.user.roles.includes("ROLE_ADMIN")) {
          //      redirect("/admin/home");
          //  } else {
          //      redirect("/users/home");
          //  }
          navigate("/")
     })
     .catch((error)=>{
          console.log(error)
          toast.error(error.response.data.message)
          setError({
               errorData:error,
               isError:true
          })
     })
     .finally(()=>{
          setLoading(false)
     })
    }


  return (
    <>
      <style jsx>{`
        .signup-wrapper {
          overflow: hidden;
          min-height: 90vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .signup-card {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }
        .brand-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        .shopping-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .form-section { padding: 2rem; }
        .form-title { color: #2d3748; font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
        .form-subtitle { color: #718096; margin-bottom: 2rem; }
        .form-control-modern {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #333;
          width: 100%;
        }
        .form-control-modern:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
        }
        .is-invalid { border-color: #e53e3e !important; }
        .error-message {
          color: #e53e3e;
          font-size: 0.85rem;
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .signup-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }
        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .forgot-link { color: #667eea; text-decoration: none; font-weight: 600; }
        .forgot-link:hover { text-decoration: underline; }
         .divider {
          text-align: center;
          margin: 1rem 0;
          position: relative;
          color: #718096;
          font-size: 0.9rem;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e2e8f0;
        }

        .divider span {
          background: white;
          padding: 0 1rem;
          position: relative;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .social-button {
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #4a5568;
        }

        .social-button:hover {
          border-color: #cbd5e0;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

      `}</style>

      <div className="signup-wrapper d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              <div className="signup-card">
                <div className="row g-0 h-100">
                  {/* Left Side - Brand Section */}
                  <div className="col-12 col-lg-5">
                    <div className="brand-section">
                      <div className="shopping-icon">🛍️</div>
                      <h1 className="fw-bold mt-2">Zepta</h1>
                      <p className="mt-2">Welcome back! Login to continue shopping.</p>
                    </div>
                  </div>

                  {/* Right Side - Login Form */}
                  <div className="col-12 col-lg-7">
                    <div className="form-section">
                      <h2 className="form-title">Login</h2>
                      <p className="form-subtitle">Enter your credentials to continue</p>

                      <Form onSubmit={submitForm}>
                        {/* Email Field */}
                        <div className="form-group mb-3"> 
                          <label className="form-label">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e, "email")}
                            className={`form-control-modern ${error.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                          />
                          {error.email && (
                            <div className="error-message">
                              <span>⚠️</span> {error.email}
                            </div>
                          )}
                        </div>

                        {/* Password Field */}
                        <div className="form-group mb-3">
                          <label className="form-label">Password</label>
                          <div style={{ position: "relative" }}>
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={data.password}
                              onChange={(e) => handleChange(e, "password")}
                              className={`form-control-modern ${error.password ? "is-invalid" : ""}`}
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              className="password-toggle position-absolute end-0 top-50 translate-middle-y me-3"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                              {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                          </div>
                          {error.password && (
                            <div className="error-message">
                              <span>⚠️</span> {error.password}
                            </div>
                          )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="remember-forgot">
                          <div className="form-check-custom">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                          </div>
                          <a href="#" className="forgot-link">
                            Forgot password?
                          </a>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="signup-button" disabled={loading}>
                          {loading ? "Logging in..." : "Login"}
                        </Button>
                      </Form>

                       {/* Divider */}
                      <div className="divider">
                        <span>Or sign up with</span>
                      </div>

                      {/* Social Login Buttons */}
                      <div className="social-buttons">
                        <button className="social-button">
                          <span>🔍</span> Google
                        </button>
                        <button className="social-button">
                          <span>🍎</span> Apple
                        </button>
                      </div>

                      {/* Already have account */}
                      <div className="auth-link text-center mt-3">
                        Don’t have an account? <Link to="/signup">Sign Up</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
};

export default ZeptaLogin;
