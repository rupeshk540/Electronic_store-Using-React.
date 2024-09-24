import { Card, Container, Row,Col, Button} from "react-bootstrap";
import { BsBorderStyle } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { MdOutlineCategory, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardCardView from "../../components/DashboardCardView";

const AdminHome = () => {
    return (
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <h3 className="text-center">Welcome to Admin Dashboard</h3>
                            <p className="text-muted">Customize dashboard for admin, to add categories, to add products, to view categories, to view products, manage orders, manage users and much more..!</p>
                            <p>Start managing products</p>
                            <Container className="d-grid gap-3">
                                <Button as={Link} to={'/admin/categories'} variant="outline-secondary">Start Managing Categories</Button>
                                <Button as={Link} to={'/admin/products'} variant="outline-secondary">Start Managing Products</Button>
                                <Button as={Link} to={'/admin/users'} variant="outline-secondary">Start Managing Users</Button>
                                <Button as={Link} to={'/admin/orders'} variant="outline-secondary">Start Managing Orders</Button>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
            <Col md={6}>
                    <DashboardCardView
                       icon= {<MdOutlineProductionQuantityLimits size={80} />}
                        number={372238}
                        text={'Number of Products'}
                    />
                </Col>
                <Col md={6}>
                    <DashboardCardView
                       icon= {<MdOutlineCategory size={80} />}
                        number={15}
                        text={'Number of Categories'}
                    />
                </Col>
                
                <Col md={6} className="mt-3">
                    <DashboardCardView
                        icon={<BsBorderStyle size={80} />}
                        number={233}
                        text={'Number of Orders'}
                    />
                </Col>
                <Col md={6} className="mt-3">
                   <DashboardCardView
                    icon={<FaUserSecret size={80} />}
                    number={100}
                    text={"Number of Users"}
                   />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminHome;