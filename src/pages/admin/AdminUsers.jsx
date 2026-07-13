// import { useEffect } from "react";
// import { getAllUsers } from "../../services/UserService";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import SingleUserView from "../../components/SingleUserView";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { USER_PAGE_SIZE } from "../../services/HelperService";

// const AdminUsers = () => {

//     const [userData, setUserData] = useState(undefined)

//     const [currentPage, setCurrentPage] = useState(0)

//     useEffect(() => {
//         getUsers(currentPage, USER_PAGE_SIZE, 'name', 'asc')
//     },[])

//     useEffect(() => {
//         if(currentPage > 0){
//             getUsers(currentPage, USER_PAGE_SIZE, 'name', 'asc')
//         }

//     },[currentPage])

//     const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
//         getAllUsers(pageNumber, pageSize, sortBy, sortDir)
//             .then((data) => {
//                if(currentPage === 0){
//                 setUserData({
//                     ...data
//                 })
//                }else{
//                 setUserData({
//                     content: [...userData.content, ...data.content],
//                     lastPage: data.lastPage,
//                     pageNumber: data.pageNumber,
//                     pageSize: data.pageSize,
//                     totalElements: data.totalElements,
//                     totalPages: data.totalPages
//                 })

//                }

//             })
//             .catch(error => {
//                 toast.error("Error in loading Users !")
//             })
//     }

//     const loadNextPage=()=>{
//         setCurrentPage(currentPage+1)
//     }

//     const userView = () => {
//         return(
//             <Container>
//                 <Row>
//                     <Col>
//                         <Card className="shadow-sm">
//                             <Card.Body>
//                                 <h3>User List</h3>
//                                 <InfiniteScroll
//                                     dataLength={userData.content.length}
//                                     next={loadNextPage}
//                                     hasMore={!userData.lastPage}
//                                     loader={<h3 className="text-center my-3">Loading...</h3>}
//                                     endMessage={<p className="text-center py-3 text-muted">All Users loaded !!</p>}
//                                 >
//                                     {
//                                         userData.content.map(user => (
//                                             <SingleUserView key={user.userId} user={user} />
//                                         ))
//                                     }
//                                 </InfiniteScroll>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         )
//     }

//     return(
//         <>
//             {
//                 userData && userView()
//             }
//         </>
//     )
// }

// export default AdminUsers;

// import React, { useState, useEffect } from 'react';
// import { getAllUsers } from "../../services/UserService";
// import SingleUserView from "../../components/SingleUserView";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { USER_PAGE_SIZE } from "../../services/HelperService";
// import { toast } from "react-toastify";


// const UsersAdmin = () => {
  
//     // Mock user data - replace with actual API call
//   const [usersData, setUsersData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0)

//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // Simulate loading users data
//     useEffect(() => {
//         getUsers(currentPage, USER_PAGE_SIZE, 'name', 'asc')
//     },[])

//     useEffect(() => {
//       if(currentPage > 0){
//             getUsers(currentPage, USER_PAGE_SIZE, 'name', 'asc')
//         }
//     },[currentPage])

//     const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
//         getAllUsers(pageNumber, pageSize, sortBy, sortDir)
//             .then((data) => {
//                if(currentPage === 0){
//                 setUsersData({
//                     ...data
//                 })
//                }else{
//                 setUsersData({
//                     content: [...usersData.content, ...data.content],
//                     lastPage: data.lastPage,
//                     pageNumber: data.pageNumber,
//                     pageSize: data.pageSize,
//                     totalElements: data.totalElements,
//                     totalPages: data.totalPages
//                 })

//                }

//             })
//             .catch(error => {
//                 toast.error("Error in loading Users !")
//             })
//     }

//      const loadNextPage=()=>{
//         setCurrentPage(currentPage+1)
//     }

//   // Filter users based on search and status
//   const filteredUsers = usersData.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusBadge = (status) => {
//     const statusClasses = {
//       'Active': 'bg-success',
//       'Inactive': 'bg-secondary',
//       'Suspended': 'bg-danger'
//     };
//     return `badge ${statusClasses[status] || 'bg-secondary'}`;
//   };

