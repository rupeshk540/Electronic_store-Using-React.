
// import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ListOrdered } from 'lucide-react';
// import { getOrdersOfUser } from '../../services/OrderService';
// import UserContext from '../../context/UserContext';

// export default function OrdersPage() {
  
//   const [orders, setOrders] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const{userData} = useContext(UserContext);

//   useEffect(() => {
//      if (!userData?.user?.userId) return;
//     const getOrders = async () => {
//       const data = await getOrdersOfUser(userData?.user?.userId);
//       console.log(data)
//       setOrders(data);
//     };
//     getOrders();
//   }, [userData]);

//   const getEstimatedDelivery = (orderDate, shippingMethod) => {
//   const daysToAdd = shippingMethod === "STANDARD" ? 6
//                  : shippingMethod === "EXPRESS" ? 3
//                  : shippingMethod === "OVERNIGHT" ? 1 : 6;
//   const date = new Date(orderDate);
//   date.setDate(date.getDate() + daysToAdd);
//   return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
// };

//   const getStatusBadge = (status) => {
//   const map = { PLACED: "primary", SHIPPED: "info", DELIVERED: "success", CANCELLED: "danger" };
//   return map[status] || "secondary";
// };

//   const handleProductClick = (productId) => {
//     window.location.href = `/products/${productId}`;
//   };

//   const filteredOrders = orders.filter(order => {
//     if (activeFilter === 'all') return true;
//     return order.status.toLowerCase() === activeFilter.toLowerCase();
//   });

//   return (
//     <div style={{ backgroundColor: '#f5f9fd', minHeight: '100vh' }}>
//       {/* Header */}
//       <div style={{ 
//         background: '#aaaaaaff', 
//         color: '#1a3a52', 
//         padding: '1.5rem 0',
//         border:'5px'
//       }}>
//         <div className="container">
//           <h3 className="mb-0 fw-bold"><ListOrdered size={30}/> My Orders</h3>
//         </div>
//       </div>

//       <div className="container py-4">
//         {/* Filter Tabs */}
//         <div className="card shadow-sm mb-4" style={{ 
//           border: 'none', 
//           borderRadius: '12px',
//           overflow: 'hidden'
//         }}>
//           <div className="card-body p-3">
//             <div className="d-flex gap-2 flex-wrap">
//               {['all', 'delivered', 'shipped', 'cancelled'].map(filter => (
//                 <button 
//                   key={filter}
//                   className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'}`}
//                   onClick={() => setActiveFilter(filter)}
//                   style={{ 
//                     borderRadius: '20px',
//                     padding: '0.5rem 1.5rem',
//                     textTransform: 'capitalize',
//                     fontWeight: '500',
//                     transition: 'all 0.3s',
//                     backgroundColor: activeFilter === filter ? '#87ceeb' : 'transparent',
//                     borderColor: activeFilter === filter ? '#87ceeb' : '#dee2e6',
//                     color: activeFilter === filter ? '#fff' : '#6c757d'
//                   }}
//                 >
//                   {filter === 'all' ? 'All Orders' : filter}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Orders List */}
//         {filteredOrders.length === 0 ? (
//           <div className="card shadow-sm text-center py-5" style={{ 
//             border: 'none', 
//             borderRadius: '12px',
//             backgroundColor: '#fff'
//           }}>
//             <div className="card-body">
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#87ceeb" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
//                 <path d="M9 11l3 3L22 4"></path>
//                 <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
//               </svg>
//               <h5 className="text-muted">No orders found</h5>
//               <p className="text-muted mb-0">Try adjusting your filters</p>
//             </div>
//           </div>
//         ) : (
//           filteredOrders.map(order => (
//             <div key={order.orderId} className="card shadow-sm mb-3" style={{ 
//               border: 'none', 
//               borderRadius: '12px',
//               transition: 'transform 0.2s, box-shadow 0.2s'
//             }}>
//               <div className="card-body p-4">
//                 {/* Order Header */}
//                 <div className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{ borderBottom: '2px solid #f0f4f8' }}>
//                   <div>
//                     <h6 className="mb-1 fw-bold" style={{ color: '#1a3a52' }}>Order #{order.orderId}</h6>
//                     <small className="text-muted">
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
//                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                         <line x1="16" y1="2" x2="16" y2="6"></line>
//                         <line x1="8" y1="2" x2="8" y2="6"></line>
//                         <line x1="3" y1="10" x2="21" y2="10"></line>
//                       </svg>
//                       {new Date(order.orderDate)?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
//                     </small>
//                   </div>
//                   <span className={`badge bg-${getStatusBadge(order.orderStatus)}`} style={{ 
//                     fontSize: '0.85rem',
//                     padding: '0.5rem 1rem',
//                     borderRadius: '20px',
//                     fontWeight: '500'
//                   }}>
//                     {order?.orderStatus}
//                   </span>
//                 </div>

