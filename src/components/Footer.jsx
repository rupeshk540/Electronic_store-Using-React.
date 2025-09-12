import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white py-5 mt-auto position-relative" 
            style={{ 
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              borderTop: '3px solid transparent',
              borderImage: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7) 1'
            }}>
      
      <div className="container position-relative">
        <div className="row">
          {/* Brand Section - Card Style */}
          <div className="col-lg-4 col-md-6 mb-5">
            <div className="h-100 p-4 rounded-3" 
                 style={{ 
                   background: 'rgba(255,255,255,0.05)',
                   backdropFilter: 'blur(10px)',
                   border: '1px solid rgba(255,255,255,0.1)',
                   boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                 }}>
              <div className="d-flex align-items-center mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-circle me-3" 
                     style={{ 
                       width: '50px', 
                       height: '50px', 
                       background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                       fontSize: '24px'
                     }}>
                  ⚡
                </div>
                <h3 className="mb-0 text-white" style={{ fontWeight: '700', fontSize: '28px' }}>
                  Zeptra
                </h3>
              </div>
              
              <p className="mb-4" style={{ 
                fontSize: '16px', 
                lineHeight: '1.6', 
                color: 'rgba(255,255,255,0.8)' 
              }}>
                Your intelligent shopping companion powered by cutting-edge AI. Discover, compare, and purchase with unprecedented ease and confidence.
              </p>

              {/* Social Links */}
               <div className="d-flex gap-3">
                {[
                  { icon: '𝕏', color: '#000000', label: 'Twitter' },
                  { icon: '𝕗', color: '#4267B2', label: 'Facebook' },
                  { icon: '📷', color: '#E4405F', label: 'Instagram' },
                  { icon: '💼', color: '#0077B5', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a key={index} 
                     href="#" 
                     className="d-flex align-items-center justify-content-center text-white text-decoration-none rounded-circle"
                     aria-label={social.label}
                     style={{ 
                       width: '45px', 
                       height: '45px',
                       background: 'rgba(255,255,255,0.1)',
                       border: '1px solid rgba(255,255,255,0.2)',
                       transition: 'all 0.3s ease',
                       fontSize: '18px',
                       fontWeight: 'bold'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = social.color;
                       e.currentTarget.style.transform = 'translateY(-3px)';
                       e.currentTarget.style.boxShadow = `0 8px 25px ${social.color}40`;
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Card Style */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="h-100 p-4 rounded-3" 
                 style={{ 
                   background: 'rgba(255,255,255,0.03)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                 }}>
              <h5 className="mb-4 text-white" style={{ fontWeight: '600', fontSize: '18px' }}>
                Explore
              </h5>
              <ul className="list-unstyled">
                {[
                  { name: 'Discover Products', icon: '🔍' },
                  { name: 'Smart Deals', icon: '💎' },
                  { name: 'Categories', icon: '📱' },
                  { name: 'Trending Now', icon: '🔥' }
                ].map((item, index) => (
                  <li key={index} className="mb-3">
                    <a href="#" 
                       className="text-decoration-none d-flex align-items-center"
                       style={{ 
                         color: 'rgba(255,255,255,0.7)',
                         transition: 'all 0.3s ease',
                         fontSize: '15px'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.color = '#8b5cf6';
                         e.target.style.transform = 'translateX(8px)';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.color = 'rgba(255,255,255,0.7)';
                         e.target.style.transform = 'translateX(0)';
                       }}>
                      <span className="me-2">{item.icon}</span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services - Card Style */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="h-100 p-4 rounded-3" 
                 style={{ 
                   background: 'rgba(255,255,255,0.03)',
                   border: '1px solid rgba(255,255,255,0.08)',
                   boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                 }}>
              <h5 className="mb-4 text-white" style={{ fontWeight: '600', fontSize: '18px' }}>
                Features
              </h5>
              <ul className="list-unstyled">
                {[
                  { name: 'AI Recommendations', icon: '🤖' },
                  { name: 'Price Tracking', icon: '📊' },
                  { name: 'Wishlist Sync', icon: '💝' },
                  { name: '24/7 Support', icon: '🚀' }
                ].map((item, index) => (
                  <li key={index} className="mb-3">
                    <a href="#" 
                       className="text-decoration-none d-flex align-items-center"
                       style={{ 
                         color: 'rgba(255,255,255,0.7)',
                         transition: 'all 0.3s ease',
                         fontSize: '15px'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.color = '#8b5cf6';
                         e.target.style.transform = 'translateX(8px)';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.color = 'rgba(255,255,255,0.7)';
                         e.target.style.transform = 'translateX(0)';
                       }}>
                      <span className="me-2">{item.icon}</span>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Contact - Featured Card */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="p-4 rounded-3" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
                   border: '1px solid rgba(139,92,246,0.2)',
                   boxShadow: '0 8px 32px rgba(139,92,246,0.1)',
                   height: 'fit-content'
                 }}>
              <h5 className="mb-3 text-white d-flex align-items-center" style={{ fontWeight: '600', fontSize: '18px' }}>
                <span className="me-2">✨</span>
                Stay Connected
              </h5>
              
              <p className="mb-3" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                Get exclusive deals and personalized shopping insights delivered to your inbox.
              </p>
              
              {/* Premium Newsletter Signup */}
              <div className="mb-3">
                <div className="input-group" style={{ height: '45px' }}>
                  <input 
                    type="email" 
                    className="form-control border-0 h-100" 
                    placeholder="Enter your email"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      borderRadius: '10px 0 0 10px',
                      fontSize: '13px',
                      paddingLeft: '16px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  />
                  <button 
                    className="btn text-white border-0 h-100 px-3" 
                    type="button"
                    style={{ 
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: '0 10px 10px 0',
                      fontWeight: '600',
                      fontSize: '13px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 6px 20px rgba(139,92,246,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center p-2 rounded-2" 
                     style={{ 
                       background: 'rgba(255,255,255,0.05)',
                       border: '1px solid rgba(255,255,255,0.1)'
                     }}>
                  <span className="me-2" style={{ fontSize: '16px' }}>📧</span>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Email Us</div>
                    <a href="mailto:hello@zeptra.com" 
                       className="text-decoration-none text-white" 
                       style={{ fontSize: '13px', fontWeight: '500' }}>
                      hello@zeptra.com
                    </a>
                  </div>
                </div>
                
                <div className="d-flex align-items-center p-2 rounded-2" 
                     style={{ 
                       background: 'rgba(255,255,255,0.05)',
                       border: '1px solid rgba(255,255,255,0.1)'
                     }}>
                  <span className="me-2" style={{ fontSize: '16px' }}>💬</span>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>Support</div>
                    <div className="text-white" style={{ fontSize: '13px', fontWeight: '500' }}>
                      Live Chat 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                © 2024 Zeptra • Designed with ❤️ for modern shoppers
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-4">
                {['Privacy', 'Terms', 'Security', 'Help'].map((item, index) => (
                  <a key={index}
                     href="#" 
                     className="text-decoration-none"
                     style={{ 
                       color: 'rgba(255,255,255,0.6)', 
                       fontSize: '14px',
                       transition: 'color 0.3s ease'
                     }}
                     onMouseEnter={(e) => e.target.style.color = '#8b5cf6'}
                     onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;