import { Heart, Search,LayoutGrid, Flame, TrendingUp, BadgePercent, Award, Sparkles, Star, ShoppingBag, PackageCheck, ThumbsUp, Gem, Crown } from "lucide-react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAllCollections } from "../services/CollectionService";
import { getAllLiveProducts, getProductsByCollection, searchProduct } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../context/WishlistContext";

const HomePageComponent = () => {
  console.log("homepage")
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
  const [searchInput, setSearchInput] = useState('');
  const loadingRef = useRef(false);
  const pageRef = useRef(0);
  const hasMoreRef = useRef(true);

// Debounce: update searchQuery only after user stops typing for 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 400);
    return () => clearTimeout(timer); 
  }, [searchInput]);

const fetchProducts = useCallback(async(reset=false)=>{

  if(loadingRef.current || (!hasMoreRef.current && !reset))
      return;


  loadingRef.current=true;
  setLoading(true);


  try{

    const currentPage = reset ? 0 : pageRef.current;


    let data;

    if(searchQuery){
      data = await searchProduct(
        searchQuery,
        currentPage,
        pageSize
      );
    }
    else if(activeCollection !== "all"){
      data = await getProductsByCollection(
        activeCollection,
        currentPage,
        pageSize
      );
    }
    else{
      data = await getAllLiveProducts(
        currentPage,
        pageSize
      );
    }


    const newProducts=data.content || data;


    setProducts(prev =>
      reset ? newProducts : [...prev,...newProducts]
    );


    pageRef.current=currentPage+1;

    hasMoreRef.current=newProducts.length >= pageSize;


  }
  catch(err){
    console.log(err);
  }
  finally{

    loadingRef.current=false;
    setLoading(false);

  }


},[
 searchQuery,
 activeCollection,
 pageSize
]);

  // Fetch all collections on mount
  useEffect(()=>{

 const loadCollections=async()=>{

  try{
    const data=await getAllCollections();
    setCollections(data.content || []);

  }catch(err){
    console.log(err);
  }

 }

 loadCollections();

},[]);

  // reset products when collection/search changes
  useEffect(()=>{

    pageRef.current=0;
    hasMoreRef.current=true;

    fetchProducts(true);

  },[searchQuery,activeCollection,fetchProducts]);


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

  const iconMap = {
    "layout-grid": LayoutGrid,
    flame: Flame,
    "trending-up": TrendingUp,
    "badge-percent": BadgePercent,
    award: Award,
    sparkles: Sparkles,
    star: Star,
    "shopping-bag": ShoppingBag,
    "package-check": PackageCheck,
    "thumbs-up": ThumbsUp,
    gem: Gem,
    crown: Crown
  };
  
  return (
    <div className="hot-deals-page">
    <style>{`
    .hot-deals-page {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* ================= CATEGORY ================= */

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
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .category-btn.active {
      background: linear-gradient(45deg,#667eea,#764ba2);
      color:white;
      border-color:transparent;
    }


    /* ================= SEARCH ================= */

    .search-container {
      position:relative;
      max-width:650px;
      background:#f8f9fa;
    }

    .search-input-group {
      display:flex;
      align-items:center;
      position:relative;

      background:rgba(255,255,255,.95);
      backdrop-filter:blur(15px);

      border-radius:50px;
      border:2px solid rgba(255,255,255,.2);

      overflow:hidden;

      box-shadow:0 8px 32px rgba(0,0,0,.1);

      transition:.3s ease;
    }

    .search-input-group:hover {
      background:white;
      box-shadow:0 12px 40px rgba(0,0,0,.15);
    }

    .search-input-group:focus-within {
      background:white;
      border-color:#667eea;
      box-shadow:0 15px 45px rgba(102,126,234,.3);
    }


    .search-input {
      flex:1;

      border:none;
      outline:none;

      background:transparent;

      padding:1rem 1rem 1rem 3.5rem;

      font-size:1.1rem;
      color:#333;
    }


    .search-input::placeholder {
      color:#666;
    }


    .search-icon {
      position:absolute;
      left:1.2rem;
      color:#667eea;
    }


    .search-actions {
      display:flex;
      align-items:center;
      gap:.5rem;
      padding:.5rem;
    }


    .search-action-btn {
      width:40px;
      height:40px;

      display:flex;
      align-items:center;
      justify-content:center;

      border:none;
      border-radius:50%;

      background:rgba(102,126,234,.1);
      color:#667eea;

      cursor:pointer;

      transition:.3s ease;
    }

    .search-action-btn:hover {
      background:#667eea;
      color:white;
      transform:scale(1.1);
    }


    .search-btn {
      border:none;

      background:#667eea;
      color:white;

      padding:.75rem 2rem;

      border-radius:25px;

      font-weight:600;

      cursor:pointer;

      transition:.3s ease;
    }


    .search-btn:hover {
      background:#5a67d8;
      transform:translateY(-1px);
    }


    /* ================= DEAL GRID ================= */

    .deals-container {
      padding:0 40px;
    }

    .deals-grid {
      padding:40px 0;
    }


    .deal-col {
      width:16.666%;
    }


    /* ================= CARD ================= */

    .deal-card {

      display:flex;
      flex-direction:column;

      background:white;

      border-radius:3px;

      overflow:hidden;

      height:330px;

      cursor:pointer;

      box-shadow:0 2px 10px rgba(0,0,0,.1);

      transition:.3s ease;
    }


    .deal-card:hover {

      transform:translateY(-5px);

      box-shadow:0 10px 25px rgba(0,0,0,.15);
    }


    .deal-image {

      flex:7;

      position:relative;

      background-size:contain;
      background-position:center;
      background-repeat:no-repeat;

    }


    /* ================= BADGES ================= */


    .deal-tag {

    position:absolute;

    top:10px;
    left:10px;

    background:linear-gradient(45deg,#ff6b6b,#ee5a24);

    color:white;

    padding:4px 10px;

    border-radius:15px;

    font-size:.75rem;

    font-weight:bold;
    }


    .discount-badge {

    position:absolute;

    top:10px;
    left:10px;

    display:inline-block;

    background:#e63946;

    color:white;

    font-size:14px;

    font-weight:bold;

    padding:5px 10px;

    border-radius:20px;

    white-space:nowrap;

    box-shadow:0 2px 6px rgba(0,0,0,.2);

    }


    /* ================= WISHLIST ================= */


    .wishlist-btn {

    position:absolute;

    top:8px;
    right:8px;

    width:28px;
    height:28px;

    display:flex;

    align-items:center;
    justify-content:center;

    border:none;

    border-radius:50%;

    background:rgba(255,255,255,.9);

    cursor:pointer;

    backdrop-filter:blur(10px);

    z-index:2;

    transition:.3s ease;
    }


    .wishlist-btn:hover {

    transform:scale(1.1);

    background:white;

    box-shadow:0 4px 12px rgba(0,0,0,.15);
    }


    .wishlist-btn:active {

    transform:scale(.95);

    }



    /* ================= CONTENT ================= */


    .deal-content {

    flex:3;

    padding:6px 8px;

    display:flex;

    flex-direction:column;

    justify-content:space-between;

    }


    .deal-title {

    font-size:1rem;

    font-weight:600;

    color:#2c3e50;

    height:1.7rem;

    overflow:hidden;

    display:-webkit-box;

    -webkit-line-clamp:2;

    -webkit-box-orient:vertical;

    }


    .price-section {

    margin:10px 0;

    }


    .discount-price {

    font-size:1.3rem;

    font-weight:bold;

    color:#18663b;

    margin-right:8px;

    }


    .original-price {

    font-size:.9rem;

    color:#34595d;

    text-decoration:line-through;

    }


    .rating-section {

    display:flex;

    align-items:center;

    margin:2px 0;

    font-size:.8rem;

    }


    .stock-info {

    background:#fff3cd;

    color:#856404;

    padding:6px 10px;

    border-radius:15px;

    font-size:.75rem;

    margin:8px 0;

    text-align:center;

    }


    .stock-info.low-stock {

    background:#f8d7da;

    color:#721c24;

    }



    .add-to-cart-btn {

    width:100%;

    background:linear-gradient(45deg,#667eea,#764ba2);

    color:white;

    border:none;

    padding:10px 16px;

    border-radius:20px;

    font-weight:600;

    font-size:.9rem;

    transition:.3s ease;

    }


    .add-to-cart-btn:hover {

    transform:translateY(-2px);

    box-shadow:0 5px 15px rgba(102,126,234,.4);

    }



    /* ================= SECTION ================= */


    .section-title {

    text-align:center;

    margin-bottom:40px;

    }


    .section-title h2 {

    font-size:2.5rem;

    font-weight:bold;

    color:#2c3e50;

    }


    .section-subtitle {

    color:#7f8c8d;

    font-size:1.1rem;

    }



    /* ================= ANIMATION ================= */


    @keyframes pulse {

    0%{
    opacity:1;
    }

    50%{
    opacity:.7;
    }

    100%{
    opacity:1;
    }

    }


    .pulse {

    animation:pulse 2s infinite;

    }


    /* ================= RESPONSIVE ================= */


    @media(max-width:1200px){

    .deal-col{
    width:20%;
    }

    }


    @media(max-width:992px){

    .deal-col{
    width:33.33%;
    }

    }


    @media(max-width:768px){


    .deals-container{

    padding:0 12px;

    }


    .deal-card{

    height:270px;

    margin-bottom:20px;

    }


    .deal-image{

    flex:6.5;

    }


    .deal-title{

    font-size:.85rem;

    height:34px;

    }


    .discount-price{

    font-size:1rem;

    }


    .original-price{

    font-size:.75rem;

    }


    .rating-section{

    font-size:.7rem;

    }


    .wishlist-btn{

    width:24px;
    height:24px;

    }


    .search-container{

    width:95%;

    }


    .search-input{

    font-size:.95rem;

    padding:.85rem .85rem .85rem 2.8rem;

    }


    .search-btn{

    padding:.6rem 1.2rem;

    font-size:.9rem;

    }


    .search-icon{

    left:.9rem;

    }


    .category-btn{

    padding:8px 14px;

    font-size:.85rem;

    }


    .section-title h2{

    font-size:2rem;

    }


    .deal-col{

    width:50%;

    }


    }


    @media(max-width:576px){

    .deal-col{

    width:50%;

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
                <LayoutGrid size={20} color="#371261"/> All Products
              </button>
              {collections.map(collection => {
                const Icon = iconMap[collection.icon] || LayoutGrid;
                const isActive = activeCollection === collection.collectionId;
                return(
                  <button
                    key={collection.collectionId}
                    className={`category-btn ${activeCollection === collection.collectionId ? 'active' : ''}`}
                    onClick={() => setActiveCollection(collection.collectionId)}
                  >
                    <span className="me-2"><Icon size={22} strokeWidth={2} color={isActive? '#fff':'#371261'} /></span>
                    {collection.title}
                  </button>
                );
              })}
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
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <div className="search-actions">
                    <button className="search-btn" onClick={(e) => {
                      e.preventDefault(); 
                      setSearchQuery(searchInput.trim());
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
              <div key={product.productId} className="deal-col">
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
                        {renderStars(product.averageRating)}
                      </div>
                      {/* <span className="text-muted">({product.reviews})</span> */}
                    </div>
                    
                    <div className="price-section">
                      {/* {product.rentalPrice != null ? (
                        <div className="rental-price">📅 ${product.rentalPrice}/day</div>
                      ) : ( */}
                        <>
                          <span className="discount-price">₹{product.discountedPrice}</span>
                          <span className="original-price">₹{product.price}</span>
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

export default React.memo(HomePageComponent);
