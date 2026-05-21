import React from 'react';

const AddressStepComponent = ({ formData, savedAddresses, handleInputChange, handleAddressSelection, handleUseNewAddress }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0"><i className="bi bi-person me-2"></i>Contact & Shipping Information</h5>
      </div>
      <div className="card-body">
        <h6 className="text-muted mb-3">Contact Information</h6>
        <div className="row mb-3">
          <div className="col-md-6">
             <label className="form-label">Phone Number *</label>
            <input 
              type="tel" 
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <hr />

        <h6 className="text-muted mb-3">Shipping Address</h6>
        
        <div className="mb-4">
          <h6 className="mb-3">Saved Addresses</h6>
          <div className="row">
            {savedAddresses?.map(address => (
              <div key={address?.id} className="col-md-6 mb-3">
                <div 
                  className={`card h-100 cursor-pointer ${
                    formData.selectedAddressId === address.id ? 'border-primary bg-primary bg-opacity-10' : ''
                  }`}
                  onClick={() => handleAddressSelection(address.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title mb-0">
                        <i className="bi bi-house me-2"></i>
                        {address.type}
                      </h6>
                      {address.isDefault && (
                        <span className="badge bg-success">Default</span>
                      )}
                      {formData.selectedAddressId === address.id && (
                        <i className="bi bi-check-circle-fill text-primary"></i>
                      )}
                    </div>
                    <div className="small text-muted">
                      <div>{address.firstName} {address.lastName}</div>
                      <div>{address.address}</div>
                      {address.apartment && <div>{address.apartment}</div>}
                      <div>{address.city}, {address.state} {address.pinCode}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="col-md-6 mb-3">
              <div 
                className={`card h-100 cursor-pointer border-dashed ${
                  formData.useNewAddress ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'
                }`}
                onClick={handleUseNewAddress}
                style={{ cursor: 'pointer', borderStyle: 'dashed' }}
              >
                <div className="card-body p-3 d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    {formData.useNewAddress ? (
                      <>
                        <i className="bi bi-check-circle-fill text-primary h4 mb-2"></i>
                        <h6 className="mb-0">New Address Selected</h6>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle h4 mb-2 text-muted"></i>
                        <h6 className="mb-0 text-muted">Add New Address</h6>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {formData.useNewAddress && (
          <div>
            <h6 className="text-muted mb-3">New Address Details</h6>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="firstName"
                  value={formData.newAddress.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="lastName"
                  value={formData.newAddress.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Address *</label>
              <input 
                type="text" 
                className="form-control"
                name="address"
                value={formData.newAddress.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Apartment, suite, etc. (optional)</label>
              <input 
                type="text" 
                className="form-control"
                name="apartment"
                value={formData.newAddress.apartment}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">City *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="city"
                  value={formData.newAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State *</label>
                <select 
                  className="form-select"
                  name="state"
                  value={formData.newAddress.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="CA">Maharastra</option>
                  <option value="NY">Madya Pradesh</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">PIN Code *</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="pinCode"
                  value={formData.newAddress.pinCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressStepComponent;