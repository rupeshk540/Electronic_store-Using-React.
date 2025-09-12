// import { Card, Col, Container, Form, Row , Button, Spinner} from "react-bootstrap";
// import Base from "../components/Base"
// import logo from "../assets/logo.png"
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { registerUser } from "../services/UserService";
// import {NavLink} from "react-router-dom";

// const Register =()=>{

//     let [data, setData] = useState({
//            name:'',
//            email:'',
//            password:'',
//            confirmPassword:'',
//            about:'',
//            gender:''
//     })
  
//     //sppiner in register button
//      const[loading,setLoading] = useState(false)


//     // handle change
//     const handleChange = (event, property)=>{
//       setData({
//         ...data,
//         [property]:event.target.value
//       })
//     }
     
//     //error handling
//     const [errorData, setErrorData]=useState({
//       isError:false,
//       errorData:null
//     })

//     // clear data
//     const clearData = () =>{
//       setData({
//         name:'',
//         email:'',
//         password:'',
//         confirmPassword:'',
//         about:'',
//         gender:''
//       })

//       setErrorData({
//         errorData:null,
//         isError:false
//       })
//     }

   

//     //do signup function

//     const submitForm=(event)=>{
//        event.preventDefault();
//        console.log(data)
//        //validate client side
//        if(data.name == undefined || data.name.trim() == ``){
//         toast.error("Name is required !!")
//         return
//        }
//        if(data.email == undefined || data.email.trim() == ``){
//         toast.error("Email is required !!")
//         return
//        }


//        if(data.password == undefined || data.password.trim() == ``){
//         toast.error("Password is required !!")
//         return
//        }
//        if(data.confirmPassword== undefined || data.confirmPassword.trim() == ``){
//         toast.error("confirm your password !!")
//         return
//        }
//        if(data.password != data.confirmPassword){
//         toast.error("password does not matched !")
//        }


//       // calling api if everything is right
//       setLoading(true)
//        registerUser(data)
//         .then(userData =>{
//           //success handler
//           console.log(data)
//           toast.success("Registered successfully !!");
//           clearData()
//         })
//         .catch(error=>{
//           //error handler
//           console.log(error)
//           setErrorData({
//             isError:true,
//             errorData:error
//           })
//           toast.error ("Error in user registration ! Try again")
//         })
//         .finally(()=>{
//            setLoading(false)
//         })
//     }

//   const registerForm = () =>{

//     return(
//       <Container>
        
//       <Row>

//             {/* {JSON.stringify(data)} */}

//        <Col sm={{span:8,offset:2}} >
         
//          <Card className="my-2 border-0 shadow p-4" style={
//               {
//                 position:'relative',
//                 top:-60
//               }
//          } >
//            <Card.Body>
//              {/* logo */}
//              <Container className="text-center mb-3">
//               <img src={logo} alt="logo" widht={80} height={80}/>
//              </Container>
//             <h3 className="mb-4 text-center text-uppercase">Store Signup Here</h3>

//             <Form noValidate onSubmit={submitForm}>

//                {/* name field */}

//                <Form.Group className="mb-3" controlId="formName">
//                  <Form.Label>Enter your name</Form.Label>
//                  <Form.Control type="text" 
//                  placeholder="Enter your name"
//                  onChange={(event)=>handleChange(event,'name')}
//                  value={data.name}
//                  isInValid={errorData.errorData?.response?.data?.name}
//                  />
//                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
//                 </Form.Group>

//                 {/* email field */}

//                 <Form.Group className="mb-3" controlId="formEmail">
//                  <Form.Label>Enter your Email</Form.Label>
//                  <Form.Control type="email"
//                   placeholder="Enter your email"
//                   onChange={(event)=>handleChange(event,'email')}
//                   value={data.email}
//                   isInvalid={errorData.errorData?.response?.data?.email}
//                   />
//                   <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
//                 </Form.Group>

//                 {/* password field */}

//                 <Form.Group className="mb-3" controlId="formPassword">
//                  <Form.Label>Enter new password</Form.Label>
//                  <Form.Control type="password" 
//                  placeholder="Enter your Password"
//                  onChange={(event)=>handleChange(event,'password')}
//                  value={data.password}
//                  isInvalid={errorData.errorData?.response?.data?.password}
//                  />
//                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>
//                 </Form.Group>

//                 {/* confirm password field */}
//                 <Form.Group className="mb-3" controlId="formConfirmPassword">
//                  <Form.Label>Confirm Password</Form.Label>
//                  <Form.Control type="password"
//                   placeholder="Re Enter your Password"
//                   onChange={(event)=>handleChange(event,'confirmPassword')}
//                   value={data.confirmPassword}
//                   />
//                 </Form.Group>

//                 {/* gender field */}

//                 <Form.Group className="mb-3">
//                   <Form.Label>Select your gender</Form.Label>
//                   <div>
//                   <Form.Check
//                      inline
//                      name="gender"
//                      label="Male"
//                      type={'radio'}
//                      id={'gender'}
//                      value={'male'}
//                      checked={data.gender=='male'}
//                      onChange={(event)=>handleChange(event,'gender')}
                    
//                     />

//                     <Form.Check
//                      inline
//                      name="gender"
//                      label="Female"
//                      type={'radio'}
//                      id={'gender'}
//                      value={'female'}
//                      checked={data.gender=='male'}
//                      onChange={(event)=>handleChange(event,'gender')}
//                     />
//                   </div>
//                 </Form.Group>

