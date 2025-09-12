// import { Breadcrumb, Col, Container,Row } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import {getAllLiveProducts} from "../../services/ProductService";
// import SingleProductCard from "./SingleProductCard";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { STORE_PAGE_PRODUCT_SIZE } from "../../services/HelperService";
// import CategoryView from "./CategoryView";
// import { Link } from "react-router-dom";



// const Store = () => {


//     const [products, setProducts] = useState(null)
//     const [currentPage, setCurrentPage] = useState(0)

//     useEffect(() => {
//         loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
//     },[])

//     useEffect(()=>{
//         if(currentPage>0){
//             loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
//         }
//     },[currentPage])

//     //loading nextpage
//     const loadNextPage = () => {
//         setCurrentPage(currentPage+1)
//     }

//     const loadProducts=(pageNumber, pageSize, sortBy, sortDir)=>{
//         getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
//             .then(data => {
//                if(currentPage > 0){
//                     setProducts({
//                         content: [...products.content, ...data.content],
//                         lastPage: data.lastPage,
//                         pageNumber: data.pageNumber,
//                         pageSize: data.pageSize,
//                         totalElements: data.totalElements,
//                         totalPages: data.totalPages 
//                     })
//                }else{
//                     setProducts({...data})
//                }
//             })
//             .catch(error => {
//                 toast.error("Error in loading products !!")
//             })
//     }



//     const productsView=()=>{
//         return products && (
            
//                <InfiniteScroll
//                     dataLength={products.content.length}
//                     next={loadNextPage}
//                     hasMore={!products.lastPage}
//                     loader={<h3 className="my-5 text-center">Loading more products...</h3>}
//                     endMessage={<p className="my-4 text-center">All Products Loaded !!</p>}
//                 >
//                     <Container fluid>
//                         <Row>
//                             {
//                                 products.content.map(p => (
//                                     <Col key={p.productId} md={4}>
//                                         <SingleProductCard product={p}/>
//                                     </Col>
//                                 ))
//                             }
//                         </Row>
//                     </Container>
//                </InfiniteScroll>
            
//         )
//     }

//     return(
//         <Container fluid className="px-5 pt-5">
//             <Row>
//                 <Container>
//                         <Breadcrumb className="mx-5">
//                             <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
//                             <Breadcrumb.Item>All Products</Breadcrumb.Item>
//                         </Breadcrumb>
//                 </Container>
//                 <Col md={2}>
//                     <CategoryView/>
//                 </Col>
//                 <Col md={10}>
//                     {productsView()}
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

// export default Store;






