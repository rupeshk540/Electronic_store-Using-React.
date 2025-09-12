import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import { FaTshirt, FaTv, FaAppleAlt, FaCouch, FaRecycle } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
      }}
    >
      {/* Scoped styles inside component - no external CSS */}
      <style>
        {`
        :root {
          --glass-bg: rgba(255,255,255,0.06);
          --glass-border: rgba(255,255,255,0.16);
          --accent-yellow: #FFD60A;
        }

        .page-container {
          padding: 6rem 0;
        }

        .glass-hero {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 12px 40px rgba(8,10,20,0.35);
        }

        .brand-chip {
          display:inline-block;
          background: rgba(255,255,255,0.12);
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          font-weight:700;
          color:#fff;
        }

        .feature-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.25rem;
          height:100%;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .feature-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.25); }

        .category-icon {
          background: rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 12px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size: 1.25rem;
          color: #fff;
        }

        .stat {
          font-size: 2rem;
          font-weight: 800;
        }

        .cta-btn {
          background: var(--accent-yellow);
          color: #000;
          font-weight:700;
          border-radius: 999px;
          padding: 12px 22px;
          border: none;
          box-shadow: 0 12px 36px rgba(255,214,10,0.12);
        }

        .muted-white {
          color: rgba(255,255,255,0.85);
        }

        .small-muted {
          color: rgba(255,255,255,0.75);
        }

        .rounded-image {
          border-radius: 12px;
          width: 100%;
          height: 200px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.06);
        }

        @media (max-width: 767px) {
          .page-container { padding: 3rem 0; }
          .rounded-image { height: 160px; }
        }
      `}
      </style>

      <Container className="page-container">
        {/* Header / Hero */}
        <Row className="align-items-center mb-5">
          <Col lg={7}>
            <div className="glass-hero">
              <div className="d-flex align-items-center mb-3">
                <Image src={logo} alt="Zentra" width={56} height={56} />
                <div className="ms-3">
                  <div className="brand-chip">Zentra</div>
                </div>
              </div>

              <h1 className="display-5 fw-bold mb-3" style={{ color: "#fff" }}>
                We bring everything you need — fashion, electronics & daily essentials
              </h1>

              <p className="lead small-muted" style={{ maxWidth: 680 }}>
                Zentra started with a simple idea: make everyday shopping delightful,
                fast, and reliable. From clothes and home appliances to groceries and
                furniture — discover quality products and curated deals every day.
              </p>

              <div className="mt-4 d-flex gap-3">
                <Button className="cta-btn">Start Shopping</Button>
                <Button variant="outline-light">Our Catalog</Button>
              </div>
            </div>
          </Col>

          <Col lg={5} className="text-center mt-4 mt-lg-0">
            <Card
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                padding: "0.5rem",
                boxShadow: "0 12px 40px rgba(8,10,20,0.35)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60"
                alt="store"
                className="rounded-image"
              />
              <Card.Body className="text-start">
                <h5 className="mb-1">Our Commitment</h5>
                <p className="small-muted mb-2">
                  Fast delivery, careful quality checks, and friendly support — always.
                </p>
                <ListGroup variant="flush" className="small-muted">
                  <ListGroup.Item style={{ background: "transparent", border: "none", paddingLeft: 0 }}>
                    ✅ Curated selection across categories
                  </ListGroup.Item>
                  <ListGroup.Item style={{ background: "transparent", border: "none", paddingLeft: 0 }}>
                    ✅ Secure payments & easy returns
                  </ListGroup.Item>
                  <ListGroup.Item style={{ background: "transparent", border: "none", paddingLeft: 0 }}>
                    ✅ Same-day delivery in select cities
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features / Categories */}
        <Row className="mb-4 g-4">
          <Col md={4}>
            <div className="feature-card">
              <div className="d-flex align-items-center mb-3">
                <div className="category-icon me-3"><FaTshirt /></div>
                <div>
                  <h5 className="mb-0">Fashion</h5>
                  <small className="small-muted">Trendy clothes & accessories</small>
                </div>
              </div>
              <p className="small-muted">
                Handpicked brands, seasonal collections and fast delivery to your doorstep.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card">
              <div className="d-flex align-items-center mb-3">
                <div className="category-icon me-3"><FaTv /></div>
                <div>
                  <h5 className="mb-0">Electronics</h5>
                  <small className="small-muted">Gadgets & appliances</small>
                </div>
              </div>
              <p className="small-muted">
                Quality-checked electronics — from headphones to smart TVs.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card">
              <div className="d-flex align-items-center mb-3">
                <div className="category-icon me-3"><FaAppleAlt /></div>
                <div>
                  <h5 className="mb-0">Groceries</h5>
                  <small className="small-muted">Daily essentials</small>
                </div>
              </div>
              <p className="small-muted">
                Fresh produce and pantry staples delivered at great prices.
              </p>
            </div>
          </Col>
        </Row>

        {/* Additional categories row */}
        <Row className="mb-5 g-4">
          <Col md={4}>
            <div className="feature-card">
              <div className="d-flex align-items-center mb-3">
                <div className="category-icon me-3"><FaCouch /></div>
                <div>
                  <h5 className="mb-0">Home & Furniture</h5>
                  <small className="small-muted">Stylish & comfortable</small>
                </div>
              </div>
              <p className="small-muted">Handy home furniture and decor to elevate spaces.</p>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card">
              <div className="d-flex align-items-center mb-3">
                <div className="category-icon me-3"><FaRecycle /></div>
                <div>
                  <h5 className="mb-0">Sustainability</h5>
                  <small className="small-muted">Conscious sourcing</small>
                </div>
              </div>
              <p className="small-muted">We work with brands prioritizing sustainability and ethics.</p>
            </div>
          </Col>

          <Col md={4}>
            <div className="feature-card text-center">
              <h5 className="mb-1">Join our community</h5>
              <p className="small-muted mb-3">Sign up for deals, early access & product drops.</p>
              <Button className="cta-btn">Subscribe</Button>
            </div>
          </Col>
        </Row>

        {/* Stats + Team */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <Row className="g-3">
              <Col xs={6}>
                <Card style={{ background: "transparent", border: "none" }}>
                  <Card.Body>
                    <div className="stat text-white">200k+</div>
                    <div className="small-muted">Happy customers</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card style={{ background: "transparent", border: "none" }}>
                  <Card.Body>
                    <div className="stat text-white">4.7 ★</div>
                    <div className="small-muted">Average rating</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card style={{ background: "transparent", border: "none" }}>
                  <Card.Body>
                    <div className="stat text-white">1000+</div>
                    <div className="small-muted">Products</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6}>
                <Card style={{ background: "transparent", border: "none" }}>
                  <Card.Body>
                    <div className="stat text-white">24/7</div>
                    <div className="small-muted">Support</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Card
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
              }}
            >
              <Card.Body className="d-flex align-items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60"
                  alt="founder"
                  style={{ width: 72, height: 72, borderRadius: 16, objectFit: "cover" }}
                />
                <div>
                  <div className="fw-bold">Amit Kumar</div>
                  <div className="small-muted">Founder & CEO</div>
                  <div className="small-muted mt-2" style={{ maxWidth: 340 }}>
                    Building a reliable, joyful shopping experience with a focus on
                    convenience and trust.
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer CTA */}
        <Row className="py-4">
          <Col className="text-center">
            <Card
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "1rem 1.5rem",
                borderRadius: 16,
              }}
            >
              <Card.Body className="d-flex gap-3 align-items-center justify-content-center flex-column flex-md-row">
                <div className="me-3 text-center text-md-start">
                  <div className="fw-bold">Ready to explore Zentra?</div>
                  <div className="small-muted">Shop top picks and daily essentials now.</div>
                </div>
                <div>
                  <Button className="cta-btn">Start Shopping</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
