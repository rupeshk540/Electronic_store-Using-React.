

import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext"
import { loginUser } from "../services/UserService"
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
                          <a className="forgot-link">
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
