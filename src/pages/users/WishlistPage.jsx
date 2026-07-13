import { useContext, useState } from 'react';
import { Heart, ShoppingCart, MoreHorizontal, Share, Check} from 'lucide-react';
import WishlistContext from '../../context/WishlistContext';
import CartContext from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserContext from '../../context/UserContext';

const WishlistPage = () => {
 
  const { wishlist, addItemWishlist, removeItemWishlist } = useContext(WishlistContext);
  const {cart, addItemCart,removeItemCart } = useContext(CartContext);
  const { isLogin} = useContext(UserContext);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [showRemovedFromCart, setShowRemovedFromCart] = useState(false);
  const navigate = useNavigate();

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

 //toggle cart item
  const handleToggleCart = (productId) => {
    const cartItem = cart?.items?.find(item => item.product.productId === productId);
    const isInCart = !!cartItem;

    if (isInCart) {
      removeItemCart(cartItem.cartItemId); 
      setShowRemovedFromCart(true);
      setTimeout(()=> setShowRemovedFromCart(false) ,3000);
     
    } else {
     addItemCart(1,productId, () => {
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000);
    });
    }
  };

  // Handle buy now
 const handleBuyNow = (product,quantity=1) => {
  if (!isLogin) {
    // redirect to login
    navigate("/login");
    return;
  }

  navigate("/user/checkout", {
  state: {
    productId: product.productId,
    quantity
  }
});
};

   if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-info p-4 shadow-sm rounded" role="alert">
          <h4 className="alert-heading mb-3">Your Wishlist is Empty 💔</h4>
          <p className="mb-4">
            Looks like you haven’t added any products yet.
          </p>
          <Button className="btn btn-primary">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Alert for Add to Cart */}
      {showAddedToCart && (
        <div
          className="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050 }}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Product added to cart successfully!
        </div>
      )}

      {/* Alert for Remove from Cart */}
      {showRemovedFromCart && (
        <div
          className="alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050 }}
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Product removed from cart!
        </div>
      )}
      {/* Header */}
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-6">
              <h4 className="mb-0 fw-bold" style={{ fontSize: '1.5rem' }}><ShoppingCart size={40}/> Wishlist (9)</h4>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-sm me-2" style={{ color: '#666', fontSize: '0.9rem' }}>
                <Share size={16} className="me-1" />
                Share wishlist
              </button>
              <button className="btn btn-sm" style={{ color: '#666', fontSize: '0.9rem' }}>
                <MoreHorizontal size={16} className="me-1" />
                More actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Info Bar */}
      <div className="container-fluid" style={{ backgroundColor: '#4285f4' }}>
        <div className="container">
          <div className="py-2 text-white text-center" style={{ fontSize: '0.85rem' }}>
            ✨ Get 10% extra off when you buy these items together
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-4">
        <div className="wishlist-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", 
            gap: "16px"
          }}>
          {wishlist.map((product, index) =>(
              <div 
                key={product.productId} 
                className="card h-100 border-0 position-relative"
                style={{cursor:"pointer"}}
                onClick={()=>goToProductPage(product.productId)}
              >
                <div 
                  className="card h-100 border-0 position-relative"
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
                      toggleWishlist(product.productId,true);
                    }}
                  >
                    <Heart 
                      size={20} 
                      fill={'#ff4757'}
                      color={'#ff4757'}
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
                      alt={product?.title}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="card-body  px-2 pb-2" style={{ padding: '8px 0' }}>
                    <h6 className="card-title mb-1  fw-bold" style={{ fontSize: '0.8rem', color: '#333' }}>
                      {product?.title}
                    </h6>
                    <p className="card-text text-muted mb-1" style={{ fontSize: '0.7rem', lineHeight: '1.2' }}>
                      {/* {product.description} */}
                    </p>
                    <div className="mb-2">
                      <span className="fw-bold" style={{ fontSize: '0.8rem', color: '#25770eff' }}>
                        ₹{product?.price}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-outline-dark btn-sm flex-fill"
                        style={{ 
                          fontSize: '0.8rem',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          borderColor: '#74e0d7ff',
                          color: '#333'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleCart(product.productId);
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#3e5a43ff';
                          e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#333';
                        }}
                      >
                      {cart?.items?.some(item => item.product.productId=== product.productId) ? (
                        <><Check size={14} className='me-1'/> Added</>
                        ):("Add to cart")
                      }
                      </button>
                      <button 
                        className="btn btn-dark btn-sm flex-fill"
                        style={{ 
                          fontSize: '0.8rem',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#333',
                          border: 'none'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#171313ff';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#333';
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
            ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
