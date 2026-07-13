
import { useCallback, useContext, useEffect, useState } from 'react';
import { Heart} from 'lucide-react';
import WishlistContext from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { getAllLiveProducts, searchProduct } from '../../services/ProductService';

const StorePage = () => {
 
  const { wishlist, addItemWishlist, removeItemWishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(12);  // adjust per your needs
  const [hasMore, setHasMore] = useState(true);
  
// Fetch products depending on category or search
 const fetchProducts = useCallback((reset = false) => {

  if (loading) return;

  setLoading(true);

  const currentPage = reset ? 0 : page;

  let fetchPromise;

  if (searchQuery && searchQuery.trim() !== "") {

    fetchPromise = searchProduct(
      searchQuery,
      currentPage,
      pageSize
    );

  } else {

    fetchPromise = getAllLiveProducts(
      currentPage,
      pageSize
    );
  }


  fetchPromise
    .then(data => {

      const newProducts = data.content || [];

      if (reset) {

        setProducts(newProducts);

      } else {

        setProducts(prev => [
          ...prev,
          ...newProducts
        ]);

      }

      setPage(currentPage + 1);

      setHasMore(newProducts.length >= pageSize);

    })
    .catch(err =>
      console.error("Error fetching products:", err)
    )
    .finally(() => setLoading(false));


}, [loading, page, searchQuery, pageSize]);
  
     
  // reset products when collection/search changes
  useEffect(() => {

  setPage(0);
  setHasMore(true);
  fetchProducts(true);

}, [searchQuery, fetchProducts]);


  const goToProductPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Toggle wishlist status
  const toggleWishlist = (productId, isWishlisted) => {
    if (isWishlisted) {
      removeItemWishlist(productId);
    } else {
      addItemWishlist(productId);
    }
  };

  
  return (
    
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 🔹 Hero Section with Search */}
      <section
        className="hero-section"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "350px",
          position: "relative",
        }}
      >
        <div className="container h-100">
          <div
            className="row align-items-center justify-content-center h-100"
            style={{ minHeight: "350px" }}
          >
            <div className="col-lg-8 col-md-10 text-center text-white">
              <h1
                className="hero-title display-5 fw-bold mb-3"
                style={{
                  animation: "fadeInUp 1s ease",
                  letterSpacing: "-1px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  animationDelay: "0s",

                }}
              >
                Discover Amazing Products
              </h1>
              <p
                className="hero-subtitle lead mb-4 opacity-90"
                style={{
                  animation:" fadeInUp 1s ease 0.1s both",
                  fontSize: "18px",
                  fontWeight: "400",
                  animationDelay: "0.2s",
                }}
              >
                Shop from our curated collection of premium products
              </p>

              {/* 🔹 Search Bar */}
              <div className="search-container d-flex justify-content-center mb-4">
                <div
                  className="input-group shadow-lg"
                  style={{
                    animation: "fadeInUp 1s ease 0.2s both",
                    maxWidth: "450px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    animationDelay: "0.4s"
                  }}
                >
                 <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="btn border-0"
                    type="button"
                    // onClick={() => {
                    //   setProducts([]);
                    //   setPage(0);
                    //   setHasMore(true);
                    // }}
                    style={{
                      backgroundColor: "#1f2937",
                      color: "white",
                      padding: "16px 24px",
                      fontWeight: "500",
                    }}
                  >
                   Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <div className="container py-4">
        <div className="wishlist-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", 
            gap: "16px"
          }}>
          {products.map(product =>{
            const isWishlisted = (wishlist || []).some(
              (item) => item.productId === product.productId
            );
            return(
              <div 
                key={product.productId} 
                className="card h-100  border position-relative "
                style={{cursor:"pointer"}}
                onClick={()=>goToProductPage(product.productId)}
              >
                <div 
                  className="card h-100  border-0 position-relative"
                  style={{ 
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Sale Tag */}
                  {product.saleTag && (
                    <span 
                      className="badge position-absolute top-0 start-0 m-2"
                      style={{ 
                        backgroundColor: '#ff4757', 
                        color: 'white', 
                        fontSize: '0.7rem',
                        zIndex: 10,
                        padding: '4px 8px',
                        borderRadius: '2px'
                      }}
                    >
                      {product.saleTag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    className="btn position-absolute top-0 end-0 m-2 p-1"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '4px',
                      width: '25px',
                      height: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.productId,isWishlisted);
                    }}
                  >
                    <Heart 
                      size={20} 
                      fill={isWishlisted ? '#ff4757' : 'none'}
                      color={isWishlisted ? '#ff4757' : '#555'}
                    />
                  </button>

                  {/* Product Image */}
                  <div 
                    style={{ 
                      height: '250px', 
                      overflow: 'hidden',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <img 
                      src={product?.productImageUrls?.[0]} 
                      alt={product.title}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="card-body  px-2 pb-2 " style={{ padding: '8px 0' }}>
                    <h6 className="card-title mb-1  fw-bold" style={{ fontSize: '1rem', color: '#333' }}>
                      {product.title}
                    </h6>
                    <p className="card-text text-muted mb-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }}>
                      {/* {product.description} */}
                    </p>
                    <div className="mb-2">
                      <span className="fw-bold" style={{ fontSize: '0.9rem', color: '#25770eff' }}>
                        ₹{product?.discountedPrice}
                      </span>
                    </div>
                    
                  
                  </div>
                </div>
              </div>
              
            
            );})}
            
        </div>
          {hasMore && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={() => fetchProducts()}>
                {loading ? "Loading..." : "Load More..!"}
              </button>
            </div>
          )}
      </div>
      
    </div>
  );
};

export default StorePage;



