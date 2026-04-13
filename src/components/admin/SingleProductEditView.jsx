// import { Button, Modal } from "react-bootstrap";
// import { BsFillPencilFill } from "react-icons/bs";
// import { GrFormView } from "react-icons/gr";
// import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
// import {Swal} from "sweetalert2";
// import { deleteProduct } from "../../services/ProductService";
// import { useState } from "react";

// const SingleProductView = ({
//     index,
//     product,
//     updateProductList,
//     openProductViewModal,
//     openEditProductModel
// })=>{

    
//     const formatDate=(time)=>{
//         return new Date(time).toLocaleString()
//     }

//     const getBackgroundForProduct = () => {
//         //live+stock ==> green
//         //not live ==> red
//         //not stock ==> yellow

//         if(product.live && product.stock){
//             return "table-success"
//         }else if(!product.live){
//             return "table-danger"
//         }else if(!product.stock){
//             return "table-warning"
//         }else{

//         }
//     }

//     //delete product
//     const deleteProductLocal = (productId) =>{
//          //sweat alert 
//          Swal.fire({
//             title:'Are you sure ?',
//             text:"You won't be able to revert this !",
//             icon:"warning",
//             showCancelButton:true,
//             confirmButtonColor:'#3085d6',
//             cancelButtonColor:'#d33',
//             confirmButtonText:'Yes, delete it !'
//         }).then((result)=>{
//             if(result.isConfirmed){
//                 //api call for delete 
              
//                 deleteProduct(product.productId).then(data=>{
//                     toast.success("Product Deleted")

//                     updateProductList(productId)
//                 })
//                 .catch(error=>{
//                     toast.error("Error in deleting product !!")
//                 })
//             }
//         })
//     }
   

//     return (
//         <tr className={getBackgroundForProduct()}>
//         <td className="px-3 small">{index+1}</td>
//         <td className="px-3 small">{product.title}</td>
//         <td className="px-3 small">{product.quantity}</td>
//         <td className="px-3 small">₹{product.price}</td>
//         <td className="px-3 small">₹{product.discountedPrice}</td>
//         <td className="px-3 small">{product.live ? 'Live': 'Not Live'}</td>
//         <td className="px-3 small">{product.stock ? 'In Stock': 'Out of Stock'}</td>
//         <td className="px-3 small">{product.category ? product.category.title : ''}</td>
//         <td className="px-3 small">{formatDate(product.addedDate)}</td>
//         <td className="px-3 small d-flex table-light">
            
//             {/* delete button */}
//             <Button variant="danger" size="sm" onClick={(event)=> deleteProductLocal(product.productId)}>
//                 <MdDelete/>    
//             </Button>
//             {/* view button */}
//             <Button className="ms-2" onClick={(event)=>openProductViewModal(event,product)} variant="warning" size="sm">
//                 <GrFormView/>    
//             </Button>
//             {/* update button */}
//             <Button onClick={(event=> openEditProductModel(event,product))}variant="dark" size="sm">
//                 <BsFillPencilFill/>    
//             </Button>
//         </td>
//     </tr>
//     )
// }

// export default SingleProductView;


import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Eye, Package, Star, Calendar, DollarSign, Tag, Archive } from 'lucide-react';
import { deleteProduct, getProduct, updateProduct } from '../../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '../../services/CategoryService';
import { getAllCollections } from '../../services/CollectionService';
import ShowHtml from '../ShowHtml';
import { Editor } from '@tinymce/tinymce-react';
import { getProductImageUrl } from '../../services/HelperService';



