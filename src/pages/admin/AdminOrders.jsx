// import { useEffect, useState } from "react";
// import { getAllOrders, updateOrder } from "../../services/OrderService";
// import { toast } from "react-toastify";
// import { ADMIN_ORDER_PAGE_SIZE } from "../../services/HelperService";
// import { Card, Col, Container,Row,Modal,Button,Table, ListGroup, Badge, Form } from "react-bootstrap";
// import SingleOrderView from "../../components/SingleOrderView";
// import { formatDate } from "../../services/HelperService";
// import { getProductImageUrl } from "../../services/HelperService";
// import InfiniteScroll from "react-infinite-scroll-component";

// const AdminOrders = () => {

//     const [ordersData, setOrdersData]=useState(undefined)
//     const [selectedOrder, setSelectedOrder] = useState(undefined)
//     const [currentPage, setCurrentPage]= useState(0)

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [updateShow, setUpdateShow] = useState(false);
//     const handleUpdateClose = () => setUpdateShow(false);
//     const handleUpdateShow = () => setUpdateShow(true);

//     //function for view orders
//    const openViewOrderModal=(event,order)=>{
//         setSelectedOrder({...order})
//         handleShow(true)
//    }

//    //function for edit order by admin
//    const openEditOrderModal=(event,order)=>{
//         setSelectedOrder({...order})
//         handleUpdateShow(true)
//    }


//     // useState(()=>{
//     //     //single time on load
//     //     getOrdersLocally();
//     // },[])

//     useEffect(()=>{
//         if(currentPage>0){
//             getOrdersLocally();
//         }
//     },[currentPage])

//     //get orders
//     const getOrdersLocally =async () => {
//         try{
//             const data = await getAllOrders(currentPage, ADMIN_ORDER_PAGE_SIZE, 'orderedDate','desc');
//             if(currentPage===0){
//                 setOrdersData(data)
//             }else{
//                 setOrdersData({
//                   content:[...ordersData.content, ...data.content],
//                   lastPage: data.lastPage,
//                   pageNumber: data.pageNumber,
//                   pageSize: data.pageSize,
//                   totalElements: data.totalElements,
//                   totalPages: data.totalPages  
//                 })
//             }

//         }catch(e){
//             toast.error("Error in loading data !!")
//         }

//     }

//     useEffect(()=>{
//         //single time on load
//         getOrdersLocally();
//     },[])

//     //load data of the next page
//     const loadNextPage=()=>{
//         setCurrentPage(currentPage+1)
//     }

//     //view order modal
//     const viewOrderModal=()=>{
//         return selectedOrder && (
//             <>
//                <Modal size="lg" animation={false} show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                     <Modal.Title><h3>Order Details</h3></Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <h3>Order Details</h3>
//                         <Row>
//                             <Col>
//                                 <b>Order Id: </b>{selectedOrder.orderId}
//                             </Col>
//                             <Col>
//                                 <b>Billing Name: </b>{selectedOrder.billingName}
//                             </Col>
//                         </Row>

//                         <Row className="mt-3">
//                             <Col>
//                                 <Table bordered striped>
//                                     <tbody>
//                                         <tr>
//                                             <td>
//                                                 Billing Phone
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.billingPhone}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Items
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.orderItems.length}
//                                             </td>
//                                         </tr>
//                                         <tr className={selectedOrder.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
//                                             <td>
//                                                 Payment Status
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.paymentStatus}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Order Status
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.orderStatus}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Ordered Date
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {formatDate(selectedOrder.orderedDate)}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Billing Address
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.billingAddress}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Billing Phone
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.billingPhone}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Delivered Date
//                                             </td>
//                                             <td className="fw-bold">
//                                                 {selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate):''}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td>
//                                                 Order Amount
//                                             </td>
//                                             <td className="fw-bold">
//                                             ₹ {selectedOrder.orderAmount}
//                                             </td>
//                                         </tr>
//                                     </tbody>                        
//                                 </Table>
//                                 <Card>
//                                     <Card.Body>
//                                         <h3>Order Items</h3>
//                                         <ListGroup>
//                                             {
//                                                 selectedOrder.orderItems.map((item)=>(
//                                                     <ListGroup.Item className="mt-3" key={item.orderItemId}>
//                                                         <Row>
//                                                             <Col md={1} className="d-flex align-items-center">
//                                                                 <img
//                                                                     style={{
//                                                                         width:'40px'
//                                                                     }}
//                                                                     src={getProductImageUrl(item.product.productId)} alt="product_img"
//                                                                 />
//                                                             </Col>
//                                                             <Col md={11}>
//                                                                 <h5>{item.product.title}</h5>
//                                                                 <Badge pill size="lg" >Quantity: {item.quantity}</Badge>
//                                                                 <Badge bg="success" pill className="ms-2" size="lg">Amount: ₹ {item.totalPrice}</Badge>
//                                                                 <p className="mt-3 text-muted">Product Id : {item.product.productId}</p>
//                                                             </Col>
//                                                         </Row> 
//                                                     </ListGroup.Item>
//                                                 ))
//                                             }
//                                         </ListGroup>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
                    
