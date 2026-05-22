import React, { useState, useMemo, useEffect } from 'react';
import { Clock1, Package2, TrendingUpIcon, CheckCircle2, XCircleIcon, ShoppingBagIcon, DollarSignIcon, Clock10, CheckCircle2Icon, SearchCheck, FilterIcon, ChevronDownCircle, DownloadIcon, Package2Icon } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../../services/OrderService';
import { toast } from 'react-toastify';
import { getAddress } from '../../services/AddressService';

// // Sample order data
// const initialOrders = [
//   {
//     id: 'ORD-2024-1891',
//     customer: 'Rajesh Kumar',
//     email: 'rajesh.k@email.com',
//     items: 3,
//     total: 4599,
//     status: 'pending',
//     date: '2024-05-18',
//     paymentMethod: 'UPI',
//     shippingAddress: 'Mumbai, Maharashtra'
//   },
//   {
//     id: 'ORD-2024-1890',
//     customer: 'Priya Sharma',
//     email: 'priya.sharma@email.com',
//     items: 1,
//     total: 1299,
//     status: 'processing',
//     date: '2024-05-18',
//     paymentMethod: 'Credit Card',
//     shippingAddress: 'Bangalore, Karnataka'
//   },
//   {
//     id: 'ORD-2024-1889',
//     customer: 'Amit Patel',
//     email: 'amit.p@email.com',
//     items: 5,
//     total: 8750,
//     status: 'shipped',
//     date: '2024-05-17',
//     paymentMethod: 'Cash on Delivery',
//     shippingAddress: 'Delhi, NCR'
//   },
//   {
//     id: 'ORD-2024-1888',
//     customer: 'Sneha Reddy',
//     email: 'sneha.reddy@email.com',
//     items: 2,
//     total: 3200,
//     status: 'delivered',
//     date: '2024-05-16',
//     paymentMethod: 'Debit Card',
//     shippingAddress: 'Hyderabad, Telangana'
//   },
//   {
//     id: 'ORD-2024-1887',
//     customer: 'Vikram Singh',
//     email: 'vikram.s@email.com',
//     items: 4,
//     total: 6890,
//     status: 'cancelled',
//     date: '2024-05-15',
//     paymentMethod: 'UPI',
//     shippingAddress: 'Pune, Maharashtra'
//   },
//   {
//     id: 'ORD-2024-1886',
//     customer: 'Ananya Iyer',
//     email: 'ananya.iyer@email.com',
//     items: 2,
//     total: 2499,
//     status: 'delivered',
//     date: '2024-05-14',
//     paymentMethod: 'Net Banking',
//     shippingAddress: 'Chennai, Tamil Nadu'
//   },
//   {
//     id: 'ORD-2024-1885',
//     customer: 'Rahul Verma',
//     email: 'rahul.v@email.com',
//     items: 1,
//     total: 899,
//     status: 'processing',
//     date: '2024-05-14',
//     paymentMethod: 'UPI',
//     shippingAddress: 'Kolkata, West Bengal'
//   },
//   {
//     id: 'ORD-2024-1884',
//     customer: 'Deepika Menon',
//     email: 'deepika.m@email.com',
//     items: 3,
//     total: 5299,
//     status: 'shipped',
//     date: '2024-05-13',
//     paymentMethod: 'Credit Card',
//     shippingAddress: 'Kochi, Kerala'
//   }
// ];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {
      setLoading(true);
      const data = await getAllOrders(0,10,"orderDate","desc");
      const ordersWithAddress = await Promise.all(
      data.content.map(async (order) => {
        try {

          const address = await getAddress(order.addressId);

          return {
            ...order,
            address
          };

        } catch (err) {

          return {
            ...order,
            address: null
          };
        }
      })
    );

    setOrders(ordersWithAddress);
    console.log(ordersWithAddress)
  
    } catch (error) {
      console.error(error);
       console.log(error.response);

   console.log(error.response.data);

   console.log(error.response.status);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {

    try {
        
      await updateOrderStatus(orderId, newStatus);
        setOrders(prev =>
            prev.map(order =>
                order.orderId === orderId
                    ? { ...order, orderStatus: newStatus }
                    : order
            )
        );

        setSelectedOrder(prev => ({
            ...prev,
            orderStatus: newStatus
        }));
        toast.success("Order status updated");
        setShowModal(false);

    } catch (error) {
     console.error(error);
     toast.error("Unable to change Orderstatus..!!")
    }
  };

  const statusConfig = {
    PENDING: { label: 'Pending', color: '#ff9800', icon: Clock1, bg: '#fff3e0' },
    PLACED: { label: 'Placed', color: '#2196f3', icon: Package2, bg: '#e3f2fd' },
    SHIPPED: { label: 'Shipped', color: '#9c27b0', icon: TrendingUpIcon, bg: '#f3e5f5' },
    DELIVERED: { label: 'Delivered', color: '#4caf50', icon: CheckCircle2, bg: '#e8f5e9' },
    CANCELLED: { label: 'Cancelled', color: '#f44336', icon: XCircleIcon, bg: '#ffebee' }
  };

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order?.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order?.phone?.includes(searchTerm) ||

        `${order?.address?.firstName} ${order?.address?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || order.orderStatus === filterStatus.toUpperCase();
      
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, filterStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: orders.length,
      revenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
      pending: orders.filter(o => o.orderStatus === 'PENDING').length,
      delivered: orders.filter(o => o.orderStatus === 'DELIVERED').length
    };
  }, [orders]);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #787272 0%, #796b86 100%)',
      fontFamily: '"Work Sans", system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: '#fff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Order Management
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
          Manage and track all customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Orders</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: 0 }}>{stats.total}</h2>
            </div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBagIcon size={28} color="#fff" />
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Revenue</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: 0 }}>₹{stats?.revenue?.toLocaleString()}</h2>
            </div>
            
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Pending Orders</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: 0 }}>{stats?.pending}</h2>
            </div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock10 size={28} color="#fff" />
            </div>
          </div>
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
           onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Delivered</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: 0 }}>{stats?.delivered}</h2>
            </div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2Icon size={28} color="#fff" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Toolbar */}
        <div style={{ 
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Search */}
          <div style={{ 
            flex: '1 1 300px',
            position: 'relative'
          }}>
            <SearchCheck
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#999'
              }} 
            />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '2px solid #f0f0f0',
                borderRadius: '12px',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
            />
          </div>

          {/* Filter */}
          <div style={{ position: 'relative' }}>
            <FilterIcon
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#999',
                pointerEvents: 'none'
              }} 
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '0.875rem 2.5rem 0.875rem 3rem',
                border: '2px solid #f0f0f0',
                borderRadius: '12px',
                fontSize: '0.95rem',
                outline: 'none',
                cursor: 'pointer',
                background: '#fff',
                appearance: 'none',
                fontFamily: 'inherit'
              }}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDownCircle 
              size={18} 
              style={{ 
                position: 'absolute', 
                right: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#999',
                pointerEvents: 'none'
              }} 
            />
          </div>

          {/* Export Button */}
          <button
            style={{
              padding: '0.875rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s ease',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <DownloadIcon size={18} />
            Export
          </button>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order ID</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '1rem 1rem', textAlign: 'left', fontWeight: '600', color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order, index) => {
                const config = statusConfig[order?.orderStatus];
                const StatusIcon = config?.icon;
                
                return (
                  <tr 
                    key={order.orderId}
                    style={{ 
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s ease',
                      animation: `fadeIn 0.5s ease ${index * 0.05}s both`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '1rem 1rem' }}>
                      <span style={{ fontWeight: '600', color: '#667eea' }}>{order.orderId}</span>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.25rem' }}>{order?.address?.firstName} {order?.address?.lastName}</div>
                        <div style={{ fontSize: '0.85rem', color: '#bc6060' }}>{order.email}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#666' }}>{order.orderItems?.map(item => item.productTitle).join(", ")}</td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <span style={{ fontWeight: '600', color: '#333' }}>₹{order?.totalAmount?.toLocaleString?.() || 0}</span>
                    </td>
                    <td style={{ padding: '1rem 1rem', color: '#666' }}>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        background: config?.bg,
                        color: config?.color,
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {/* <StatusIco size={16} /> */}
                        {config?.label}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1rem' }}>
                      <button
                        onClick={() => openOrderDetails(order)}
                        style={{
                          padding: '0.5rem 1.25rem',
                          background: '#fff',
                          color: '#667eea',
                          border: '2px solid #667eea',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#667eea';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.color = '#667eea';
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div style={{ 
              padding: '4rem 2rem', 
              textAlign: 'center',
              color: '#999'
            }}>
              <Package2Icon size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem' }}>No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ 
              padding: '2rem',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700', 
                color: '#333',
                marginBottom: '0.5rem'
              }}>
                Order Details
              </h2>
              <p style={{ color: '#999', fontSize: '0.95rem' }}>{selectedOrder.orderId}</p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              {/* Customer Info */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '1rem'
                }}>
                  Customer Information
                </h3>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  display: 'grid',
                  gap: '1rem'
                }}>
                  <div>
                    <span style={{ color: '#999', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Name</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{selectedOrder?.address?.firstName} {selectedOrder?.address?.lastName}</span>
                  </div>
                  <div>
                    <span style={{ color: '#999', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Email</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{selectedOrder.email}</span>
                  </div>
                  <div>
                    <span style={{ color: '#999', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>Shipping Address</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{selectedOrder?.address?.address},{selectedOrder?.address?.city},{selectedOrder?.address?.state} - {selectedOrder?.address?.pinCode}</span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '1rem'
                }}>
                  Order Information
                </h3>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  display: 'grid',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#999' }}>Items</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{selectedOrder?.orderItems?.map(item => item.productTitle).join(", ")}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#999' }}>Order Date</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{new Date(selectedOrder?.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#999' }}>Payment Method</span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #e0e0e0' }}>
                    <span style={{ color: '#333', fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                    <span style={{ color: '#667eea', fontWeight: '700', fontSize: '1.1rem' }}>₹{selectedOrder?.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '1rem'
                }}>
                  Update Order Status
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateOrderStatus(selectedOrder.orderId, status)}
                      disabled={selectedOrder?.orderStatus === status}
                      style={{
                        padding: '1rem',
                        background: selectedOrder?.orderStatus === status ? config.bg : '#fff',
                        color: selectedOrder?.orderStatus === status ? config.color : '#333',
                        border: `2px solid ${selectedOrder.orderStatus === status ? config.color : '#f0f0f0'}`,
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: selectedOrder?.orderStatus === status ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease',
                        opacity: selectedOrder?.orderStatus === status ? 0.7 : 1,
                        fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOrder.orderStatus !== status) {
                          e.currentTarget.style.background = config.bg;
                          e.currentTarget.style.borderColor = config.color;
                          e.currentTarget.style.color = config.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOrder.orderStatus !== status) {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.borderColor = '#f0f0f0';
                          e.currentTarget.style.color = '#333';
                        }
                      }}
                    >
                      <config.icon size={20} />
                      {selectedOrder?.orderStatus === status ? `Current: ${config?.label}` : `Mark as ${config.label}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ 
              padding: '1.5rem 2rem',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.875rem 2rem',
                  background: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default OrderManagement;