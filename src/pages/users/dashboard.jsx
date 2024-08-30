import { useContext } from "react";
import { Outlet,NavLink, Navigate } from "react-router-dom";
import UserContext from "../../context/user.context";
import { Col,Container,Card,Row, Button } from "react-bootstrap";
import { isLoggedIn } from "../../auth/helper.auth";

const Dashboard=()=>{

    const userContext=useContext(UserContext);

    //private dashboard view 

    const dashboardView = () => {
        return (
            <div>
            <h1>this is user dashboard</h1>
            {/* nested components */}
            <Outlet/>
        </div>
        )
    }

    // not logged in view

    const notLoggedInView = () =>{
        return (
            <Container>
                <Row>
                    <Col md={{
                        span: 8,
                        offset: 2
                    }}>
                    <Card className="border-0 shadow mt-3">
                        <Card.Body className="text-center">

                            <h3>You are not logged In !!</h3>
                            <p>Please do login to view the page </p>
                            <Button as={NavLink} to="/login" variant="success">Login Now</Button>
                        </Card.Body>
                    </Card>
                    
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        
        (isLoggedIn())? dashboardView() : <Navigate to="/login"/>
    );
}

export default Dashboard;