//                 {/* Order Items */}
//                 {order.orderItems.map((item, idx) => (
//                   <div key={idx} className="mb-3">
//                     <div className="row g-3">
//                       {/* Product Card - Clickable */}
//                       <div className="col-md-8">
//                         <div 
//                           onClick={() => handleProductClick(item?.productId)}
//                           style={{ 
//                             padding: '1rem',
//                             backgroundColor: '#fff',
//                             borderRadius: '12px',
//                             border: '2px solid #e8f0f7',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s',
//                             height: '100%'
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.border = '2px solid #87ceeb';
//                             e.currentTarget.style.transform = 'translateY(-2px)';
//                             e.currentTarget.style.boxShadow = '0 4px 12px rgba(135, 206, 235, 0.2)';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.border = '2px solid #e8f0f7';
//                             e.currentTarget.style.transform = 'translateY(0)';
//                             e.currentTarget.style.boxShadow = 'none';
//                           }}
//                         >
//                           <div className="d-flex align-items-center">
//                             <img 
//                               src={item?.productImageUrls?.[0] || 'default'} 
//                               alt={item?.productTitle} 
//                               className="rounded"
//                               style={{ 
//                                 width: '100px', 
//                                 height: '100px', 
//                                 objectFit: 'cover',
//                                 border: '1px solid #e8f0f7'
//                               }}
//                             />
//                             <div className="ms-3 flex-grow-1">
//                               <h6 className="mb-2" style={{ 
//                                 color: '#1a3a52',
//                                 fontWeight: '600',
//                                 fontSize: '1rem'
//                               }}>
//                                 {item?.productTitle}
//                               </h6>
//                               <p className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
//                                 Quantity: {item?.quantity}
//                               </p>
//                               <div className="d-flex align-items-center gap-2">
//                                 <span className="fw-bold" style={{ 
//                                   color: '#1a3a52', 
//                                   fontSize: '1.2rem' 
//                                 }}>
//                                   ₹{item?.price?.toLocaleString()}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Action Card */}
//                       <div className="col-md-4">
//                         <div style={{ 
//                           padding: '1rem',
//                           backgroundColor: '#fafbfc',
//                           borderRadius: '12px',
//                           border: '2px solid #e8f0f7',
//                           height: '100%',
//                           display: 'flex',
//                           flexDirection: 'column',
//                           justifyContent: 'center'
//                         }}>
//                           {(item.deliveredDate || order.orderStatus=="DELIVERED" )&& (
//                             <div className="mb-3 text-center">
//                               <small className="text-success d-block" style={{ fontWeight: '500', fontSize: '0.85rem' }}>
//                                 ✓ Delivered on
//                               </small>
//                               <small className="text-success d-block fw-bold">
//                                 {new Date(order.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
//                               </small>
//                             </div>
//                           )}
//                           {order.orderStatus!=="DELIVERED"  && (
//                             <div className="mb-3 text-center">
//                               <small className="text-info d-block" style={{ fontWeight: '500', fontSize: '0.85rem' }}>
//                                 🚚 Expected by
//                               </small>
//                               <small className="text-info d-block fw-bold">
//                                 {getEstimatedDelivery(order.orderDate, order.shippingMethod)}
//                               </small>
//                             </div>
//                           )}
//                           <div className="d-flex flex-column gap-2">
//                             {order.orderStatus === 'DELIVERED' && (
//                               <>
//                                 <button className="btn btn-sm w-100" style={{ 
//                                   backgroundColor: '#87ceeb',
//                                   color: '#fff',
//                                   border: 'none',
//                                   borderRadius: '8px',
//                                   padding: '0.5rem',
//                                   fontWeight: '500',
//                                   transition: 'all 0.2s'
//                                 }}
//                                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#386e88ff'}
//                                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#309ac4ff'}
//                                 >
//                                   Rate Product
//                                 </button>
//                                 <button className="btn btn-sm btn-outline-secondary w-100" style={{ 
//                                   borderRadius: '8px',
//                                   padding: '0.5rem',
//                                   fontWeight: '500'
//                                 }}>
//                                   Return
//                                 </button>
//                               </>
//                             )}
//                             {(order.orderStatus !=="DELIVERED")&& (
//                               <>
//                               <button className="btn btn-sm w-100" style={{ 
//                                 backgroundColor: '#309ac4ff',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 padding: '0.5rem',
//                                 fontWeight: '500'
//                               }}>
//                                 Track Order
//                               </button>
//                                <button className="btn btn-sm w-100" style={{ 
//                                 backgroundColor: '#6f7071ff',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 padding: '0.5rem',
//                                 fontWeight: '500'
//                               }}>
//                                 Cancel Order
//                               </button>
//                               </>
//                             )}
//                              {order.orderStatus === 'PENDING' && (
//                               <button className="btn btn-sm w-100" style={{ 
//                                 backgroundColor: '#643b3bff',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '8px',
//                                 padding: '0.5rem',
//                                 fontWeight: '500'
//                               }}>
//                                 Complete Order
//                               </button>
//                             )}
//                             {order.status === 'CANCELED' && (
//                               <button className="btn btn-sm btn-outline-secondary w-100" style={{ 
//                                 borderRadius: '8px',
//                                 padding: '0.5rem',
//                                 fontWeight: '500'
//                               }}>
//                                 Buy Again
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Order Footer */}
//                 <div className="d-flex justify-content-between align-items-center pt-3 mt-2" style={{ borderTop: '2px solid #f0f4f8' }}>
//                   <span className="text-muted fw-500">Order Total</span>
//                   <h5 className="mb-0 fw-bold" style={{ color: '#1a3a52' }}>₹{order?.totalAmount?.toLocaleString()}</h5>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cancelOrder, getOrdersOfUser } from '../../services/OrderService';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
  loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const userData = JSON.parse(localStorage.getItem("userData"));

      const data = await getOrdersOfUser(userData.user.userId);

      setOrders(data);

    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapOrderStatus = (status) => {
  switch (status) {

    case "PLACED":
      return "placed";

    case "DISPATCHED":
      return "dispatched";

    case "SHIPPED":
      return "shipped";

    case "DELIVERED":
      return "delivered";

    case "PENDING":
      return "pending";

    case "CANCELLED":
      return "cancelled";

    default:
      return "pending";
  }
};

const handleCancelOrder = async (orderId) => {
  try {
    await cancelOrder(orderId);
    toast.success("Order cancelled successfully");
    loadOrders();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to cancel order"
    );
  }
};

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

 const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'placed', label: 'Order Placed' },
    { key: 'dispatched', label: 'Dispatched' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'pending', label: 'Pending' },
    { key: 'cancelled', label: 'Cancelled' },
  ];
  const statusConfig = {
    placed: { label: 'Order Placed', color: '#7b1fa2', bgColor: '#f3e5f5', icon: '📦' },
    dispatched: { label: 'Dispatched', color: '#ef6c00', bgColor: '#fff3e0', icon: '🚛' },
    shipped: { label: 'Shipped', color: '#1976d2', bgColor: '#e3f2fd', icon: '🚚' },
    delivered: { label: 'Delivered', color: '#388e3c', bgColor: '#e8f5e9', icon: '✓' },
    pending: { label: 'Pending', color: '#f57c00', bgColor: '#fff8e1', icon: '⏳' },
    cancelled: { label: 'Cancelled', color: '#d32f2f', bgColor: '#ffebee', icon: '✕' }
  };

  const filteredOrders =
  activeFilter === "all"
    ? orders
    : orders.filter(
        order =>
          mapOrderStatus(order.orderStatus) === activeFilter
      );

  return (
    
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');
        
        .order-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.12);
        }
        
        .filter-btn {
          transition: all 0.2s ease;
          border: 2px solid transparent;
          font-weight: 500;
        }
        
        .filter-btn:hover {
          transform: scale(1.05);
        }
        
        .filter-btn.active {
          border-color: #2874f0;
          background: linear-gradient(135deg, #2874f0 0%, #1557b0 100%) !important;
          box-shadow: 0 4px 12px rgba(40, 116, 240, 0.3);
        }
        
        .item-image {
          transition: transform 0.3s ease;
          border-radius: 8px;
          object-fit: cover;
        }
        
        .item-image:hover {
          transform: scale(1.05);
        }
        
        .status-badge {
          animation: fadeIn 0.5s ease;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .page-header {
          background: linear-gradient(135deg, #2874f0 0%, #1557b0 100%);
          box-shadow: 0 4px 16px rgba(40, 116, 240, 0.2);
        }
        
        .order-id {
          font-family: 'Courier New', monospace;
          font-weight: 600;
        }
        
        .btn-custom {
          transition: all 0.2s ease;
          font-weight: 500;
          border: none;
        }
        
        .btn-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Header */}
      <div className="page-header text-white py-4 mb-4">
        <div className="container">
          <h1 className="mb-0" style={{ 
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            fontWeight: 700
          }}>
            My Orders
          </h1>
          <p className="mb-0 mt-2 opacity-90">Track, manage, and review your purchases</p>
        </div>
      </div>

      <div className="container pb-5">
        {/* Filters */}
        <div className="bg-white rounded-3 p-3 mb-4 shadow-sm">
          <div className="d-flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.key}
                className={`filter-btn btn ${activeFilter === filter.key ? 'btn-primary active' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
                <span className="ms-2 badge bg-light text-dark">
                  {filter.key === 'all'
                    ? orders.length
                    : orders.filter(
                        o => mapOrderStatus(o.orderStatus)=== filter.key
                      ).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3" style={{ fontSize: '4rem', opacity: 0.3 }}>📦</div>
            <h4 className="text-muted">No orders found</h4>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredOrders.map((order, index) => {
              const status = mapOrderStatus(order.orderStatus);
              return(
              <div key={order.orderId} className="col-12" style={{
                animation: `fadeIn 0.5s ease ${index * 0.1}s both`
              }}>
                <div className="card order-card rounded-3 overflow-hidden">
                  <div className="card-body p-4">
                    {/* Order Header */}
                    <div className="row mb-3">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <h5 className="mb-0 order-id">{order.orderId}</h5>
                          <span 
                            className="status-badge px-3 py-1 rounded-pill"
                            style={{
                              backgroundColor: statusConfig[status].bgColor,
                              color: statusConfig[status].color,
                              fontSize: '0.85rem'
                            }}
                          >
                            {statusConfig[status].icon} {statusConfig[status].label}
                          </span>
                        </div>
                        <div className="text-muted small">
                          Ordered on {new Date(order.orderDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end mt-3 mt-md-0">
                        <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#2874f0' }}>
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </div>
                        {order.deliveryDate && (
                          <div className="text-muted small">
                            {order.status === 'delivered' ? 'Delivered on' : 'Expected by'} {new Date(order.deliveryDate).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className="my-3" />

                    {/* Order Items */}
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="row mb-3">
                        <div className="col-auto">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="item-image"
                            width="80"
                            height="80"
                          />
                        </div>
                        <div className="col">
                          <h6 className="mb-1">{item.productTitle}</h6>
                          <div className="text-muted small mb-2">Qty: {item.quantity}</div>
                          <div className="fw-semibold" style={{ color: '#2874f0' }}>
                            ₹{item.subtotal.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
                      {status === 'delivered' && (
                        <>
                          <button className="btn btn-outline-primary btn-sm btn-custom">
                            ⭐ Rate & Review
                          </button>
                          <button className="btn btn-outline-secondary btn-sm btn-custom">
                            📦 Return
                          </button>
                        </>
                      )}
                      {status === 'shipped' && (
                        <button className="btn btn-outline-primary btn-sm btn-custom">
                          📍 Track Order
                        </button>
                      )}
                      {status === 'placed' && (
                        <button 
                          className="btn btn-outline-danger btn-sm btn-custom"
                          onClick={() => {
                              const confirmCancel = window.confirm(
                              "Are you sure you want to cancel this order?"
                            );
                            if(confirmCancel){
                              handleCancelOrder(order.orderId);
                            }
                          }}
                        >
                          ✕ Cancel Order
                        </button>
                      )}
                      <button
                        className="btn btn-outline-secondary btn-sm btn-custom ms-auto"
                        onClick={() => handleViewDetails(order)}
                      >
                        📄 View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
{showDetails && selectedOrder && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)"
    }}
  >
    <div className="modal-dialog modal-xl modal-dialog-scrollable">
      <div className="modal-content border-0 shadow-lg">

        {/* Header */}
        <div
          className="modal-header text-white"
          style={{
            background:
              "linear-gradient(135deg, #2874f0 0%, #1557b0 100%)"
          }}
        >
          <div>
            <h4 className="modal-title fw-bold mb-1">
              Tax Invoice
            </h4>

            <small>
              Order Details & Payment Receipt
            </small>
          </div>

          <button
            className="btn-close btn-close-white"
            onClick={() => setShowDetails(false)}
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body p-4">

          {/* Top Details */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="fw-bold">
                Electronic Store
              </h5>

              <p className="mb-1 text-muted">
                Bangalore, Karnataka
              </p>

              <p className="mb-1 text-muted">
                GSTIN : 29ABCDE1234F1Z5
              </p>

              <p className="mb-0 text-muted">
                support@electronicstore.com
              </p>
            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <h6 className="fw-bold">
                Order ID
              </h6>

              <p>{selectedOrder.orderId}</p>

              <h6 className="fw-bold">
                Order Date
              </h6>

              <p>
                {new Date(
                  selectedOrder.orderDate
                ).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          <hr />

          {/* Payment + Shipping */}
          <div className="row mb-4">

            <div className="col-md-6">
              <h6 className="fw-bold mb-2">
                Shipping Details
              </h6>

              <p className="mb-1">
                Address ID : {selectedOrder.addressId}
              </p>

              <p className="mb-1">
                Shipping Method :{" "}
                {selectedOrder.shippingMethod}
              </p>

              <p className="mb-0">
                Order Status :{" "}
                {selectedOrder.orderStatus}
              </p>
            </div>

            <div className="col-md-6 mt-3 mt-md-0">
              <h6 className="fw-bold mb-2">
                Payment Details
              </h6>

              <p className="mb-1">
                Payment Method :{" "}
                {selectedOrder.paymentMethod}
              </p>

              <p className="mb-0">
                Payment Status :{" "}
                {selectedOrder.paymentStatus}
              </p>
            </div>

          </div>

          {/* Product Table */}
          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle">

              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {selectedOrder.orderItems?.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>
                        {item.productTitle}
                      </td>

                      <td>
                        {item.quantity}
                      </td>

                      <td>
                        ₹{item.price}
                      </td>

                      <td>
                        ₹{item.subtotal}
                      </td>
                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>

          {/* Price Summary */}
          <div className="row justify-content-end">

            <div className="col-md-5">
              <div className="border rounded p-3 bg-light">

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>

                  <span>
                    ₹{selectedOrder.subtotal?.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping Fee</span>

                  <span>
                    ₹{selectedOrder.shippingFee?.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>

                  <span className="text-success">
                    - ₹{selectedOrder.discount?.toLocaleString("en-IN")}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5">

                  <span>Total Amount</span>

                  <span style={{ color: "#2874f0" }}>
                    ₹{selectedOrder.totalAmount?.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>
            </div>

          </div>

          {/* Notes */}
          {selectedOrder.notes && (
            <div className="mt-4">
              <h6 className="fw-bold">
                Notes
              </h6>

              <p className="text-muted mb-0">
                {selectedOrder.notes}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setShowDetails(false)}
          >
            Close
          </button>

          <button
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            🖨 Print Invoice
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default OrdersPage;