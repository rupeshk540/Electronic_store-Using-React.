// import { Card, Container, Row,Col, Button} from "react-bootstrap";
// import { BsBorderStyle } from "react-icons/bs";
// import { FaUserSecret } from "react-icons/fa";
// import { MdOutlineCategory, MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { Link } from "react-router-dom";
// import DashboardCardView from "../../components/DashboardCardView";

// const AdminHome = () => {
//     return (
//         <Container>
//             <Row>
//                 <Col md={{span: 6, offset: 3}}>
//                     <Card className="shadow-sm">
//                         <Card.Body className="text-center">
//                             <h3 className="text-center">Welcome to Admin Dashboard</h3>
//                             <p className="text-muted">Customize dashboard for admin, to add categories, to add products, to view categories, to view products, manage orders, manage users and much more..!</p>
//                             <p>Start managing products</p>
//                             <Container className="d-grid gap-3">
//                                 <Button as={Link} to={'/admin/categories'} variant="outline-secondary">Start Managing Categories</Button>
//                                 <Button as={Link} to={'/admin/products'} variant="outline-secondary">Start Managing Products</Button>
//                                 <Button as={Link} to={'/admin/users'} variant="outline-secondary">Start Managing Users</Button>
//                                 <Button as={Link} to={'/admin/orders'} variant="outline-secondary">Start Managing Orders</Button>
//                             </Container>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             <Row className="mt-5">
//             <Col md={6}>
//                     <DashboardCardView
//                        icon= {<MdOutlineProductionQuantityLimits size={80} />}
//                         number={372238}
//                         text={'Number of Products'}
//                     />
//                 </Col>
//                 <Col md={6}>
//                     <DashboardCardView
//                        icon= {<MdOutlineCategory size={80} />}
//                         number={15}
//                         text={'Number of Categories'}
//                     />
//                 </Col>
                
//                 <Col md={6} className="mt-3">
//                     <DashboardCardView
//                         icon={<BsBorderStyle size={80} />}
//                         number={233}
//                         text={'Number of Orders'}
//                     />
//                 </Col>
//                 <Col md={6} className="mt-3">
//                    <DashboardCardView
//                     icon={<FaUserSecret size={80} />}
//                     number={100}
//                     text={"Number of Users"}
//                    />
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

// export default AdminHome;

import { useState, useEffect } from 'react';
import { getAdminStats } from '../../services/AdminService';
import { useNavigate } from 'react-router-dom';

