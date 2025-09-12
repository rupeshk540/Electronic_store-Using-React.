import React, { useState, useEffect } from 'react';
 import { Search, Filter, ShoppingCart, Clock, Star, Heart, Zap, TrendingUp, Sparkles, Bot, Brain, Cpu, Eye, MousePointer, ArrowRight, Shield, Award } from 'lucide-react';
import { useNavigate} from 'react-router-dom';
import HomePageComponent from '../components/HomePageComponent';

 const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState(new Set());
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const navigate = useNavigate();

  // Product data matching your brand aesthetic
  const products = [
    {
      id: 1,
      name: "MacBook Pro M3",
      category: "electronics",
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
      category: "furniture",
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
      category: "electronics",
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
      category: "furniture",
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
      category: "electronics",
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
      category: "fashion",
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
      category: "electronics",
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
      category: "furniture",
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
      category: "electronics",
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
      category: "furniture",
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
      category: "electronics",
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
      category: "fashion",
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
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️', color: '#6366f1' },
    { id: 'electronics', name: 'Electronics', icon: '📱', color: '#8b5cf6' },
    { id: 'furniture', name: 'Furniture', icon: '🪑', color: '#06b6d4' },
    { id: 'fashion', name: 'Fashion', icon: '👕', color: '#f59e0b' }
  ];

  const getBadgeConfig = (badge) => {
    const configs = {
      'ai-recommended': { bg: 'bg-primary', icon: Brain, text: 'AI Recommended', color: '#6366f1' },
      'popular': { bg: 'bg-success', icon: TrendingUp, text: 'Popular', color: '#10b981' },
      'featured': { bg: 'bg-warning', icon: Sparkles, text: 'Featured', color: '#f59e0b' },
      'bestseller': { bg: 'bg-info', icon: Award, text: 'Bestseller', color: '#06b6d4' },
      'trending': { bg: 'bg-danger', icon: Zap, text: 'Trending', color: '#ef4444' },
      'luxury': { bg: 'bg-dark', icon: Shield, text: 'Luxury', color: '#374151' }
    };
    return configs[badge] || configs['featured'];
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section - Matching your login page style */}
      <div className="position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        minHeight: '70vh'
      }}>
        {/* Subtle pattern overlay */}
        <div className="position-absolute w-100 h-100" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          opacity: 0.5
        }}></div>

        <div className="container py-5 position-relative">
          <div className="row align-items-center min-vh-60">
            <div className="col-lg-7">
              {/* AI Badge */}
              <div className="mb-4">
                <span className="badge bg-white text-primary px-3 py-2 fs-6 fw-bold shadow-sm" style={{
                  borderRadius: '25px'
                }}>
                  <Sparkles className="me-2" size={16} />
                  AI-Powered Shopping
                </span>
              </div>

              <h1 className="display-3 fw-bold text-white mb-4">
                Your Smart Shopping
                <span className="d-block">Companion</span>
              </h1>

              <p className="lead text-white mb-5 fs-4" style={{ opacity: 0.95 }}>
                Discover, buy, or rent premium products with AI-powered recommendations 
                tailored to your lifestyle and budget. Experience the future of e-commerce.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <button 
                  className="btn btn-light btn-lg px-4 py-3 shadow fw-bold"
                  onClick={() => setShowAIAssistant(true)}
                  style={{
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  <Bot className="me-2" size={20} />
                  Get AI Recommendations
                </button>

                <button className="btn btn-outline-light btn-lg px-4 py-3" style={{
                  borderRadius: '12px',
                  borderWidth: '2px',
                  fontWeight: '600'
                }}
                 onClick={() => navigate("/store")}
                >
                  <Eye className="me-2" size={20} />
                  Browse Products
                </button>
              </div>

              {/* Trust indicators */}
              <div className="row text-center">
                <div className="col-4">
                  <div className="text-white">
                    <div className="h3 fw-bold mb-1">50K+</div>
                    <small className="opacity-75">Products</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-white">
                    <div className="h3 fw-bold mb-1">98%</div>
                    <small className="opacity-75">Satisfaction</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-white">
                    <div className="h3 fw-bold mb-1">24/7</div>
                    <small className="opacity-75">Support</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="text-center">
                <div className="card border-0 shadow-lg" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px'
                }}>
                  <div className="card-body p-5">
                    <div className="mb-4">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                           style={{ width: '80px', height: '80px' }}>
                        <Brain size={40} className="text-white" />
                      </div>
                    </div>
                    <h4 className="text-dark mb-3 fw-bold">AI-Powered Discovery</h4>
                    <p className="text-muted">
                      Smart algorithms analyze your preferences to find perfect product matches
                    </p>
                    <div className="row g-3 text-center">
                      <div className="col-4">
                        <Cpu size={24} className="text-primary mb-2" />
                        <small className="d-block text-muted">Smart Matching</small>
                      </div>
                      <div className="col-4">
                        <Eye size={24} className="text-success mb-2" />
                        <small className="d-block text-muted">Visual Search</small>
                      </div>
                      <div className="col-4">
                        <Zap size={24} className="text-warning mb-2" />
                        <small className="d-block text-muted">Real-time</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     <HomePageComponent/>

      {/* AI Assistant Modal - Matching your login modal style */}
      {showAIAssistant && (
        <div className="modal show d-block" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999
        }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{
              borderRadius: '20px'
            }}>
              <div className="modal-header border-0 bg-primary text-white" style={{
                borderRadius: '20px 20px 0 0'
              }}>
                <h5 className="modal-title fw-bold d-flex align-items-center">
                  <div className="me-3 p-2 bg-white bg-opacity-20 rounded-circle">
                    <Brain size={24} />
                  </div>
                  Zeptra AI Assistant
                </h5>
                <button 
                  className="btn-close btn-close-white"
                  onClick={() => setShowAIAssistant(false)}
                ></button>
              </div>
              <div className="modal-body p-5">
                <div className="text-center mb-4">
                  <div className="mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                         style={{ width: '100px', height: '100px' }}>
                      <Sparkles size={50} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-3">Welcome to AI-Powered Shopping!</h3>
                  <p className="text-muted mb-4 fs-5">
                    Tell us what you're looking for and your budget, and our AI will find the perfect products for you.
                  </p>
                </div>
                
                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control form-control-lg border-2" 
                        id="aiSearch"
                        placeholder="What are you looking for?"
                        style={{ borderRadius: '12px', height: '60px' }}
                      />
                      <label htmlFor="aiSearch">What are you looking for?</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input 
                        type="number" 
                        className="form-control form-control-lg border-2" 
                        id="budget"
                        placeholder="Your budget"
                        style={{ borderRadius: '12px', height: '60px' }}
                      />
                      <label htmlFor="budget">Budget Range ($)</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select 
                        className="form-select form-control-lg border-2"
                        id="preference"
                        style={{ borderRadius: '12px', height: '60px' }}
                      >
                        <option value="">Select preference</option>
                        <option value="buy">Buy Only</option>
                        <option value="rent">Rent Only</option>
                        <option value="both">Both Options</option>
                      </select>
                      <label htmlFor="preference">Preference</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button className="btn btn-primary btn-lg px-5 py-3 me-3 shadow fw-bold" style={{
                      borderRadius: '12px'
                    }}>
                      <Brain className="me-2" size={20} />
                      Get AI Recommendations
                    </button>
                    <button className="btn btn-outline-primary btn-lg px-4 py-3" style={{
                      borderRadius: '12px',
                      borderWidth: '2px'
                    }}>
                      Browse Manually
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="row g-3 mt-4 text-center">
                  <div className="col-md-4">
                    <div className="p-3">
                      <Cpu size={32} className="text-primary mb-2" />
                      <h6 className="fw-bold">Smart Matching</h6>
                      <small className="text-muted">AI-powered product matching</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3">
                      <Eye size={32} className="text-success mb-2" />
                      <h6 className="fw-bold">Visual Search</h6>
                      <small className="text-muted">Find products by image</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3">
                      <Zap size={32} className="text-warning mb-2" />
                      <h6 className="fw-bold">Real-time Updates</h6>
                      <small className="text-muted">Live inventory & pricing</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
      
        /* Custom 5-column layout for laptops */
        .col-lg-2-4 {
          flex: 0 0 auto;
          width: 20%;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.15) !important;
        }
        
        .product-card:hover img {
          transform: scale(1.05);
        }
        
        .btn:hover {
          transform: translateY(-1px);
          transition: all 0.3s ease;
        }
        
        .modal.show {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @media (max-width: 768px) {
          .display-4 { font-size: 2rem !important; }
          .col-lg-2-4 { width: 50%; }
        }
        
        @media (max-width: 576px) {
          .col-lg-2-4 { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default MainPage;


