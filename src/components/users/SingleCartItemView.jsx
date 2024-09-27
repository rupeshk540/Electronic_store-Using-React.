import { Card, Row, Col, Button } from 'react-bootstrap';
import {getProductImageUrl} from "../../services/HelperService";
import defaultProductImage from "../../assets/defaultProduct_img.jpg";
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { toast } from 'react-toastify';


export const SingleCartItemView = ({item}) => {

    const {cart, setCart, addItem, removeItem, clearCart} = useContext(CartContext);

  return (
    
    <Card className='shadow-sm mb-3'>
        <Card.Body>
            <Row>
                <Col md={1} className='d-flex align-items-center justify-content-center'>
                    
                    <img
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain'
                        }}
                        src={getProductImageUrl(item.product.productId)} alt="Product_img" 
                        onError={event => {
                            event.currentTarget.setAttribute('src', defaultProductImage)
                        }}
                    />
                    
                </Col>
                <Col md={9}>
                    <h5>{item.product.title}</h5>
                    <p className='text-muted'><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, libero!</span></p>
                    <Row>
                        <Col>
                             <p><b>{item.quantity}</b> <span className='text-muted'>Quantity</span></p>
                        </Col>
                        <Col>
                            <p><span className='text-muted'>Price</span> <b> ₹{item.product.discountedPrice}</b></p>
                            
                        </Col>
                        <Col>
                             <p><span className='text-muted'>Total Price</span> <b> ₹{item.totalPrice}</b></p>
                        </Col>
                    </Row>
                </Col>
                <Col md={2} className='d-flex align-items-center justify-content-center'>
                    <div className='w-100'>
                        <div className='d-grid'>
                            <Button onClick={event => {removeItem(item.cartItemId) }}size='sm'>Remove</Button>
                        </div>
                        <div>
                            <Row>
                                <Col className='d-grid'>
                                    <Button onClick={event => {
                                        const decreaseQuantity = item.quantity-1
                                        if(decreaseQuantity > 0){
                                            addItem(decreaseQuantity, item.product.productId, ()=>{
                                                toast.info("Quantity decreased !!")
                                            })

                                        }else{
                                            toast.info("Quantity can not be less than 1")
                                        }
                                        }}size='sm'
                                    > - </Button>
                                </Col>
                                <Col className='d-grid'>
                                    <Button onClick={event => {
                                        const increasedQuantity = item.quantity+1
                                        
                                            addItem(increasedQuantity,item.product.productId, ()=>{
                                                toast.success("Quantity Updated !!")
                                            })
                                        }}size='sm'
                                    >+</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                 </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

export default SingleCartItemView;
