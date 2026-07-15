
import React, { useState, useEffect, useContext } from 'react';
import { getAllCategories } from '../../services/CategoryService';
import { toast } from 'react-toastify';
import { getAllLiveProducts, getProductsOfCategories, searchProduct } from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import WishlistContext from '../../context/WishlistContext';


const CategoryPage = () => {
  // State management
  const { wishlist, addItemWishlist, removeItemWishlist } = useContext(WishlistContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState({ content: [], pageNumber: 0, pageSize: 10, totalElements: 0, lastPage: false })
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [sortBy, setSortBy] = useState('name-asc');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeCollection, setActiveCollection] = useState('all');
  const pageSize = 20;  // adjust per your needs
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
    

  // API CALLS - REPLACE THESE WITH YOUR ACTUAL BACKEND CALLS
  useEffect(() => {
    fetchCategories(0,10);
    fetchProducts();
  }, []);

  const fetchCategories=(pageNumber, pageSize)=>{
      getAllCategories(pageNumber, pageSize)
      .then(data => {
          setCategories(data)
      })
      .catch(error => {
          toast.error("Error in loading categories !")
      })
  }
  
      
  // Fetch products depending on category or search
  const fetchProducts = (
    reset = false,
    categoryId = activeCollection
  ) => {
  // Prevent multiple API calls
  if (loading) return;

  setLoading(true);

  const currentPage = 0;

  let fetchPromise;

  // CATEGORY PRODUCTS
  if (categoryId && categoryId !== "all") {

    fetchPromise = getProductsOfCategories(
      categoryId,
      currentPage,
      pageSize
    );

  }

  // ALL PRODUCTS
  else {

    fetchPromise = getAllLiveProducts(
      currentPage,
      pageSize
    );

  }

  // HANDLE RESPONSE
  fetchPromise
    .then((data) => {

      const newProducts = data.content || [];

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
        const allProducts = [...prev, ...newProducts];

        const uniqueProducts = allProducts.filter(
          (product, index, self) =>
            index ===
            self.findIndex(
              (p) => p.productId === product.productId
            )
        );

        return uniqueProducts;
      });

      }


    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    })
    .finally(() => {
      setLoading(false);
    });

};


const handleCategoryChange = (categoryId) => {

  setSelectedCategory(categoryId);
  setActiveCollection(categoryId);

  // reset data
  setProducts([]);
  setFilteredProducts([]);
  // fetch products
  fetchProducts(true, categoryId);

};

  // FILTERING AND SORTING
  useEffect(() => {
    let filtered = [...products];

    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

   filtered = filtered.filter(product => (product.rating || 0) >= minRating);

    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) =>
          (a.title ?? a.name ?? "").localeCompare(
            b.title ?? b.name ?? ""
          )
        );
        break;

      case 'name-desc':
        filtered.sort((a, b) =>
          (b.title ?? b.name ?? "").localeCompare(
            a.title ?? a.name ?? ""
          )
        );
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, sortBy, priceRange, minRating]);

