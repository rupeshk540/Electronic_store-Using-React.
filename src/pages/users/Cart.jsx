
import {useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import UserContext from "../../context/UserContext";


const ShoppingCart = () => {
 
  const { cart, setCart, addItemCart, removeItemCart, clearCart } = useContext(CartContext);
  const { userData, isLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    addItemCart(newQuantity, productId, () => {});
  };

  const removeCartItem = (itemId) => {
    removeItemCart(itemId);
  };

   const clearEntireCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };
 
 const getSubtotal = () =>
  cart?.items?.reduce((total, item) => {
    if (item.totalPrice != null) return total + item.totalPrice;
    return total + (item.product?.price ?? 0) * (item.quantity ?? 1);
  }, 0) || 0;


  const getTotalItems = () => {
    return cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const getTax = () => getSubtotal() * 0.08;
  const getTotal = () => getSubtotal() + getTax();


  const gotoCheckoutPage = () => {
    navigate("/user/checkout")
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>
              <i className="bi bi-cart3 me-2"></i>
              Shopping Cart ({getTotalItems()} items)
            </h1>
            {cart?.items?.length > 0 && (
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={handleClearCart}
              >
                <i className="bi bi-trash me-2"></i>
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {!cart || cart?.items?.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info text-center p-5">
              <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
              <h4>Your cart is empty</h4>
              <p className="mb-3">Add some items to get started!</p>
              <button className="btn btn-primary">Continue Shopping</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                {cart?.items?.map((item, index) => (
                  <div key={item.cartItemId}>
                    <div className="p-4">
                      <div className="row align-items-center">
                        <div className="col-md-2 col-3">
                          <img 
                            src={item.product.productImageUrls[0]} 
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                          />
                        </div>
                        <div className="col-md-4 col-9">
                          <h6 className="mb-1">{item.product.title}</h6>
                          <small className="text-muted">{item.description}</small>
                        </div>
                        <div className="col-md-2 col-4 mt-3 mt-md-0">
                          <span className="h6 text-success">${(item.product?.price ?? 0).toFixed(2)}</span>
                        </div>
                        <div className="col-md-3 col-4 mt-3 mt-md-0">
                          <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.product.productId, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input 
                              type="number" 
                              className="form-control text-center"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product.productId, parseInt(e.target.value) || 1)}
                              min="1"
                            />
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.product.productId, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-1 col-4 mt-3 mt-md-0 text-end">
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeCartItem(item.cartItemId)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {index < cart?.items?.length - 1 && <hr className="m-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-3">
              <button className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong className="text-primary">${getTotal().toFixed(2)}</strong>
                </div>

                <button className="btn btn-primary btn-lg w-100 mb-3" onClick={gotoCheckoutPage}>
                  Proceed to Checkout
                </button>

                {/* Payment Icons */}
                <div className="text-center">
                  <small className="text-muted">We accept</small>
                  <div className="mt-2">
                    <span className="badge bg-light text-dark me-2 p-2">
                      <i className="bi bi-credit-card me-1"></i>
                      Visa
                    </span>
                    <span className="badge bg-light text-dark me-2 p-2">
                      <i className="bi bi-credit-card-2-front me-1"></i>
                      MasterCard
                    </span>
                    <span className="badge bg-light text-dark me-2 p-2">
                      <i className="bi bi-paypal me-1"></i>
                      PayPal
                    </span>
                    <span className="badge bg-light text-dark p-2">
                      <i className="bi bi-apple me-1"></i>
                      Apple Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="card shadow-sm mt-3 mb-5">
              <div className="card-body">
                <h6 className="card-title">Promo Code</h6>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter promo code"
                  />
                  <button className="btn btn-outline-secondary">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Clear Cart Confirmation Modal */}
      {showClearModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2 text-warning"></i>
                  Clear Cart
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowClearModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove all items from your cart?</p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowClearModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={clearEntireCart}
                >
                  <i className="bi bi-trash me-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


export default ShoppingCart;