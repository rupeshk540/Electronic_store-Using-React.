// import { Alert, Button, Col, Container, Modal, Row, Card, Table, Form, Spinner, InputGroup } from "react-bootstrap"
// import { toast } from "react-toastify"
// import UserProfileView from "../../components/users/UserProfileView"
// import { useContext, useEffect, useState } from "react"
// import { useParams } from 'react-router-dom'; 
// import UserContext from "../../context/UserContext"
// import { getUser, updateUser, updateUserProfilePicture } from "../../services/UserService"
// import defaultImage from "../../assets/default_profilepic.jpg"


// const Profile=()=>{

//     const userContext=useContext(UserContext)
//     const {userId }=useParams()
//     const [user, setUser]=useState(null)

//     //state for handle image
//     const [image, setImage]=useState({
//         placeholder:defaultImage,
//         file:null
//     })

//     //modals state
//     const [show, setShow]= useState(false);

//     const [updateLoading, setUpdateLoading]=useState(false);

//     const handleClose = () => setShow(false);
//     const handleShowModal = () => setShow(true);

//     useEffect(()=>{
//         // if(userContext.userData){
//             getUserDataFromServer()
//         // }
//     },[])

//     const getUserDataFromServer=()=>{
//         //api call to server through userid

        

//         getUser(userId)
//             .then(data=>{
//                 setUser(data)
//             })
//             .catch(error=>{
//                 setUser(null)
//                 toast.error("Error in loading information from server")
//             })

//     }

//     const updateFieldHandler = (event,property) => {
//         setUser({
//             ...user,
//             [property]:event.target.value
//         })
//     }

//     //update user data by calling api
//     const updateUserData=()=>{
//         if(user.name===undefined || user.name.trim()===''){
//             toast.error("user name required !!")
//             return
//         }

//         //...rest of the field
//         setUpdateLoading(true)
//         updateUser(user)
//         .then(updateUser=>{
//             toast.success("User details updated !!")
//             //update image
//             if(image.file==null){
//                 setUpdateLoading(false)
//                 handleClose()
//                 return
//             }
//             updateUserProfilePicture(image.file, user.userId)
//                 .then(data=>{
//                     toast.success(data.message)
//                     handleClose()
                    
//                 })
//                 .catch(error=>{
//                     toast.error("Image not uploaded")
//                 })
//                 .finally(()=>{
//                     setUpdateLoading(false)
//                 })
            
//         })
//         .catch(error=>{
//             // if(error.response.status == 400){
//             //     toast.error(error.response.data.name)
//             // }
//             toast.error("Not updated !! Error")
//             setUpdateLoading(false)
//         })
        
//     }

//     //function for image change
//     const handleProfileImageChange = (event) => {

//         if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg'){
//             //preview show
//             const reader=new FileReader()
//             reader.onload=(r)=>{
//                 setImage({
//                     placeholder:r.target.result,
//                     file:event.target.files[0]
//                 })
//             }

//             reader.readAsDataURL(event.target.files[0])
//         }else{
//             toast.error("Invalid file !!")
//             image.file=null
//         }
//     }

//     //clear image button function
//     const clearImage=(event)=>{
//         setImage({
//             placeholder: defaultImage,
//             file: null
//         })
//     }

//     //update view 

//     const updateViewModal = () =>{
//         return(
//             <div>
//                 <Modal show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Update the information</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                     <Card className="border-0 shadow-sm" style={{borderRadius:"50px" }}>
//                             <Card.Body>
//                                  <Table  responsive  hover>

//                                 <tbody>