import React, { useState, useMemo } from "react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Products Data
  const allProducts = [
    {
      id: 1,
      name: "MacBook Pro M3",
      category: "Trending",
      price: 2499,
      rentPrice: 149,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 1247,
      badge: "ai-recommended",
      aiScore: 96,
      description: "Professional laptop with M3 chip, perfect for developers and creatives",
      tags: ["Pro", "M3 Chip", "16GB RAM"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 2,
      name: "Designer Sofa Set",
      category: "Furniture",
      price: 3299,
      rentPrice: 199,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 892,
      badge: "popular",
      aiScore: 94,
      description: "Luxurious 3-piece sofa set, premium comfort for modern living",
      tags: ["Luxury", "3-Piece", "Premium"],
      availability: "Limited",
      trending: true
    },
    {
      id: 3,
      name: "Canon EOS R5",
      category: "Electronics",
      price: 4299,
      rentPrice: 249,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 2156,
      badge: "featured",
      aiScore: 98,
      description: "Professional mirrorless camera with 8K video capabilities",
      tags: ["8K Video", "45MP", "Professional"],
      availability: "Pre-order",
      trending: false
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      category: "Home & Garden",
      price: 899,
      rentPrice: 59,
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 567,
      badge: "bestseller",
      aiScore: 92,
      description: "Premium ergonomic chair with lumbar support and adjustable features",
      tags: ["Ergonomic", "Lumbar Support", "Adjustable"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 5,
      name: "iPhone 15 Pro",
      category: "Best Deals",
      price: 1599,
      rentPrice: 99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 3421,
      badge: "trending",
      aiScore: 95,
      description: "Latest iPhone with titanium design and advanced camera system",
      tags: ["Titanium", "48MP Camera", "5G"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 6,
      name: "Premium Leather Bag",
      category: "Fashion",
      price: 599,
      rentPrice: 49,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 334,
      badge: "luxury",
      aiScore: 89,
      description: "Handcrafted genuine leather messenger bag with premium finish",
      tags: ["Genuine Leather", "Handcrafted", "Premium"],
      availability: "Limited",
      trending: false
    },
    {
      id: 7,
      name: "MacBook Pro M3",
      category: "Electronics",
      price: 2499,
      rentPrice: 149,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 1247,
      badge: "ai-recommended",
      aiScore: 96,
      description: "Professional laptop with M3 chip, perfect for developers and creatives",
      tags: ["Pro", "M3 Chip", "16GB RAM"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 8,
      name: "Designer Sofa Set",
      category: "Home & Garden",
      price: 3299,
      rentPrice: 199,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 892,
      badge: "popular",
      aiScore: 94,
      description: "Luxurious 3-piece sofa set, premium comfort for modern living",
      tags: ["Luxury", "3-Piece", "Premium"],
      availability: "Limited",
      trending: true
    },
    {
      id: 9,
      name: "Canon EOS R5",
      category: "Electronics",
      price: 4299,
      rentPrice: 249,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 2156,
      badge: "featured",
      aiScore: 98,
      description: "Professional mirrorless camera with 8K video capabilities",
      tags: ["8K Video", "45MP", "Professional"],
      availability: "Pre-order",
      trending: false
    },
    {
      id: 10,
      name: "Ergonomic Office Chair",
      category: "Home & Garden",
      price: 899,
      rentPrice: 59,
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 567,
      badge: "bestseller",
      aiScore: 92,
      description: "Premium ergonomic chair with lumbar support and adjustable features",
      tags: ["Ergonomic", "Lumbar Support", "Adjustable"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 11,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 1599,
      rentPrice: 99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 3421,
      badge: "trending",
      aiScore: 95,
      description: "Latest iPhone with titanium design and advanced camera system",
      tags: ["Titanium", "48MP Camera", "5G"],
      availability: "In Stock",
      trending: true
    },
    {
      id: 12,
      name: "Premium Leather Bag",
      category: "Fashion",
      price: 599,
      rentPrice: 49,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 334,
      badge: "luxury",
      aiScore: 89,
      description: "Handcrafted genuine leather messenger bag with premium finish",
      tags: ["Genuine Leather", "Handcrafted", "Premium"],
      availability: "Limited",
      trending: false
    },
    { id: 13, name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", price: 129.99, rentPrice: 15.99, category: "Trending" },
    { id: 14, name: "Smart Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", price: 299.99, rentPrice: null, category: "Trending" },
    { id: 15, name: "Bluetooth Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300", price: 79.99, rentPrice: 12.99, category: "Best Deals" },
    { id: 16, name: "Laptop Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", price: 49.99, rentPrice: null, category: "Electronics" },
    { id: 17, name: "Gaming Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300", price: 89.99, rentPrice: 8.99, category: "Electronics" },
    { id: 18, name: "Air Purifier", image: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=300", price: 179.99, rentPrice: 22.99, category: "Home & Garden" },
    { id: 19, name: "Robot Vacuum", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300", price: 399.99, rentPrice: 45.99, category: "Home & Garden" },
    { id: 20, name: "Yoga Mat", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300", price: 29.99, rentPrice: 4.99, category: "Sports & Outdoors" },
    { id: 21, name: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300", price: 24.99, rentPrice: null, category: "Sports & Outdoors" },
  ];

  const categories = ["All", "Trending", "Best Deals", "Electronics", "Fashion","Home & Garden", "Sports & Outdoors"];

  // Filter Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="products-page bg-light min-vh-100">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "16px 20px",
                      fontSize: "15px",
                      backgroundColor: "rgba(255,255,255,0.95)",
                    }}
                  />
                  <button
                    className="btn border-0"
                    type="button"
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

              {/* 🔹 Categories */}
              <div className="d-flex flex-wrap gap-2 justify-content-center fadeInUp" style={{animation: "fadeInUp 1s ease 0.3s both"}}>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`btn ${
                      selectedCategory === category ? "btn-light text-dark" : "btn-outline-light"
                    } btn-sm rounded-pill px-3`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Products Section */}
      <div className="container py-5">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 border-0 shadow-sm product-card">
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body text-center p-3">
                  <h6 className="card-title fw-semibold mb-2 text-dark" style={{ fontSize: "0.9rem" }}>
                    {product.name}
                  </h6>
                  <p className="fw-bold text-success mb-0" style={{ fontSize: "0.85rem" }}>
                    ${product.price.toLocaleString()}
                  </p>
                  {product.rentPrice && (
                    <small className="text-muted">or ${product.rentPrice}/mo</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* 🔹 Styles */}
      <style>
        {`
          .product-card {
            border-radius: 12px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
            cursor: pointer;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(99, 102, 241, 0.15) !important;
          }
           
          .product-card img {
            transition: transform 0.3s ease;
          }

          .product-card:hover img {
            transform: scale(1.05);
          }

          
       @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
          

        `}
      </style>
    </div>
  );
};

export default ProductsPage;






// import React, { useState, useEffect } from 'react';

// const HotDealsPage = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 2,
//     hours: 14,
//     minutes: 30,
//     seconds: 45
//   });

//   const [activeCategory, setActiveCategory] = useState('all');

//   // Countdown timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime.seconds > 0) {
//           return { ...prevTime, seconds: prevTime.seconds - 1 };
//         } else if (prevTime.minutes > 0) {
//           return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
//         } else if (prevTime.hours > 0) {
//           return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
//         } else if (prevTime.days > 0) {
//           return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
//         }
//         return prevTime;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Sample hot deals data
//   const hotDeals = [
//     {
//       id: 1,
//       title: "Wireless Bluetooth Headphones",
//       originalPrice: 199.99,
//       discountPrice: 79.99,
//       discount: 60,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
//       category: "electronics",
//       rating: 4.5,
//       reviews: 1250,
//       tag: "Limited Time",
//       stock: 15
//     },
//     {
//       id: 2,
//       title: "Designer Leather Jacket",
//       originalPrice: 299.99,
//       discountPrice: 149.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
//       category: "fashion",
//       rating: 4.8,
//       reviews: 890,
//       tag: "Flash Sale",
//       stock: 8
//     },
//     {
//       id: 3,
//       title: "4K Smart TV 55 inch",
//       originalPrice: 899.99,
//       discountPrice: 549.99,
//       discount: 39,
//       image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
//       category: "electronics",
//       rating: 4.3,
//       reviews: 567,
//       tag: "Best Seller",
//       stock: 5
//     },
//     {
//       id: 4,
//       title: "Gaming Mechanical Keyboard",
//       originalPrice: 129.99,
//       discountPrice: 69.99,
//       discount: 46,
//       image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
//       category: "gaming",
//       rating: 4.7,
//       reviews: 2100,
//       tag: "Hot Deal",
//       stock: 22
//     },
//     {
//       id: 5,
//       title: "Luxury Watch Collection",
//       originalPrice: 599.99,
//       discountPrice: 299.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop",
//       category: "fashion",
//       rating: 4.6,
//       reviews: 445,
//       tag: "Exclusive",
//       stock: 12
//     },
//     {
//       id: 6,
//       title: "Fitness Tracker Pro",
//       originalPrice: 249.99,
//       discountPrice: 129.99,
//       discount: 48,
//       image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
//       category: "sports",
//       rating: 4.4,
//       reviews: 1567,
//       tag: "New Arrival",
//       stock: 18
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Deals', icon: '🔥' },
//     { id: 'electronics', name: 'Electronics', icon: '📱' },
//     { id: 'fashion', name: 'Fashion', icon: '👗' },
//     { id: 'gaming', name: 'Gaming', icon: '🎮' },
//     { id: 'sports', name: 'Sports', icon: '⚽' }
//   ];

//   const filteredDeals = activeCategory === 'all' 
//     ? hotDeals 
//     : hotDeals.filter(deal => deal.category === activeCategory);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={i} className="text-warning">★</span>);
//     }
//     if (hasHalfStar) {
//       stars.push(<span key="half" className="text-warning">☆</span>);
//     }
//     return stars;
//   };

//   return (
//     <div className="hot-deals-page">
//       <style jsx>{`
//         .hot-deals-page {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//         }
        
//         .hero-section {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 60px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-opacity=".05"/><stop offset="100%" stop-opacity="0"/></radialGradient></defs><rect width="100" height="20" fill="url(%23a)"/></svg>') repeat;
//           opacity: 0.1;
//         }
        
//         .countdown-timer {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 15px;
//           padding: 30px;
//           margin: 30px 0;
//         }
        
//         .time-unit {
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 10px;
//           padding: 15px 10px;
//           margin: 0 5px;
//           min-width: 70px;
//           text-align: center;
//         }
        
//         .time-number {
//           font-size: 2rem;
//           font-weight: bold;
//           display: block;
//         }
        
//         .time-label {
//           font-size: 0.8rem;
//           opacity: 0.9;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
        
//         .category-tabs {
//           background: #f8f9fa;
//           padding: 20px 0;
//         }
        
//         .category-btn {
//           background: white;
//           border: 2px solid #e9ecef;
//           border-radius: 25px;
//           padding: 10px 20px;
//           margin: 5px;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }
        
//         .category-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         .category-btn.active {
//           background: linear-gradient(45deg, #667eea, #764ba2);
//           color: white;
//           border-color: transparent;
//         }
        
//         .deal-card {
//           background: white;
//           border-radius: 15px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           height: 100%;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
        
//         .deal-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 25px rgba(0,0,0,0.15);
//         }
        
//         .deal-image {
//           height: 200px;
//           background-size: cover;
//           background-position: center;
//           position: relative;
//         }
        
//         .deal-tag {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           background: linear-gradient(45deg, #ff6b6b, #ee5a24);
//           color: white;
//           padding: 5px 12px;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: bold;
//         }
        
//         .discount-badge {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           background: #27ae60;
//           color: white;
//           padding: 8px 12px;
//           border-radius: 50%;
//           font-weight: bold;
//           font-size: 0.9rem;
//         }
        
//         .deal-content {
//           padding: 20px;
//         }
        
//         .deal-title {
//           font-size: 1.1rem;
//           font-weight: 600;
//           margin-bottom: 10px;
//           color: #2c3e50;
//         }
        
//         .price-section {
//           margin: 15px 0;
//         }
        
//         .discount-price {
//           font-size: 1.5rem;
//           font-weight: bold;
//           color: #27ae60;
//           margin-right: 10px;
//         }
        
//         .original-price {
//           font-size: 1rem;
//           color: #7f8c8d;
//           text-decoration: line-through;
//         }
        
//         .rating-section {
//           display: flex;
//           align-items: center;
//           margin: 10px 0;
//         }
        
//         .stock-info {
//           background: #fff3cd;
//           color: #856404;
//           padding: 8px 12px;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           margin: 10px 0;
//           text-align: center;
//         }
        
//         .stock-info.low-stock {
//           background: #f8d7da;
//           color: #721c24;
//         }
        
//         .add-to-cart-btn {
//           background: linear-gradient(45deg, #667eea, #764ba2);
//           color: white;
//           border: none;
//           padding: 12px 20px;
//           border-radius: 25px;
//           width: 100%;
//           font-weight: 600;
//           transition: all 0.3s ease;
//         }
        
//         .add-to-cart-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
//           color: white;
//         }
        
//         .deals-grid {
//           padding: 40px 0;
//         }
        
//         .section-title {
//           text-align: center;
//           margin-bottom: 40px;
//           position: relative;
//         }
        
//         .section-title h2 {
//           font-size: 2.5rem;
//           font-weight: bold;
//           color: #2c3e50;
//           margin-bottom: 10px;
//         }
        
//         .section-subtitle {
//           color: #7f8c8d;
//           font-size: 1.1rem;
//         }
        
//         @keyframes pulse {
//           0% { opacity: 1; }
//           50% { opacity: 0.7; }
//           100% { opacity: 1; }
//         }
        
//         .pulse {
//           animation: pulse 2s infinite;
//         }
        
//         @media (max-width: 768px) {
//           .time-unit {
//             min-width: 60px;
//             padding: 10px 5px;
//           }
          
//           .time-number {
//             font-size: 1.5rem;
//           }
          
//           .section-title h2 {
//             font-size: 2rem;
//           }
          
//           .deal-card {
//             margin-bottom: 20px;
//           }
//         }
//       `}</style>

//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-4 fw-bold mb-4">🔥 Hot Deals Alert!</h1>
//               <p className="lead mb-4">
//                 Don't miss out on incredible savings! Limited time offers on your favorite products with discounts up to 60% off.
//               </p>
//               <div className="d-flex flex-wrap">
//                 <span className="badge bg-warning text-dark me-2 mb-2 px-3 py-2">Free Shipping</span>
//                 <span className="badge bg-success me-2 mb-2 px-3 py-2">24/7 Support</span>
//                 <span className="badge bg-info me-2 mb-2 px-3 py-2">Easy Returns</span>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="countdown-timer text-center">
//                 <h3 className="mb-3">⏰ Deal Expires In:</h3>
//                 <div className="d-flex justify-content-center">
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.days).padStart(2, '0')}</span>
//                     <span className="time-label">Days</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
//                     <span className="time-label">Hours</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
//                     <span className="time-label">Minutes</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
//                     <span className="time-label">Seconds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="category-tabs">
//         <div className="container">
//           <div className="text-center">
//             <h4 className="mb-3">Shop by Category</h4>
//             <div className="d-flex flex-wrap justify-content-center">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   <span className="me-2">{category.icon}</span>
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deals Grid */}
//       <div className="deals-grid bg-light">
//         <div className="container">
//           <div className="section-title">
//             <h2>Today's Hottest Deals</h2>
//             <p className="section-subtitle">Grab these amazing offers before they're gone!</p>
//           </div>
          
//           <div className="row">
//             {filteredDeals.map(deal => (
//               <div key={deal.id} className="col-lg-4 col-md-6 mb-4">
//                 <div className="deal-card">
//                   <div 
//                     className="deal-image"
//                     style={{ backgroundImage: `url(${deal.image})` }}
//                   >
//                     <div className="deal-tag">{deal.tag}</div>
//                     <div className="discount-badge">-{deal.discount}%</div>
//                   </div>
                  
//                   <div className="deal-content">
//                     <h5 className="deal-title">{deal.title}</h5>
                    
//                     <div className="rating-section">
//                       <div className="me-2">
//                         {renderStars(deal.rating)}
//                       </div>
//                       <span className="text-muted">({deal.reviews} reviews)</span>
//                     </div>
                    
//                     <div className="price-section">
//                       <span className="discount-price">${deal.discountPrice}</span>
//                       <span className="original-price">${deal.originalPrice}</span>
//                     </div>
                    
//                     <div className={`stock-info ${deal.stock < 10 ? 'low-stock' : ''}`}>
//                       {deal.stock < 10 ? '🔥 Only ' + deal.stock + ' left!' : '✅ In Stock (' + deal.stock + ' available)'}
//                     </div>
                    
//                     <button className="add-to-cart-btn">
//                       🛒 Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {filteredDeals.length === 0 && (
//             <div className="text-center py-5">
//               <h4 className="text-muted">No deals found in this category</h4>
//               <p className="text-muted">Try selecting a different category or check back later!</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Newsletter Section */}
//       <div className="bg-dark text-white py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-8">
//               <h3 className="fw-bold mb-2">Never Miss a Deal!</h3>
//               <p className="mb-3 mb-lg-0">Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.</p>
//             </div>
//             <div className="col-lg-4">
//               <div className="input-group">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter your email"
//                   style={{ borderRadius: '25px 0 0 25px' }}
//                 />
//                 <button
//                   className="btn btn-warning fw-bold"
//                   type="button"
//                   style={{ borderRadius: '0 25px 25px 0' }}
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotDealsPage;

// import React, { useState, useEffect } from 'react';

// const HotDealsPage = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 2,
//     hours: 14,
//     minutes: 30,
//     seconds: 45
//   });

//   const [activeCategory, setActiveCategory] = useState('all');

//   // Countdown timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime.seconds > 0) {
//           return { ...prevTime, seconds: prevTime.seconds - 1 };
//         } else if (prevTime.minutes > 0) {
//           return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
//         } else if (prevTime.hours > 0) {
//           return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
//         } else if (prevTime.days > 0) {
//           return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
//         }
//         return prevTime;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Sample hot deals data with more products
//   const hotDeals = [
//     {
//       id: 1,
//       title: "Wireless Bluetooth Headphones",
//       originalPrice: 199.99,
//       discountPrice: 79.99,
//       discount: 60,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
//       category: "hot-deals",
//       rating: 4.5,
//       reviews: 1250,
//       tag: "Limited Time",
//       stock: 15
//     },
//     {
//       id: 2,
//       title: "Designer Leather Jacket",
//       originalPrice: 299.99,
//       discountPrice: 149.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
//       category: "50-off",
//       rating: 4.8,
//       reviews: 890,
//       tag: "Flash Sale",
//       stock: 8
//     },
//     {
//       id: 3,
//       title: "4K Smart TV 55 inch",
//       originalPrice: 899.99,
//       discountPrice: 549.99,
//       discount: 39,
//       image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
//       category: "bestseller",
//       rating: 4.3,
//       reviews: 567,
//       tag: "Best Seller",
//       stock: 5
//     },
//     {
//       id: 4,
//       title: "Gaming Mechanical Keyboard",
//       originalPrice: 129.99,
//       discountPrice: 69.99,
//       discount: 46,
//       image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
//       category: "trending",
//       rating: 4.7,
//       reviews: 2100,
//       tag: "Hot Deal",
//       stock: 22
//     },
//     {
//       id: 5,
//       title: "Luxury Watch Collection",
//       originalPrice: 599.99,
//       discountPrice: 299.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=300&fit=crop",
//       category: "best-buy",
//       rating: 4.6,
//       reviews: 445,
//       tag: "Exclusive",
//       stock: 12
//     },
//     {
//       id: 6,
//       title: "Fitness Tracker Pro",
//       originalPrice: 249.99,
//       discountPrice: 129.99,
//       discount: 48,
//       image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
//       category: "new-arrival",
//       rating: 4.4,
//       reviews: 1567,
//       tag: "New Arrival",
//       stock: 18
//     },
//     {
//       id: 7,
//       title: "Professional Camera Kit",
//       originalPrice: 1299.99,
//       discountPrice: 899.99,
//       discount: 31,
//       image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
//       category: "best-rental",
//       rating: 4.9,
//       reviews: 234,
//       tag: "Rental Pro",
//       stock: 6
//     },
//     {
//       id: 8,
//       title: "Electric Scooter",
//       originalPrice: 799.99,
//       discountPrice: 399.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
//       category: "50-off",
//       rating: 4.2,
//       reviews: 678,
//       tag: "Half Price",
//       stock: 11
//     },
//     {
//       id: 9,
//       title: "Wireless Gaming Mouse",
//       originalPrice: 89.99,
//       discountPrice: 45.99,
//       discount: 49,
//       image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
//       category: "hot-deals",
//       rating: 4.5,
//       reviews: 892,
//       tag: "Gaming Pro",
//       stock: 28
//     },
//     {
//       id: 10,
//       title: "Bluetooth Speaker",
//       originalPrice: 159.99,
//       discountPrice: 79.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
//       category: "trending",
//       rating: 4.3,
//       reviews: 1456,
//       tag: "Trending",
//       stock: 35
//     },
//     {
//       id: 11,
//       title: "Smartphone 128GB",
//       originalPrice: 699.99,
//       discountPrice: 449.99,
//       discount: 36,
//       image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
//       category: "bestseller",
//       rating: 4.6,
//       reviews: 3200,
//       tag: "Top Rated",
//       stock: 19
//     },
//     {
//       id: 12,
//       title: "Laptop Stand Adjustable",
//       originalPrice: 79.99,
//       discountPrice: 39.99,
//       discount: 50,
//       image: "https://images.unsplash.com/photo-1527209634-de3f5e2b70b3?w=400&h=300&fit=crop",
//       category: "50-off",
//       rating: 4.4,
//       reviews: 567,
//       tag: "Office Pro",
//       stock: 42
//     },
//     {
//       id: 13,
//       title: "Air Purifier Smart",
//       originalPrice: 299.99,
//       discountPrice: 199.99,
//       discount: 33,
//       image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
//       category: "new-arrival",
//       rating: 4.7,
//       reviews: 445,
//       tag: "Health Tech",
//       stock: 14
//     },
//     {
//       id: 14,
//       title: "Drone with 4K Camera",
//       originalPrice: 899.99,
//       discountPrice: 649.99,
//       discount: 28,
//       image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
//       category: "best-rental",
//       rating: 4.8,
//       reviews: 278,
//       tag: "Rental Fav",
//       stock: 9
//     },
//     {
//       id: 15,
//       title: "Coffee Maker Premium",
//       originalPrice: 189.99,
//       discountPrice: 129.99,
//       discount: 32,
//       image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
//       category: "best-buy",
//       rating: 4.5,
//       reviews: 1123,
//       tag: "Kitchen Pro",
//       stock: 26
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Deals', icon: '🔥' },
//     { id: 'hot-deals', name: 'Hot Deals', icon: '⚡' },
//     { id: 'trending', name: 'Trending', icon: '📈' },
//     { id: '50-off', name: '50% Off', icon: '💥' },
//     { id: 'bestseller', name: 'Best Seller', icon: '⭐' },
//     { id: 'new-arrival', name: 'New Arrival', icon: '🆕' },
//     { id: 'best-buy', name: 'Best Buy', icon: '💎' },
//     { id: 'best-rental', name: 'Best Rental', icon: '🏆' }
//   ];

//   const filteredDeals = activeCategory === 'all' 
//     ? hotDeals 
//     : hotDeals.filter(deal => deal.category === activeCategory);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={i} className="text-warning">★</span>);
//     }
//     if (hasHalfStar) {
//       stars.push(<span key="half" className="text-warning">☆</span>);
//     }
//     return stars;
//   };

//   return (
//     <div className="hot-deals-page">
//       <style jsx>{`
//         .hot-deals-page {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//         }
        
//         .hero-section {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 60px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><radialGradient id="a" cx="50%" cy="40%"><stop offset="0%" stop-opacity=".05"/><stop offset="100%" stop-opacity="0"/></radialGradient></defs><rect width="100" height="20" fill="url(%23a)"/></svg>') repeat;
//           opacity: 0.1;
//         }
        
//         .countdown-timer {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 15px;
//           padding: 30px;
//           margin: 30px 0;
//         }
        
//         .time-unit {
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 10px;
//           padding: 15px 10px;
//           margin: 0 5px;
//           min-width: 70px;
//           text-align: center;
//         }
        
//         .time-number {
//           font-size: 2rem;
//           font-weight: bold;
//           display: block;
//         }
        
//         .time-label {
//           font-size: 0.8rem;
//           opacity: 0.9;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
        
//         .category-tabs {
//           background: #f8f9fa;
//           padding: 20px 0;
//         }
        
//         .category-btn {
//           background: white;
//           border: 2px solid #e9ecef;
//           border-radius: 25px;
//           padding: 10px 20px;
//           margin: 5px;
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }
        
//         .category-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         .category-btn.active {
//           background: linear-gradient(45deg, #667eea, #764ba2);
//           color: white;
//           border-color: transparent;
//         }
        
//         .deal-card {
//           background: white;
//           border-radius: 15px;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           height: 100%;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
        
//         .deal-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 25px rgba(0,0,0,0.15);
//         }
        
//         .deal-image {
//           height: 180px;
//           background-size: cover;
//           background-position: center;
//           position: relative;
//         }
        
//         .deal-tag {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           background: linear-gradient(45deg, #ff6b6b, #ee5a24);
//           color: white;
//           padding: 4px 10px;
//           border-radius: 15px;
//           font-size: 0.75rem;
//           font-weight: bold;
//         }
        
//         .discount-badge {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           background: #27ae60;
//           color: white;
//           padding: 6px 10px;
//           border-radius: 50%;
//           font-weight: bold;
//           font-size: 0.8rem;
//         }
        
//         .deal-content {
//           padding: 15px;
//         }
        
//         .deal-title {
//           font-size: 1rem;
//           font-weight: 600;
//           margin-bottom: 8px;
//           color: #2c3e50;
//           height: 2.4em;
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }
        
//         .price-section {
//           margin: 10px 0;
//         }
        
//         .discount-price {
//           font-size: 1.3rem;
//           font-weight: bold;
//           color: #27ae60;
//           margin-right: 8px;
//         }
        
//         .original-price {
//           font-size: 0.9rem;
//           color: #7f8c8d;
//           text-decoration: line-through;
//         }
        
//         .rating-section {
//           display: flex;
//           align-items: center;
//           margin: 8px 0;
//           font-size: 0.85rem;
//         }
        
//         .stock-info {
//           background: #fff3cd;
//           color: #856404;
//           padding: 6px 10px;
//           border-radius: 15px;
//           font-size: 0.75rem;
//           margin: 8px 0;
//           text-align: center;
//         }
        
//         .stock-info.low-stock {
//           background: #f8d7da;
//           color: #721c24;
//         }
        
//         .add-to-cart-btn {
//           background: linear-gradient(45deg, #667eea, #764ba2);
//           color: white;
//           border: none;
//           padding: 10px 16px;
//           border-radius: 20px;
//           width: 100%;
//           font-weight: 600;
//           font-size: 0.9rem;
//           transition: all 0.3s ease;
//         }
        
//         .add-to-cart-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
//           color: white;
//         }
        
//         .deals-grid {
//           padding: 40px 0;
//         }
        
//         .section-title {
//           text-align: center;
//           margin-bottom: 40px;
//           position: relative;
//         }
        
//         .section-title h2 {
//           font-size: 2.5rem;
//           font-weight: bold;
//           color: #2c3e50;
//           margin-bottom: 10px;
//         }
        
//         .section-subtitle {
//           color: #7f8c8d;
//           font-size: 1.1rem;
//         }
        
//         @keyframes pulse {
//           0% { opacity: 1; }
//           50% { opacity: 0.7; }
//           100% { opacity: 1; }
//         }
        
//         .pulse {
//           animation: pulse 2s infinite;
//         }
        
//         @media (max-width: 1200px) {
//           .col-xxl-2 {
//             flex: 0 0 auto;
//             width: 20%;
//           }
//         }
        
//         @media (max-width: 992px) {
//           .col-xxl-2 {
//             flex: 0 0 auto;
//             width: 33.333333%;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .time-unit {
//             min-width: 60px;
//             padding: 10px 5px;
//           }
          
//           .time-number {
//             font-size: 1.5rem;
//           }
          
//           .section-title h2 {
//             font-size: 2rem;
//           }
          
//           .deal-card {
//             margin-bottom: 20px;
//           }
          
//           .col-xxl-2 {
//             flex: 0 0 auto;
//             width: 50%;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .col-xxl-2 {
//             flex: 0 0 auto;
//             width: 100%;
//           }
//         }
//       `}</style>

//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-4 fw-bold mb-4">🔥 Hot Deals Alert!</h1>
//               <p className="lead mb-4">
//                 Don't miss out on incredible savings! Limited time offers on your favorite products with discounts up to 60% off.
//               </p>
//               <div className="d-flex flex-wrap">
//                 <span className="badge bg-warning text-dark me-2 mb-2 px-3 py-2">Free Shipping</span>
//                 <span className="badge bg-success me-2 mb-2 px-3 py-2">24/7 Support</span>
//                 <span className="badge bg-info me-2 mb-2 px-3 py-2">Easy Returns</span>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="countdown-timer text-center">
//                 <h3 className="mb-3">⏰ Deal Expires In:</h3>
//                 <div className="d-flex justify-content-center">
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.days).padStart(2, '0')}</span>
//                     <span className="time-label">Days</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
//                     <span className="time-label">Hours</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
//                     <span className="time-label">Minutes</span>
//                   </div>
//                   <div className="time-unit">
//                     <span className="time-number pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
//                     <span className="time-label">Seconds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="category-tabs">
//         <div className="container">
//           <div className="text-center">
//             <div className="d-flex flex-wrap justify-content-center">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   <span className="me-2">{category.icon}</span>
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Deals Grid */}
//       <div className="deals-grid bg-light">
//         <div className="container">
//           <div className="section-title">
//             <h2>Today's Hottest Deals</h2>
//             <p className="section-subtitle">Grab these amazing offers before they're gone!</p>
//           </div>
          
