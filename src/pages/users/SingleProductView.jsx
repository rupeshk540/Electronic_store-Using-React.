
import  { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../../services/ProductService';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import WishlistContext from '../../context/WishlistContext';
import { getReviewsOfProduct } from '../../services/ReviewService';
import ShowHtml from '../../components/ShowHtml';

const SingleProductView = () => {
  const[product,setProduct] =useState();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRentalPlan, setSelectedRentalPlan] = useState('daily');
  const [activeTab] = useState('buy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const { cart, addItemCart,removeItemCart } = useContext(CartContext);
  const { wishlist, addItemWishlist, removeItemWishlist } = useContext(WishlistContext);  
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [showRemovedFromCart, setShowRemovedFromCart] = useState(false);
  const { isLogin } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(productId);
       setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const loadReviews = async () => {

      try{
        const data = await getReviewsOfProduct(productId);

        setReviews(data);

      }catch(error){
          console.log(error);
      }
    }

    loadReviews();
  }, [productId]);

 // Check if product is in cart
const isInCart = cart?.items?.some(item => item.product.productId === product?.productId) ?? false;

// Check if product is in wishlist
const isInWishlist = wishlist?.some(item => item.productId === product?.productId) ?? false;

// Toggle wishlist
const toggleWishlist = () => {
  if (isInWishlist) {
    removeItemWishlist(product.productId);
  } else {
    addItemWishlist(product.productId);
  }
};

// Toggle cart
const toggleCart = () => {
  if (!product) return;

  if (isInCart) {
    const cartItem = cart.items.find(item => item.product.productId === product.productId);
    removeItemCart(cartItem.cartItemId);
    setShowRemovedFromCart(true);
    setTimeout(() => setShowRemovedFromCart(false), 3000);
  } else {
    addItemCart(quantity, product.productId, () => {
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000);
    });
  }
};
  
