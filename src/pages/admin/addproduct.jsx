// import { useEffect, useState ,useRef} from "react";
// import { Button, Card, CardBody, Container, Form, FormGroup, InputGroup, Row, Col } from "react-bootstrap";
// import { addProductImage, createProductInCategory, createProductWithOutCategory } from "../../services/ProductService";
// import { toast } from "react-toastify";
// import {getCategories} from '../../services/CategoryService';
// import { Editor } from "@tinymce/tinymce-react";


// const AddProduct = () => {

//     const [product, setProduct]=useState({
//         title:'',
//         description:'',
//         price:0,
//         discountedPrice:0,
//         quantity:1,
//         live:false,
//         stock:0,
//         image:undefined,
//         imagePreview:undefined
//     })

//     const[categories, setCategories] = useState(undefined)
//     const [selectedCategoryId, setSelectedCategoryId] = useState("none")
//     const [collections, setCollections] = useState("All Deals")
//     const []

//     //for rich text editor
//     const editorRef = useRef()

//     useEffect(()=>{
//         getCategories(0, 1000)
//             .then(data=>{
//                 setCategories(data)
//             }).catch((error)=>{
//                 toast.error("Error in loading categories !!")
//             })
//     },[])

   

//     const handleFileChange = (event) => {
//         if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg'){
//             //preview show
//             const reader=new FileReader()
//             reader.onload=(r)=>{

//                 setProduct({
//                     ...product,
//                     imagePreview:r.target.result,
//                     image:event.target.files[0]
//                 })
                
//             }

//             reader.readAsDataURL(event.target.files[0])
//         }else{
//             toast.error("Invalid file !!")
//             setProduct({
//                 ...product,
//                 image:undefined,
//                 imagePreview:undefined
//             })
//         }
//     }

//      //function for clear form
//     const clearForm = () => {
//         editorRef.current.setContent('')
//         setProduct({
//             title:'',
//             description:'',
//             price:0,
//             discountedPrice:0,
//             quantity:1,
//             live:false,
//             stock:true,
//             image:undefined,
//             imagePreview:undefined
//         })

       
//     }

//     //submit add product form
//     const submitAddProductForm=(event)=>{
//         event.preventDefault()

//         if(product.title===undefined || product.title.trim()===''){
//             toast.error("Title is required !!")
//             return
//         }

//         if(product.description===undefined || product.description.trim()===''){
//             toast.error("Description is required !!")
//             return
//         }

//         if(product.price<=0){
//             toast.error("Invalid Price !!")
//             return
//         }

//         if(product.discountedPrice<=0 || product.discountedPrice>=product.price){
//             toast.error("Invalid discounted price !!")
//             return
//         }
//         //validate

//         if(selectedCategoryId==='none'){
//         //create product without category
//         createProductWithOutCategory(product)
//             .then(data=>{
//                 toast.success("Product is created !!")
//                 if(!product.image){
//                     clearForm()
//                     return
//                 }

//                 //image upload
//                 addProductImage(product.image,data.productId)
//                     .then(data=>{

//                         toast.success("Image uploaded")
//                        clearForm()
//                     })
//                     .catch(error=>{
//                         toast.error("Error in uploading image")
//                     })

//                 toast.success("Product is created !!")
                
//             })
//             .catch(error=>{
//                 toast.error("Error in created product !! Check product details ")
//             })
//         }else{
            
//             //create product within category
//             createProductInCategory(product, selectedCategoryId)
//             .then(data=>{
//                 toast.success("Product is created !!")
//                 if(!product.image){
//                     clearForm()
//                     return
//                 }
//                 //image upload
//                 addProductImage(product.image,data.productId)
//                     .then(data=>{
//                         toast.success("Image uploaded")
//                         clearForm()
//                     })
//                     .catch(error=>{
//                         toast.error("Error in uploading image")
//                     })
//                 })
//             .catch(error=>{
//                 toast.error("Error in created product !! Check product details ")
//             })
//         }
//     }

   

//     const formView = () =>{
//         return(
//             <>
//                <Card className="shadow-sm">
//                     <Card.Body>
//                         <h5>Add Product here</h5>
//                         <Form onSubmit={submitAddProductForm}>
//                             {/* product title */}
//                             <FormGroup className="mt-3">
//                                 <Form.Label>Product title</Form.Label>
//                                 <Form.Control 
//                                     type="text"
//                                     placeholder="Enter here"
//                                     onChange={(event)=>setProduct({
//                                         ...product,
//                                         title:event.target.value
//                                     })}
//                                     value={product.title}
//                                 />
//                             </FormGroup>

//                             {/* product description */}
//                             <FormGroup className="mt-3">
//                                 <Form.Label>Product Description</Form.Label>
//                                 {/* <Form.Control 
//                                     as={'textarea'} rows={6} 
//                                     placeholder="Enter here"
//                                     onChange={(event)=>setProduct({
//                                         ...product,
//                                         description:event.target.value
//                                     })}
//                                     value={product.description}
//                                 /> */}
//                                 <Editor

//                                     apiKey="iebwdpt3e5byptk4bn8vjws6syivetn58drxpki7b17r9pk0"
//                                     onInit={(evt, editor) => editorRef.current = editor}
//                                     init={{
//                                     height: 380,
//                                     menubar: true,
//                                     plugins: [
//                                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//                                     ],
//                                     toolbar: 'undo redo | blocks | ' +
//                                         'bold italic forecolor | alignleft aligncenter ' +
//                                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                                         'removeformat | help',
//                                     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//                                     }}
//                                     onEditorChange={()=>setProduct({
//                                         ...product,
//                                         description: editorRef.current.getContent()
//                                     })}
                                
//                                 />


//                             </FormGroup>

//                             <Row>
//                                 <Col>
//                                  {/* price section */}
//                                     <FormGroup className="mt-3">
//                                         <Form.Label>Price</Form.Label>
//                                         <Form.Control
//                                             type="number"
//                                             placeholder="Enter here"
//                                             onChange={(event)=>setProduct({
//                                                 ...product,
//                                                 price:event.target.value
//                                             })}
//                                             value={product.price}
//                                         />
//                                     </FormGroup>
//                                 </Col>
                                
//                                 <Col>
//                                     {/*Discounted price section */}
//                                     <FormGroup className="mt-3">
//                                         <Form.Label>Discounted Price</Form.Label>
//                                         <Form.Control 
//                                             type="number"
//                                             placeholder="Enter here"
//                                             onChange={(event)=>{
//                                                 if(event.target.value > product.price){
//                                                     toast.error("Invalid Discount Value !!")
//                                                     return
//                                                 }
//                                                 setProduct({
//                                                 ...product,
//                                                 discountedPrice:event.target.value
//                                             })
//                                             }}
//                                             value={product.discountedPrice}
//                                         />
//                                     </FormGroup>
//                                 </Col>
//                             </Row>

//                             {/* Product quantity */}
//                             <Form.Group className="mt-3">
//                                 <Form.Label>Product Quantity</Form.Label>
//                                 <Form.Control 
//                                     type="number" 
//                                     placeholder="Enter here"
//                                     value={product.quantity}
//                                     onChange={(event)=>setProduct({
//                                         ...product,
//                                         quantity:event.target.value
//                                     })}
//                                 />
//                             </Form.Group>
                            
//                             {/* live and stock on/off section */}
//                             <Row className="mt-3 px-2">
//                                 <Col>
//                                     <Form.Check 
//                                         type="switch" 
//                                         label={"Live"}
//                                         checked={product.live}
//                                         onChange={(event)=>{
//                                             setProduct({
//                                                 ...product,
//                                                 live: !product.live
//                                             })
//                                         }}
//                                     />
//                                 </Col>

//                                 <Col>
//                                      <Form.Check 
//                                         type="switch" 
//                                         label={"Stock"}
//                                         checked={product.stock}
//                                         onChange={(event)=>{
//                                             setProduct({
//                                                 ...product,
//                                                 stock: !product.stock
//                                             })
//                                         }}
//                                     />
//                                 </Col>
//                             </Row>

//                             {/* product image */}
//                             <Form.Group className="mt-3">
//                                 <Container hidden={!product.imagePreview} className="text-center py-4 border-2">
//                                     <p className="text-muted">Image Preview</p>
//                                     <img 
//                                         className="img-fluid"
//                                         style={{
//                                             maxHeight:"250px"
//                                         }}
//                                         src={product.imagePreview} alt="product_img"
//                                     />
//                                 </Container>
//                                 <Form.Label>Select product image</Form.Label>
//                                 <InputGroup>
//                                     <Form.Control type={'file'}
//                                         onChange={(event)=> handleFileChange(event)}
//                                     />
//                                     <Button onClick={(event)=>{
//                                         setProduct({
//                                             ...product,
//                                             imagePreview:undefined,
//                                             image: undefined
//                                         })
//                                         }}
//                                         variant="outline-secondary">
//                                                 Clear
//                                     </Button>
//                                 </InputGroup>
//                             </Form.Group>

//                             {/* category scroll bar section */}
//                             <Form.Group className="mt-3">
//                                 <Form.Label>Select Category</Form.Label>
//                                 <Form.Select  onChange={(event)=>setSelectedCategoryId(event.target.value)}>
//                                     <option value='none'>None</option>
//                                     {
//                                         (categories) ? 
//                                         <>

//                                             {
//                                                 categories.content.map(cat=><option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
//                                             }

//                                         </>: ''
//                                     }

//                                 </Form.Select>
//                             </Form.Group>

//                             {/* buttons */}
//                             <Container className="text-center mt-3">
//                                 <Button type="submit" variant="success" size="sm">Add Product</Button>
//                                 <Button onClick={clearForm} variant="danger" size="sm" className="ms-1">Clear Data</Button>
//                             </Container>
//                         </Form>
//                     </Card.Body>
//                </Card>
//             </>
//         )
//     }

//     return (
//         <div>
//            {
//             formView()
//            }
//         </div>
//     )
// }

// export default AddProduct;



import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    discountedPrice: '',
    rentalPrice: '',
    rentalUnit: 'perDay', // NEW FIELD
    stock: '',
    rating: 5,
    productImageName: '',
    categoryId: '',
    collectionId: '',
    live: true
  });

  const [categories] = useState([
    { id: '1', name: 'Furniture' },
    { id: '2', name: 'Electronics' },
    { id: '3', name: 'Clothing' },
    { id: '4', name: 'Books' },
    { id: '5', name: 'Sports' }
  ]);

  const [collections] = useState([
    { id: '1', name: 'Premium Collection' },
    { id: '2', name: 'Budget Series' },
    { id: '3', name: 'Limited Edition' },
    { id: '4', name: 'Seasonal' }
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});
    //for rich text editor
    const editorRef = useRef()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));

    setSelectedImages(prev => [...prev, ...newImages]);

    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);
      return prev.filter(img => img.id !== imageId);
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productData.title.trim()) newErrors.title = 'Product title is required';
    if (!productData.description.trim()) newErrors.description = 'Product description is required';
    if (!productData.price || Number(productData.price) <= 0) newErrors.price = 'Valid price is required';
    if (productData.stock === '' || Number(productData.stock) < 0) newErrors.stock = 'Valid stock is required';
    if (!productData.categoryId) newErrors.categoryId = 'Please select a category';
    if (selectedImages.length === 0) newErrors.images = 'At least one product image is required';
    if (productData.discountedPrice && Number(productData.discountedPrice) >= Number(productData.price)) {
      newErrors.discountedPrice = 'Discounted price must be less than regular price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const productId = 'PROD_' + Date.now();

    const finalProductData = {
      ...productData,
      productId,
      addedDate: new Date().toISOString(),
      productImageName: selectedImages[0]?.file?.name || '',
      price: Number(productData.price),
      discountedPrice: productData.discountedPrice ? Number(productData.discountedPrice) : 0,
      rentalPrice: productData.rentalPrice ? Number(productData.rentalPrice) : 0,
      stock: Number(productData.stock),
      rating: Number(productData.rating)
    };

    console.log('Product Data to be saved:', finalProductData);
    console.log('Product Images:', selectedImages.map(img => img.file));
    alert('Product added successfully!');
    handleReset();
  };

  const handleReset = () => {
    selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setProductData({
      title: '',
      description: '',
      price: '',
      discountedPrice: '',
      rentalPrice: '',
      rentalUnit: 'perDay',
      stock: '',
      rating: 5,
      productImageName: '',
      categoryId: '',
      collectionId: '',
      live: true
    });
    setSelectedImages([]);
    setErrors({});
  };

  useEffect(() => {
    return () => selectedImages.forEach(img => img.preview && URL.revokeObjectURL(img.preview));
  }, [selectedImages]);

  const getCategoryName = (id) => categories.find(cat => cat.id === id)?.name || 'Not selected';
  const getCollectionName = (id) => collections.find(col => col.id === id)?.name || 'Not selected';

  const getStatus = () => {
    if (!productData.live) return '⚫ Draft';
    if (Number(productData.stock) === 0) return '🔴 Out of Stock';
    return '🟢 Live';
  };

  return (
    <div className="container-fluid" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="row">
        <div className="col-lg-11 offset-lg-0">
          <div className="card shadow-sm border mb-4">
            <div className="card-header bg-light d-flex align-items-center">
              <Plus className="me-2 text-primary" size={28} />
              <div>
                <h1 className="h4 mb-0">Add New Product</h1>
                <small className="text-muted">Create a new product for your store</small>
              </div>
            </div>
            <div className="card-body">
              <div className="row g-4">
                {/* Left side (form) */}
                <div className="col-xl-8">
                  {/* Basic Information */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Basic Information</h5>
                      <small className="text-muted">Essential product details</small>
                    </div>
                    <div className="card-body">
                      {/* Title */}
                      <div className="mb-3">
                        <label className="form-label">Product Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={productData.title}
                          onChange={handleInputChange}
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          placeholder="Enter product title"
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                      </div>
                      {/* Description */}
                      <div className="mb-3">
                        <label className="form-label">Product Description *</label>
                        {/* <textarea
                          name="description"
                          rows="5"
                          value={productData.description}
                          onChange={handleInputChange}
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          placeholder="Enter description..."
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>} */}

                        <Editor
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            placeholder="Enter description..."
                            
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
                            onEditorChange={()=>setProductData({
                                ...productData,
                                description: editorRef.current.getContent()
                                
                            })}
                              
                        />
                      </div>
                      {/* Category & Collection */}
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Category *</label>
                          <select
                            name="categoryId"
                            value={productData.categoryId}
                            onChange={handleInputChange}
                            className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                          >
                            <option value="">Choose a category</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                          </select>
                          {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Collection (Optional)</label>
                          <select
                            name="collectionId"
                            value={productData.collectionId}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="">Choose a collection</option>
                            {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Pricing</h5>
                    </div>
                    <div className="card-body row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Price *</label>
                        <input
                          type="number"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Discounted Price</label>
                        <input
                          type="number"
                          name="discountedPrice"
                          value={productData.discountedPrice}
                          onChange={handleInputChange}
                          className={`form-control ${errors.discountedPrice ? 'is-invalid' : ''}`}
                        />
                        {errors.discountedPrice && <div className="invalid-feedback">{errors.discountedPrice}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Rental Price</label>
                        <div className="input-group">
                          <input
                            type="number"
                            name="rentalPrice"
                            value={productData.rentalPrice}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                          <select
                            name="rentalUnit"
                            value={productData.rentalUnit}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="perDay">/ day</option>
                            <option value="perMonth">/ month</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inventory */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Inventory Management</h5>
                    </div>
                    <div className="card-body row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Stock *</label>
                        <input
                          type="number"
                          name="stock"
                          value={productData.stock}
                          onChange={handleInputChange}
                          className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                          min="0"
                        />
                        {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Initial Rating</label>
                        <select
                          name="rating"
                          value={productData.rating}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>
                              {rating} {Array(rating).fill('⭐').join('')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side (sidebar) */}
                <div className="col-xl-4">
                  {/* Image Upload */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Product Images</h5>
                    </div>
                    <div className="card-body">
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="form-control mb-3" />
                      {errors.images && <div className="text-danger small">{errors.images}</div>}
                      <div className="row g-2">
                        {selectedImages.map((img) => (
                          <div key={img.id} className="col-6 position-relative">
                            <img src={img.preview} alt="" className="img-fluid rounded border" />
                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visibility */}
                  <div className="card mb-4">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Visibility</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="live"
                          name="live"
                          checked={productData.live}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label htmlFor="live" className="form-check-label">Make product live</label>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="card">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">Quick Preview</h5>
                    </div>
                    <div className="card-body">
                      <p><strong>Title:</strong> {productData.title || 'Not set'}</p>
                      <p><strong>Category:</strong> {getCategoryName(productData.categoryId)}</p>
                      <p><strong>Collection:</strong> {getCollectionName(productData.collectionId)}</p>
                       {/* Price with discount display */}
                        <p>
                        <strong>Price:</strong>{' '}
                        {productData.discountedPrice &&
                        Number(productData.discountedPrice) < Number(productData.price) ? (
                            <>
                            <span className="text-muted text-decoration-line-through me-2">
                                ₹{productData.price}
                            </span>
                            <span className="text-success fw-bold">
                                ₹{productData.discountedPrice}
                            </span>
                            <span className="badge bg-success ms-2">
                                {Math.round(
                                ((productData.price - productData.discountedPrice) / productData.price) * 100
                                )}% OFF
                            </span>
                            </>
                        ) : (
                            <span>₹{productData.price || 'Not set'}</span>
                        )}
                        </p>
                        {/* Rental Price */}
                        {productData.rentalPrice && (
                        <p>
                            <strong>Rental:</strong> ₹{productData.rentalPrice}{' '}
                            {productData.rentalUnit === 'perDay' ? '/ day' : '/ month'}
                        </p>
                        )}
                      <p><strong>Stock:</strong> {productData.stock || '0'} units</p>
                      <p><strong>Status:</strong> {getStatus()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button onClick={handleReset} className="btn btn-outline-secondary">Reset</button>
                <button onClick={handleSubmit} className="btn btn-primary">Add Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;


