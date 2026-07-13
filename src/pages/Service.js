import React, { useState, useEffect } from 'react';

const ZeptaFeatures = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleCards(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: 'buy',
      icon: '🛒',
      title: 'Buy',
      description: 'Purchase items you love and keep them forever. Great prices, quality guaranteed.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'rent',
      icon: '📅',
      title: 'Rent',
      description: 'Need something temporarily? Rent it for as long as you need, then return it.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'delivery',
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your door. Track your orders in real-time.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'protected',
      icon: '🛡️',
      title: 'Protected',
      description: 'Your purchases and rentals are protected by our comprehensive guarantee.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const steps = [
    {
      id: 'step1',
      number: '1',
      title: 'Browse & Discover',
      description: 'Explore our vast catalog of items available for purchase or rental. Filter by category, price, or availability.'
    },
    {
      id: 'step2',
      number: '2',
      title: 'Choose Your Option',
      description: 'Decide whether to buy or rent based on your needs. Compare prices and rental terms to make the best choice.'
    },
    {
      id: 'step3',
      number: '3',
      title: 'Secure Checkout',
      description: 'Complete your purchase or rental with our secure payment system. Your information is always protected.'
    },
    {
      id: 'step4',
      number: '4',
      title: 'Enjoy & Return',
      description: 'Receive your item quickly. Keep it if you bought it, or return it easily when your rental period ends.'
    }
  ];

  const categories = [
    { icon: '📱', title: 'Electronics', description: 'Latest gadgets and tech' },
    { icon: '🏠', title: 'Home & Garden', description: 'Everything for your space' },
    { icon: '👕', title: 'Fashion', description: 'Style for every occasion' },
    { icon: '🚗', title: 'Automotive', description: 'Cars, parts, and accessories' },
    { icon: '🎮', title: 'Gaming', description: 'Games and gaming gear' },
    { icon: '🏃', title: 'Sports', description: 'Fitness and outdoor gear' }
  ];

  return (
    <>
      <style jsx>{`
        .hero-features {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-features::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23667eea" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          padding: 6rem 0 4rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 1s ease;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .cta-buttons {
          animation: fadeInUp 1s ease 0.4s both;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-outline-primary {
          border: 2px solid #667eea;
          color: #667eea;
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          background: #667eea;
          transform: translateY(-2px);
        }

        .trust-indicators {
          animation: fadeInUp 1s ease 0.6s both;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-gradient, linear-gradient(135deg, #667eea, #764ba2));
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--card-gradient, linear-gradient(135deg, #667eea, #764ba2));
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: white;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .how-it-works {
          padding: 6rem 0 4rem;
          background: white;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .step-card {
          text-align: center;
          transition: all 0.3s ease;
        }

        .step-number {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          color: white;
          font-size: 2rem;
          font-weight: 800;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .step-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .categories-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
        }

        .category-card {
          background: white;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          height: 100%;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .category-card h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate-visible {
          opacity: 1;
          transform: translateY(0);
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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Hero Features Section */}
      <section className="hero-features">
        <div className="container">
          <div className="hero-content">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="hero-title">Buy or Rent<br />Anything You Need</h1>
                <p className="hero-subtitle">
                  Discover a smarter way to access the things you want. Buy for keeps or rent for flexibility. Your choice, your convenience.
                </p>
                
                <div className="cta-buttons mb-4">
                  <button className="btn btn-primary btn-lg me-3 px-4 py-2">Start Shopping</button>
                  <button className="btn btn-outline-primary btn-lg px-4 py-2">Browse Rentals</button>
                </div>

                <div className="trust-indicators d-flex gap-4">
                  <div className="trust-item">
                    <span>✓</span>
                    <span>Secure Payments</span>
                  </div>
                  <div className="trust-item">
                    <span>✓</span>
                    <span>Verified Sellers</span>
                  </div>
                  <div className="trust-item">
                    <span>✓</span>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row g-3">
                  {features.map((feature, index) => (
                    <div key={feature.id} className="col-md-6">
                      <div 
                        className="feature-card p-4 h-100"
                        style={{ '--card-gradient': feature.gradient }}
                      >
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p className="text-muted mb-0">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How Zepta Works</h2>
            <p className="section-subtitle">
              Getting what you need has never been easier. Follow these simple steps to buy or rent anything.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={step.id} className="col-lg-3 col-md-6">
                <div 
                  id={step.id}
                  className={`step-card animate-on-scroll ${visibleCards.has(step.id) ? 'animate-visible' : ''}`}
                >
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">
              From electronics to home goods, find everything you need in one place.
            </p>
          </div>

          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <div 
                  id={`category-${index}`}
                  className={`category-card p-4 animate-on-scroll ${visibleCards.has(`category-${index}`) ? 'animate-visible' : ''}`}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <p className="text-muted small mb-0">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ZeptaFeatures;