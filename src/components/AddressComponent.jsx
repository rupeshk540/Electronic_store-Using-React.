import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { addAddress, deleteAddress, getAddressesOfUser, updateAddress } from '../services/AddressService';

const AddressManager = () => {
  // const [savedAddresses, setSavedAddresses] = useState([
  //   {
  //     id: 1,
  //     type: 'Home',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     address: '123 Main Street',
  //     apartment: 'Apt 4B',
  //     city: 'New York',
  //     state: 'NY',
  //     zipCode: '10001',
  //     phone: '+1 234-567-8900',
  //     isDefault: true
  //   },
  //   {
  //     id: 2,
  //     type: 'Office',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     address: '456 Business Ave',
  //     apartment: 'Suite 200',
  //     city: 'New York',
  //     state: 'NY',
  //     zipCode: '10002',
  //     phone: '+1 234-567-8901',
  //     isDefault: false
  //   },
  //   {
  //     id: 3,
  //     type: 'Parent\'s House',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     address: '789 Family Street',
  //     apartment: '',
  //     city: 'Brooklyn',
  //     state: 'NY',
  //     zipCode: '11201',
  //     phone: '+1 234-567-8902',
  //     isDefault: false
  //   }
  // ]);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddressData, setNewAddressData] = useState({
    type: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const {isLogin,userData} = useContext(UserContext)

    //Load addresses from backend
   useEffect(() => {
    if (isLogin && userData?.user.userId) {
      loadAddresses(userData.user.userId);
    }
  }, [isLogin, userData?.user.userId]); 

  const loadAddresses = async (userId) => {
    try {
      const data = await getAddressesOfUser(userId);
      setSavedAddresses(data || []);
    } catch (error) {
      console.error("Failed to load addresses", error);
    }
  };

 
   // Handle input changes
  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddressData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  //Save new or edited address
  const saveNewAddress = async () => {
    const newErrors = {};

    if (!newAddressData.type) newErrors.type = "Address type is required";
    if (!newAddressData.phone) newErrors.phone = "Phone is required";
    if (!newAddressData.firstName) newErrors.firstName = "First name is required";
    if (!newAddressData.lastName) newErrors.lastName = "Last name is required";
    if (!newAddressData.address) newErrors.address = "Street address is required";
    if (!newAddressData.city) newErrors.city = "City is required";
    if (!newAddressData.state) newErrors.state = "State is required";
    if (!newAddressData.pinCode) newErrors.pinCode = "PIN code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, newAddressData);
      } else {
        await addAddress(userData.user.userId, newAddressData);
      }
      loadAddresses(userData.user.userId);
      resetForm();
    } catch (error) {
      console.error("Error saving address", error);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddressData({ ...address });
    setShowAddressForm(true);
  };

  // 🔹 Delete address
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(addressId);
        loadAddresses();
      } catch (error) {
        console.error("Error deleting address", error);
      }
    }
  };

  const resetForm = () => {
    setNewAddressData({
      type: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      pinCode: "",
      phone: "",
      isDefault: false,
    });
    setShowAddressForm(false);
    setEditingAddress(null);
    };
  

    const handleAddressSelection = (addressId) => {
      setSelectedAddressId(selectedAddressId === addressId ? null : addressId);
    };

  const handleSetDefault = (addressId) => {
    setSavedAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const cancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setNewAddressData({
      type: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pinCode: '',
      phone: '',
      isDefault: false
    });}

  return (
    <>
      <div className="bg-light min-vh-100" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h5 className="mb-0"><i className="bi bi-geo-alt me-2"></i>My Addresses</h5>
                </div>
                <div className="card-body">
                  {/* New Address Form */}
                  {showAddressForm && (
                    <div className="card border-primary mb-4">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">
                          {editingAddress ? 'Edit Address' : 'Add New Address'}
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Address Type *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.type ? "is-invalid" : ""}`}
                              name="type"
                              value={newAddressData.type}
                              onChange={handleNewAddressChange}
                              placeholder="e.g., Home, Office"
                            />
                            {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input 
                              type="tel" 
                              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                              name="phone"
                              value={newAddressData.phone}
                              onChange={handleNewAddressChange}
                              placeholder="+1 234-567-8900"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">First Name *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                              name="firstName"
                              value={newAddressData.firstName}
                              onChange={handleNewAddressChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">Last Name *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                              name="lastName"
                              value={newAddressData.lastName}
                              onChange={handleNewAddressChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                          </div>

                        </div>
                        <div className="mb-3">
                          <label className="form-label">Street Address *</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                            name="address"
                            value={newAddressData.address}
                            onChange={handleNewAddressChange}
                          />
                          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Apartment, suite, etc.</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.apartment ? "is-invalid" : ""}`}
                            name="apartment"
                            value={newAddressData.apartment}
                            onChange={handleNewAddressChange}
                          />
                          {errors.apartment && <div className="invalid-feedback">{errors.apartment}</div>}
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">City *</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.city ? "is-invalid" : ""}`}
                            name="city"
                            value={newAddressData.city}
                            onChange={handleNewAddressChange}
                          />
                          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>

                          <div className="col-md-4">
                            <label className="form-label">State *</label>
                            <select 
                              className={`form-select ${errors.state ? "is-invalid" : ""}`}
                              name="state"
                              value={newAddressData.state}
                              onChange={handleNewAddressChange}
                            >
                              <option value="">Select State</option>
                              <option value="CA">California</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                              <option value="FL">Florida</option>
                              <option value="IL">Illinois</option>
                              <option value="WA">Washington</option>
                            </select>
                            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                          </div>

                          <div className="col-md-4">
                            <label className="form-label">PIN Code *</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.pinCode ? "is-invalid" : ""}`}
                              name="pinCode"
                              value={newAddressData.pinCode}
                              onChange={handleNewAddressChange}
                            />
                            {errors.pinCode && <div className="invalid-feedback">{errors.pinCode}</div>}
                          </div>

                        </div>
                        <div className="mb-3 mx-2">
                          <div className="form-check">
                            <input 
                              className="form-check-input"
                              type="checkbox"
                              name="isDefault"
                              checked={newAddressData.isDefault}
                              onChange={handleNewAddressChange}
                            />
                            <label className="form-check-label ">
                              Set as default address
                            </label>
                          </div>
                        </div>
                        <div className="d-flex gap-4 mb-3 mx-2">
                          <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={saveNewAddress}
                          >
                            <i className="bi bi-check me-2"></i>
                            {editingAddress ? 'Update Address' : 'Save Address'}
                          </button>
                          <button 
                            type="button"
                            className="btn btn-secondary"
                            onClick={cancelForm}
                          >
                            <i className="bi bi-x me-2"></i>
                            Cancel
                          </button>
                        </div>
                      </div>
                    
                  )}
                  
                  {/* Saved Addresses */}
                  <div className="mb-4">
                    <h6 className="mb-3">Saved Addresses</h6>
                    <div className="row">
                      {savedAddresses.map(address => (
                        <div key={address.id} className="col-lg-4 col-md-6 mb-3">
                          <div 
                            className={`card h-100 cursor-pointer ${
                              selectedAddressId === address.id ? 'border-primary bg-primary bg-opacity-10' : ''
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
                                <div className="d-flex align-items-center gap-2">
                                  {address.isDefault && (
                                    <span className="badge bg-success">Default</span>
                                  )}
                                  {selectedAddressId === address.id && (
                                    <i className="bi bi-check-circle-fill text-primary"></i>
                                  )}
                                  <div className="dropdown">
                                    <button 
                                      className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                                      type="button" 
                                      data-bs-toggle="dropdown"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <button 
                                          className="dropdown-item"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditAddress(address);
                                          }}
                                        >
                                          <i className="bi bi-pencil me-2"></i>Edit
                                        </button>
                                      </li>
                                      {!address.isDefault && (
                                        <li>
                                          <button 
                                            className="dropdown-item"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSetDefault(address.id);
                                            }}
                                          >
                                            <i className="bi bi-star me-2"></i>Set as Default
                                          </button>
                                        </li>
                                      )}
                                      <li><hr className="dropdown-divider" /></li>
                                      <li>
                                        <button 
                                          className="dropdown-item text-danger"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAddress(address.id);
                                          }}
                                        >
                                          <i className="bi bi-trash me-2"></i>Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="small text-muted">
                                <div className="fw-semibold">{address.firstName} {address.lastName}</div>
                                <div>{address.address}</div>
                                {address.apartment && <div>{address.apartment}</div>}
                                <div>{address.city}, {address.state} {address.pinCode}</div>
                                {address.phone && <div className="mt-1">{address.phone}</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add New Address Card */}
                      <div className="col-lg-4 col-md-6 mb-3">
                        <div 
                          className="card h-100 cursor-pointer border-2"
                          onClick={() => setShowAddressForm(true)}
                          style={{ 
                            cursor: 'pointer', 
                            borderStyle: 'dashed',
                            borderColor: '#6c757d'
                          }}
                        >
                          <div className="card-body p-3 d-flex align-items-center justify-content-center">
                            <div className="text-center">
                              <i className="bi bi-plus-circle h1 mb-2 text-muted"></i>
                              <h6 className="mb-0 text-muted">Add New Address</h6>
                              <small className="text-muted">Click to add a new address</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty State */}
                  {savedAddresses.length === 0 && !showAddressForm && (
                    <div className="text-center py-5">
                      <i className="bi bi-geo-alt h1 text-muted mb-3"></i>
                      <h5 className="text-muted">No addresses found</h5>
                      <p className="text-muted mb-4">You haven't added any addresses yet. Add your first address to get started.</p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowAddressForm(true)}
                      >
                        <i className="bi bi-plus me-2"></i>Add Your First Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default AddressManager;