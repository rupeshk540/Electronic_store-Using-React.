import React, { useContext, useEffect, useState } from 'react';
import { getProduct } from '../../services/ProductService';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import ShowHtml from "../../components/ShowHtml";
import { Card, Col, Container, Row,Badge, Button } from 'react-bootstrap';
import { getProductImageUrl } from '../../services/HelperService';
import defaultProductImage from "../../assets/defaultProduct_img.jpg";
import CartContext from '../../context/CartContext';


const ProductView = () => {

    const {cart, addItem} =useContext(CartContext)
    const[product, setProduct] = useState(null)
    const {productId} = useParams()

    useEffect(() => {
        loadUser(productId)
    },[])

    const loadUser = (productId) => {
        getProduct(productId).then(data => setProduct(data)).catch(error => toast.error("Error in fecthing products !"))
    }

    const handleAddItem=(productId, quantity) => {
        addItem(quantity, productId, ()=>{
            toast.success("product is added to cart !!")
        })
    }

    const productView = () => {
        return(
            <Container className='py-4'>
                <Row>
                    <Col>
                        <Card className='mt-4 border border-0 shadow-sm'>
                            <Card.Body>
                                <Container className='my-4'>
                                   <Row>
                                        <Col>
                                            <img
                                                style={{ width: "500px"}}
                                                src={getProductImageUrl(product.productId)} alt="" 
                                                onError={(event) => {
                                                    event.currentTarget.setAttribute('src', defaultProductImage)
                                                }}
                                            />
                                        </Col>
                                        <Col>
                                            <h3>{product.title}</h3>
                                            <p className='text-muted'>Sort description <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, optio.</span></p>
                                            <Badge pill bg='info'>{product.category?.title}</Badge>
                                            <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : 'Out of Stock'}</Badge>
                                            <Container className='text-start'>
                                                <b><span className='h1 text-muted'><s>₹{product.price}</s></span></b>
                                                <b><span className='h2 ms-2'>₹{product.discountedPrice}</span></b>
                                            </Container>
                                            <Container className='d-grid mt-4'>
                                                <Button variant='warning' size='sm' onClick={event => handleAddItem(product.productId, 1)}>Add to Cart</Button>
                                                <Button as={Link} to='/store' className='mt-2' variant='info' size='sm'>Go to Store</Button>
                                            </Container>
                                        </Col>
                                   </Row>
                                </Container>
                                <div className='mt-5'>
                                    <ShowHtml htmlText={product.description}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Container className='d-grid mt-4'>
                    <Button variant='warning' size='sm'  onClick={event => handleAddItem(product.productId, 1)}>Add to Cart</Button>
                    <Button as={Link} to='/store' className='mt-2' variant='info' size='sm'>Go to Store</Button>
                </Container>
            </Container>
        )
    }

  return (
    product && productView()
  )
}

export default ProductView