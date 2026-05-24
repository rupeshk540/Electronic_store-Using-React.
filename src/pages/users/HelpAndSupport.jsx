import React, { useState } from 'react';

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      category: 'Orders & Shipping',
      items: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "My Orders" section. Click on the order you want to track, and you\'ll see real-time tracking information.'
        },
        {
          question: 'What are the shipping charges?',
          answer: 'Shipping charges vary based on your location and order value. Orders above ₹999 qualify for free shipping. Standard shipping typically takes 3-5 business days.'
        },
        {
          question: 'Can I change my shipping address after placing an order?',
          answer: 'You can modify your shipping address within 2 hours of placing the order. Please contact our support team immediately for assistance.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some items like intimate wear and cosmetics are non-returnable.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method.'
        },
        {
          question: 'Do I need to pay for return shipping?',
          answer: 'Return shipping is free for defective or incorrect items. For other returns, a nominal shipping fee may apply based on your location.'
        }
      ]
    },
    {
      category: 'Payments & Account',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit/debit cards, net banking, UPI, digital wallets, and cash on delivery (COD) for eligible orders.'
        },
        {
          question: 'Is it safe to use my card on your website?',
          answer: 'Yes, absolutely. We use industry-standard SSL encryption and secure payment gateways. Your payment information is never stored on our servers.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page, enter your registered email, and we\'ll send you a password reset link.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@yourstore.com',
      subtext: 'Response within 24 hours'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: '+91 1800-123-4567',
      subtext: 'Mon-Sat, 9 AM - 6 PM IST'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our team',
      subtext: 'Available 24/7'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: '123 Commerce Street, Bangalore',
      subtext: 'Mon-Fri, 10 AM - 5 PM'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for contacting us! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="help-support-page">
      <style>{`
        .help-support-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #212529;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 40px 0;
        }

        .hero-section {
          text-align: center;
          color: white;
          padding: 60px 20px;
          margin-bottom: 40px;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .hero-section p {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto 30px;
        }

        .search-box {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .search-box input {
          padding: 15px 50px 15px 20px;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .search-box .search-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #667eea;
          font-size: 1.2rem;
        }

        .main-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          overflow: hidden;
        }

        .nav-tabs {
          border-bottom: 2px solid #e9ecef;
          background: #f8f9fa;
          padding: 10px 20px 0;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          font-weight: 600;
          padding: 12px 24px;
          margin-right: 8px;
          border-radius: 10px 10px 0 0;
          transition: all 0.3s ease;
        }

        .nav-tabs .nav-link:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .nav-tabs .nav-link.active {
          color: #667eea;
          background: white;
          border-bottom: 3px solid #667eea;
        }

        .tab-content {
          padding: 40px;
        }

        .faq-category {
          margin-bottom: 40px;
        }

        .faq-category h3 {
          font-size: 1.5rem;
          color: #667eea;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .accordion-item {
          border: 1px solid #e9ecef;
          border-radius: 10px;
          margin-bottom: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion-item:hover {
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
        }

        .accordion-button {
          font-weight: 600;
          color: #212529;
          background: white;
          padding: 18px 20px;
          font-size: 1rem;
        }

        .accordion-button:not(.collapsed) {
          color: #667eea;
          background: #f8f9ff;
          box-shadow: none;
        }

        .accordion-button:focus {
          box-shadow: none;
          border-color: #667eea;
        }

        .accordion-body {
          padding: 20px;
          color: #6c757d;
          line-height: 1.6;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .contact-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .contact-card .icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        .contact-card h4 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .contact-card p {
          margin-bottom: 5px;
          font-size: 1rem;
        }

        .contact-card .subtext {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .contact-form {
          background: #f8f9fa;
          padding: 35px;
          border-radius: 15px;
        }

        .contact-form h3 {
          color: #667eea;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .form-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 8px;
        }

        .form-control, .form-select {
          border: 2px solid #e9ecef;
          border-radius: 10px;
          padding: 12px 15px;
          transition: all 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          padding: 12px 40px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }

        .empty-state .icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .tab-content {
            padding: 20px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="hero-section">
        <div className="container">
          <h1>How Can We Help You?</h1>
          <p>Search our knowledge base or get in touch with our support team</p>
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="main-content">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Us
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 'faq' && (
              <div>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((category, catIndex) => (
                    <div key={catIndex} className="faq-category">
                      <h3>{category.category}</h3>
                      <div className="accordion">
                        {category.items.map((item, itemIndex) => {
                          const accordionId = `accordion-${catIndex}-${itemIndex}`;
                          return (
                            <div key={itemIndex} className="accordion-item">
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${accordionId}`}
                                >
                                  {item.question}
                                </button>
                              </h2>
                              <div
                                id={accordionId}
                                className="accordion-collapse collapse"
                              >
                                <div className="accordion-body">
                                  {item.answer}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="icon">🔍</div>
                    <h4>No results found</h4>
                    <p>Try searching with different keywords</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <div className="contact-grid">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="contact-card">
                      <div className="icon">{method.icon}</div>
                      <h4>{method.title}</h4>
                      <p>{method.description}</p>
                      <p className="subtext">{method.subtext}</p>
                    </div>
                  ))}
                </div>

                <div className="contact-form">
                  <h3>Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject *</label>
                      <select
                        className="form-select"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a topic</option>
                        <option value="order">Order Issue</option>
                        <option value="return">Return/Refund</option>
                        <option value="payment">Payment Issue</option>
                        <option value="product">Product Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}