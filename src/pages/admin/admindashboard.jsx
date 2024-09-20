import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth.js";
import UserContext from "../../context/UserContext.js";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu.jsx";

const AdminDashboard = () => {

    const userContext = useContext(UserContext);

   const dashboardView=()=>{
      return (
        <div>
            <Container className="p-5">
              <Row>
                <Col md={{
                  span:2,
                 
                }}>
                  <SideMenu/>
                </Col>

                <Col md={10} className="ps-3 pt-2">
                
                  <Outlet/>
                  content area
                
                </Col>
                
              </Row>
            </Container>
            
        </div>
      )
   }

   return(
    (isAdminUser()) ? dashboardView(): <Navigate to ="/users/home"/>
  
   )
}

export default AdminDashboard;