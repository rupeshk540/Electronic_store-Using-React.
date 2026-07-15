import React from 'react';

const ShippingStepComponent = ({ formData, handleInputChange }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0"><i className="bi bi-truck me-2"></i>Shipping Method</h5>
      </div>
      <div className="card-body">
        <div className="form-check mb-3 p-3 border rounded">
          <input 
            className="form-check-input" 
            type="radio" 
            name="shippingMethod" 
            value="STANDARD"
            checked={formData.shippingMethod === 'STANDARD'}
            onChange={handleInputChange}
            id="STANDARD"
          />
          <label className="form-check-label w-100" htmlFor="standard">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Standard Shipping</strong>
                <div className="text-muted small">5-7 business days</div>
              </div>
              <div className="text-success"><strong>Free</strong></div>
            </div>
          </label>
        </div>
        
        <div className="form-check mb-3 p-3 border rounded">
          <input 
            className="form-check-input" 
            type="radio" 
            name="shippingMethod" 
            value="EXPRESS"
            checked={formData.shippingMethod === 'EXPRESS'}
            onChange={handleInputChange}
            id="EXPRESS"
          />
          <label className="form-check-label w-100" htmlFor="express">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Express Shipping</strong>
                <div className="text-muted small">2-3 business days</div>
              </div>
              <div><strong>₹15.99</strong></div>
            </div>
          </label>
        </div>
        
        <div className="form-check mb-3 p-3 border rounded">
          <input 
            className="form-check-input" 
            type="radio" 
            name="shippingMethod" 
            value="OVERNIGHT"
            checked={formData.shippingMethod === 'OVERNIGHT'}
            onChange={handleInputChange}
            id="OVERNIGHT"
          />
          <label className="form-check-label w-100" htmlFor="overnight">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Overnight Shipping</strong>
                <div className="text-muted small">Next business day</div>
              </div>
              <div><strong>₹25.99</strong></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingStepComponent;