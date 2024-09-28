import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getOrdersOfUser } from "../../services/OrderService";
import { formatDate, getProductImageUrl } from "../../services/HelperService";
import { toast } from "react-toastify";
import SingleOrderView from "../../components/SingleOrderView";
import {Card, Col, Row, Button, Modal, Badge, Table, ListGroup, Container, Alert} from "react-bootstrap";

const Order = () => {
    const {userData, isLogin}=useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openViewOrderModal = (event, order) => {
        setSelectedOrder({...order})
        handleShow(true)
    }
 
    useEffect(()=>{
        if(isLogin){
            loadOrderOfUsers()
        }
    }, [isLogin])

    const loadOrderOfUsers= async()=>{
        try {
           const result = await getOrdersOfUser(userData.user.userId)
           setOrders(result)
        } catch (error) {
            toast.error("Error in loading orders !")
        }
    }

    //view order modal
    const viewOrderModal=()=>{
        return selectedOrder && (
            <>
               <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><h3>Order Details</h3></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Order Details</h3>
                        <Row>
                            <Col>
                                <b>Order Id: </b>{selectedOrder.orderId}
                            </Col>
                            <Col>
                                <b>Billing Name: </b>{selectedOrder.billingName}
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <Table bordered striped>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Billing Phone
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingPhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Items
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.orderItems.length}
                                            </td>
                                        </tr>
                                        <tr className={selectedOrder.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                                            <td>
                                                Payment Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.paymentStatus}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Order Status
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.orderStatus}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ordered Date
                                            </td>
                                            <td className="fw-bold">
                                                {formatDate(selectedOrder.orderedDate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Billing Address
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingAddress}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Billing Phone
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.billingPhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Delivered Date
                                            </td>
                                            <td className="fw-bold">
                                                {selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate):''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Order Amount
                                            </td>
                                            <td className="fw-bold">
                                            ₹ {selectedOrder.orderAmount}
                                            </td>
                                        </tr>
                                    </tbody>                        
                                </Table>
                                <Card>
                                    <Card.Body>
                                        <h3>Order Items</h3>
                                        <ListGroup>
                                            {
                                                selectedOrder.orderItems.map((item)=>(
                                                    <ListGroup.Item className="mt-3" key={item.orderItemId}>
                                                        <Row>
                                                            <Col md={1} className="d-flex align-items-center">
                                                                <img
                                                                    style={{
                                                                        width:'40px'
                                                                    }}
                                                                    src={getProductImageUrl(item.product.productId)} alt="product_img"
                                                                />
                                                            </Col>
                                                            <Col md={11}>
                                                                <h5>{item.product.title}</h5>
                                                                <Badge pill size="lg" >Quantity: {item.quantity}</Badge>
                                                                <Badge bg="success" pill className="ms-2" size="lg">Amount: ₹ {item.totalPrice}</Badge>
                                                                <p className="mt-3 text-muted">Product Id : {item.product.productId}</p>
                                                            </Col>
                                                        </Row> 
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


    const ordersView = () => {
        return(
            <Card className="shadow-sm">
                
                <Card.Body>
                    <h3 className="my-4 mx-2">Your Orders</h3>
                    
                    {
                        orders.map(o => {
                            return(
                                <SingleOrderView
                                    key={o.orderId} 
                                    order={o}
                                    openViewOrderModal={openViewOrderModal}
                                    // openEditOrderModal={openEditOrderModal}
                                />
                            )
                        }) 
                    }
                   
                  {
                    orders.length<=0 &&  <Alert className="border border-0 text-center" variant="dark">
                    <h3>No Items in Your Order</h3>
                   </Alert>
                  }
                </Card.Body>
            </Card>
        )
    }
    return (
       <>
        <Container>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    {ordersView()}
                    {viewOrderModal()}
                </Col>
            </Row>
        </Container>
       </>
    )
}

export default Order ;