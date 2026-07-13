import React from 'react';

const AddressStepComponent = ({ formData, savedAddresses, handleInputChange, handleAddressSelection, handleUseNewAddress,errors }) => {
 
 const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                         "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
                         "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
                          "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"];
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
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            {errors.phone && (
              <div className="invalid-feedback">
                {errors.phone}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          {errors.email && (
            <div className="invalid-feedback">
              {errors.email}
            </div>
          )}
          </div>
        </div>

        <hr />

        <h6 className="text-muted mb-3">Shipping Address</h6>
        
        <div className="mb-4">
          <h6 className="mb-3">Saved Addresses</h6>
          {errors.selectedAddress && (
            <div className="alert alert-danger py-2 mb-3">
              <i className="bi bi-exclamation-circle me-2"></i>
              {errors.selectedAddress}
            </div>
          )}
          <div className="row">
            {savedAddresses?.map(address => (
              <div key={address?.id} className="col-md-6 mb-3">
                <div
                  className={`card h-100 cursor-pointer ${
                    formData.selectedAddressId === address.id
                      ? "border-primary bg-primary bg-opacity-10"
                      : ""
                  } ${
                    errors.selectedAddress ? "border-danger" : ""
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
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  name="firstName"
                  value={formData.newAddress.firstName}
                  onChange={handleInputChange}
                />

                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  name="lastName"
                  value={formData.newAddress.lastName}
                  onChange={handleInputChange}
                />

                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Address *</label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                name="address"
                value={formData.newAddress.address}
                onChange={handleInputChange}
              />

              {errors.address && (
                <div className="invalid-feedback">
                  {errors.address}
                </div>
              )}
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
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  name="city"
                  value={formData.newAddress.city}
                  onChange={handleInputChange}
                />

                {errors.city && (
                  <div className="invalid-feedback">
                    {errors.city}
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">State *</label>
               <select
                  className={`form-select ${errors.state ? "is-invalid" : ""}`}
                  name="state"
                  value={formData.newAddress.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>

                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <div className="invalid-feedback">
                    {errors.state}
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">PIN Code *</label>
                <input
                  type="text"
                  className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                  name="pinCode"
                  value={formData.newAddress.pinCode}
                  onChange={handleInputChange}
                />

                {errors.pinCode && (
                  <div className="invalid-feedback">
                    {errors.pinCode}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressStepComponent;