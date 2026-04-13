
import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListOrdered } from 'lucide-react';
import { getOrdersOfUser } from '../../services/OrderService';
import UserContext from '../../context/UserContext';

export default function OrdersPage() {
  
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const{userData} = useContext(UserContext);

  useEffect(() => {
     if (!userData?.user?.userId) return;
    const getOrders = async () => {
      const data = await getOrdersOfUser(userData?.user?.userId);
      console.log(data)
      setOrders(data);
    };
    getOrders();
  }, [userData]);

  const getEstimatedDelivery = (orderDate, shippingMethod) => {
  const daysToAdd = shippingMethod === "STANDARD" ? 6
                 : shippingMethod === "EXPRESS" ? 3
                 : shippingMethod === "OVERNIGHT" ? 1 : 6;
  const date = new Date(orderDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

  const getStatusBadge = (status) => {
  const map = { PLACED: "primary", SHIPPED: "info", DELIVERED: "success", CANCELLED: "danger" };
  return map[status] || "secondary";
};

  const handleProductClick = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    return order.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div style={{ backgroundColor: '#f5f9fd', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        background: '#aaaaaaff', 
        color: '#1a3a52', 
        padding: '1.5rem 0',
        border:'5px'
      }}>
        <div className="container">
          <h3 className="mb-0 fw-bold"><ListOrdered size={30}/> My Orders</h3>
        </div>
      </div>

      <div className="container py-4">
        {/* Filter Tabs */}
        <div className="card shadow-sm mb-4" style={{ 
          border: 'none', 
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div className="card-body p-3">
            <div className="d-flex gap-2 flex-wrap">
              {['all', 'delivered', 'shipped', 'cancelled'].map(filter => (
                <button 
                  key={filter}
                  className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveFilter(filter)}
                  style={{ 
                    borderRadius: '20px',
                    padding: '0.5rem 1.5rem',
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    transition: 'all 0.3s',
                    backgroundColor: activeFilter === filter ? '#87ceeb' : 'transparent',
                    borderColor: activeFilter === filter ? '#87ceeb' : '#dee2e6',
                    color: activeFilter === filter ? '#fff' : '#6c757d'
                  }}
                >
                  {filter === 'all' ? 'All Orders' : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="card shadow-sm text-center py-5" style={{ 
            border: 'none', 
            borderRadius: '12px',
            backgroundColor: '#fff'
          }}>
            <div className="card-body">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#87ceeb" strokeWidth="1.5" style={{ margin: '0 auto 1rem' }}>
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
              </svg>
              <h5 className="text-muted">No orders found</h5>
              <p className="text-muted mb-0">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.orderId} className="card shadow-sm mb-3" style={{ 
              border: 'none', 
              borderRadius: '12px',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div className="card-body p-4">
                {/* Order Header */}
                <div className="d-flex justify-content-between align-items-start mb-3 pb-3" style={{ borderBottom: '2px solid #f0f4f8' }}>
                  <div>
                    <h6 className="mb-1 fw-bold" style={{ color: '#1a3a52' }}>Order #{order.orderId}</h6>
                    <small className="text-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {new Date(order.orderDate)?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </small>
                  </div>
                  <span className={`badge bg-${getStatusBadge(order.orderStatus)}`} style={{ 
                    fontSize: '0.85rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontWeight: '500'
                  }}>
                    {order?.orderStatus}
                  </span>
                </div>

                {/* Order Items */}
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="row g-3">
                      {/* Product Card - Clickable */}
                      <div className="col-md-8">
                        <div 
                          onClick={() => handleProductClick(item?.productId)}
                          style={{ 
                            padding: '1rem',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            border: '2px solid #e8f0f7',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            height: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.border = '2px solid #87ceeb';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(135, 206, 235, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.border = '2px solid #e8f0f7';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <img 
                              src={item?.productImageUrls?.[0] || 'default'} 
                              alt={item?.productTitle} 
                              className="rounded"
                              style={{ 
                                width: '100px', 
                                height: '100px', 
                                objectFit: 'cover',
                                border: '1px solid #e8f0f7'
                              }}
                            />
                            <div className="ms-3 flex-grow-1">
                              <h6 className="mb-2" style={{ 
                                color: '#1a3a52',
                                fontWeight: '600',
                                fontSize: '1rem'
                              }}>
                                {item?.productTitle}
                              </h6>
                              <p className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                                Quantity: {item?.quantity}
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold" style={{ 
                                  color: '#1a3a52', 
                                  fontSize: '1.2rem' 
                                }}>
                                  ₹{item?.price?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Card */}
                      <div className="col-md-4">
                        <div style={{ 
                          padding: '1rem',
                          backgroundColor: '#fafbfc',
                          borderRadius: '12px',
                          border: '2px solid #e8f0f7',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          {(item.deliveredDate || order.orderStatus=="DELIVERED" )&& (
                            <div className="mb-3 text-center">
                              <small className="text-success d-block" style={{ fontWeight: '500', fontSize: '0.85rem' }}>
                                ✓ Delivered on
                              </small>
                              <small className="text-success d-block fw-bold">
                                {new Date(order.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </small>
                            </div>
                          )}
                          {order.orderStatus!=="DELIVERED"  && (
                            <div className="mb-3 text-center">
                              <small className="text-info d-block" style={{ fontWeight: '500', fontSize: '0.85rem' }}>
                                🚚 Expected by
                              </small>
                              <small className="text-info d-block fw-bold">
                                {getEstimatedDelivery(order.orderDate, order.shippingMethod)}
                              </small>
                            </div>
                          )}
                          <div className="d-flex flex-column gap-2">
                            {order.orderStatus === 'DELIVERED' && (
                              <>
                                <button className="btn btn-sm w-100" style={{ 
                                  backgroundColor: '#87ceeb',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '0.5rem',
                                  fontWeight: '500',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#386e88ff'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#309ac4ff'}
                                >
                                  Rate Product
                                </button>
                                <button className="btn btn-sm btn-outline-secondary w-100" style={{ 
                                  borderRadius: '8px',
                                  padding: '0.5rem',
                                  fontWeight: '500'
                                }}>
                                  Return
                                </button>
                              </>
                            )}
                            {(order.orderStatus !=="DELIVERED")&& (
                              <>
                              <button className="btn btn-sm w-100" style={{ 
                                backgroundColor: '#309ac4ff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                fontWeight: '500'
                              }}>
                                Track Order
                              </button>
                               <button className="btn btn-sm w-100" style={{ 
                                backgroundColor: '#6f7071ff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                fontWeight: '500'
                              }}>
                                Cancel Order
                              </button>
                              </>
                            )}
                             {order.orderStatus === 'PENDING' && (
                              <button className="btn btn-sm w-100" style={{ 
                                backgroundColor: '#643b3bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                fontWeight: '500'
                              }}>
                                Complete Order
                              </button>
                            )}
                            {order.status === 'CANCELED' && (
                              <button className="btn btn-sm btn-outline-secondary w-100" style={{ 
                                borderRadius: '8px',
                                padding: '0.5rem',
                                fontWeight: '500'
                              }}>
                                Buy Again
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Footer */}
                <div className="d-flex justify-content-between align-items-center pt-3 mt-2" style={{ borderTop: '2px solid #f0f4f8' }}>
                  <span className="text-muted fw-500">Order Total</span>
                  <h5 className="mb-0 fw-bold" style={{ color: '#1a3a52' }}>₹{order?.totalAmount?.toLocaleString()}</h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}