//                     </Modal.Footer>
//                 </Modal>
//             </>
//         )
//     }

//     //handle order update
//     const handleOrderUpdate = async(event) => {
//         event.preventDefault()

//         if(selectedOrder.billingName.trim() === ''){
//             toast.error("Name required !!")
//             return;
//         }

//         try {
//             const data = await updateOrder(selectedOrder, selectedOrder.orderId)
//             toast.success("Order details updated",{
//                 position: "top-right"
//             })

//             const newList=ordersData.content.map(item => {
//                 if(item.orderId === selectedOrder.orderId){
//                     return data
//                 }else{
//                     return item;
//                 }
//             })

//             setOrdersData({
//                 ...ordersData,
//                 content: newList
//             })

//         } catch (error) {
//             toast.error("Order not updated !!")
//         }
//     } 


//     //update order modal
//     const updateOrderModal=()=>{
//         return selectedOrder && (
//             <>
//                 <Modal animation={false} size="lg" show={updateShow} onHide={handleUpdateClose}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>Update Order</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       <Card className="border border-0 shadow-sm">
//                         <Card.Body>
//                             <Form onSubmit={handleOrderUpdate}>
//                                 {/* billing name */}
//                                 <Form.Group>
//                                     <Form.Label>Billing Name</Form.Label>
//                                     <Form.Control type='text'
//                                         value={selectedOrder.billingName}
//                                         onChange={(event)=>{
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 billingName: event.target.value
//                                             })
//                                         }}
//                                     />
//                                 </Form.Group>

//                                 {/* billing phone number*/}
//                                 <Form.Group className='mt-3'>
//                                     <Form.Label>Billing Phone</Form.Label>
//                                     <Form.Control type='text'
//                                         value={selectedOrder.billingPhone}
//                                         onChange={(event)=>{
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 billingPhone: event.target.value
//                                             })
//                                         }}
//                                     />
//                                 </Form.Group>

//                                 {/* billing Address */}
//                                 <Form.Group className="mt-3">
//                                     <Form.Label>Billing Address</Form.Label>
//                                     <Form.Control as={'textarea'} type='text' rows={4}
//                                         value={selectedOrder.billingAddress}
//                                         onChange={(event)=>{
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 billingAddress: event.target.value
//                                             })
//                                         }}
//                                     />
//                                 </Form.Group>

//                                 {/* payment status */}
//                                 <Form.Group className="mt-3">
//                                     <Form.Label>Payment Status</Form.Label>
//                                     <Form.Select
//                                         onChange={(event) => {
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 paymentStatus: event.target.value
//                                             })
//                                         }}
//                                     >
//                                         <option selected={selectedOrder.paymentStatus === 'NOTPAID'} value="NOTPAID">NOT PAID</option>
//                                         <option selected={selectedOrder.paymentStatus === 'PAID'} value="PAID">PAID</option>
//                                     </Form.Select>
//                                 </Form.Group>

//                                 {/* order status */}
//                                 <Form.Group className="mt-3">
//                                     <Form.Label>Order Status</Form.Label>
//                                     <Form.Select
//                                         onChange={(event)=>{
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 orderStatus: event.target.value
//                                             })
//                                         }}
//                                     >
//                                         <option value="PENDING">PENDING</option>
//                                         <option value="DISPATCHED">DISPATCHED</option>
//                                         <option value="ONWAY">ONWAY</option>
//                                         <option value="DELIVERED">DELIVERED</option>
//                                     </Form.Select>
//                                 </Form.Group>

