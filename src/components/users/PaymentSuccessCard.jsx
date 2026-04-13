import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessCard = ({ orderId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user/order"); // redirect after 4 seconds
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: "rgba(0, 0, 0, 0.4)", // dark translucent overlay
        backdropFilter: "blur(5px)", // blur background
        zIndex: 9999,
      }}
    >
      <motion.div
        className="card text-center p-5 shadow-lg border-0 bg-white"
        style={{ maxWidth: "450px", borderRadius: "20px" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="green"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.97l4.243-4.242-1.414-1.415L6.97 8.142 5.207 6.378 3.793 7.793l3.177 3.177z" />
          </svg>
        </div>

        <h3 className="fw-bold text-success mb-2">Order Placed Successfully 🎉</h3>
        <p className="text-muted mb-3">
          Your payment was successful. We’re preparing your order now.
        </p>
        <p className="small text-secondary">
          <b>Order ID:</b> {orderId}
        </p>

        <div className="spinner-border text-success mt-3" role="status">
          <span className="visually-hidden">Redirecting...</span>
        </div>
        <p className="text-muted mt-2">Redirecting to My Orders...</p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessCard;
