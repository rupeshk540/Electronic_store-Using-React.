
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cancelOrder, getOrdersOfUser, requestReturn } from '../../services/OrderService';
import { toast } from 'react-toastify';
import { createReview } from '../../services/ReviewService';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

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

    case "CANCELLED":
      return "cancelled";

    case "RETURN_REQUESTED":
      return "return_requested";

    case "RETURNED":
      return "returned";

  case "RETURN_REJECTED":
    return "return_rejected";
  
  case "RETURN_APPROVED":
    return "return_approved";
  
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

const handleReturn = async(orderId) => {

   try{
      await requestReturn(orderId);
      toast.success("Return request submitted");
      loadOrders();

   }catch(error){
      toast.error("Error in Returning Order");
   }
}

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  
  const openReviewModal = (item, orderId) => {

    setSelectedItem({
        ...item,
        orderId
    });

    setRating(5);

    setReview("");

    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {

    if (!selectedItem) {
      toast.error("No product selected");
      return;
    }

    try {
      const reviewData = {

        productId: selectedItem?.productId,
        orderId: selectedItem?.orderId,
        rating,
        review
      };
    
      await createReview(reviewData);
      toast.success("Review added successfully");
      setShowReviewModal(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to add review");
    }
  };

 const filters = [
  { key: "all", label: "All Orders" },
  { key: "active", label: "Active" }, 
  // placed + dispatched + shipped + pending

  { key: "delivered", label: "Delivered" },
  { key: "returns", label: "Returns" }, 
  // return_requested + return_approved + returned + return_rejected

  { key: "cancelled", label: "Cancelled" }
];

  const statusConfig = {
    placed: { label: 'Order Placed', color: '#7b1fa2', bgColor: '#f3e5f5', icon: '📦' },
    dispatched: { label: 'Dispatched', color: '#ef6c00', bgColor: '#fff3e0', icon: '🚛' },
    shipped: { label: 'Shipped', color: '#1976d2', bgColor: '#e3f2fd', icon: '🚚' },
    delivered: { label: 'Delivered', color: '#388e3c', bgColor: '#e8f5e9', icon: '✓' },
    pending: { label: 'Pending', color: '#f57c00', bgColor: '#fff8e1', icon: '⏳' },
    cancelled: { label: 'Cancelled', color: '#d32f2f', bgColor: '#ffebee', icon: '✕' },
    return_requested: { label: 'Return Requested', color: '#ef6c00', bgColor: '#fff3e0', icon: '↩️' },
    return_approved: { label: 'Return Approved', color: '#2e7d32', bgColor: '#e8f5e9', icon: '✔️' },
    returned: { label: 'Returned', color: '#455a64', bgColor: '#eceff1', icon: '📦' },
    return_rejected: { label: 'Return Rejected', color: '#c62828', bgColor: '#ffebee', icon: '❌' }
  };

  const paymentConfig = {
    SUCCESS: { label: "Paid", color: "#2e7d32", bgColor: "#e8f5e9", icon: "💳" },
    PENDING: { label: "Pending", color: "#ef6c00", bgColor: "#fff3e0", icon: "⏳" },
    FAILED: { label: "Failed", color: "#c62828", bgColor: "#ffebee", icon: "❌" },
    REFUNDED: { label: "Refunded", color: "#6a1b9a", bgColor: "#f3e5f5", icon: "💸" }
  };

  const filteredOrders =
  activeFilter === "all"
    ? orders
    : orders.filter(order => {

        const status = mapOrderStatus(order.orderStatus);

        if (activeFilter === "active") {
          return [
            "placed",
            "dispatched",
            "shipped",
            "pending"
          ].includes(status);
        }

        if (activeFilter === "returns") {
          return [
            "return_requested",
            "return_approved",
            "returned",
            "return_rejected"
          ].includes(status);
        }

        return status === activeFilter;
      });

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
                  {filter.key === "all" && orders.length}
                  {filter.key === "active" &&
                    orders.filter(o =>
                      ["placed", "dispatched", "shipped", "pending"]
                        .includes(mapOrderStatus(o.orderStatus))
                    ).length
                  }

                  {filter.key === "returns" &&
                    orders.filter(o =>
                      [
                        "return_requested",
                        "return_approved",
                        "returned",
                        "return_rejected"
                      ].includes(mapOrderStatus(o.orderStatus))
                    ).length
                  }

                  {!["all", "active", "returns"].includes(filter.key) &&
                    orders.filter(
                      o => mapOrderStatus(o.orderStatus) === filter.key
                    ).length
                  }

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
                       <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                          <h5 className="mb-0 order-id">{order.orderId}</h5>
                          <span 
                            className="status-badge px-3 py-1 rounded-pill"
                            style={{
                              backgroundColor: statusConfig[status]?.bgColor || "#f5f5f5",
                              color: statusConfig[status]?.color || "#333",
                              fontSize: '0.85rem'
                            }}
                          >
                            {statusConfig[status]?.icon}
                            {statusConfig[status]?.label || status}
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
                      <div key={idx} 
                        className="d-flex justify-content-between align-items-center border-bottom py-2"
                        style={{
                          cursor: "pointer",
                          transition: "0.2s ease"
                        }}
                        onClick={() => navigate(`/products/${item.productId}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e1e2e3";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div className="col-auto">
                          <img 
                            src={item.image} 
                            className="item-image"
                            width="80"
                            height="80"
                          />
                        </div>
                        <div className="col ms-4">
                          <h6 className="mb-1">{item.productTitle}</h6>
                          <div className="text-muted small mb-2">Qty: {item.quantity}</div>
                          <div className="fw-semibold" style={{ color: '#2874f0' }}>
                            ₹{item.subtotal.toLocaleString('en-IN')}
                          </div>
                        </div>

                        {status === 'delivered' && (
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={(e) =>{
                              e.stopPropagation();
                              openReviewModal(item, order.orderId)
                            }}
                          >
                            Rate & Review
                          </button>
                        )}

                      </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap  align-items-center gap-2 mt-3 pt-3 border-top">
                      {/* LEFT SIDE ACTION BUTTONS */}
                      <div className="d-flex flex-wrap gap-2">
                    
                        {status === 'delivered' && (
                          <>
                            {order.orderStatus === "DELIVERED" && (
                              <button 
                                className="btn btn-outline-warning btn-sm mt-2"
                                onClick={() => handleReturn(order.orderId)}>
                                Return Order
                              </button>
                            )}
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
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="ms-auto d-flex align-items-center gap-2">
                        <span
                          className="px-3 py-2 rounded d-inline-flex align-items-center gap-2"
                          style={{
                            backgroundColor:
                              order.paymentStatus === "SUCCESS"
                                ? "#e8f5e9"
                                : order.paymentStatus === "PENDING"
                                ? "#f6f6f6"
                                : order.paymentStatus === "FAILED"
                                ? "#ffebee"
                                : "#ebe6ec",

                            color:
                              order.paymentStatus === "SUCCESS"
                                ? "#2e7d32"
                                : order.paymentStatus === "PENDING"
                                ? "#ef6c00"
                                : order.paymentStatus === "FAILED"
                                ? "#c62828"
                                : "#6a1b9a",

                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >Payment Status :
                        {order.paymentStatus === "SUCCESS" && "💳 Paid"}

                        {order.paymentStatus === "PENDING" && "⏳ Pending"}

                        {order.paymentStatus === "FAILED" && "❌ Failed"}

                        {order.paymentStatus === "REFUNDED" && "💸 Refunded"}
                        </span>
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

      {/* Review Model */}
      {showReviewModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Rate & Review
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowReviewModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <h6>
                  {selectedItem?.productTitle}
                </h6>

                {/* Rating */}
                <div className="mb-3 mt-3">

                  <label className="form-label">
                    Rating
                  </label>

                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) =>
                      setRating(Number(e.target.value))
                    }
                  >
                    <option value={5}>5 ⭐</option>
                    <option value={4}>4 ⭐</option>
                    <option value={3}>3 ⭐</option>
                    <option value={2}>2 ⭐</option>
                    <option value={1}>1 ⭐</option>
                  </select>
                </div>

                {/* Comment */}
                <div className="mb-3">

                  <label className="form-label">
                    Review
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) =>
                      setReview(e.target.value)
                    }
                  />
                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSubmitReview}
                >
                  Submit Review
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