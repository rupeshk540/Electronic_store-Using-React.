
import React, { useContext, useEffect, useState } from 'react';
import AddressStepComponent from '../../components/users/AddressStepComponent';
import PaymentStepComponent from '../../components/users/PaymentStepComponent';
import ShippingStepComponent from '../../components/users/ShippingStepComponent';
import { createOrder, createOrderAndInitPayment, verifyPayment } from '../../services/OrderService';
import AddressContext from '../../context/AddressContext';
import CartContext from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import PaymentSuccessCard from '../../components/users/PaymentSuccessCard';
import { getProduct } from '../../services/ProductService';

const CheckoutPage = () => {
  
  const { addresses, selectedAddressId, selectAddress, createAddress } = useContext(AddressContext);
  const { cart } = useContext(CartContext);
  const {userData} =useContext(UserContext);
  const location = useLocation();
  const productId = location.state?.productId;
  const quantity = location.state?.quantity || 1;
  const [errors, setErrors] = useState({});

  const [buyNowItem, setBuyNowItem] = useState(null);
  const [formData, setFormData] = useState({
  selectedAddressId:addresses?.find(addr => addr.isDefault)?.id || null,
  useNewAddress: false,       // user chooses new address instead of saved one
  newAddress: {
    firstName:"",
    lastName:"",
    address:"",
    apartment:"",
    city: "",
    state: "",
    pinCode: "",
    // landmark: "",
  },
  shippingMethod: "STANDARD",
  paymentMethod: "COD",
  sameAsShipping:true,
  notes: "",
  phone: userData?.phone || "",
  email: userData?.email || "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');
  const [orderSuccessData, setOrderSuccessData] = useState(null);

//useEffect to load product
  useEffect(() => {
  if (productId) {
    getProduct(productId)
      .then((product) => {

        setBuyNowItem({
          product,
          quantity
        });

      })
      .catch((err) => {
        console.error("Failed to load product", err);
      });
  }

}, [productId, quantity]);

const checkoutItems = buyNowItem?.product
  ? [buyNowItem]
  : (cart?.items || []);

 // ---------------------- Helper Functions -----------------------

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If user is filling newAddress fields
    if (formData.useNewAddress && name in formData.newAddress) {
      setFormData(prev => ({
        ...prev,
        newAddress: {
          ...prev.newAddress,
          [name]: value
        }
      }));
    } else {
    // Top-level fields
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  };

  const handleAddressSelection = (addressId) => {
      setFormData(prev => ({
        ...prev,
        selectedAddressId: addressId,
        useNewAddress: false,
      }));
    
  };

  const handleUseNewAddress = () => {
    setFormData(prev => ({
      ...prev,
      selectedAddressId:'',
      useNewAddress: true,
    }));
  };

  const getSubtotal = () => {
   return (checkoutItems || []).reduce(
    (total, item) =>
      total + ((item?.product?.discountedPrice || 0) * (item?.quantity || 0)),
      0
    );
  };

  const getShippingCost = () => {
    switch (formData.shippingMethod) {
      case 'express': return 15.99;
      case 'overnight': return 25.99;
      default: return 0;
    }
  };

  const getTax = () => {
    return getSubtotal() * 0.08;
  };

  const getTotal = () => {
    const shipping = formData.shippingMethod === 'EXPRESS' ? 15 : 0;
    const tax = getSubtotal() * 0.08;
    return getSubtotal() + shipping + tax;
  };

  const getTotalItems = () => {
    return (checkoutItems || []).reduce((total, item) => total + item.quantity, 0);
  };



// ---------------------- Build Order Payload -----------------------

 const buildOrderRequest = async() => {
  let addressId = formData.selectedAddressId
  if (formData.useNewAddress) {
    const res = await createAddress(formData.newAddress);
    addressId = res?.id;
  }

  return {
   userId: userData?.user.userId,
    addressId: addressId,
    newAddress:  formData.useNewAddress ? formData.newAddress:null,       // send only if new
    shippingMethod: formData.shippingMethod.toUpperCase(),
    paymentMethod: formData.paymentMethod.toUpperCase(),
    subtotal:getSubtotal(),
    shippingFee:getShippingCost(),
    discount: 0,
    totalAmount:getTotal(),
    notes: formData.notes,
    fromCart: !buyNowItem,             //true if cart checkout
    phone: formData.phone,
    email: formData.email,
    orderItems: checkoutItems.map((item) => ({
      productId: item.product.productId,
      productTitle: item.product.title,
      price: item.product.discountedPrice,
      quantity: item.quantity,
    })),
  };
}

 // ----------------------Order & Payment Logic -----------------------

const handlePlaceOrder = async () => {

  if (productId && !buyNowItem?.product) {
    setPaymentError("Please wait, product is loading...");
    return;
  }
  try {
    setIsProcessing(true);
    setPaymentError("");
    setPaymentSuccess("");

  if (productId && !buyNowItem) {
    setPaymentError("Product still loading...");
    return;
  }

  const orderData = await buildOrderRequest();
  const result = await createOrderAndInitPayment(orderData);
   
    if (formData.paymentMethod === "COD") {
      setPaymentSuccess("Order placed successfully with COD..!");
      setOrderSuccessData( result.orderId );
      return;
    }
    // then only check Razorpay gateway
    if (!result || !result.gatewayOrderId) {
      throw new Error(result.message || "Payment initialization failed");
    }

    
    if (formData.paymentMethod === "RAZORPAY") {
      await openRazorpay(
        result.gatewayOrderId, 
        result.amount,
        result.gatewayKey,
        result.orderId
      );
    }
  } catch (error) {
    setPaymentError(`Order Save Error: ${error.message}`);
  }finally{
    setIsProcessing(false);
  }
};

// Load Razorpay script dynamically
 const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });
  };

// Open Razorpay payment modal
const openRazorpay = async (gatewayOrderId, amount, gatewayKey, orderId) => {
    await loadRazorpayScript();

    const options = {
      key: gatewayKey,
      amount: Math.round(amount * 100),
      currency: "INR",
      name: "Zepta Store",
      description: "Order Payment",
      order_id: gatewayOrderId,
      handler: async (response) => {
        try {
          // Prepare payload for verification
          const verifyPayload = {
            orderId: orderId, // internal DB order ID
            gatewayOrderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          const verifyResponse = await verifyPayment(verifyPayload)
          // const result = await verifyResponse.json();
          if (verifyResponse.success){
            setOrderSuccessData(orderId);
            setPaymentSuccess("Payment successful! Order confirmed.");
          }else {setPaymentError("Payment verification failed.");}

        } catch (err) {
          setPaymentError("Payment verification error.");
        }
      },
      prefill: {
        name: userData?.user?.name || "",
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const validateStep1 = () => {
    const newErrors = {};

    // Contact Information
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
       newErrors.email = "Enter a valid email address.";
    }

    // Saved Address
    if (!formData.useNewAddress && !formData.selectedAddressId) {
      newErrors.selectedAddress =
        "Please select a delivery address.";
    }

  
    // New Address
    if (formData.useNewAddress) {

      if (!formData.newAddress.firstName.trim()) {
        newErrors.firstName = "First name is required.";
      }

      if (!formData.newAddress.lastName.trim()) {
        newErrors.lastName = "Last name is required.";
      }

      if (!formData.newAddress.address.trim()) {
        newErrors.address = "Address is required.";
      }

      if (!formData.newAddress.city.trim()) {
        newErrors.city = "City is required.";
      }

      if (!formData.newAddress.state.trim()) {
        newErrors.state = "Please select a state.";
      }

      if (!/^\d{6}$/.test(formData.newAddress.pinCode)) {
        newErrors.pinCode = "Enter a valid 6-digit PIN Code.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {

    if (currentStep === 1) {
      if (!validateStep1()) {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

    }

    setCurrentStep(prev => prev + 1);

  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (productId && !buyNowItem) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
  return (
    <div className="container mt-4 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Cart</a></li>
              <li className="breadcrumb-item active">Checkout</li>
            </ol>
          </nav>
          <h1><i className="bi bi-credit-card me-2"></i>Checkout</h1>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="progress mb-3" style={{ height: '4px' }}>
            <div 
              className="progress-bar" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="row text-center">
            <div className="col-4">
              <div className={`badge ${currentStep >= 1 ? 'bg-primary' : 'bg-secondary'} mb-1`}>1</div>
              <div><small>Information</small></div>
            </div>
            <div className="col-4">
              <div className={`badge ${currentStep >= 2 ? 'bg-primary' : 'bg-secondary'} mb-1`}>2</div>
              <div><small>Shipping</small></div>
            </div>
            <div className="col-4">
              <div className={`badge ${currentStep >= 3 ? 'bg-primary' : 'bg-secondary'} mb-1`}>3</div>
              <div><small>Payment</small></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-lg-7">
            {orderSuccessData && <PaymentSuccessCard orderId={orderSuccessData} />}

              {currentStep === 1 && (
                <AddressStepComponent
                  formData={formData}
                  savedAddresses={addresses}
                  handleInputChange={handleInputChange}
                  handleAddressSelection={handleAddressSelection}
                  handleUseNewAddress={handleUseNewAddress}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <ShippingStepComponent
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {currentStep === 3 && (
                <PaymentStepComponent
                  formData={formData}
                  handleInputChange={handleInputChange}
                  paymentSuccess={paymentSuccess}
                  paymentError={paymentError}
                  setPaymentError={setPaymentError}
                  getTotal={getTotal}
                />
              )}

            <div className="d-flex justify-content-between mb-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Next
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-success"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm sticky-top" style={{ top: '100px', zIndex:1}}>
              <div className="card-header">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  {checkoutItems?.map(item => (
                    <div key={item?.cartItemId || item?.product?.productId} className="d-flex align-items-center mb-3">
                      <img 
                        src={item?.product?.productImageUrls?.[0]} 
                        alt={item?.product?.title}
                        className="rounded me-3"
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 small">{item?.product?.title}</h6>
                        <small className="text-muted">Qty: {item?.quantity}</small>
                      </div>
                      <div className="text-end">
                        <strong>${(item?.product?.discountedPrice * item?.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>
                    {getShippingCost() === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `${getShippingCost().toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>₹{getTax().toFixed(2)}</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">₹{getTotal().toFixed(2)}</strong>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout with SSL encryption
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const customStyle = document.createElement('style');
customStyle.innerHTML = `
  .border-dashed {
    border-style: dashed !important;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.2s ease;
  }
`;
document.head.appendChild(customStyle);

export default CheckoutPage;