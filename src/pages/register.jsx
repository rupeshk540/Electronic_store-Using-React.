import { Card, Col, Container, Form, Row ,Nav, Button} from "react-bootstrap";
import Base from "../components/Base"
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"

const Register =()=>{

  const registerForm = () =>{

    return(
      <Container>
        
      <Row>

       <Col sm={{span:6,offset:3}} className="bg-secondary">
         
         <Card className="my-2 border-0 shadow p-5" >
           <Card.Body>
             {/* logo */}
             <Container className="text-center mb-3">
              <img src={logo} alt="logo" widht={80} height={80}/>
             </Container>
            <h3 className="mb-4 text-center text-uppercase">Store Signup Here</h3>

            <Form>

               {/* name field */}

               <Form.Group className="mb-3" controlId="formName">
                 <Form.Label>Enter your name</Form.Label>
                 <Form.Control type="text" placeholder="Enter your name"/>
                </Form.Group>

                {/* email field */}

                <Form.Group className="mb-3" controlId="formEmail">
                 <Form.Label>Enter your Email</Form.Label>
                 <Form.Control type="email" placeholder="Enter your email"/>
                </Form.Group>

                {/* password field */}

                <Form.Group className="mb-3" controlId="formPassword">
                 <Form.Label>Enter new password</Form.Label>
                 <Form.Control type="password" placeholder="Enter your Password"/>
                </Form.Group>

                {/* confirm password field */}
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                 <Form.Label>Confirm Password</Form.Label>
                 <Form.Control type="password" placeholder="Re Enter your Password"/>
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
                    />

                    <Form.Check
                     inline
                     name="gender"
                     label="Female"
                     type={'radio'}
                     id={'gender'}
                    />
                  </div>
                </Form.Group>

                {/* text area */}

                <Form.Group className="mb-2"> 
                 <Form.Label>Write something about yourself</Form.Label>
                 <Form.Control as={'textarea'}/>
                </Form.Group>
            
            </Form>
           {/* text */}
            <Container>
              <p className="text-center">Already register ! <a href="">Login</a></p>
            </Container>

            {/* buttons */}

            <Container className="text-center text-uppercase">

              <Button variant="success">Register</Button>
              <Button className="ms-2" variant="danger">Reset</Button>
            </Container>
             
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