// PAGINATION
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

  // HELPER FUNCTIONS
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} style={styles.starFilled}>★</span>);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<span key={i} style={styles.starHalf}>★</span>);
      } else {
        stars.push(<span key={i} style={styles.starEmpty}>★</span>);
      }
    }
    return stars;
  };

  const resetFilters = () => {
    setSortBy('name-asc');
    setPriceRange([0, 100000]);
    setMinRating(0);
    setSelectedCategory('all');
  };

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
  if (loading && products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .category-page { min-height: 100vh; background-color: #f8f9fa; }
        
        /* Image Container */
        .product-image-container {
          height: 250px;
          overflow: hidden;
          background-color: #f8f9fa;
          position: relative;
        }
        .product-card img { 
          transition: transform 0.3s ease;
          object-fit: contain;
        }
        .product-card:hover img { 
          transform: scale(1.05); 
        }
        
        /* Product Title */
        .product-card .card-title { 
          font-size: 1rem; 
          font-weight: 700; 
          color: #333;
          height: 2.4em; 
          overflow: hidden; 
          text-overflow: ellipsis; 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical;
          margin-bottom: 0.25rem;
        }
        
        /* Sidebar Styles */
        .filters-sidebar .card { 
          position: sticky; 
          top: 20px; 
          border: 1px solid #e0e0e0; 
        }
        .filter-section { 
          padding-bottom: 1rem; 
          border-bottom: 1px solid #e9ecef; 
        }
        .filter-section:last-child { 
          border-bottom: none; 
          padding-bottom: 0; 
        }
        
        /* List Group Items */
        .list-group-item { 
          cursor: pointer; 
          transition: background-color 0.2s ease; 
          border-left: 3px solid transparent; 
        }
        .list-group-item:hover:not(.active) { 
          background-color: #f8f9fa; 
          border-left-color: #0d6efd; 
        }
        .list-group-item.active { 
          background-color: #0d6efd; 
          border-color: #0d6efd; 
          border-left-color: #0a58ca; 
        }
        
        /* Rating Stars */
        .rating-container {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 8px;
        }
        
       .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }

        /* Large tablets */
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .product-image-container {
            height: 200px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>

      <div className="category-page">
        {/* Header */}
        <div className="bg-light py-2 mb-4" style={{ borderBottom: '1px solid #dee2e6' }}>
          <div className="container-fluid px-4">
            <h1 className="display-5 fw-bold">
              {selectedCategory === 'all'
                  ? 'All Products'
                  : categories.content.find(
                      c => c.categoryId === selectedCategory
                    )?.title || 'Products'}
            </h1>
            <p className="text-muted mb-0">Showing {filteredProducts.length} products</p>
          </div>
        </div>

        <div className="container-fluid px-4">
          <div className="row g-4">
            {/* Sidebar Filters */}
            <div className="col-lg-3 mb-4">
              <div className="filters-sidebar">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0">Filters</h5>
                      <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                        Reset
                      </button>
                    </div>

                    {/* Categories */}
                    <div className="filter-section mb-4">
                      <h6 className="fw-bold mb-3">Categories</h6>
                      <div className="list-group">
                        <button
                          className={`list-group-item list-group-item-action ${selectedCategory === 'all' ? 'active' : ''}`}
                          onClick={() => handleCategoryChange("all")}
                        >
                          All Products
                        </button>
                        {categories.content.map(category => (
                          <button
                            key={category.categoryId}
                            className={`list-group-item list-group-item-action ${selectedCategory === category.categoryId ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.categoryId)}
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="filter-section mb-4">
                      <h6 className="fw-bold mb-3">Price Range</h6>
                      <div className="mb-3">
                        <label className="form-label">
                          ₹{priceRange[0]} - ₹{priceRange[1]}
                        </label>
                        <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="1000000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="filter-section mb-4">
                      <h6 className="fw-bold mb-3">Minimum Rating</h6>
                      <div className="btn-group-vertical w-100" role="group">
                        {[4, 3, 2, 1, 0].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            className={`btn btn-outline-secondary text-start ${minRating === rating ? 'active' : ''}`}
                            onClick={() => setMinRating(rating)}
                          >
                            {rating > 0 ? <>{renderStars(rating)} & Up</> : 'All Ratings'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Products Area */}
            <div className="col-lg-9">
              {/* Toolbar */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2">
                  <label className="me-2">Sort by:</label>
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: '200px' }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                  </select>
                </div>

                <div className="btn-group" role="group">
                
                </div>
              </div>

              {/* Products */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <h2 className="text-muted">📭</h2>
                  <h3 className="mt-3">No products found</h3>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              ) : (
               <>
                {/* Products Grid */}
                <div
                  className="products-grid"
                >
                  {currentProducts.map(product => {
                    const isWishlisted = (wishlist || []).some(
                      (item) => item.productId === product.productId
                    );
                    return(
                    <div
                      key={product.productId}
                      className="card h-100 border position-relative"
                      style={{ cursor: "pointer" }}
                      onClick={()=>goToProductPage(product.productId)}
                    >
                      <div
                        className="card h-100 border-0 position-relative"
                        style={{
                          backgroundColor: "transparent",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >

                        {/* Sale Tag */}
                        {product.discountedPrice > 0 && (
                          <span
                            className="badge position-absolute top-0 start-0 m-2"
                            style={{
                              backgroundColor: "#ff4757",
                              color: "white",
                              fontSize: "0.7rem",
                              zIndex: 10,
                              padding: "4px 8px",
                              borderRadius: "2px"
                            }}
                          >
                            SALE
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          className="btn position-absolute top-0 end-0 m-2 p-1"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            borderRadius: "4px",
                            width: "25px",
                            height: "25px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                            height: "250px",
                            overflow: "hidden",
                            backgroundColor: "#f8f9fa"
                          }}
                        >
                          <img
                            src={product?.productImageUrls?.[0]}
                            alt={product.title}
                            className="w-100 h-100"
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div
                          className="card-body px-2 pb-2"
                          style={{ padding: "8px 0" }}
                        >
                          <h6
                            className="card-title mb-1 fw-bold"
                            style={{
                              fontSize: "1rem",
                              color: "#333"
                            }}
                          >
                            {product.title}
                          </h6>

                          {/* Rating */}
                          <div className="rating-container">
                            {renderStars(product.averageRating || 0)}
                            <span
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              ({product.totalReview || 0})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mb-2">
                            <span
                              className="fw-bold"
                              style={{
                                fontSize: "0.9rem",
                                color: "#25770e"
                              }}
                            >
                              ₹{product.discountedPrice || product.price}
                            </span>

                            {product.discountedPrice > 0 && (
                              <span
                                className="ms-2 text-muted"
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: "0.8rem"
                                }}
                              >
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );})}
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-center align-items-center gap-3 mt-5 mb-4 flex-wrap">

                  <button
                    className="btn btn-outline-dark px-4"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  <div className="d-flex align-items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`btn ${
                          currentPage === index + 1
                            ? "btn-dark"
                            : "btn-outline-secondary"
                        }`}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%"
                        }}
                        onClick={() => {
                          setCurrentPage(index + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn btn-outline-dark px-4"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>

                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Inline styles object for stars
const styles = {
  starFilled: { color: '#ffc107', fontSize: '0.9rem' },
  starHalf: { color: '#ffc107', fontSize: '0.9rem', opacity: 0.5 },
  starEmpty: { color: '#e4e5e9', fontSize: '0.9rem' }
};

export default CategoryPage;