const handleBuyNow = (product,quantity) => {
  if (!isLogin) {
    // redirect to login
    navigate("/login");
    return;
  }

  // navigate to checkout with product details in state
 navigate("/user/checkout", {
  state: {
    productId: product.productId,
    quantity
  }
});
};

  // const handleRentNow = () => {
  //   // Rent now logic here
  //   alert(`Proceeding to rent: ${selectedRentalPlan} plan - $${product.rentalPrice[selectedRentalPlan]}`);
  // };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<i key={i + 5} className="bi bi-star text-warning"></i>);
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center py-5">Loading product...</div>;
  }
  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }
  if (!product) {
    return <div className="text-center py-5">Product not found</div>;
  }

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="sticky-top"
            style={{ top: "80px", zIndex: 1 }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
          <li className="breadcrumb-item"><a href="/cateogies" className="text-decoration-none">{product.category?.title}</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      {/* Alert for Add to Cart */}
      {showAddedToCart && (
        <div className="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" style={{zIndex: 1050}}>
          <i className="bi bi-check-circle-fill me-2"></i>
          Product added to cart successfully!
        </div>
      )}
      {showRemovedFromCart && (
        <div className="alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" style={{zIndex: 1050}}>
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          Product removed from cart!
        </div>
      )}

      <div className="row border">
        {/* Product Images Section */}
        <div className="col-lg-6 mb-4">
         <div className='sticky-top mt-3' style={{ top: "140px", zIndex: 1 }}>
           <div className="d-flex">
            {/* Thumbnail Images */}
            <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: "500px" }}>
              {product.productImageUrls?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  className={`rounded cursor-pointer border ${selectedImage === idx ? 'border-primary border-3' : 'border-secondary'}`}
                  style={{width: '80px', height: '80px', objectFit: 'contain', cursor: 'pointer'}}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>

            {/* Main Image  */}
            <img 
              src={product.productImageUrls[selectedImage]} 
              alt={product.title}
              className="img-fluid flex-grow-1"
              style={{maxHeight: '500px', maxWidth: "500px", objectFit: 'contain', backgroundColor: '#f8f9fa'}}
            />
          </div>
           
            {/* Action Buttons */}
          <div className="d-flex gap-3 mt-5 mx-5">
            <button 
              className={`btn btn-lg flex-fill ${isInCart ? "btn-success" : "btn-outline-primary"}`}
              style={{maxWidth: "270px"}}
              onClick={toggleCart}
              //disabled={!product.inStock}
            >
              <i className={`bi ${isInCart ? "bi-check-circle-fill me-2 " : "bi-cart-plus me-2"}`}></i>
              {isInCart ? "Added to cart" : "Add to Cart"}
            </button>
            <button 
              className="btn btn-primary btn-lg flex-fill"
              style={{maxWidth:"270px"}}
              onClick={()=>handleBuyNow(product,quantity)}
             // disabled={!product.Stock}
            >
              <i className={`bi ${activeTab === 'buy' ? 'bi-bag-check':'bi-clock-history'} me-2`}></i>
              {activeTab==='buy'?'Buy Now':'Rent Now'}
            </button>
            
          </div>
         </div>
        </div>

        {/* Product Details Section (Scrollable on right) */}
        <div className="col-lg-6 mt-3 ps-0">
          <div className="product-details">

            {/* Brand and Title */}
            {/* <p className="text-muted mb-1"></p> */}
            {/* Brand and Title */}
            <p className="text-muted mb-1">{product.brand}</p>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h1 className="h2 mb-0">{product.title}</h1>

              <div className="d-flex gap-3">
                {/* Wishlist Button */}
                <button
                  className="btn btn-light btn-sm rounded-circle shadow-sm wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist();
                  }}
                >
                  <i className={`bi ${isInWishlist ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                </button>

                {/* Share Button */}
                <button 
                  className="btn btn-sm btn-light rounded-circle shadow-sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.title,
                        text: "Check out this product!",
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Product link copied to clipboard!");
                    }
                  }}
                >
                  <i className="bi bi-share"></i>
                </button>
              </div>
            </div>


            {/* Rating and Reviews */}
              <div className="d-flex align-items-center mb-3">
              <div className="me-2">
                  {renderStars(product.averageRating || 0)}
              </div>
              <span className="text-muted">
                {(product.averageRating || 0).toFixed(1)}
                {" "}
                ({product.totalReviews || 0} Reviews)
              </span>
              </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="card-body">
                <div className="d-flex align-items-baseline gap-3">
                  <h3 className="text-primary mb-0"> ₹{product.discountedPrice || product.price}</h3>
                  {product.price && (
                    <>
                      <span className="text-muted text-decoration-line-through">
                        ₹{product.price}
                      </span>
                      <span className="badge bg-success">
                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className=" mb-1">
              <div className="card-body">
                {product.stock > 0 ? (
                  <div>
                    <span className="badge bg-success me-2">
                      <i className="bi bi-check-circle me-1"></i>In Stock
                    </span>
                    <small className="text-muted">({product.stock} available)</small>
                  </div>
                ) : (
                  <span className="badge bg-danger">Out of Stock</span>
                )}
              </div>
            </div>
              {/* Buy / Rent Tabs */}
           
              <div className=" mb-4">
                <div className="card-body">
                  <ul className="nav nav-tabs mb-3">
                    {/* <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('buy')}
                      >
                        Buy
                      </button>
                    </li> */}
                    {/* <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'rent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rent')}
                      >
                        Rent
                      </button>
                    </li> */}
                  </ul>

                  {/* Buy Tab */}
                  {activeTab === 'buy' && (
                  <div>
                    <label className="form-label fw-bold">Quantity:</label>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={(e)=>decrementQuantity()}
                            >
                              -
                            </button>

                            <span>{quantity}</span>

                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={(e) => incrementQuantity()}
                            >
                              +
                            </button>
                          </div>
                      </div>
                      <div className="col-auto">
                        <small className="text-muted">Max {product.stock} items</small>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rent Tab */}
                {activeTab === 'rent' && (
                  <div className="row g-3">
                    {Object.entries(product.rentalPrice).map(([plan, price]) => (
                      <div className="col-md-4" key={plan}>
                        <div 
                          className={`card cursor-pointer ${selectedRentalPlan === plan ? 'border-primary' : ''}`}
                          onClick={() => setSelectedRentalPlan(plan)}
                        >
                          <div className="card-body text-center">
                            <h6 className="card-title text-capitalize">{plan}</h6>
                            <h5 className="text-primary">${price}</h5>
                            <small className="text-muted">per {plan}</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
    
            {/* Key Features Preview */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Key Highlights</h6>
              <div className="row g-2">
                {product.features?.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="col-6">
                    <small className="d-flex align-items-center">
                      <span className="text-success me-2">✓</span>
                      {feature}
                    </small>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Return Info
            <div className="border rounded p-3 mb-3 bg-light">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="fs-4 text-primary me-2">🚚</i>
                    <div>
                      <small className="text-muted d-block">Free Delivery</small>
                      <small className="fw-bold">2-3 business days</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="fs-4 text-primary me-2">🔄</i>
                    <div>
                      <small className="text-muted d-block">Return Policy</small>
                      <small className="fw-bold">30 days return</small>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
     

          
            {/* Seller Information */}
        
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-uppercase text-muted fw-semibold">
                      Sold & Fulfilled By
                    </small>
                    <h4 className="fw-bold mt-1 mb-2">
                      Zeptra Official Store
                    </h4>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="badge bg-success">
                        <i className="bi bi-patch-check-fill me-1"></i>
                        Verified Seller
                      </span>

                      <span className="text-muted">
                        <i className="bi bi-shield-check me-1 text-success"></i>
                        100% Genuine Products
                      </span>
                    </div>
                    </div>
                      <i
                        className="bi bi-shop-window text-primary"
                        style={{
                            fontSize: "42px"
                        }}
                      ></i>
                    </div>

                    <hr />
                    <div className="row text-center g-3">
                      <div className="col-md-4">
                        <div className="border rounded-3 p-3 h-100">
                          <i className="bi bi-truck fs-4 text-primary"></i>
                          <h6 className="mt-2 mb-1">
                            Fast Shipping
                          </h6>
                          <small className="text-muted">
                            Delivered within 2–5 business days
                          </small>

                        </div>
                        </div>
                        <div className="col-md-4">
                          <div className="border rounded-3 p-3 h-100">
                            <i className="bi bi-arrow-repeat fs-4 text-success"></i>
                            <h6 className="mt-2 mb-1">
                              Easy Returns
                            </h6>
                            <small className="text-muted">
                              Hassle-free return policy
                            </small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="border rounded-3 p-3 h-100">
                            <i className="bi bi-shield-check fs-2 text-warning"></i>
                            <h6 className="mt-2 mb-1">
                              Secure Payment
                            </h6>
                            <small className="text-muted">
                              100 % protected checkout
                            </small>
                            </div>
                          </div>
                        </div>
              </div>
            </div>
              
            {/* Description Card */}
            <div className="border rounded p-3 mb-3">
              <div className="card-body">
                <h5 className="mb-3">Description</h5>
                <div className="text-muted">
                  <ShowHtml htmlText={product.description} />
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="border rounded p-3 mb-3">
              <div className="card-body">
                <h5 className="mb-3">Features</h5>
                <ul className="list-unstyled mb-0">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="mb-2 d-flex align-items-center">
                      <span className="text-success me-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specifications Card */}
            {product?.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="border rounded p-3 mb-3">
                <div className="card-body">
                  <h5 className="mb-3">Specifications</h5>
                  <table className="table table-sm">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="fw-bold">{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="border rounded p-3 mb-3">
                <div className="card-body">
                  <h5 className="mb-3">Specifications</h5>
                  <p className="text-muted">No specifications available.</p>
                </div>
              </div>
            )}


              {/* Reviews Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="mb-3">Customer Reviews</h5>
                <div className="mb-3">
                  <p className="text-muted">Average Rating : {product.averageRating} </p>
                  {renderStars(product.averageRating)}
                  <p className="text-muted">Total reviews : {product.totalReviews} </p>
                </div>
        
                {/* Sample Review */}
                <div className="border-top pt-3">
                  {
                    reviews.length === 0 ? (

                    <p className="text-muted">
                        No reviews yet.
                    </p>

                    ) : (

                    reviews.map(review => (
                      <div
                        key={review.reviewId}
                        className="border-top pt-3"
                      ><h6>{review.userName}</h6>
                        {renderStars(review.rating)}
                        <p>{review.review}</p>
                      </div>

                    )))
                    }
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
          
    </div> 

                
            
  )
};

 export default SingleProductView;



