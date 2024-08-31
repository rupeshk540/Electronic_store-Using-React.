import { Card, Col, Container, Form, Row , Button, Spinner} from "react-bootstrap";
import Base from "../components/Base"
import logo from "../assets/logo.png"
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/UserService";
import {NavLink} from "react-router-dom";

const Register =()=>{

    let [data, setData] = useState({
           name:'',
           email:'',
           password:'',
           confirmPassword:'',
           about:'',
           gender:''
    })
  
    //sppiner in register button
     const[loading,setLoading] = useState(false)


    // handle change
    const handleChange = (event, property)=>{
      setData({
        ...data,
        [property]:event.target.value
      })
    }
     
    //error handling
    const [errorData, setErrorData]=useState({
      isError:false,
      errorData:null
    })

    // clear data
    const clearData = () =>{
      setData({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        about:'',
        gender:''
      })

      setErrorData({
        errorData:null,
        isError:false
      })
    }

   

    //do signup function

    const submitForm=(event)=>{
       event.preventDefault();
       console.log(data)
       //validate client side
       if(data.name == undefined || data.name.trim() == ``){
        toast.error("Name is required !!")
        return
       }
       if(data.email == undefined || data.email.trim() == ``){
        toast.error("Email is required !!")
        return
       }


       if(data.password == undefined || data.password.trim() == ``){
        toast.error("Password is required !!")
        return
       }
       if(data.confirmPassword== undefined || data.confirmPassword.trim() == ``){
        toast.error("confirm your password !!")
        return
       }
       if(data.password != data.confirmPassword){
        toast.error("password does not matched !")
       }


      // calling api if everything is right
      setLoading(true)
       registerUser(data)
        .then(userData =>{
          //success handler
          console.log(data)
          toast.success("Registered successfully !!");
          clearData()
        })
        .catch(error=>{
          //error handler
          console.log(error)
          setErrorData({
            isError:true,
            errorData:error
          })
          toast.error ("Error in user registration ! Try again")
        })
        .finally(()=>{
           setLoading(false)
        })
    }

  const registerForm = () =>{

    return(
      <Container>
        
      <Row>

            {/* {JSON.stringify(data)} */}

       <Col sm={{span:8,offset:2}} >
         
         <Card className="my-2 border-0 shadow p-4" style={
              {
                position:'relative',
                top:-60
              }
         } >
           <Card.Body>
             {/* logo */}
             <Container className="text-center mb-3">
              <img src={logo} alt="logo" widht={80} height={80}/>
             </Container>
            <h3 className="mb-4 text-center text-uppercase">Store Signup Here</h3>

            <Form noValidate onSubmit={submitForm}>

               {/* name field */}

               <Form.Group className="mb-3" controlId="formName">
                 <Form.Label>Enter your name</Form.Label>
                 <Form.Control type="text" 
                 placeholder="Enter your name"
                 onChange={(event)=>handleChange(event,'name')}
                 value={data.name}
                 isInValid={errorData.errorData?.response?.data?.name}
                 />
                 <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                </Form.Group>

                {/* email field */}

                <Form.Group className="mb-3" controlId="formEmail">
                 <Form.Label>Enter your Email</Form.Label>
                 <Form.Control type="email"
                  placeholder="Enter your email"
                  onChange={(event)=>handleChange(event,'email')}
                  value={data.email}
                  isInvalid={errorData.errorData?.response?.data?.email}
                  />
                  <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>
                </Form.Group>

                {/* password field */}

                <Form.Group className="mb-3" controlId="formPassword">
                 <Form.Label>Enter new password</Form.Label>
                 <Form.Control type="password" 
                 placeholder="Enter your Password"
                 onChange={(event)=>handleChange(event,'password')}
                 value={data.password}
                 isInvalid={errorData.errorData?.response?.data?.password}
                 />
                 <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>
                </Form.Group>

                {/* confirm password field */}
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                 <Form.Label>Confirm Password</Form.Label>
                 <Form.Control type="password"
                  placeholder="Re Enter your Password"
                  onChange={(event)=>handleChange(event,'confirmPassword')}
                  value={data.confirmPassword}
                  />
                </Form.Group>

                {/* gender field */}

                <Form.Group className="mb-3">
                  <Form.Label>Select your gender</Form.Label>
                  <div>
                  <Form.Check
                     inline
                     name="gender"
                     label="Male"
                     type={'radio'}
                     id={'gender'}
                     value={'male'}
                     checked={data.gender=='male'}
                     onChange={(event)=>handleChange(event,'gender')}
                    
                    />

                    <Form.Check
                     inline
                     name="gender"
                     label="Female"
                     type={'radio'}
                     id={'gender'}
                     value={'female'}
                     checked={data.gender=='male'}
                     onChange={(event)=>handleChange(event,'gender')}
                    />
                  </div>
                </Form.Group>

                {/* about field */}

                <Form.Group className="mb-2"> 
                 <Form.Label>Write something about yourself</Form.Label>
                 <Form.Control as={'textarea'}
                 rows="6"
                 placeholder="write here"
                 onChange={(event)=>handleChange(event,'about')}
                 value={data.about}
                 isInvalid={errorData.errorData?.response?.data?.about}
                 />
                 <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>
                </Form.Group>
            
          
           {/* text */}
            <Container>
              <p className="text-center">Already register ! <NavLink to="/login">Click here</NavLink></p>
            </Container>

            {/* buttons */}

            <Container className="text-center text-uppercase">

              <Button
                type="submit"
                className="text-uppercase"
                variant="success"
                disabled={loading}
              >
                 
                <Spinner
                 animation="border"
                 size="sm"
                 className="me-2"
                 hidden={!loading}
                
                />

                 <span hidden={!loading}>Wait...</span>
                 <span hidden={loading}>Register</span>
                 
              </Button>
              <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>
            </Container>
          </Form>
             
           </Card.Body>
         
         </Card>
       
       </Col>
     
      </Row>
 
    </Container>
    )
  }
  return(
    <Base>
    { registerForm()}
    </Base>
   
  )
   
}

export default Register;