const AdminProductView = () => {

  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  


  useEffect(() => {
    if (!productId) return;
    getProduct(productId)
      .then((res) => setProduct(res))
      .catch((err) => console.error(err));
  }, [productId]);

    
  useEffect(() => {
    getAllCategories().then(res => setCategories(res.content || []));
    getAllCollections().then(res => setCollections(res.content || []));
  }, []);

  
  useEffect(() => {
    if (!product) return;
    setEditForm({
      title: product.title || '',
      description: product.description || '',
      price: product.price || 0,
      discountedPrice: product.discountedPrice || 0,
      rentalPrice: product.rentalPrice || 0,
      quantity: product.quantity,
      live: product.live || false,
      stock: product.stock || 0,
      categoryId: product.category.categoryId || '',
      collectionIds: product.collectionIds || product.collections?.map(c => c.collectionId) ||[]
    });
  }, [product, isEditing]);

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
  updateProduct(editForm,product.productId)
    .then((res) => {
      setProduct(res); // update with fresh backend response
      setIsEditing(false);
    })
    .catch((err) => console.error(err));
};

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      title: product.title || '',
      description: product.description || '',
      price: product.price || 0,
      discountedPrice: product.discountedPrice || 0,
      rentalPrice: product.rentalPrice || 0,
      quantity: product.quantity || 0,
      live: product.live || false,
      stock: product.stock || 0,
      categoryId: product.category.categoryId || '',
      collectionIds: product.collectionIds || []
    });
  };

 const handleDelete = () => {
  deleteProduct(product.productId)
    .then(() => {
      navigate("/admin/products"); // go back to product list
    })
    .catch((err) => console.error(err));
  };


  const handleFormChange = (field, value) => {
    if (field === 'collectionIds') {
      const currentCollections = editForm.collectionIds || [];
      if (currentCollections.includes(value)) {
        setEditForm({
          ...editForm,
          collectionIds: currentCollections.filter(id => id !== value)
        });
      } else {
        setEditForm({
          ...editForm,
          collectionIds: [...currentCollections, value]
        });
      }
    } else {
      setEditForm({
        ...editForm,
        [field]: value
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-warning' : 'text-muted'}`}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    ));
  };

    if (!product) {
    return <div className="text-center py-5">Loading product details...</div>;
  }

  return (
    <div className="container-fluid py-1">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <h2 className="text-primary mb-1">
            <Package className="me-2" size={28} />
            Product Details
          </h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
             <li className="breadcrumb-item">
                <span onClick={() => navigate("/admin/home")} style={{ cursor: "pointer", color: "#0d6efd" }}>
                  Admin
                </span>
              </li>
              <li className="breadcrumb-item">
                <span onClick={() => navigate("/admin/products")} style={{ cursor: "pointer", color: "#0d6efd" }}>
                  Products
                </span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="d-flex gap-2">
          {!isEditing ? (
            <>
              <button 
                className="btn btn-outline-primary"
                onClick={handleEdit}
              >
                <Edit size={16} className="me-1" />
                Edit Product
              </button>
              <button 
                className="btn btn-outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={16} className="me-1" />
                Delete
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-success"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="row">
        {/* Product Image and Basic Info */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Eye className="me-2" size={18} />
                Product Preview
              </h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="bg-light rounded p-4 mb-3" style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {product.productImageUrls && product.productImageUrls.length > 0 ? (
                    <img
                      src={product.productImageUrls[0]}
                      alt={product.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                      <Package size={40} className="text-muted opacity-50" />
                    </div>
                  )}
                </div>
                <small className="text-muted">{product.productImageName}</small>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">Status:</span>
                  <span className={`badge ${product.live ? 'bg-success' : 'bg-secondary'}`}>
                    {product.live ? 'Live' : 'Draft'}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">Rating:</span>
                  <div className="d-flex align-items-center">
                    {getRatingStars(product.rating)}
                    <span className="ms-2 small text-muted">({product.rating}/5)</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Added:</span>
                  <span className="small text-muted">
                    <Calendar size={14} className="me-1" />
                    {formatDate(product.addedDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Form */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <Edit className="me-2" size={18} />
                Product Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Product ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={product.productId}
                    disabled
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={isEditing ? editForm.title : product.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

             <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                {isEditing ? (
                  <Editor
                    apiKey="iebwdpt3e5byptk4bn8vjws6syivetn58drxpki7b17r9pk0"
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                    height: 200,
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
                    value={editForm.description}
                    onEditorChange={(content) => 
                      setEditForm({
                        ...editForm,
                        description: content
                      })
                    }
                        
                  />
                ) : (
                  <div className="text-muted">
                    <ShowHtml htmlText={product.description} />
                  </div>
                )}
              </div>


              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">
                    <DollarSign size={16} className="me-1" />
                    Price
                  </label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={isEditing ? editForm.price : product.price}
                    onChange={(e) => handleFormChange('price', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Discounted Price</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={isEditing ? editForm.discountedPrice : product.discountedPrice}
                    onChange={(e) => handleFormChange('discountedPrice', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Rental Price</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={isEditing ? editForm.rentalPrice : product.rentalPrice}
                    onChange={(e) => handleFormChange('rentalPrice', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">
                    <Archive size={16} className="me-1" />
                    Quantity
                  </label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={isEditing ? editForm.quantity : product.quantity}
                    onChange={(e) => handleFormChange('quantity', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Stock</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={isEditing ? editForm.stock : product.stock}
                    onChange={(e) => handleFormChange('stock', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">
                    <Tag size={16} className="me-1" />
                    Category
                  </label>
                  <select 
                    className="form-select"
                    value={isEditing ? editForm.categoryId : product.category.categoryId}
                    onChange={(e) => handleFormChange('categoryId', e.target.value)}
                    disabled={!isEditing}
                  >
                    {categories?.map(category => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="liveStatus"
                    checked={isEditing ? editForm.live : product.live}
                    onChange={(e) => handleFormChange('live', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <label className="form-check-label fw-bold" htmlFor="liveStatus">
                    {isEditing ? 'Product is Live' : product.live ? 'Product is Live' : 'Product is Not Live'}
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Collections</label>
                <div className="row">
                  {collections?.map(collection => (
                    <div key={collection.collectionId} className="col-md-6 mb-2">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`collection-${collection.collectionId}`}
                          checked={(isEditing ? editForm.collectionIds : product.collectionIds || []).includes(collection.collectionId)}
                          onChange={() => handleFormChange('collectionIds', collection.collectionId)}
                          disabled={!isEditing}
                        />
                        <label className="form-check-label" htmlFor={`collection-${collection.collectionId}`}>
                          {collection.title}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  <Trash2 size={20} className="me-2" />
                  Confirm Delete
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the product "<strong>{product.title}</strong>"?</p>
                <p className="text-muted small">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} className="me-1" />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductView;