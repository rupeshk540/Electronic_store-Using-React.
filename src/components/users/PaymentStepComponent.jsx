import React from 'react';

const PaymentStepComponent = ({ 
  formData, 
  handleInputChange, 
  getTotal,
  paymentError,
  setPaymentError,
  paymentSuccess
}) => {
  const availableMethods = ["COD", "RAZORPAY"];
  const isAvailable = (method) => availableMethods.includes(method.toUpperCase());

  const handleUnavailable = (method) => {
    alert(`${method} is currently unavailable. Please choose COD or Razorpay.`);
  };
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0"><i className="bi bi-credit-card me-2"></i>Payment Information</h5>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <h6 className="text-muted mb-3">Payment Method</h6>
          
          {/* Cash on Delivery Option */}
          <div className="form-check mb-3 p-3 border rounded border-success">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              value="COD"
              checked={formData.paymentMethod === 'COD'}
              onChange={(e)=> isAvailable('COD')?handleInputChange(e):handleUnavailable('COD')}
              id="COD"
            />
            <label className="form-check-label w-100" htmlFor="cod">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cash-coin me-2 text-success"></i>
                    <strong>Cash on Delivery (COD)</strong>
                    <span className="badge bg-success ms-2">Popular</span>
                  </div>
                  <div className="text-muted small mt-1">
                    Pay with cash when your order is delivered to your doorstep
                  </div>
                  <div className="mt-2">
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-truck me-1"></i>Pay on Delivery
                    </span>
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-shield-check me-1"></i>No Advance Payment
                    </span>
                    <span className="badge bg-light text-dark p-1">
                      <i className="bi bi-house-door me-1"></i>Doorstep Service
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-success small">
                    <i className="bi bi-check-circle"></i> Available
                  </div>
                </div>
              </div>
            </label>
          </div>
          
          {/* Razorpay Payment Option */}
          <div className="form-check mb-3 p-3 border rounded">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              value="RAZORPAY"
              checked={formData.paymentMethod === 'RAZORPAY'}
              onChange={(e)=>isAvailable('RAZORPAY')?handleInputChange(e):handleUnavailable('RAZORPAY')}
              id="RAZORPAY"
            />
            <label className="form-check-label w-100" htmlFor="juspay">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-credit-card-2-front me-2 text-primary"></i>
                    <strong>Razorpay - Secure Payment</strong>
                  </div>
                  <div className="text-muted small mt-1">
                    Pay securely with Credit/Debit Cards, UPI, Net Banking & Wallets
                  </div>
                  <div className="mt-2">
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-credit-card me-1"></i>Cards
                    </span>
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-phone me-1"></i>UPI
                    </span>
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-qr-code-scan"></i>QR Code
                    </span>
                    <span className="badge bg-light text-dark me-1 p-1">
                      <i className="bi bi-bank me-1"></i>Net Banking
                    </span>
                    <span className="badge bg-light text-dark p-1">
                      <i className="bi bi-wallet2 me-1"></i>Wallets
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-success small">
                    <i className="bi bi-shield-check"></i> Secure
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Credit Card Option */}
          <div className="form-check mb-3 p-3 border rounded">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              value="credit"
              checked={formData.paymentMethod === 'credit'}
              onChange={(e)=>isAvailable('credit-card')?handleInputChange(e):handleUnavailable('credit-card')}
              id="credit"
            />
            <label className="form-check-label w-100" htmlFor="credit">
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card me-2"></i>
                <strong>Credit/Debit Card</strong>
              </div>
              <div className="text-muted small mt-1">Enter your card details manually</div>
            </label>
          </div>

          {/* PayPal Option */}
          <div className="form-check mb-3 p-3 border rounded">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={(e)=>isAvailable('Paypal')?handleInputChange(e):handleUnavailable('Paypal')}
              id="paypal"
            />
            <label className="form-check-label w-100" htmlFor="paypal">
              <div className="d-flex align-items-center">
                <i className="bi bi-paypal me-2 text-primary"></i>
                <strong>PayPal</strong>
              </div>
              <div className="text-muted small mt-1">Pay with your PayPal account</div>
            </label>
          </div>
        </div>

        {/* Payment Success Display */}
        {paymentSuccess && (
          <div className="alert alert-success">
            <i className="bi bi-check-circle me-2"></i>
            {paymentSuccess}
          </div>
        )}

        {/* Payment Error Display */}
        {paymentError && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {paymentError}
            <button 
              type="button" 
              className="btn-close float-end"
              onClick={() => setPaymentError('')}
            ></button>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {formData.paymentMethod === 'COD' && (
          <div className="alert alert-success">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Cash on Delivery Selected</strong>
            <div className="mt-2 small">
              • <strong>No advance payment required</strong><br/>
              • Pay in cash when your order is delivered<br/>
              • Please keep exact change ready for faster delivery<br/>
              • COD charges: ₹40 (already included in total)<br/>
              • Available for orders up to ₹50,000
            </div>
            <div className="mt-3 p-2 bg-light rounded">
              <strong className="text-success">Total Amount to Pay on Delivery: ₹{getTotal().toFixed(2)}</strong>
            </div>
          </div>
        )}

        {/* Juspay Payment Info */}
        {formData.paymentMethod === 'RAZORPAY' && (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Secure Payment with Razorpay</strong>
            <div className="mt-2 small">
              • Your payment is processed securely by Razorpay<br/>
              • Choose from multiple payment options<br/>
              • 256-bit SSL encryption for your security<br/>
              • PCI DSS compliant payment processing
            </div>
              <div className="mt-2">
                <div className="spinner-border spinner-border-sm me-2"></div>
                Loading payment gateway...
              </div>
          </div>
        )}

        {/* PayPal Payment Info */}
        {formData.paymentMethod === 'paypal' && (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            <strong>PayPal Payment</strong>
            <div className="mt-2 small">
              • Secure payment processing by PayPal<br/>
              • Pay with your PayPal account or credit card<br/>
              • Buyer protection included<br/>
              • No need to share card details with us
            </div>
              <div className="mt-2">
                <div className="spinner-border spinner-border-sm me-2"></div>
                Loading PayPal...
              </div>
              <div className="mt-3">
                <div id="paypal-button-container"></div>
              </div>
          </div>
        )}

        {/* Credit Card Payment Info */}
        {formData.paymentMethod === 'credit' && (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Credit/Debit Card Payment</strong>
            <div className="mt-2 small">
              • Powered by Stripe - Industry leading security<br/>
              • PCI DSS Level 1 certified<br/>
              • 256-bit SSL encryption<br/>
              • Supports all major credit cards
            </div>
              <div className="mt-2">
                <div className="spinner-border spinner-border-sm me-2"></div>
                Loading Stripe...
              </div>
          </div>
        )}

        {formData.paymentMethod === 'credit' && (
          <div>
            <div className="mb-3">
              <label className="form-label">Card Number *</label>
              <input 
                type="text" 
                className="form-control"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Name on Card *</label>
              <input 
                type="text" 
                className="form-control"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Expiry Date *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">CVV *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === 'paypal' && (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            You will be redirected to PayPal to complete your payment.
          </div>
        )}

        <hr />
        <h6 className="text-muted mb-3">Billing Address</h6>
        <div className="form-check mb-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            name="sameAsShipping"
            checked={formData.sameAsShipping}
            onChange={handleInputChange}
            id="sameAsShipping"
          />
          <label className="form-check-label" htmlFor="sameAsShipping">
            Same as shipping address
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentStepComponent;