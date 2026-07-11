
import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Eye, Package, Star, Calendar, DollarSign, Tag, Archive } from 'lucide-react';
import { deleteProduct, getProduct, updateProduct } from '../../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '../../services/CategoryService';
import { getAllCollections } from '../../services/CollectionService';
import { Editor } from '@tinymce/tinymce-react';
import { getProductImageUrl } from '../../services/HelperService';
import ShowHtml from '../../components/ShowHtml';
import { toast } from 'react-toastify';



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
      title: product.title ?? "",
      description: product.description ?? "",
      price: product.price ?? 0,
      discountedPrice: product.discountedPrice ?? 0,
      rentalPrice: product.rentalPrice ?? 0,
      rentalUnit: product.rentalUnit ?? "perDay",

      stock: product.stock ?? 0,
      live: product.live ?? true,

      categoryId: product.category?.categoryId ?? "",

      collectionIds:
          product.collections?.map(c => c.collectionId) ?? [],

      features: product.features ?? [],

      specifications: product.specifications ?? {}
    });
  }, [product, isEditing]);

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedProduct = await updateProduct(
        editForm,
        [],
        product.productId
      );

      setProduct(updatedProduct);
      setIsEditing(false);

      toast.success("Product updated successfully!");

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ||"Failed to update product.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
        title: product.title,
        description: product.description,
        price: product.price,
        discountedPrice: product.discountedPrice,
        rentalPrice: product.rentalPrice,
        rentalUnit: product.rentalUnit,

        stock: product.stock,
        live: product.live,

        categoryId: product.category?.categoryId,

        collectionIds:
            product.collections?.map(c => c.collectionId) || [],

        features: product.features || [],

        specifications: product.specifications || {}
    });

  }

 const handleDelete = async () => {
    try {

      await deleteProduct(product.productId);

      toast.success("Product deleted successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ||"Failed to delete product.");
    }
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

 const getRatingStars = (rating = 0) => {
    const rounded = Math.round(rating);

    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={`h-4 w-4 ${
                i < rounded ? "text-warning" : "text-muted"
            }`}
            fill={i < rounded ? "currentColor" : "none"}
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
                    {getRatingStars(Math.round(product.averageRating || 0))}
                    <span className="ms-2 small text-muted">({product.averageRating?.toFixed(1) || 0}/5)</span>
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
                  <div className="mt-4">
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
                <label className="form-label fw-bold">Collections</label>
                <div className="row">
                  {collections?.map(collection => (
                    <div key={collection.collectionId} className="col-md-6 mb-2">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`collection-${collection.collectionId}`}
                          checked={(isEditing ? editForm.collectionIds
                                      : product.collections?.map(c => c.collectionId) || [])
                                      .includes(collection.collectionId)}
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
              <hr />
              <h5>Features</h5>
                {(isEditing ? editForm.features : product.features || []).map((feature, index) => (

                  <div className="d-flex mb-2" key={index}>
                    <input
                      className="form-control"
                      value={feature}
                      disabled={!isEditing}
                      onChange={(e) => {

                        const updated = [...editForm.features];
                        updated[index] = e.target.value;
                        setEditForm({
                          ...editForm,
                          features: updated
                        });

                      }}
                      />

                      {isEditing && (
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              const updated = editForm.features.filter((_, i) => i !== index );
                              setEditForm({...editForm,features: updated});

                            }}
                          >
                            Remove
                          </button>
                      )}

                    </div>

                ))}
                {isEditing && (

                <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                        setEditForm({
                            ...editForm,
                            features: [...editForm.features, ""]
                        })
                    }
                >
                    + Add Feature
                </button>

                )}

                <hr />

                <h5>Specifications</h5>

                {Object.entries(
                    isEditing
                        ? editForm.specifications
                        : product.specifications || {}
                ).map(([key, value], index) => (

                <div
                    key={index}
                    className="row mb-2"
                >

                <div className="col-md-5">

                <input
                className="form-control"
                value={key}
                disabled={!isEditing}
                onChange={(e)=>{

                const specs={...editForm.specifications};

                delete specs[key];

                specs[e.target.value]=value;

                setEditForm({
                ...editForm,
                specifications:specs
                });

                }}
                />

                </div>

                <div className="col-md-5">

                <input
                className="form-control"
                value={value}
                disabled={!isEditing}
                onChange={(e)=>{

                const specs={...editForm.specifications};

                specs[key]=e.target.value;

                setEditForm({
                ...editForm,
                specifications:specs
                });

                }}
                />

                </div>

                {isEditing && (

                <div className="col-md-2">

                <button
                className="btn btn-danger"
                onClick={()=>{

                const specs={...editForm.specifications};

                delete specs[key];

                setEditForm({
                ...editForm,
                specifications:specs
                });

                }}
                >
                Delete
                </button>

                </div>

                )}

                </div>

                ))}
                {isEditing && (

                <button
                className="btn btn-outline-success mt-2"
                onClick={()=>{

                const specs={
                ...editForm.specifications
                };

                specs[""]="";

                setEditForm({
                ...editForm,
                specifications:specs
                });

                }}
                >
                + Add Specification
                </button>

                )}
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