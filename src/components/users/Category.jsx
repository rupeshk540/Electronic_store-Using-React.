import React, { useState } from 'react';
import { Search, Mic, Camera, Filter, Zap, DollarSign, Package, Shirt, Home, Dumbbell, Heart, Car, Baby, Book, Music, Gamepad2 } from 'lucide-react';

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL PRODUCTS');

  // Extended product data with more categories
  const categoryData = {
    'Trending Products': [
      { id: 1, name: 'MacBook Pro M3', price: 2499, rentPrice: 149, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop' },
      { id: 2, name: 'Designer Sofa Set', price: 3299, rentPrice: 199, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop' },
      { id: 3, name: 'Canon EOS R5', price: 4299, rentPrice: 249, image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop' },
      { id: 4, name: 'Ergonomic Office Chair', price: 899, rentPrice: 59, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
      { id: 5, name: 'iPhone 15 Pro', price: 1599, rentPrice: 99, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop' }
    ],
    'Best Deals': [
      { id: 6, name: 'Premium Leather Bag', price: 599, rentPrice: 49, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop' },
      { id: 7, name: 'Gaming Laptop RTX', price: 2499, rentPrice: 149, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop' },
      { id: 8, name: 'Modern Coffee Table', price: 1299, rentPrice: 89, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
      { id: 9, name: 'Professional Monitor', price: 899, rentPrice: 59, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop' },
      { id: 10, name: 'Executive Desk Chair', price: 699, rentPrice: 49, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }
    ],
    'Electronics': [
      { id: 11, name: '4K Smart TV 65"', price: 1299, rentPrice: 89, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop' },
      { id: 12, name: 'Wireless Headphones', price: 349, rentPrice: 29, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop' },
      { id: 13, name: 'Gaming Console', price: 499, rentPrice: 39, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop' },
      { id: 14, name: 'Smart Watch Ultra', price: 799, rentPrice: 59, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&h=200&fit=crop' },
      { id: 15, name: 'Drone with Camera', price: 1199, rentPrice: 79, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=200&fit=crop' }
    ],
    'Fashion': [
      { id: 16, name: 'Designer Watch', price: 2499, rentPrice: 149, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop' },
      { id: 17, name: 'Luxury Handbag', price: 1899, rentPrice: 119, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop' },
      { id: 18, name: 'Premium Sneakers', price: 299, rentPrice: null, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop' },
      { id: 19, name: 'Silk Evening Dress', price: 199, rentPrice: null, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop' },
      { id: 20, name: 'Leather Jacket', price: 899, rentPrice: 59, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop' }
    ],
    'Home & Garden': [
      { id: 21, name: 'Modular Sofa', price: 2999, rentPrice: 189, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop' },
      { id: 22, name: 'Dining Table Set', price: 1799, rentPrice: 119, image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=300&h=200&fit=crop' },
      { id: 23, name: 'Smart Refrigerator', price: 2499, rentPrice: 149, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=200&fit=crop' },
      { id: 24, name: 'Garden Tool Set', price: 299, rentPrice: 29, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop' },
      { id: 25, name: 'Outdoor Fire Pit', price: 799, rentPrice: 59, image: 'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?w=300&h=200&fit=crop' }
    ],
    'Sports & Outdoor': [
      { id: 26, name: 'Electric Bike', price: 1999, rentPrice: 129, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop' },
      { id: 27, name: 'Kayak Pro', price: 899, rentPrice: 69, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop' },
      { id: 28, name: 'Camping Tent 4P', price: 399, rentPrice: 39, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=200&fit=crop' },
      { id: 29, name: 'Home Gym Set', price: 1299, rentPrice: 89, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop' },
      { id: 30, name: 'Surfboard Pro', price: 699, rentPrice: 49, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300&h=200&fit=crop' }
    ],
    'Automotive': [
      { id: 31, name: 'Tesla Model Y', price: 54999, rentPrice: 899, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop' },
      { id: 32, name: 'Motorcycle Helmet', price: 299, rentPrice: 29, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop' },
      { id: 33, name: 'Car Dash Cam', price: 199, rentPrice: null, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop' },
      { id: 34, name: 'Electric Scooter', price: 799, rentPrice: 59, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop' },
      { id: 35, name: 'Car Audio System', price: 599, rentPrice: 49, image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=300&h=200&fit=crop' }
    ],
    'Baby & Kids': [
      { id: 36, name: 'Baby Stroller Pro', price: 899, rentPrice: 69, image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=300&h=200&fit=crop' },
      { id: 37, name: 'Kids Electric Car', price: 499, rentPrice: 39, image: 'https://images.unsplash.com/photo-1558877076-8b2c0acb26ee?w=300&h=200&fit=crop' },
      { id: 38, name: 'Baby Monitor', price: 199, rentPrice: null, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop' },
      { id: 39, name: 'High Chair', price: 299, rentPrice: 29, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop' },
      { id: 40, name: 'Educational Tablet', price: 149, rentPrice: null, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop' }
    ],
    'Books & Media': [
      { id: 41, name: 'E-Reader Premium', price: 299, rentPrice: 29, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
      { id: 42, name: 'Vinyl Record Player', price: 399, rentPrice: 39, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop' },
      { id: 43, name: 'Audiobook Collection', price: 99, rentPrice: null, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop' },
      { id: 44, name: 'Art Book Set', price: 149, rentPrice: null, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
      { id: 45, name: 'Digital Magazine Sub', price: 59, rentPrice: null, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' }
    ]
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Trending Products': <Zap className="text-warning" size={20} />,
      'Best Deals': <DollarSign className="text-success" size={20} />,
      'Electronics': <Package className="text-primary" size={20} />,
      'Fashion': <Shirt className="text-danger" size={20} />,
      'Home & Garden': <Home className="text-info" size={20} />,
      'Sports & Outdoor': <Dumbbell className="text-secondary" size={20} />,
      'Automotive': <Car className="text-dark" size={20} />,
      'Baby & Kids': <Baby className="text-pink" size={20} />,
      'Books & Media': <Book className="text-purple" size={20} />
    };
    return icons[category];
  };

  const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = (e) => {
      e.stopPropagation();
      setIsWishlisted(!isWishlisted);
    };

    return (
      <div className="col">
        <div 
          className="card h-100 border-0 shadow-sm product-card"
          style={{
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            maxWidth: '240px',
            margin: '0 auto'
          }}
        >
          {/* Product Image */}
          <div className="position-relative overflow-hidden" style={{ borderRadius: '12px 12px 0 0' }}>
            <img 
              src={product.image} 
              alt={product.name}
              className="card-img-top"
              style={{ 
                height: '175px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback placeholder */}
            <div 
              className="d-none align-items-center justify-content-center text-muted"
              style={{ 
                height: '150px',
                backgroundColor: '#f8f9fa',
                fontSize: '48px'
              }}
            >
              📦
            </div>
            
            {/* Wishlist Button */}
            <button
              className="wishlist-btn position-absolute"
              style={{
                top: '8px',
                right: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                zIndex: '2'
              }}
              onClick={toggleWishlist}
            >
              <Heart 
                size={14} 
                className={isWishlisted ? 'text-danger' : 'text-muted'}
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </div>

          {/* Card Body */}
          <div className="card-body text-center p-3">
            <h6 className="card-title fw-semibold mb-2 text-dark" style={{ fontSize: '0.8rem' }}>
              {product.name}
            </h6>
            
            <p className="fw-bold text-success mb-0" style={{ fontSize: '0.9rem' }}>
              ${product.price.toLocaleString()}
            </p>
            
            {product.rentPrice && (
              <small className="text-muted">or ${product.rentPrice}/mo</small>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CategorySection = ({ categoryName, products }) => (
    <div className="category-section">
      <div className="d-flex align-items-center justify-content-between mb-2 px-3">
        <div className="d-flex align-items-center">
          {getCategoryIcon(categoryName)}
          <h4 className="ms-2 mb-0 fw-bold text-dark">{categoryName}</h4>
        </div>
        <button className="btn btn-outline-primary btn-sm">View All</button>
      </div>
      
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-1 mb-2 px-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="categories-page">
      <style jsx>{`
        .categories-page {
          background-color: #ffffff;
          min-height: 100vh;
          padding: 0;
        }
        
        .banner-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4rem 0;
          margin-bottom: 0;
          position: relative;
          overflow: hidden;
        }
        
        .banner-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,255,255,.1)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient></defs><circle cx="10" cy="10" r="1" fill="url(%23a)"/><circle cx="30" cy="5" r="1" fill="url(%23a)"/><circle cx="50" cy="15" r="1" fill="url(%23a)"/><circle cx="70" cy="8" r="1" fill="url(%23a)"/><circle cx="90" cy="12" r="1" fill="url(%23a)"/></svg>');
          opacity: 0.3;
        }
        
        .category-section {
          border-bottom: 1px solid #f0f0f0;
          padding: 0.5rem 0;
          margin-bottom: 0;
        }
        
        .category-section:last-child {
          border-bottom: none;
        }
        
        .wishlist-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .wishlist-btn:active {
          transform: scale(0.95);
        }
        
        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15) !important;
        }
        
        .product-card:hover img {
          transform: scale(1.03);
        }
        
        .search-container {
          position: relative;
          max-width: 650px;
    
        }
        
        .search-input-group {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(15px);
          border-radius: 50px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        
        .search-input-group:hover {
          background: white;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          border-color: rgba(255,255,255,0.4);
        }
        
        .search-input-group:focus-within {
          background: white;
          box-shadow: 0 15px 45px rgba(102, 126, 234, 0.3);
          border-color: #667eea;
        }
        
        .search-input {
          border: none;
          outline: none !important;
          box-shadow: none !important;  
          background: transparent;
          padding: 1rem 1rem 1rem 3.5rem;
          flex: 1;
          color: #333;
          font-size: 1.1rem;
          outline: none;
        }
        
        .search-input::placeholder {
          color: #666;
          font-weight: 400;
        }
        
        .search-icon {
          position: absolute;
          left: 1.2rem;
          color: #667eea;
          z-index: 10;
        }
        
        .search-actions {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          gap: 0.5rem;
        }
        
        .search-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .search-action-btn:hover {
          background: #667eea;
          color: white;
          transform: scale(1.1);
        }
        
        .search-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .search-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }
        
        .filter-tabs {
          gap: 0.5rem;
          margin-top: 2rem;
        }
        
        .filter-tab {
          border-radius: 25px;
          padding: 0.6rem 1.5rem;
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          background: transparent;
          transition: all 0.3s ease;
          font-weight: 500;
          cursor: pointer;
        }
        
        .filter-tab.active {
          background: white;
          color: #667eea;
          border-color: white;
        }
        
        .filter-tab:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-1px);
        }
        
        .filter-tab.active:hover {
          background: white;
          color: #667eea;
        }
        
        .tagline {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }
        
        .text-pink { color: #e91e63 !important; }
        .text-purple { color: #9c27b0 !important; }
        
        @media (max-width: 768px) {
          .banner-section {
            padding: 3rem 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .tagline {
            font-size: 1rem;
          }
          
          .category-section {
            padding: 0.4rem 0;
          }
          
          .filter-tabs {
            flex-wrap: wrap;
            gap: 0.25rem;
          }
          
          .filter-tab {
            padding: 0.4rem 1rem;
            font-size: 0.85rem;
          }
          
          .search-container {
            max-width: 100%;
          }
          
          .search-input {
            font-size: 1rem;
            padding: 0.8rem 0.8rem 0.8rem 3rem;
          }
          
          .search-actions {
            padding: 0.25rem;
            gap: 0.25rem;
          }
          
          .search-action-btn {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
      
      {/* Enhanced Banner Section */}
      <div className="banner-section text-white">
        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h1 className="hero-title">Discover Amazing Products</h1>
              <p className="tagline">
                Your AI-powered shopping companion for finding perfect products to buy or rent. 
                Experience the future of e-commerce with smart recommendations.
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="search-container mx-auto mb-4">
                <div className="search-input-group">
                  <Search className="search-icon" size={22} />
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search products, brands, or describe what you need..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="search-actions">
                    <button className="search-btn">Search</button>
                  </div>
                </div>
              </div>
              
              {/* Filter Tabs */}
              <div className="d-flex justify-content-center align-items-center flex-wrap filter-tabs">
                {['ALL PRODUCTS', 'ELECTRONICS', 'FASHION', 'HOME & GARDEN', 'AUTOMOTIVE'].map((filter) => (
                  <button 
                    key={filter}
                    className={`btn filter-tab ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories Content */}
      <div className="container-fluid px-4">
        {Object.entries(categoryData).map(([categoryName, products]) => (
          <CategorySection key={categoryName} categoryName={categoryName} products={products} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;