//                 {/* about field */}

//                 <Form.Group className="mb-2"> 
//                  <Form.Label>Write something about yourself</Form.Label>
//                  <Form.Control as={'textarea'}
//                  rows="6"
//                  placeholder="write here"
//                  onChange={(event)=>handleChange(event,'about')}
//                  value={data.about}
//                  isInvalid={errorData.errorData?.response?.data?.about}
//                  />
//                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>
//                 </Form.Group>
            
          
//            {/* text */}
//             <Container>
//               <p className="text-center">Already register ! <NavLink to="/login">Click here</NavLink></p>
//             </Container>

//             {/* buttons */}

//             <Container className="text-center text-uppercase">

//               <Button
//                 type="submit"
//                 className="text-uppercase"
//                 variant="success"
//                 disabled={loading}
//               >
                 
//                 <Spinner
//                  animation="border"
//                  size="sm"
//                  className="me-2"
//                  hidden={!loading}
                
//                 />

//                  <span hidden={!loading}>Wait...</span>
//                  <span hidden={loading}>Register</span>
                 
//               </Button>
//               <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>
//             </Container>
//           </Form>
             
//            </Card.Body>
         
//          </Card>
       
//        </Col>
     
//       </Row>
 
//     </Container>
//     )
//   }
//   return(
//     <Base>
//     { registerForm()}
//     </Base>
   
//   )
   
// }

// export default Register;




import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser, registerUser } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const ZeptaSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const userContext=useContext(UserContext);
  
  //error handling
  const [error, setError] = useState({
    email: "",
    password: "",
   });
    

  const handleChange = (e) => {
     const { name, value } = e.target;

     setFormData({ ...formData, [e.target.name]: e.target.value });
     // simple validation
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setError((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "password") {
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


  //do signup function
   const submitForm=(event)=>{
       event.preventDefault();
      
       //validate client side
       if(formData.name == undefined || formData.name.trim() == ``){
        toast.error("Name is required !!")
        return
       }
       if(formData.email == undefined || formData.email.trim() == ``){
        toast.error("Email is required !!")
        return
       }
       if(formData.password == undefined || formData.password.trim() == ``){
        toast.error("Password is required !!")
        return
       }
       if(formData.confirmPassword== undefined || formData.confirmPassword.trim() == ``){
        toast.error("confirm your password !!")
        return
       }
       if(formData.password != formData.confirmPassword){
        toast.error("password does not matched !")
       }


      // calling api if everything is right
      setIsLoading(true)
       registerUser(formData)
        .then(() =>{
          //success handler
          toast.success("Registered successfully !!");

          //Auto-login after signUp
          return loginUser({
            email: formData.email,
            password: formData.password,
          })
        })
        .then((data) => {
           userContext.setIsLogin(true)
           userContext.setUserData(data)
           userContext.doLogin(data)

           navigate("/");
        })
        .catch(error=>{
          //error handler
          setError({
            isError:true,
            errorData:error
          })
          toast.error ("Error in user registration ! Try again")
        })
        .finally(()=>{
           setIsLoading(false)
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
          transition: transform 0.3s ease;
        }

        .signup-card:hover {
          transform: translateY(-5px);
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
          justify-content: flex-start; /* top aligned */
          align-items: center;
          
        }.brand-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .shopping-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .form-section {
          padding: 2rem;
        }

        .form-title {
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #718096;
          margin-bottom: 2rem;
        }

        .form-control-modern {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.875rem 1rem 0.875rem 2.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #333;
        }

        .form-control-modern:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
          transform: translateY(-1px);
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
          transition: all 0.3s ease;
          margin-top: 0.5rem;
        }

        .signup-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

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

        .auth-link {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.95rem;
          color: #4a5568;
        }

        .auth-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-link a:hover {
          text-decoration: underline;
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
                      <p className="mt-2">Join Zepta and start your smart shopping journey!</p>
                    </div>
                  </div>

                  {/* Right Side - Signup Form */}
                  <div className="col-12 col-lg-7">
                    <div className="form-section">
                      <h2 className="form-title">Create Account</h2>
                      <p className="form-subtitle">Fill in the details to get started</p>

                      <Form onSubmit={submitForm}>
                        {/* Full Name */}
                        <div className="position-relative mb-3">
                          <FaUser className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color: "#667eea" }} />
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control-modern"
                          />
                        </div>

                        {/* Email */}
                        <div className="position-relative mb-3">
                          <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color: "#667eea" }} />
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control-modern"
                          />
                        </div>

                        {/* Password */}
                        <div className="position-relative mb-3">
                          <FaLock className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color: "#667eea" }} />
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control-modern"
                          />
                          <Button
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ textDecoration: "none", fontSize: "1.1rem", color: "#667eea" }}
                          >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                          </Button>
                        </div>

                        {/* Confirm Password */}
                        <div className="position-relative mb-3">
                          <RiLockPasswordFill className="position-absolute top-50 translate-middle-y ms-3" size={22} style={{ color: "#667eea" }} />
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control-modern"
                          />
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="signup-button" disabled={isLoading}>
                          {isLoading ? "Creating..." : "Sign Up"}
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
                      <div className="auth-link">
                        Already have an account? <Link to="/login">Login</Link>
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

export default ZeptaSignup;


