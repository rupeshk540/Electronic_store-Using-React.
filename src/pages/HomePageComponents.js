import { Card, Col, Container, Row, Badge, Button, Form } from "react-bootstrap";
import SingleProductCard from "../components/users/SingleProductCard";
import { FaInstagram } from 'react-icons/fa';

 export const trendingProducts = (products) => {
    return (
        <Container>
            <Row>
                <h3 className="text-center">Trending Products </h3>
                {products.map((product) =>(
                <Col md={4}>
                   <SingleProductCard product={product} />
                </Col>
                ))}
            </Row>
        </Container>
    )
};

export const infoWithImageInRightSection = (image, title, text) => {
    return (
        <Container>
            <Row>
                <Col style={{}} className="text-center">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <Button>Store</Button>
                </Col>
                <Col className="text-center">
                    <img src={image} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

export const infoWithImageInLeftSection = (image, title, text) => {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <img src={image} alt="" />
                </Col>
                <Col style={{}} className="text-center">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <Button>Store</Button>
                </Col>
                
            </Row>
        </Container>
    )
};

export const contactForm = () => {
    
    return(
    //    <Container>
    //         <Card>
    //             <Card.Body>
    //                 <div className="text-center"><h3>Contact Us</h3></div>
    //                 <Form>
    //                 <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>Email address</Form.Label>
    //                     <Form.Control type="email" placeholder="Enter email"/>
    //                     <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
    //                 </Form.Group>

    //                 <Form.Group className="mb-3" controlId="formBasicPassword">
    //                     <Form.Label>Password</Form.Label>
    //                     <Form.Control type="password" placeholder="Password"/>
    //                 </Form.Group>

    //                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //                     <Form.Check type="checkbox" label="Check me out"/>
    //                 </Form.Group>

    //                 <Button variant="primary" type="submit">Submit</Button>
    //                 </Form>
    //             </Card.Body>
    //         </Card>
    //    </Container>
        

     <div class="container">
            <div class="contact-container bg-white">
                <h2 class="contact-header text-center text-dark mb-4 pb-2">Get In Touch</h2>
                <div class="row">
                    <div class="col-lg-8">
                        <form action="">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" name="" class="form-control" placeholder="Your Name" id=""/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="email" name="" class="form-control" required placeholder="Your Email" id=""/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" name="subject" placeholder="Subject" class="form-control" required id=""/>
                            </div>
                            <div class="form-group">
                                <textarea name="" class="form-control" placeholder="Your Message" rows="6" id=""></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark w-100 btn-submit py-2 text-white border-0">Send Message</button>
                        </form>
                    </div>
                    <div class="col-lg-4">
                        <div class="contact-info bg-dark text-white rounded p-4">
                            <h3 class="mb-3 pb-2">Contact Info</h3>
                            <div class="contact-info-item d-flex mb-2">
                                <div class="contact-info-icon text-white me-2 fs-5">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h5>Location</h5>
                                    <p>Kolkata, India</p>
                                </div>
                            </div>
                            <div class="contact-info-item d-flex mb-2">
                                <div class="contact-info-icon text-white me-2 fs-5">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div>
                                    <h5>Phone</h5>
                                    <p>+918292842209</p>
                                </div>
                            </div>
                            <div class="contact-info-item d-flex mb-2">
                                <div class="contact-info-icon text-white me-2 fs-5">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h5>Email</h5>
                                    <p>theproviders98@gmail.com</p>
                                </div>
                            </div>
                            <div class="social-icons mt-4">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
};