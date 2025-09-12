import { Heart, Search } from "lucide-react";
import { useState } from "react";

const HomePageComponent = () => {
  
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState([]);
    

  

  // Sample hot deals data with more products
  const hotDeals = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      originalPrice: 199.99,
      discountPrice: 79.99,
      discount: 60,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      category: "hot-deals",
      rating: 4.5,
      reviews: 1250,
      tag: "Limited Time",
      stock: 15
    },
    {
      id: 2,
      title: "Designer Leather Jacket",
      originalPrice: 299.99,
      discountPrice: 149.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
      category: "50-off",
      rating: 4.8,
      reviews: 890,
      tag: "Flash Sale",
      stock: 8
    },
    {
      id: 3,
      title: "4K Smart TV 55 inch",
      originalPrice: 899.99,
      discountPrice: 549.99,
      discount: 39,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      category: "bestseller",
      rating: 4.3,
      reviews: 567,
      tag: "Best Seller",
      stock: 5
    },
    {
      id: 4,
      title: "Gaming Mechanical Keyboard",
      originalPrice: 129.99,
      discountPrice: 69.99,
      discount: 46,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      category: "trending",
      rating: 4.7,
      reviews: 2100,
      tag: "Hot Deal",
      stock: 22
    },
    {
      id: 5,
      title: "Luxury Watch Collection",
      originalPrice: 599.99,
      discountPrice: 299.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop",
      category: "best-buy",
      rating: 4.6,
      reviews: 445,
      tag: "Exclusive",
      stock: 12
    },
    {
      id: 6,
      title: "Fitness Tracker Pro",
      originalPrice: 249.99,
      discountPrice: 129.99,
      discount: 48,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
      category: "new-arrival",
      rating: 4.4,
      reviews: 1567,
      tag: "New Arrival",
      stock: 18
    },
    {
      id: 7,
      title: "Professional Camera Kit",
      originalPrice: 1299.99,
      discountPrice: 899.99,
      discount: 31,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      category: "best-rental",
      rating: 4.9,
      reviews: 234,
      tag: "Rental Pro",
      stock: 6
    },
    {
      id: 8,
      title: "Electric Scooter",
      originalPrice: 799.99,
      discountPrice: 399.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "50-off",
      rating: 4.2,
      reviews: 678,
      tag: "Half Price",
      stock: 11
    },
    {
      id: 9,
      title: "Wireless Gaming Mouse",
      originalPrice: 89.99,
      discountPrice: 45.99,
      discount: 49,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
      category: "hot-deals",
      rating: 4.5,
      reviews: 892,
      tag: "Gaming Pro",
      stock: 28
    },
    {
      id: 10,
      title: "Bluetooth Speaker",
      originalPrice: 159.99,
      discountPrice: 79.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      category: "trending",
      rating: 4.3,
      reviews: 1456,
      tag: "Trending",
      stock: 35
    },
    {
      id: 11,
      title: "Smartphone 128GB",
      originalPrice: 699.99,
      discountPrice: 449.99,
      discount: 36,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      category: "bestseller",
      rating: 4.6,
      reviews: 3200,
      tag: "Top Rated",
      stock: 19
    },
    {
      id: 12,
      title: "Laptop Stand Adjustable",
      originalPrice: 79.99,
      discountPrice: 39.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1527209634-de3f5e2b70b3?w=400&h=300&fit=crop",
      category: "50-off",
      rating: 4.4,
      reviews: 567,
      tag: "Office Pro",
      stock: 42
    },
    {
      id: 13,
      title: "Air Purifier Smart",
      originalPrice: 299.99,
      discountPrice: 199.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
      category: "new-arrival",
      rating: 4.7,
      reviews: 445,
      tag: "Health Tech",
      stock: 14
    },
    {
      id: 14,
      title: "Drone with 4K Camera",
      originalPrice: 899.99,
      discountPrice: 649.99,
      discount: 28,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
      category: "best-rental",
      rating: 4.8,
      reviews: 278,
      tag: "Rental Fav",
      stock: 9
    },
    {
      id: 15,
      title: "Coffee Maker Premium",
      originalPrice: 189.99,
      discountPrice: 129.99,
      discount: 32,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      category: "best-buy",
      rating: 4.5,
      reviews: 1123,
      tag: "Kitchen Pro",
      stock: 26
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deals', icon: '🔥' },
    { id: 'hot-deals', name: 'Hot Deals', icon: '⚡' },
    { id: 'trending', name: 'Trending', icon: '📈' },
    { id: '50-off', name: '50% Off', icon: '💥' },
    { id: 'bestseller', name: 'Best Seller', icon: '⭐' },
    { id: 'new-arrival', name: 'New Arrival', icon: '🆕' },
    { id: 'best-buy', name: 'Best Buy', icon: '💎' },
    { id: 'best-rental', name: 'Best Rental', icon: '🏆' }
  ];

  const filteredDeals = activeCategory === 'all' 
    ? hotDeals 
    : hotDeals.filter(deal => deal.category === activeCategory);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">☆</span>);
    }
    return stars;
  };
 
  const toggleWishlist = (e,productId) => {
    e.stopPropagation();
    setWishlist((prev) =>
    prev.includes(productId)
      ? prev.filter((id) => id !== productId) // remove from wishlist
      : [...prev, productId] // add to wishlist
  );
  };

  return (
    <div className="hot-deals-page">
      <style jsx>{`
        .hot-deals-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .category-tabs {
          background: #f8f9fa;
          padding: 20px 0;
        }
        
        .category-btn {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 25px;
          padding: 10px 20px;
          margin: 5px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .category-btn.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

         .search-container {
          position: relative;
          max-width: 650px;
          background: #f8f9fa;
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
        
        .deals-container {
          padding-left: 50px !important;
          padding-right: 50px !important;
        }
                    
        .deal-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .deal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .deal-image {
          height: 180px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
         
        .wishlist-btn{
          top: 8px;
          right: 8px;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          borderRadius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdropFilter: blur(10px);
          zIndex: 2;
        }
          .wishlist-btn {
            position: absolute;      /* so it stays on top of image */
            top: 8px;
            right: 8px;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;      /* 👈 CSS syntax */
            justify-content: center;  /* 👈 CSS syntax */
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px); /* 👈 CSS syntax */
            z-index: 2;
          }
        
         .wishlist-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .wishlist-btn:active {
          transform: scale(0.95);
        }
        
        .deal-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        .discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          display: inline-block;   /* 👈 prevent full width */
          background: #e63946;     /* red badge */
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          padding: 5px 10px;
          border-radius: 20px;     /* pill look */
          white-space: nowrap;     /* 👈 keeps text in one line */
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          display: inline-block;
          width: auto !important;
          max-width: fit-content;
          
        }
        
        .deal-content {
          padding: 15px;
        }
        
        .deal-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #2c3e50;
          height: 2.4em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .price-section {
          margin: 10px 0;
        }
        
        .discount-price {
          font-size: 1.3rem;
          font-weight: bold;
          color: #27ae60;
          margin-right: 8px;
        }
        
        .original-price {
          font-size: 0.9rem;
          color: #7f8c8d;
          text-decoration: line-through;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          margin: 8px 0;
          font-size: 0.85rem;
        }
        
        .stock-info {
          background: #fff3cd;
          color: #856404;
          padding: 6px 10px;
          border-radius: 15px;
          font-size: 0.75rem;
          margin: 8px 0;
          text-align: center;
        }
        
        .stock-info.low-stock {
          background: #f8d7da;
          color: #721c24;
        }
        
        .add-to-cart-btn {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 20px;
          width: 100%;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          color: white;
        }
        
        .deals-grid {
          padding: 40px 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .section-subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @media (max-width: 1200px) {
          .col-xxl-2 {
            flex: 0 0 auto;
            width: 20%;
          }
        }
        
        @media (max-width: 992px) {
          .col-xxl-2 {
            flex: 0 0 auto;
            width: 33.333333%;
          }
        }
        
        @media (max-width: 768px) {
          .time-unit {
            min-width: 60px;
            padding: 10px 5px;
          }
          
          .time-number {
            font-size: 1.5rem;
          }
          
          .section-title h2 {
            font-size: 2rem;
          }
          
          .deal-card {
            margin-bottom: 20px;
          }
          
          .col-xxl-2 {
            flex: 0 0 auto;
            width: 50%;
          }
        }
        
        @media (max-width: 576px) {
          .col-xxl-2 {
            flex: 0 0 auto;
            width: 100%;
          }
        }
      `}</style>

      

    {/* Category Filter */}
      <div className="category-tabs">
        <div className="container">
          <div className="text-center">
            <div className="d-flex flex-wrap justify-content-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="me-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
       {/* Enhanced Search Bar */}
              <div className="search-container mx-auto mb-1">
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

      {/* Deals Grid */}
      <div className="deals-grid bg-light">
        <div className="container-fluid deals-container">
          {/* <div className="section-title">
            <h2>Today's Hottest Deals</h2>
            <p className="section-subtitle">Grab these amazing offers before they're gone!</p>
          </div> */}
          
          <div className="row g-3">
            {filteredDeals.map(deal => (
              <div key={deal.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="deal-card">
                  <div 
                    className="deal-image"
                    style={{ backgroundImage: `url(${deal.image})` }}
                  >
                    {/* <div className="deal-tag">{deal.tag}</div> */}
                    {deal.discount > 40 && (
                      <div  className="discount-badge">-{deal.discount}%</div>
                    )} 
                    <button
                      className=" wishlist-section wishlist-btn position-absolute"
                      onClick={(e) =>toggleWishlist(e,deal.id)}
                    >
                      <Heart 
                        size={14} 
                        className={wishlist.includes(deal.id) ? 'text-danger' : 'text-muted'}
                        fill={wishlist.includes(deal.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                  
                  <div className="deal-content">
                    <h5 className="deal-title">{deal.title}</h5>
                    
                    <div className="rating-section">
                      <div className="me-1">
                        {renderStars(deal.rating)}
                      </div>
                      <span className="text-muted">({deal.reviews})</span>
                    </div>
                    
                    <div className="price-section">
                      {deal.type === 'rental' ? (
                        <div className="rental-price">📅 ${deal.rentalPrice}/day</div>
                      ) : (
                        <>
                          <span className="discount-price">${deal.discountPrice}</span>
                          <span className="original-price">${deal.originalPrice}</span>
                        </>
                      )}
                      
                      {deal.type === 'both' && (
                        <div className="rental-price">📅 ${deal.rentalPrice}/day</div>
                      )}
                    </div>
                    
                    <div className="action-buttons">
                      {deal.type === 'sale' && (
                        <button className="btn-primary-custom">🛒 Add to Cart</button>
                      )}
                      
                      {deal.type === 'rental' && (
                        <button className="btn-secondary-custom">📅 Rent Now</button>
                      )}
                      
                      {deal.type === 'both' && (
                        <>
                          <button className="btn-primary-custom">🛒 Buy</button>
                          <button className="btn-secondary-custom">📅 Rent</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDeals.length === 0 && (
            <div className="text-center py-5">
              <h4 className="text-muted">No deals found in this category</h4>
              <p className="text-muted">Try selecting a different category or check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
