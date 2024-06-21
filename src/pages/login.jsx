import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import Base from "../components/Base"
import logo from "../assets/logo.png"

const Login =()=>{

     const loginForm=()=>{
          return(
               <Container>
                    <Row>
                         <Col md={{span:8,offset:2}}>

                         <Card className="my-3 border-0 shadow" style={{position:"relative",top:-60}}>

                              <Card.Body>

                                  {/* logo */}
                                 <Container className="text-center mb-3">
                                   <img src={logo} alt="logo" widht={80} height={80}/>
                                 </Container>

                                   <h3 className="text-center text-uppercase">Store Login</h3>

                                   <Form>
                                        {/* email login field*/}
                                       <Form.Group className="mb-3">
                                          <Form.Label>Enter Email</Form.Label>
                                          <Form.Control
                                          type="text"
                                          placeholder="Enter your email"/>
                                       </Form.Group>
                                        
                                        {/* password login field */}
                                       <Form.Group className="mb-3">
                                          <Form.Label>Enter Password</Form.Label>
                                          <Form.Control
                                          type="passwowrd"
                                          placeholder="Enter your password"/>
                                       </Form.Group>

                                   </Form>
                                   
                                   <Container className="text-center">
                                   {/* <p>Forgot Password ! <NavLink to="/forgot">Click here</NavLink></p> */}
                                        <p>If not registered ! <NavLink to="/signup">Click here</NavLink></p>
                                   </Container>

                                   {/* button field */}
                                   <Container className="text-center">
                                        <Button variant="success">Login</Button>
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
     <Base title="Electro Store / Login "
      description="Login Here "
     >
          {loginForm()}
    
     </Base>
     )
}

export default Login;