//   const getRoleBadge = (role) => {
//     return role === 'Admin' ? 'badge bg-primary' : 'badge bg-info';
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid py-4">
//         <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid py-4">
//       {/* Header */}
//       <div className="row mb-4">
//         <div className="col">
//           <h1 className="h3 mb-0 text-gray-800">
//             <i className="fas fa-users me-2"></i>
//             Zepta Users Management
//           </h1>
//           <p className="text-muted">Manage all users in your e-commerce platform</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="row mb-4">
//         <div className="col-xl-3 col-md-6 mb-4">
//           <div className="card border-left-primary shadow h-100 py-2">
//             <div className="card-body">
//               <div className="row no-gutters align-items-center">
//                 <div className="col mr-2">
//                   <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
//                     Total Users
//                   </div>
//                   <div className="h5 mb-0 font-weight-bold text-gray-800">{usersData.length}</div>
//                 </div>
//                 <div className="col-auto">
//                   <i className="fas fa-users fa-2x text-gray-300"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6 mb-4">
//           <div className="card border-left-success shadow h-100 py-2">
//             <div className="card-body">
//               <div className="row no-gutters align-items-center">
//                 <div className="col mr-2">
//                   <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
//                     Active Users
//                   </div>
//                   <div className="h5 mb-0 font-weight-bold text-gray-800">
//                     {usersData.filter(u => u.status === 'Active').length}
//                   </div>
//                 </div>
//                 <div className="col-auto">
//                   <i className="fas fa-user-check fa-2x text-gray-300"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6 mb-4">
//           <div className="card border-left-info shadow h-100 py-2">
//             <div className="card-body">
//               <div className="row no-gutters align-items-center">
//                 <div className="col mr-2">
//                   <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
//                     Admin Users
//                   </div>
//                   <div className="h5 mb-0 font-weight-bold text-gray-800">
//                     {usersData.filter(u => u.role === 'Admin').length}
//                   </div>
//                 </div>
//                 <div className="col-auto">
//                   <i className="fas fa-user-shield fa-2x text-gray-300"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-3 col-md-6 mb-4">
//           <div className="card border-left-warning shadow h-100 py-2">
//             <div className="card-body">
//               <div className="row no-gutters align-items-center">
//                 <div className="col mr-2">
//                   <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
//                     Total Revenue
//                   </div>
//                   <div className="h5 mb-0 font-weight-bold text-gray-800">
//                     ${usersData.reduce((sum, user) => sum + user.totalSpent, 0).toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="col-auto">
//                   <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="card shadow mb-4">
//         <div className="card-header py-3 d-flex justify-content-between align-items-center">
//           <h6 className="m-0 font-weight-bold text-primary">Users List</h6>
//           <button className="btn btn-primary btn-sm">
//             <i className="fas fa-plus me-1"></i>
//             Add New User
//           </button>
//         </div>
//         <div className="card-body">
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search users by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="col-md-3">
//               <select
//                 className="form-select"
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="suspended">Suspended</option>
//               </select>
//             </div>
//             <div className="col-md-3">
//               <div className="text-muted">
//                 Showing {filteredUsers.length} of {usersData.length} users
//               </div>
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="table-responsive">
//             <table className="table table-hover">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>User</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Join Date</th>
//                   <th>Orders</th>
//                   <th>Total Spent</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user) => (
//                   <tr key={user.id}>
//                     <td className="fw-bold">#{user.id}</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
//                              style={{width: '35px', height: '35px', fontSize: '14px'}}>
//                           {user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="fw-bold">{user.name}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>{user.email}</td>
//                     <td>
//                       <span className={getRoleBadge(user.role)}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td>
//                       <span className={getStatusBadge(user.status)}>
//                         {user.status}
//                       </span>
//                     </td>
//                     <td>{new Date(user.joinDate).toLocaleDateString()}</td>
//                     <td>{user.orders}</td>
//                     <td className="fw-bold">${user.totalSpent.toFixed(2)}</td>
//                     <td>
//                       <div className="btn-group" role="group">
//                         <button className="btn btn-sm btn-outline-primary" title="View">
//                           <i className="fas fa-eye"></i>
//                         </button>
//                         <button className="btn btn-sm btn-outline-warning" title="Edit">
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button className="btn btn-sm btn-outline-danger" title="Delete">
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredUsers.length === 0 && (
//             <div className="text-center py-4">
//               <i className="fas fa-users fa-3x text-muted mb-3"></i>
//               <p className="text-muted">No users found matching your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersAdmin;

import React, { useState, useEffect } from 'react';
import { getAllUsers } from "../../services/UserService";
import InfiniteScroll from "react-infinite-scroll-component";
import { USER_PAGE_SIZE } from "../../services/HelperService";
import { toast } from "react-toastify";

const UsersAdmin = () => {
  const [usersData, setUsersData] = useState({
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    lastPage: true,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    getUsers(0, USER_PAGE_SIZE, 'name', 'asc');
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, USER_PAGE_SIZE, 'name', 'asc');
    }
  }, [currentPage]);

  const getUsers = (pageNumber, pageSize, sortBy, sortDir) => {
    getAllUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        if (pageNumber === 0) {
          setUsersData({ ...data });
        } else {
          setUsersData((prev) => ({
            ...data,
            content: [...prev.content, ...data.content],
          }));
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error in loading Users!");
        setLoading(false);
      });
  };

  const loadNextPage = () => {
    if (!usersData.lastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Filter users
  const filteredUsers = usersData.content.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Active': 'bg-success',
      'Inactive': 'bg-secondary',
      'Suspended': 'bg-danger'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const getRoleBadge = (role) => {
    return role === 'Admin' ? 'badge bg-primary' : 'badge bg-info';
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3 mb-0 text-gray-800">
            <i className="fas fa-users me-2"></i>
            Zepta Users Management
          </h1>
          <p className="text-muted">Manage all users in your e-commerce platform</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{usersData.content.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Active Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {usersData.content.filter(u => u.status === 'Active').length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Admin Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {usersData.content.filter(u => u.role === 'ROLE_ADMIN').length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-shield fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Total Revenue
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    ${usersData.content.reduce((sum, user) => sum + (user.totalSpent || 0), 0).toLocaleString()} </div>
                  </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Users List</h6>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus me-1"></i>
            Add New User
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="text-muted">
                Showing {filteredUsers.length} of {usersData.content.length} users
              </div>
            </div>
          </div>

          {/* Users Table with InfiniteScroll */}
          <InfiniteScroll
            dataLength={usersData.content.length}
            next={loadNextPage}
            hasMore={!usersData.lastPage}
            loader={<h6 className="text-center">Loading more users...</h6>}
            endMessage={<p className="text-center text-muted">No more users to load</p>}
          >
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-bold">#{user.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                            style={{ width: '35px', height: '35px', fontSize: '14px' }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={getRoleBadge(user.role)}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadge(user.status)}>
                          {user.status}
                        </span>
                      </td>
                      <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td>{user.orders}</td>
                     <td className="fw-bold">
                        ${Number(user.totalSpent || 0).toFixed(2)}
                     </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-warning" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfiniteScroll>

          {filteredUsers.length === 0 && (
            <div className="text-center py-4">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p className="text-muted">No users found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