//           <div className="row g-3">
//             {filteredDeals.map(deal => (
//               <div key={deal.id} className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
//                 <div className="deal-card">
//                   <div 
//                     className="deal-image"
//                     style={{ backgroundImage: `url(${deal.image})` }}
//                   >
//                     <div className="deal-tag">{deal.tag}</div>
//                     <div className="discount-badge">-{deal.discount}%</div>
//                   </div>
                  
//                   <div className="deal-content">
//                     <h5 className="deal-title">{deal.title}</h5>
                    
//                     <div className="rating-section">
//                       <div className="me-2">
//                         {renderStars(deal.rating)}
//                       </div>
//                       <span className="text-muted">({deal.reviews})</span>
//                     </div>
                    
//                     <div className="price-section">
//                       <span className="discount-price">${deal.discountPrice}</span>
//                       <span className="original-price">${deal.originalPrice}</span>
//                     </div>
                    
//                     <div className={`stock-info ${deal.stock < 10 ? 'low-stock' : ''}`}>
//                       {deal.stock < 10 ? '🔥 Only ' + deal.stock + ' left!' : '✅ In Stock (' + deal.stock + ')'}
//                     </div>
                    
//                     <button className="add-to-cart-btn">
//                       🛒 Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {filteredDeals.length === 0 && (
//             <div className="text-center py-5">
//               <h4 className="text-muted">No deals found in this category</h4>
//               <p className="text-muted">Try selecting a different category or check back later!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotDealsPage;