//                                 {/* order delivered date */}
//                                 <Form.Group className="mt-3">
//                                     <Form.Label>Select Date</Form.Label>
//                                     <Form.Control type="text" 
                                    
//                                         onChange={event => {
//                                             setSelectedOrder({
//                                                 ...selectedOrder,
//                                                 deliveredDate: event.target.value
//                                             })
//                                         }}
//                                     />
//                                     <p className="text-muted">Format : YYYY-MM-DD </p>
//                                 </Form.Group>
                                
//                                 <Container className="text-center">
//                                     <Button type="submit" variant="primary">
//                                         Save Changes
//                                     </Button>
//                                 </Container>
//                             </Form>
//                         </Card.Body>
//                       </Card>
                       
//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={handleUpdateClose}>
//                         Close
//                     </Button>
//                     </Modal.Footer>
//                 </Modal>
//     </>
//         )
//     }


//     const ordersView = () => {
//         return(
//             <Card className="shadow-sm">
                
//                 <Card.Body>
//                     <h3 className="my-4 mx-2">All Orders is here</h3>
//                     <InfiniteScroll 
//                         dataLength={ordersData.content.length}
//                         next={loadNextPage}
//                         hasMore={!ordersData.lastPage}
//                         loader={<h3 className="text-center my-4">Loading...</h3>}
//                         endMessage={<p className="my-3 text-center">All orders loaded</p>}
                        
//                     >
//                     {
//                         ordersData.content.map(o => {
//                             return(
//                                 <SingleOrderView
//                                     key={o.orderId} 
//                                     order={o}
//                                     openViewOrderModal={openViewOrderModal}
//                                     openEditOrderModal={openEditOrderModal}
//                                 />
//                             )
//                         }) 
//                     }
//                    </InfiniteScroll>
//                 </Card.Body>
//             </Card>
//         )
//     }
//     return(
//        <>
//             <Container>
//                 <Row>
//                     <Col>
//                         {ordersData && ordersView()}
//                         {viewOrderModal()}
//                         {updateOrderModal()}
//                     </Col>
//                 </Row>
//             </Container>
//        </>
//     )
// }

// export default AdminOrders;



import React, { useState, useEffect } from 'react';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Mock orders data - replace with actual API call
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-2024-001',
        customerName: 'John Doe',
        customerEmail: 'john.doe@email.com',
        items: [
          { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
          { name: 'Phone Case', quantity: 2, price: 15.99 }
        ],
        totalAmount: 111.97,
        status: 'Delivered',
        paymentStatus: 'Paid',
        orderDate: '2024-03-10T10:30:00Z',
        deliveryDate: '2024-03-12T14:20:00Z',
        shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'ORD-2024-002',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        items: [
          { name: 'Gaming Laptop', quantity: 1, price: 1299.99 }
        ],
        totalAmount: 1299.99,
        status: 'Processing',
        paymentStatus: 'Paid',
        orderDate: '2024-03-11T09:15:00Z',
        deliveryDate: null,
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
        paymentMethod: 'PayPal'
      },
      {
        id: 'ORD-2024-003',
        customerName: 'Mike Wilson',
        customerEmail: 'mike.wilson@email.com',
        items: [
          { name: 'Smart Watch', quantity: 1, price: 199.99 },
          { name: 'Watch Band', quantity: 1, price: 29.99 }
        ],
        totalAmount: 229.98,
        status: 'Shipped',
        paymentStatus: 'Paid',
        orderDate: '2024-03-11T14:45:00Z',
        deliveryDate: null,
        shippingAddress: '789 Pine Rd, Chicago, IL 60601',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'ORD-2024-004',
        customerName: 'Emily Brown',
        customerEmail: 'emily.brown@email.com',
        items: [
          { name: 'Bluetooth Speaker', quantity: 1, price: 49.99 }
        ],
        totalAmount: 49.99,
        status: 'Pending',
        paymentStatus: 'Pending',
        orderDate: '2024-03-12T11:00:00Z',
        deliveryDate: null,
        shippingAddress: '321 Elm St, Houston, TX 77001',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'ORD-2024-005',
        customerName: 'David Lee',
        customerEmail: 'david.lee@email.com',
        items: [
          { name: 'Fitness Tracker', quantity: 2, price: 89.99 },
          { name: 'Screen Protector', quantity: 2, price: 9.99 }
        ],
        totalAmount: 199.96,
        status: 'Cancelled',
        paymentStatus: 'Refunded',
        orderDate: '2024-03-09T16:20:00Z',
        deliveryDate: null,
        shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'ORD-2024-006',
        customerName: 'Lisa Garcia',
        customerEmail: 'lisa.garcia@email.com',
        items: [
          { name: 'Wireless Mouse', quantity: 1, price: 29.99 },
          { name: 'Keyboard', quantity: 1, price: 79.99 }
        ],
        totalAmount: 109.98,
        status: 'Delivered',
        paymentStatus: 'Paid',
        orderDate: '2024-03-08T13:30:00Z',
        deliveryDate: '2024-03-10T10:15:00Z',
        shippingAddress: '987 Cedar Ln, Miami, FL 33101',
        paymentMethod: 'Digital Wallet'
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    
    const matchesDate = filterDate === 'all' || (() => {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      switch(filterDate) {
        case 'today':
          return orderDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Delivered': { class: 'bg-success', icon: 'fa-check-circle' },
      'Shipped': { class: 'bg-info', icon: 'fa-truck' },
      'Processing': { class: 'bg-warning', icon: 'fa-clock' },
      'Pending': { class: 'bg-secondary', icon: 'fa-hourglass-half' },
      'Cancelled': { class: 'bg-danger', icon: 'fa-times-circle' }
    };
    const config = statusConfig[status] || { class: 'bg-secondary', icon: 'fa-question' };
    return { class: `badge ${config.class}`, icon: config.icon };
  };

  const getPaymentBadge = (paymentStatus) => {
    const paymentConfig = {
      'Paid': { class: 'bg-success', icon: 'fa-credit-card' },
      'Pending': { class: 'bg-warning', icon: 'fa-clock' },
      'Refunded': { class: 'bg-danger', icon: 'fa-undo' }
    };
    const config = paymentConfig[paymentStatus] || { class: 'bg-secondary', icon: 'fa-question' };
    return { class: `badge ${config.class}`, icon: config.icon };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    const totalRevenue = orders
      .filter(order => order.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    return { totalOrders, deliveredOrders, pendingOrders, totalRevenue };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3 mb-0 text-gray-800 d-flex align-items-center">
            <i className="fas fa-shopping-cart me-3 text-primary"></i>
            Orders Management
          </h1>
          <p className="text-muted mt-2">Manage and track all customer orders</p>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            New Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Orders
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalOrders}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Delivered
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.deliveredOrders}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-check-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.pendingOrders}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clock fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-3">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Revenue
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Orders List</h6>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Order ID, Customer Name, or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="text-muted">
                Showing {filteredOrders.length} of {orders.length}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  const paymentBadge = getPaymentBadge(order.paymentStatus);
                  
                  return (
                    <tr key={order.id}>
                      <td>
                        <div className="fw-bold text-primary">{order.id}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-2"
                               style={{width: '35px', height: '35px', fontSize: '14px'}}>
                            {order.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold">{order.customerName}</div>
                            <small className="text-muted">{order.customerEmail}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          {order.items.length > 1 ? (
                            <span>
                              <strong>{order.items[0].name}</strong>
                              <br />
                              <small className="text-muted">+{order.items.length - 1} more items</small>
                            </span>
                          ) : (
                            <strong>{order.items[0].name}</strong>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-success">${order.totalAmount.toFixed(2)}</div>
                      </td>
                      <td>
                        <span className={statusBadge.class}>
                          <i className={`fas ${statusBadge.icon} me-1`}></i>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={paymentBadge.class}>
                          <i className={`fas ${paymentBadge.icon} me-1`}></i>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="text-sm">
                          {formatDate(order.orderDate)}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-warning" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-info" title="Print">
                            <i className="fas fa-print"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-4">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <p className="text-muted">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin;