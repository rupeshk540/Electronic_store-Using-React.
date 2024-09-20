import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form,FormGroup, Pagination, Row, Table, Modal,InputGroup} from "react-bootstrap";
import { toast } from "react-toastify";
import { addProductImage, getAllProducts, updateProduct, updateProductCategory, searchProduct } from "../../services/ProductService";
import SingleProductView from "../../components/admin/SingleProductView";
import { getProductImageUrl, PRODUCT_PAGE_SIZE } from "../../services/HelperService";
import defaultImage from "../../assets/default_profilepic.jpg";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import {getCategories} from '../../services/CategoryService';


const ViewProducts = () => {

    const [products, setProducts] = useState(undefined)
    const [currentProduct, setCurrentProduct]=useState(undefined)
    const editorRef = useRef()
    const [categories, setCategories]=useState(undefined)
    const [imageUpdate, setImageUpdate] = useState({
        image: undefined,
        imagePreview: undefined
    })
    const [categoryChangeId, setCategoryChangeId] = useState('')

    const [searchQuery, setSearchQuery] = useState('')
    const [previousProducts, setPreviousProducts] = useState(undefined)

    useEffect(()=>{
        getCategories(0,1000)
            .then(data =>{
                setCategories({...data})
            })
            .catch(error => {
                toast.error("Error in loading categories !!")
            })
    })

    //view product state variables
    const [show, setShow] = useState(false);
    const closeProductViewModal = () => {
        setShow(false)
    };
    const openProductViewModal = (event, product) => {
        setCurrentProduct(product)
        setShow(true)
    };

    //edit product state variables
    const [showEditModal, setShowEditModal] = useState(false);

    const closeEditProductModel=(event,product)=>{
        setShowEditModal(false)
    }

    const openEditProductModel=(event,product)=>{
        setCurrentProduct(product)
        editorRef.current.setContent(product.description)
        setShowEditModal(true)
    }


    useEffect(() => {
        getProducts(0,PRODUCT_PAGE_SIZE,'addedDate','desc')
    },[])

    const getProducts=(
        pageNumber = 0,
        pageSize = 10,
        sortBy = "addedDate",
        sortDir = "asc" )=>{

            getAllProducts(pageNumber, pageSize, sortBy, sortDir)
                .then(data=>{
                    setProducts({
                        ...data
                    })
                })
                .catch(error=>{
                    toast.error("Error in loading products !!")
                })
    }
    

    // handleUpdateFormSubmit
    const handleUpdateFormSubmit =(event)=>{
        event.preventDefault()
        if(currentProduct.title === ''){
            toast.error("title required !!")
            return
        }

        //form submit api call
        updateProduct(currentProduct,currentProduct.productId)
            .then(data=>{

               toast.success("Detail updated", {
                    position: "top-right"
                })

                 //call api for updating image
                if(imageUpdate.image && imageUpdate.imagePreview){
                    addProductImage(imageUpdate.image, currentProduct.produ)
                    .then(ImageData => {
                        setCurrentProduct({
                            ...currentProduct,
                            productImageName: ImageData.imageName
                        })
                        toast.success("image updated !!",{
                            position: "top-right"
                        })
                        setImageUpdate({
                            image: undefined,
                            imagePreview: undefined
                        })
                    })
                    .catch(error =>{
                        toast.error("Error in updating image", {
                            position: "top-right"
                        })
                    })
                }

                //category update
                if(categoryChangeId==='none' || categoryChangeId===currentProduct.category?.categoryId){

                }else{
                    updateProductCategory(categoryChangeId, currentProduct.productId)
                        .then(catData => {
                            toast.success("Category Updated",{
                                position: "top-right"
                            })
                            setCurrentProduct({
                                ...currentProduct,
                                category: catData.category
                            })

                            const newArray = products.content.map(p =>{
                                if(p.productId === currentProduct.productId){
                                    return catData;
                                }
                                return p
                            })
            
                            setProducts({
                                ...products,
                                conntent: newArray
                            })

                        }).catch(error => {
                            toast.error("Error in updating categorry !!")
                        })
                }

                const newArray = products.content.map(p =>{
                    if(p.productId === currentProduct.productId){
                        return data;
                    }
                    return p
                })

                setProducts({
                    ...products,
                    conntent: newArray
                })
            })
    }

    //handle update file change for image change and preview
    const handleFileChange = (event) => {
        if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg'){
            //preview show
            const reader=new FileReader()
            reader.onload=(r)=>{

                setImageUpdate({
                    imagePreview: r.target.result,
                    image: event.target.file[0]
                })
                
            }

            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid file !!")
            setImageUpdate({
                image: undefined,
                imagePreview: undefined
            })
        }
    }


    const updateProductList = (productId) => {
        const newArray = products.content.filter(p => p.productId != productId)
        setProducts({
            ...products,
            content:newArray
        })
    }


    //modal view
    const viewProductModalView=()=>{
        return currentProduct && (
            <>
               
                <Modal size={"xl"} animation={false} show={show} onHide={closeProductViewModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentProduct.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                 {/* product image */}
                                <Container className="text-center py-3">
                                    <img style={{
                                        height:'350px'
                                    }} src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId):defaultImage} alt="" />
                                </Container>

                                {/* information table */}
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Product Id</td>
                                            <td className="fw-bold">{currentProduct.productId}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td className="fw-bold">{currentProduct.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td className="fw-bold">₹ {currentProduct.price}</td>
                                        </tr>
                                        <tr>
                                            <td>Discounted Price</td>
                                            <td className="fw-bold">₹ {currentProduct.discountedPrice}</td>
                                        </tr>
                                        <tr className={currentProduct.live ? '':'table-danger'}>
                                            <td>Live</td>
                                            <td className="fw-bold">{currentProduct.live ? 'True' : 'False'}</td>
                                        </tr>
                                        <tr className={currentProduct.stock ? '':'table-danger'}>
                                            <td>Stock</td>
                                            <td className="fw-bold">{currentProduct.stock ? 'In Stock':'Out of Stock'}</td>
                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td>{currentProduct.category?.titlt}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                {/* description */}
                                <div className="p-3 border border-1">
                                    <ShowHtml htmlText={currentProduct.description}/>
                                </div>
                             </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeProductViewModal}>close</Button>
                        <Button variant="primary" onClick={closeProductViewModal}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )

    }

    //update modal
    const editProductModalView = () => {
        return currentProduct && (
            <>
                <Modal size="xl" animation={false} show={showEditModal} onHide={closeEditProductModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={handleUpdateFormSubmit}>
                            {/* product title */}
                            <FormGroup className="mt-3">
                                <Form.Label>Product title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter here"
                                    value={currentProduct.title}
                                    onChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        title: event.target.value
                                    })}
                            
                                />
                            </FormGroup>

                            {/* product description */}
                            <FormGroup className="mt-3">
                                <Form.Label>Product Description</Form.Label>
                                {/* <Form.Control 
                                    as={'textarea'} rows={6} 
                                    placeholder="Enter here"
                                    onChange={(event)=>setProduct({
                                        ...product,
                                        description:event.target.value
                                    })}
                                    value={product.description}
                                /> */}
                                <Editor

                                    apiKey="iebwdpt3e5byptk4bn8vjws6syivetn58drxpki7b17r9pk0"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    init={{
                                    height: 380,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    value={currentProduct.description}
                                    onEditorChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        description: editorRef.current.getContent()
                                    })}
                                    
                                
                                />


                            </FormGroup>

                            <Row>
                                <Col>
                                 {/* price section */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter here"
                                            value={currentProduct.price}
                                            onChange={event => setCurrentProduct({
                                                ...currentProduct,
                                                price: event.target.value
                                            })}
                                        />
                                    </FormGroup>
                                </Col>
                                
                                <Col>
                                    {/*Discounted price section */}
                                    <FormGroup className="mt-3">
                                        <Form.Label>Discounted Price</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            placeholder="Enter here"
                                            value={currentProduct.discountedPrice}
                                            onChange={event => setCurrentProduct({
                                                ...currentProduct,
                                                discountedPrice: event.target.value
                                            })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {/* Product quantity */}
                            <Form.Group className="mt-3">
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter here"
                                    value={currentProduct.quantity}
                                    onChange={event => setCurrentProduct({
                                        ...currentProduct,
                                        quantity: event.target.value
                                    })}
                                    
                                />
                            </Form.Group>
                            
                            {/* live and stock on/off section */}
                            <Row className="mt-3 px-2">
                                <Col>
                                    <Form.Check 
                                        type="switch" 
                                        label={"Live"}
                                        checked={currentProduct.live}
                                        onChange={event => setCurrentProduct({
                                            ...currentProduct,
                                            live: !currentProduct.live
                                        })}
                                       
                                    />
                                </Col>

                                <Col>
                                     <Form.Check 
                                        type="switch" 
                                        label={"Stock"}
                                        checked={currentProduct.stock}
                                        onChange={event => setCurrentProduct({
                                            ...currentProduct,
                                            stock: !currentProduct.stock
                                        })}
                                        
                                    />
                                </Col>
                            </Row>

                            {/* product image */}
                            <Form.Group className="my-5">
                                <Container className="text-center py-4 border-2">
                                    <p className="text-muted">Image Preview</p>
                                    <img 
                                        className="img-fluid"
                                        style={{
                                            maxHeight:"250px"
                                        }}
                                        src={imageUpdate.imagePreview ? imageUpdate.imagePreview : getProductImageUrl(currentProduct.productId)}
                                    />
                                </Container>
                                <Form.Label>Select product image</Form.Label>
                                <InputGroup>
                                    <Form.Control type={'file'}
                                    onChange={(event)=> handleFileChange(event)}
                                        
                                    />
                                    <Button 
                                        onClick={event => {
                                            setImageUpdate({
                                                imagePreview: undefined,
                                                image: undefined
                                            })
                                        }}
                                        variant="outline-secondary">
                                                Clear
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            {/* category scroll bar section */}
                            <Form.Group className="mt-3">
                                <Form.Label>Select Category</Form.Label>
                                <Form.Select onChange={(event)=>{
                                    setCategoryChangeId(event.target.value)
                                }}> 
                                    <option value='none'>None</option>
                                    {
                                        categories && categories.content.map(cat => {
                                            return(
                                                <option selected={cat.categoryId == currentProduct.category?.categoryId} value={cat.categoryId} key={cat.categoryId}>{cat.title}</option>
                                            )
                                        })
                                    }
                                
                                </Form.Select>
                            </Form.Group>

                            {/* buttons */}
                            <Container className="text-center mt-3">
                                <Button type="submit" variant="success" size="sm">Save Details</Button>
                            </Container>
                        </Form>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEditProductModel}>Close</Button>
                        
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    //search product function
    const searchProducts = () => {
        if(searchQuery === undefined || searchQuery.trim() === ''){
            return
        }
        
        //call server api to search
        searchProduct(searchQuery)
        .then(data=>{
            if(data.content.length <= 0){
                toast.info("No result found")
                return
            }
            setPreviousProducts(products)
            setProducts(data)
        }).catch(
            error=>{
                toast.error("Error in searching the products",{
                    position:"top-right"
                })
            }
        )
    }
    //products view
    const productsView=()=>{
        return(
            <Card className="shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">View Products</h5>

                        <Form.Group className="mb-2">
                            <Form.Label>Search Product</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    onChange={(event)=> {
                                        if(event.target.value ===''){
                                            if(previousProducts){
                                                setProducts(previousProducts)
                                            }
                                        }else{
                                            setSearchQuery(event.target.value)
                                        }
                                    }}
                                    value={searchQuery}
                                    type="text" placeholder="search here"/>
                                <Button onClick={searchProducts} variant="outline-secondary">Search</Button>
                            </InputGroup>
                        </Form.Group>

                    <Table className="" bordered striped hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th className="px-3 small">SN</th>
                                    <th className="px-3 small">Title</th>
                                    <th className="px-3 small">Quantity</th>
                                    <th className="px-3 small">Price</th>
                                    <th className="px-3 small">Discount</th>
                                    <th className="px-3 small">Live</th>
                                    <th className="px-3 small">Stock</th>
                                    <th className="px-3 small">Category</th>
                                    <th className="px-3 small">Date</th>
                                    <th className="px-3 small">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                products.content.map((product,index) =>(
                                    <SingleProductView
                                    key={index}
                                    index={index} 
                                    product={product} 
                                    updateProductList={updateProductList} 
                                    openProductViewModal={openProductViewModal}
                                    openEditProductModel={openEditProductModel}
                                    />
                                ))
                              }
                            </tbody>
                    </Table>
                    <Container className="d-flex justify-content-end">
                            <Pagination>
                                {/* loop from 0 to totalpages-1 */}

                                <Pagination.Prev onClick={(event)=>{
                                    if((products.pageNumber-1)<0)
                                        return
                                    getProducts(products.pageNumber-1, PRODUCT_PAGE_SIZE,'addedDate','desc')
                                }}/>
                                {
                                    [...Array(products.totalPages)].map((ob, i)=>i).map(item => {
                                        return products.pageNumber == item ? <Pagination.Item active key={item}>{item+1}</Pagination.Item>:<Pagination.Item onClick={(event)=>{
                                            getProducts(item, PRODUCT_PAGE_SIZE,'addedDate', 'desc')
                                        }} key={item}>{item+1}</Pagination.Item>
                                        

                                    })
                                }
                                <Pagination.Next onClick={(event)=>{
                                    if(products.lastPage)
                                        return
                                    getProducts(products.pageNumber+1,PRODUCT_PAGE_SIZE,'addedDate','desc')
                                }}/>
                            </Pagination>
                    </Container>
                 </Card.Body>
            </Card>
        )
    }

    return(
        <>
            <Container fluid>
                <Row>
                    <Col>
                       {
                        products ? productsView() : ''
                       }
                    </Col>
                </Row>
            </Container>

            {
                viewProductModalView()
            }

            {
                editProductModalView()
            }
        </>
    )
}

export default ViewProducts;