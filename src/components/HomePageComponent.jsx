import { Heart, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { getAllCollections } from "../services/CollectionService";
import { getAllLiveProducts, getProductsByCollection, searchProduct } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../context/WishlistContext";

const HomePageComponent = () => {
  
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCollection, setActiveCollection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(12);  // adjust per your needs
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { wishlist, addItemWishlist, removeItemWishlist } = useContext(WishlistContext)


  // Fetch all collections on mount
  useEffect(() => {
    getAllCollections().then(data => setCollections(data.content));
  }, []);

// reset products when collection/search changes
  useEffect(() => {
  fetchProducts(true); 
}, [activeCollection, searchQuery]);


  // Fetch products depending on category or search
 const fetchProducts = (reset = false) => {
  if (loading || (!hasMore && !reset)) return;

  setLoading(true);

  let fetchPromise;
  const currentPage = reset ? 0 : page;

  if (searchQuery) {
    fetchPromise = searchProduct(searchQuery, currentPage, pageSize);
  } else if (activeCollection && activeCollection !== 'all') {
    fetchPromise = getProductsByCollection(activeCollection, currentPage, pageSize);
  } else {
    fetchPromise = getAllLiveProducts(currentPage, pageSize);
  }

  fetchPromise
    .then(data => {
      const newProducts = data.content || data;
      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      setPage(currentPage + 1);
      setHasMore(newProducts.length >= pageSize);
    })
    .catch(err => console.error("Error fetching products:", err))
    .finally(() => setLoading(false));
};


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
 
const toggleWishlist = (e, productId) => {
    e.stopPropagation(); // prevent parent click events
    const inWishlist = (wishlist || []).some((item) => item.productId === productId);
    if (inWishlist) {
      removeItemWishlist(productId);
    } else {
      addItemWishlist(productId);
    }
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
          display:flex;
          flex-direction: column;
          cursor: pointer;
          background: white;
          border-radius: 3px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 330px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .deal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .deal-image {
          flex:7;
          background-size: contain;
          background-position: center;
          position: relative;
          background-repeat: no-repeat;
        }
         
        .wishlist-btn {
          position: absolute;      /* so it stays on top of image */
          top: 8px;
          right: 8px;
          border: none;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 28px;
          height: 28px;
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
          flex: 3; 
          padding: 6px 8px;  
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .deal-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1.5px;
          color: #2c3e50;
          height: 1.7rem;
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
          color: #18663bff;
          margin-right: 8px;
        }
        
        .original-price {
          font-size: 0.9rem;
          color: #34595dff;
          text-decoration: line-through;
        }
        
        .rating-section {
          display: flex;
          align-items: center;
          margin: 2px 0;
          font-size: 0.8rem;
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
               {/* Default collection tab */}
              <button
                key="all"
                className={`category-btn ${activeCollection === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCollection('all')}
              >
                🌟 All Deals
              </button>
              {collections.map(collection => (
                <button
                  key={collection.collectionId}
                  className={`category-btn ${activeCollection === collection.collectionId ? 'active' : ''}`}
                  onClick={() => setActiveCollection(collection.collectionId)}
                >
                  <span className="me-2">{collection.icon}</span>
                  {collection.title}
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
                    <button className="search-btn" onClick={(e) => {
                      e.preventDefault(); 
                      setSearchQuery(searchQuery.trim());
                      }}
                    >Search</button>
                  </div>
                </div>
              </div>

      {/* Deals Grid */}
      <div className="deals-grid bg-light">
        <div className="container-fluid deals-container"> 
          <div className="row g-3">
            {products.map(product => (
              <div key={product.productId} className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="deal-card" onClick={() => navigate(`/products/${product.productId}`)}>
                  <div 
                    className="deal-image"
                    style={{ backgroundImage: `url(${Array.isArray(product.productImageUrls) ? product.productImageUrls[0] : product.productImageUrls})` }}

                  >
                    {/* {(() => {
                      const discountPercent = ((product.price - product.discountedPrice) / product.price) * 100;
                      return discountPercent > 5 && (
                        <div className="discount-badge">-{Math.round(discountPercent)}%</div>
                      );
                    })()} */}
                    
                    <button
                      className=" wishlist-section wishlist-btn position-absolute"
                      onClick={(e) =>toggleWishlist(e,product.productId)}
                    >
                      <Heart 
                        size={16} 
                        className={(wishlist || []).some((item) => item.productId === product.productId) ? 'text-danger' : 'text-muted'}
                        fill={(wishlist || []).some((item) => item.productId === product.productId)? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                  
                  <div className="deal-content">
                    <h5 className="deal-title">{product.title}</h5>
                    
                    <div className="rating-section">
                      <div className="me-1">
                        {renderStars(product.rating)}
                      </div>
                      {/* <span className="text-muted">({product.reviews})</span> */}
                    </div>
                    
                    <div className="price-section">
                      {/* {product.rentalPrice != null ? (
                        <div className="rental-price">📅 ${product.rentalPrice}/day</div>
                      ) : ( */}
                        <>
                          <span className="discount-price">${product.discountedPrice}</span>
                          <span className="original-price">${product.price}</span>
                        </>
                      {/* )}
                      
                      {product.rentalPrice != null && (
                        <div className="rental-price">📅 ${product.rentalPrice}/day</div>
                      )} */}
                    </div>
                    
                    {/* <div className="action-buttons">
                      {product.type === 'sale' && (
                        <button className="btn-primary-custom">🛒 Add to Cart</button>
                      )}
                      
                      {product.type === 'rental' && (
                        <button className="btn-secondary-custom">📅 Rent Now</button>
                      )}
                      
                    
                        <>
                          <button className="btn-primary-custom">🛒 Buy</button>
                          <button className="btn-secondary-custom">📅 Rent</button>
                        </>
                    
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => fetchProducts()}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

          
          {products.length === 0 && (
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