const AdminHome = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    collections: 0,
    users: 0,
    orders: 0,
    pendingOrders: 0,
    lowStock: 0
  });

  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
     const interval = setInterval(fetchStats, 60000); // refresh every 1 min
     return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

    const handleCardClick = (section) => {
        switch(section) {
            case 'products':
            navigate('/admin/products');
            break;
            case 'Addproducts':
            navigate('/admin/add-product');
            break;
            case 'Addcollection':
            navigate('/admin/add-collection');
            break;
            case 'categories':
            navigate('/admin/categories');
            break;
            case 'collections':
            navigate('/admin/collections');
            break;
            case 'users':
            navigate('/admin/users');
            break;
            case 'orders':
            navigate('/admin/orders');
            break;
            default:
          break;
        }
    }
  

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const StatCard = ({ title, count, icon, section, description, priority }) => (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
      <div 
        className={`stat-card ${section ? 'clickable' : ''} ${priority ? 'priority-card' : ''}`}
        onClick={() => section && handleCardClick(section)}
      >
        <div className="card-header">
          <div className="icon-wrapper">
            <i className={icon}></i>
          </div>
          <div className="card-actions">
            {section && <i className="fas fa-external-link-alt"></i>}
          </div>
        </div>
        <div className="card-content">
          <h3 className="stat-number">
            {loading ? (
              <div className="loading-skeleton"></div>
            ) : (
              typeof count === 'number' && count > 10000 ? formatNumber(count) : count
            )}
          </h3>
          <h6 className="stat-title">{title}</h6>
          {description && <p className="stat-description">{description}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      
      <style jsx>{`
        .admin-dashboard {
          background-color: #f8fafc;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-top: 0; 
          margin-top: 0;
      
        }

        .dashboard-header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 2rem;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .date-info {
          background-color: #f3f4f6;
          color: #374151;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stats-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          height: 100%;
          transition: all 0.2s ease;
        }

        .stat-card.clickable {
          cursor: pointer;
        }

        .stat-card.clickable:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .stat-card.priority-card {
          border-color: #fbbf24;
          background-color: #fffbeb;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .icon-wrapper {
          width: 48px;
          height: 48px;
          background-color: #f3f4f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .priority-card .icon-wrapper {
          background-color: #fef3c7;
          color: #d97706;
        }

        .icon-wrapper i {
          font-size: 1.25rem;
          color: #6b7280;
        }

        .card-actions i {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .clickable .card-actions i {
          color: #3b82f6;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .stat-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .stat-description {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-bottom: 0;
        }

        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          height: 2rem;
          width: 60px;
          border-radius: 4px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .quick-actions {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 2rem;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .action-btn {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.2s ease;
          text-decoration: none;
          color: #374151;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .action-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
          transform: translateY(-1px);
        }

        .action-btn i {
          font-size: 1.5rem;
          color: #6b7280;
          transition: color 0.2s ease;
        }

        .action-btn:hover i {
          color: #3b82f6;
        }

        .action-btn span {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .admin-dashboard .container-fluid {
          max-width: 1400px;
          padding: 0 2rem;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 1.5rem 0;
            text-align: center;
          }
          
          .dashboard-title {
            font-size: 1.75rem;
          }
          
          .container-fluid {
            padding: 0 1rem;
          }
          
          .stat-card {
            padding: 1.25rem;
          }
          
          .action-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }
        }

        .alert-badge {
          display: inline-block;
          background-color: #fee2e2;
          color: #dc2626;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: 0.5rem;
        }
      `}</style>

      <div className="admin-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-6">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <p className="dashboard-subtitle">
                  Manage your inventory, orders, and users efficiently
                </p>
              </div>
              <div className="col-lg-4 col-md-6 text-end">
                <div className="date-info">
                  <i className="far fa-calendar me-2"></i>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3">
          {/* Main Statistics */}
          <div className="stats-section">
            <h2 className="section-title">Overview</h2>
            <div className="row">
              <StatCard
                title="Total Products"
                count={stats.products}
                icon="fas fa-box"
                section="products"
                description="Click to manage products"
              />
              
              <StatCard
                title="Categories"
                count={stats.categories}
                icon="fas fa-tags"
                section="categories"
                description="Product categories"
              />
              
              <StatCard
                title="Collections"
                count={stats.collections}
                icon="fas fa-layer-group"
                section="collections"
                description="Product collections"
              />
              
              <StatCard
                title="Total Users"
                count={stats.users}
                icon="fas fa-users"
                section="users"
                description="Registered customers"
              />

              <StatCard
                title="Total Orders"
                count={stats.orders}
                icon="fas fa-shopping-cart"
                section="orders"
                description="All time orders"
              />
              
              <StatCard
                title="Pending Orders"
                count={stats.pendingOrders}
                icon="fas fa-clock"
                priority={stats.pendingOrders > 0}
                description="Requires attention"
              />
              
              <StatCard
                title="Low Stock Items"
                count={stats.lowStock}
                icon="fas fa-exclamation-triangle"
                priority={stats.lowStock > 0}
                description="Need restocking"
              />

              <StatCard
                title="Active Status"
                count="Online"
                icon="fas fa-circle"
                description="System operational"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-title">
                Quick Actions
                {(stats.pendingOrders > 0 || stats.lowStock > 0) && (
                <span className="alert-badge">
                    {stats.pendingOrders + stats.lowStock} items need attention
                </span>
                )}
            </h2>
            <div className="action-grid">
                <button className="action-btn" onClick={() => handleCardClick('Addproducts')}>
                <i className="fas fa-plus"></i>
                <span>Add New Product</span>
                </button>

                <button className="action-btn" onClick={() => handleCardClick('categories')}>
                <i className="fas fa-folder-plus"></i>
                <span>Manage Categories</span>
                </button>

                <button className="action-btn" onClick={() => handleCardClick('Addcollections')}>
                <i className="fas fa-layer-group"></i>
                <span>Create Collection</span>
                </button>

                <button className="action-btn" onClick={() => handleCardClick('orders')}>
                <i className="fas fa-list-check"></i>
                <span>Process Orders</span>
                </button>

                <button className="action-btn" onClick={() => handleCardClick('users')}>
                <i className="fas fa-user-gear"></i>
                <span>Manage Users</span>
                </button>

                <button className="action-btn">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
                </button>
            </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default AdminHome;