//                                     <tr>
//                                         <td>
//                                             Profile Image
//                                         </td>
//                                         <td>
//                                             {/* image tag for preview */}
//                                            <Container className="text-center mb-3">
//                                                 <img style={{objectFit:'cover'}}height={200} width={200} src={image.placeholder} alt="" />
//                                            </Container>
//                                             <InputGroup>
//                                             <Form.Control type='file' onChange={handleProfileImageChange}/>
//                                             <Button onClick={clearImage} variant="outline-secondary">Clear</Button>
//                                             </InputGroup>   
//                                             <p className="mt-2 text-muted">Select profile picture</p>
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td>Name</td>
//                                         <td><Form.Control 
//                                          type="text" 
//                                         value={user.name}
//                                         onChange={(event)=> updateFieldHandler(event,'name')}
//                                         /></td>
//                                     </tr>
//                                     <tr>
//                                         <td>Email</td>
//                                         <td>{user.email}</td>
//                                     </tr>
//                                     <tr>
//                                         <td>New Password</td>
//                                         <td><Form.Control 
//                                         placeholder="Enter new password"
//                                         type="password"
//                                         onChange={(event)=> updateFieldHandler(event,'password')} 
//                                          />
//                                          <p>Leave the field blank for same password</p></td>
//                                     </tr>
//                                     <tr>
//                                         <td>Gender</td>
//                                         <td>{user.gender}</td>
//                                     </tr>
//                                     <tr>
//                                         <td>About</td>
//                                         <td><Form.Control as={'textarea'} value={user.about} rows={8}
//                                         onChange={(event)=> updateFieldHandler(event,'about')}
//                                         /></td>
//                                     </tr>
//                                     <tr>
//                                         <td>Roles</td>
//                                         <td>{user.roles.map(role=><div key={role.roleId}>{role.roleName}</div>)}</td>
//                                     </tr>
//                                 </tbody>
//                             </Table>
//                             </Card.Body>
//                            </Card>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>Close</Button>
//                         <Button variant="primary" onClick={updateUserData} disabled={updateLoading}>
//                             <Spinner
//                                 animation="border"
//                                 size="sm"
//                                 hidden={!updateLoading}
//                                 className="me-2"
//                             />
//                             <span hidden={!updateLoading}>Updating</span>
//                             <span hidden={updateLoading}> Save Changes</span>
//                         </Button>

//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         )
//     }

//     return (
//        <div>
//        <Container className="mt-3">
//             <Row>
//                 <Col md={{
//                     span:10,
//                     offset:1
//                 }}>
//                 {(user?(
//                     <>
//                         <UserProfileView 
//                             user={
//                                 {
//                                     // name:"Rupesh kumar",
//                                     // email:"rupesh@123",
//                                     // gender:"male",
//                                     // about:"I am a react developer",
//                                     // roles:[{roleId:1, rolename:"Admin"}, {roleId:2, roleName:'NORMAL'}]
                                    
//                                    user
                                
//                                 }
//                             }

//                             handleShowModal={handleShowModal}
//                         />
//                         {updateViewModal()}
//                     </>
//                 ):<Alert><h3 className="text-center text-uppercase m-2">User not loaded from server !</h3></Alert>)}
       
//                 </Col>
//             </Row>
//         </Container>
//        </div>
//     )
// }

// export default Profile;
import React, { useState } from 'react';

const ModernEcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face');
  
  const [user, setUser] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: '1990-03-15',
    gender: 'Female',
    memberSince: 'March 2022',
    loyaltyPoints: 2850
  });

  const [editForm, setEditForm] = useState({ ...user });

  // Sample data
  const orders = [
    { 
      id: '#ORD-2024-001', 
      date: '2024-01-15', 
      status: 'Delivered', 
      total: '$89.99',
      items: [
        { name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop', qty: 1 }
      ],
      trackingId: 'TRK123456789'
    },
    { 
      id: '#ORD-2024-002', 
      date: '2024-01-10', 
      status: 'Shipped', 
      total: '$156.50',
      items: [
        { name: 'Smart Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop', qty: 1 }
      ],
      trackingId: 'TRK987654321'
    },
    { 
      id: '#ORD-2024-003', 
      date: '2024-01-05', 
      status: 'Processing', 
      total: '$45.00',
      items: [
        { name: 'USB Cable', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop', qty: 2 }
      ]
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Sarah Johnson',
      address: '123 Oak Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      phone: '+1 (555) 987-6543',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Sarah Johnson',
      address: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      pincode: '10005',
      phone: '+1 (555) 123-4567',
      isDefault: false
    }
  ];

  const wishlistItems = [
    { 
      id: 1, 
      name: 'Wireless Bluetooth Headphones', 
      price: 79.99, 
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      inStock: true,
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2, 
      name: 'Smart Fitness Watch', 
      price: 199.99, 
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      inStock: true,
      rating: 4.8,
      reviews: 256
    },
    { 
      id: 3, 
      name: 'Portable Power Bank', 
      price: 29.99, 
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop',
      inStock: false,
      rating: 4.2,
      reviews: 89
    }
  ];

  const paymentMethods = [
    { id: 1, type: 'card', last4: '4567', brand: 'Visa', expiryMonth: '12', expiryYear: '2027', isDefault: true },
    { id: 2, type: 'card', last4: '8901', brand: 'Mastercard', expiryMonth: '08', expiryYear: '2026', isDefault: false },
    { id: 3, type: 'upi', upiId: 'sarah.johnson@paytm', isDefault: false }
  ];

  const rewards = [
    { id: 1, type: 'points', value: user.loyaltyPoints, label: 'Loyalty Points' },
    { id: 2, type: 'coupon', value: 3, label: 'Active Coupons', expiry: 'Expires in 7 days' },
    { id: 3, type: 'cashback', value: '$12.50', label: 'Cashback Balance' }
  ];

  // Event handlers
  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...user });
  };

  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = () => {
    // Simulate file upload
    const newPictures = [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    ];
    const randomPic = newPictures[Math.floor(Math.random() * newPictures.length)];
    setProfilePicture(randomPic);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="d-flex align-items-center mb-4">
                <div className="position-relative me-4">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="rounded-circle border border-4 border-primary"
                    style={{width: '100px', height: '100px', objectFit: 'cover'}}
                  />
                  <button
                    onClick={handleProfilePictureChange}
                    className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle p-2"
                    style={{width: '35px', height: '35px'}}
                  >
                    📷
                  </button>
                </div>
                <div className="flex-grow-1">
                  <h3 className="h4 fw-bold text-dark">{user.firstName} {user.lastName}</h3>
                  <p className="text-muted mb-2">{user.email}</p>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-gradient text-white px-3 py-2 rounded-pill me-2" style={{background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'}}>
                      ⭐ Premium Member
                    </span>
                    <span className="text-muted small">Since {user.memberSince}</span>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="btn btn-outline-primary rounded-pill px-4"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="h5 fw-bold text-dark mb-4">Personal Information</h4>
              
              {!isEditing ? (
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">First Name</label>
                    <p className="text-dark fw-medium mb-0">{user.firstName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Last Name</label>
                    <p className="text-dark fw-medium mb-0">{user.lastName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Email</label>
                    <p className="text-dark fw-medium mb-0">{user.email}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Phone</label>
                    <p className="text-dark fw-medium mb-0">{user.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Date of Birth</label>
                    <p className="text-dark fw-medium mb-0">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold">Gender</label>
                    <p className="text-dark fw-medium mb-0">{user.gender}</p>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleInputChange}
                      className="form-control form-control-lg rounded-pill"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleInputChange}
                      className="form-control form-control-lg rounded-pill"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="form-control form-control-lg rounded-pill"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="form-control form-control-lg rounded-pill"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editForm.dateOfBirth}
                      onChange={handleInputChange}
                      className="form-control form-control-lg rounded-pill"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Gender</label>
                    <select
                      name="gender"
                      value={editForm.gender}
                      onChange={handleInputChange}
                      className="form-select form-select-lg rounded-pill"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="col-12 d-flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="btn btn-primary btn-lg rounded-pill px-5"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline-secondary btn-lg rounded-pill px-5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h5 className="fw-bold mb-4">Preferences</h5>
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <div>
                  <p className="fw-medium mb-1">Email Notifications</p>
                  <p className="text-muted small mb-0">Get updates about your orders</p>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                <div>
                  <p className="fw-medium mb-1">SMS Updates</p>
                  <p className="text-muted small mb-0">Receive SMS for order status</p>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-3">
                <div>
                  <p className="fw-medium mb-1">Personalized Recommendations</p>
                  <p className="text-muted small mb-0">Show products based on your interests</p>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="row g-4">
            {orders.map((order, index) => (
              <div key={index} className="col-12">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-primary">{order.id}</h5>
                      <p className="text-muted small mb-0">Ordered on {order.date}</p>
                    </div>
                    <div className="text-end">
                      <span className={`badge rounded-pill px-3 py-2 ${
                        order.status === 'Delivered' ? 'bg-success' :
                        order.status === 'Shipped' ? 'bg-primary' :
                        'bg-warning'
                      }`}>
                        {order.status}
                      </span>
                      <p className="h5 fw-bold text-dark mt-2 mb-0">{order.total}</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3 flex-wrap gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center">
                        <img src={item.image} alt={item.name} className="rounded me-3" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                        <div>
                          <p className="small fw-medium mb-0">{item.name}</p>
                          <p className="text-muted" style={{fontSize: '12px'}}>Qty: {item.qty}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    {order.trackingId && (
                      <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                        🚚 Track Order
                      </button>
                    )}
                    <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                      🔄 Reorder
                    </button>
                    <button className="btn btn-outline-info btn-sm rounded-pill px-3">
                      📄 Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'addresses':
        return (
          <div className="row g-4">
            {addresses.map((address) => (
              <div key={address.id} className="col-lg-6">
                <div className={`bg-white rounded-xl p-4 shadow-lg h-100 ${address.isDefault ? 'border border-3 border-primary' : ''}`}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="fw-bold mb-0">{address.type}</h6>
                      {address.isDefault && (
                        <span className="badge bg-primary rounded-pill">Default</span>
                      )}
                    </div>
                    <div className="d-flex gap-1">
                      <button className="btn btn-outline-primary btn-sm">✏️</button>
                      <button className="btn btn-outline-danger btn-sm">🗑️</button>
                    </div>
                  </div>
                  
                  <div className="text-muted">
                    <p className="fw-medium text-dark mb-1">{address.name}</p>
                    <p className="mb-1">{address.address}</p>
                    <p className="mb-1">{address.city}, {address.state} {address.pincode}</p>
                    <p className="mb-3">📞 {address.phone}</p>
                  </div>

                  {!address.isDefault && (
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <div className="col-lg-6">
              <div className="bg-light border border-2 border-dashed rounded-xl p-5 text-center h-100 d-flex flex-column justify-content-center">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>+</div>
                <h6 className="fw-bold mb-2">Add New Address</h6>
                <p className="text-muted small mb-3">Add a new delivery address</p>
                <button className="btn btn-primary rounded-pill px-4">
                  + Add Address
                </button>
              </div>
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="row g-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-100">
                  <div className="position-relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-100"
                      style={{height: '200px', objectFit: 'cover'}}
                    />
                    <button className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
                      ❤️
                    </button>
                    {!item.inStock && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <span className="badge bg-dark rounded-pill px-3 py-2">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h6 className="fw-bold mb-2">{item.name}</h6>
                    
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-warning me-2">
                        {'⭐'.repeat(Math.floor(item.rating))}
                      </div>
                      <span className="text-muted small">({item.reviews})</span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="h6 fw-bold text-primary mb-0">${item.price}</span>
                      <span className="text-muted text-decoration-line-through small">${item.originalPrice}</span>
                      <span className="badge bg-success rounded-pill">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    
                    <button
                      className={`btn w-100 rounded-pill ${
                        item.inStock
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? '🛒 Add to Cart' : 'Notify When Available'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'payment':
        return (
          <div className="row g-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="col-12">
                <div className={`bg-white rounded-xl p-4 shadow-lg ${method.isDefault ? 'border border-3 border-primary' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      {method.type === 'card' ? (
                        <div className="bg-gradient p-2 rounded text-white text-center" style={{background: 'linear-gradient(45deg, #2563eb, #7c3aed)', minWidth: '50px'}}>
                          <small className="fw-bold">{method.brand}</small>
                        </div>
                      ) : (
                        <div className="bg-gradient p-2 rounded text-white text-center" style={{background: 'linear-gradient(45deg, #059669, #0d9488)', minWidth: '50px'}}>
                          <small className="fw-bold">UPI</small>
                        </div>
                      )}
                      
                      <div>
                        {method.type === 'card' ? (
                          <>
                            <p className="fw-bold mb-0">•••• •••• •••• {method.last4}</p>
                            <p className="text-muted small mb-0">{method.brand} • Expires {method.expiryMonth}/{method.expiryYear}</p>
                          </>
                        ) : (
                          <>
                            <p className="fw-bold mb-0">{method.upiId}</p>
                            <p className="text-muted small mb-0">UPI ID</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center gap-2">
                      {method.isDefault && (
                        <span className="badge bg-primary rounded-pill">Default</span>
                      )}
                      <button className="btn btn-outline-primary btn-sm">✏️</button>
                      <button className="btn btn-outline-danger btn-sm">🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="col-12">
              <div className="bg-light border border-2 border-dashed rounded-xl p-5 text-center">
                <h6 className="fw-bold mb-2">Add Payment Method</h6>
                <p className="text-muted mb-3">Add a new card or UPI ID for faster checkout</p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-primary rounded-pill px-4">+ Add Card</button>
                  <button className="btn btn-success rounded-pill px-4">+ Add UPI</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h5 className="fw-bold mb-4">Security Settings</h5>
                
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <p className="fw-medium mb-1">Change Password</p>
                    <p className="text-muted small mb-0">Update your password for better security</p>
                  </div>
                  <button className="btn btn-outline-primary rounded-pill px-4">Change</button>
                </div>
                
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <p className="fw-medium mb-1">Two-Factor Authentication</p>
                    <p className="text-muted small mb-0">Add extra security to your account</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-success small">✅ Enabled</span>
                    <button className="btn btn-outline-primary rounded-pill px-4">Manage</button>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center py-3">
                  <div>
                    <p className="fw-medium mb-1">Login Sessions</p>
                    <p className="text-muted small mb-0">Manage active sessions</p>
                  </div>
                  <button className="btn btn-outline-danger rounded-pill px-4">Logout All</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="row g-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="col-lg-4">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center h-100">
                  <div className="mb-3">
                    {reward.type === 'points' && <div className="text-primary" style={{fontSize: '3rem'}}>🏆</div>}
                    {reward.type === 'coupon' && <div className="text-success" style={{fontSize: '3rem'}}>🎫</div>}
                    {reward.type === 'cashback' && <div className="text-warning" style={{fontSize: '3rem'}}>💰</div>}
                  </div>
                  <h4 className="fw-bold text-primary">{reward.value}</h4>
                  <p className="fw-medium mb-2">{reward.label}</p>
                  {reward.expiry && <p className="text-muted small">{reward.expiry}</p>}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const sidebarItems = [
    { id: 'profile', icon: '👤', label: 'Profile Info' },
    { id: 'orders', icon: '📦', label: 'My Orders' },
    { id: 'addresses', icon: '📍', label: 'Addresses' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist' },
    { id: 'payment', icon: '💳', label: 'Payment Methods' },
    { id: 'security', icon: '🔒', label: 'Security' },
    { id: 'rewards', icon: '🎁', label: 'Rewards' }
  ];

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <style>
                {`
                .sticky-sidebar {
                    position: sticky;
                    top: 64px;
                    z-index: 99;
                }
                `}
                </style>
            <div className="bg-white rounded-xl p-4 shadow-lg .sticky-sidebar">
              <div className="text-center mb-4">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{width: '80px', height: '80px', objectFit: 'cover'}}
                />
                <h5 className="fw-bold">{user.firstName} {user.lastName}</h5>
                <p className="text-muted small">{user.email}</p>
                <span className="badge bg-gradient text-white px-3 py-2 rounded-pill" style={{background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'}}>
                  ⭐ Premium
                </span>
              </div>
              
              <nav className="nav flex-column">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-link d-flex align-items-center text-start border-0 rounded-pill px-3 py-2 mb-2 ${
                      activeTab === item.id 
                        ? 'bg-primary text-white' 
                        : 'text-dark hover:bg-light'
                    }`}
                    style={{
                      background: activeTab === item.id ? 'linear-gradient(45deg, #6366f1, #8b5cf6)' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="me-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="mb-4">
              <h2 className="h3 fw-bold text-dark mb-1">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-muted">Manage your {activeTab} settings and information</p>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEcommerceDashboard;