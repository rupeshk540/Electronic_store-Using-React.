import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makePayment } from "../services/paymentService";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
  const createOrder = async () => {
    try {
      const result = await makePayment(orderId,2);
      setPaymentInfo(result.data);

      if (result.data.status === 'created') {
        const options = {
          key: 'rzp_test_1MavwWrVN7zWZ5',
          amount: result.data.amount,
          currency: "INR",
          name: "Electronic Store",
          description: "Make payment to order now...",
          order_id: result.data.razorpayOrderId,
          handler: function (response) {
            toast.success("Payment successful!");
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
            console.log("Signature:", response.razorpay_signature);
          },
          prefill: {
            name: "",
            email: "",
            contact: ""
          },
          theme: {
            color: "#3399cc"
          }
        };
        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating payment order!");
    }
  };

  createOrder();
}, [orderId]);


  return (
    <div>
      <h2>Processing your payment...</h2>
    </div>
  );
};

export default PaymentPage;
