import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../services/HelperService";
import { Link, useNavigate } from "react-router-dom";
import  PaymentHandler  from "../pages/Payment";
import PaymentPage from "../pages/Payment";

const SingleOrderView = ({
    order,
    openViewOrderModal,
    openEditOrderModal
}) => {
    
    const navigate = useNavigate();
    const handlePayClick = () => {
    const orderId = order.orderId; // or generate via backend
    navigate(`/users/payment/${orderId}`);
    };

    return(
        <Card className="border border-0 shadow-sm mb-5">
            <Card.Body>
            <Row>
                <Col>
                    <b>Order Id: </b>{order?.orderId}
                </Col>
                <Col>
                    <b>Ordered By: </b> <Link className="text-muted" to={`/users/profile/${order?.user?.userId}`}>{order?.user?.name}</Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table bordered striped>
                        <tbody>
                             <tr>
                                <td>
                                    Billing Name
                                </td>
                                <td className="fw-bold">
                                    {order.billingName}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Billing Phone
                                </td>
                                <td className="fw-bold">
                                    {order.billingPhone}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Items
                                </td>
                                <td className="fw-bold">
                                    {order.orderItems.length}
                                </td>
                            </tr>
                            <tr className={order.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                                <td>
                                    Payment Status
                                </td>
                                <td className="fw-bold">
                                    {order.paymentStatus}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Order Status
                                </td>
                                <td className="fw-bold">
                                    {order.orderStatus}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ordered Date
                                </td>
                                <td className="fw-bold">
                                    {formatDate(order.orderedDate)}
                                </td>
                            </tr>
                        </tbody>                        
                    </Table>
                </Col>
            </Row>
            <Container className="text-center"> 

                {/* update button  */}
                { openEditOrderModal && <Button 
                    onClick={(event)=> openEditOrderModal(event,order)}
                    variant="danger" size="sm" className="me-2">Update</Button>}

                {/* payment button  */}
                { (!openEditOrderModal && order.paymentStatus==='NOTPAID') && <Button 
                    onClick={(event) => handlePayClick()}
                    variant="success" size="sm" className="me-2">Pay to Complete Order</Button>}

                {/* order details button */}
                <Button onClick={(event)=>{
                    openViewOrderModal(event,order)
                }}size="sm" variant="info">Order Details</Button>
            </Container>
            </Card.Body>
        </Card>

    )
}

export default SingleOrderView;