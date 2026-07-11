
import { useState, useEffect, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { getAllCategories } from "../../services/CategoryService";
import { getAllCollections } from "../../services/CollectionService"; 
import {createProductInCategoryAndCollection} from "../../services/ProductService";
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    discountedPrice: '',
    rentalPrice: '',
    rentalUnit: 'perDay',
    stock: '',
    rating: 5,
    features: [],
    specifications: {},
    productImageUrls: [],
    categoryId: '',
    collectionIds: [],  // multiple collections instead of single
    live: true
  });


  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

 useEffect(() => {
  getAllCategories()
    .then(res => {
      console.log('Categories API response:', res);
      setCategories(res.content || [])
    })
    .catch(err => console.error(err));

  getAllCollections()
    .then(res => {
      console.log('Collections API response:', res);
      setCollections(res.content || [])
    })
    .catch(err => console.error(err));
}, []);




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

  // ---------------- FEATURES ----------------

const addFeature = () => {
  setProductData(prev => ({
    ...prev,
    features: [...prev.features, ""]
  }));
};

const updateFeature = (index, value) => {
  const updated = [...productData.features];
  updated[index] = value;

  setProductData(prev => ({
    ...prev,
    features: updated
  }));
};

const removeFeature = (index) => {
  setProductData(prev => ({
    ...prev,
    features: prev.features.filter((_, i) => i !== index)
  }));
};

// ---------------- SPECIFICATIONS ----------------

const addSpecification = () => {
  setProductData(prev => ({
    ...prev,
    specifications: {
      ...prev.specifications,
      "": ""
    }
  }));
};

const updateSpecificationKey = (oldKey, newKey) => {
  const specs = { ...productData.specifications };

  const value = specs[oldKey];

  delete specs[oldKey];

  specs[newKey] = value;

  setProductData(prev => ({
    ...prev,
    specifications: specs
  }));
};

const updateSpecificationValue = (key, value) => {
  setProductData(prev => ({
    ...prev,
    specifications: {
      ...prev.specifications,
      [key]: value
    }
  }));
};

const removeSpecification = (key) => {
  const specs = { ...productData.specifications };

  delete specs[key];

  setProductData(prev => ({
    ...prev,
    specifications: specs
  }));
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

  
const handleSubmit = async() => {
  if (!validateForm()) return;

 const formData = new FormData();

const productJson = JSON.stringify({
  ...productData, 
  collectionIds: Array.isArray(productData.collectionIds) ? productData.collectionIds : [],
  addedDate: new Date().toISOString(),
  price: Number(productData.price),
  discountedPrice: productData.discountedPrice ? Number(productData.discountedPrice) : 0,
  rentalPrice: productData.rentalPrice ? Number(productData.rentalPrice) : 0,
  stock: Number(productData.stock),
  rating: Number(productData.rating)
});
formData.append("product", new Blob([productJson], { type: "application/json" }));


// Append images
selectedImages.forEach(img => formData.append("images", img.file));
  try {
      // Create product
      await createProductInCategoryAndCollection(formData, productData.categoryId);
      toast.success("Product created successfully with images!");
      handleReset(); // clear form
  } catch (err) {
    console.error(err);
    toast.error("Failed to save product");
  }

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
      categoryId: '',
      collectionIds: [],
      live: true
    });
    setSelectedImages([]);
    setErrors({});
  };

  useEffect(() => {
    return () => selectedImages.forEach(img => img.preview && URL.revokeObjectURL(img.preview));
  }, [selectedImages]);

  const getCategoryName = (id) => categories.find(cat => cat.categoryId === id)?.title|| 'Not selected';
  const getCollectionName = (id) => collections.find(col => col.collectionId === id)?.title || 'Not selected';

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
                              description: editorRef.current.getContent(),
      
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
                            {categories.map(cat => <option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)}
                          </select>
                          {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Collections (Optional)</label>
                          <div className="d-flex flex-wrap gap-2">
                            {collections.map((col) => {
                              const isSelected = productData.collectionIds.includes(col.collectionId);
                              return (
                                <button
                                  key={col.collectionId}
                                  type="button"
                                  onClick={() => {
                                    setProductData(prev => {
                                      const updated = isSelected
                                        ? prev.collectionIds.filter(id => id !== col.collectionId) // deselect
                                        : [...prev.collectionIds, col.collectionId]; // select
                                      return { ...prev, collectionIds: updated };
                                    });
                                  }}
                                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline-secondary'}`}
                                >
                                  {col.title}
                                </button>
                              );
                            })}
                          </div>
                          <small className="text-muted d-block mt-1">Click to select/deselect collections</small>
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

                  {/* Feature */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center bg-light">
                        <h5 className="mb-0">Product Features</h5>

                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={addFeature}
                        >
                            + Add Feature
                        </button>
                    </div>

                    <div className="card-body">

                        {productData.features.map((feature,index)=>(
                            <div
                                className="input-group mb-2"
                                key={index}
                            >

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter feature..."
                                    value={feature}
                                    onChange={(e)=>updateFeature(index,e.target.value)}
                                />

                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={()=>removeFeature(index)}
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                    </div>
                </div>

                {/* specification */}
                <div className="card mb-4">

                  <div className="card-header d-flex justify-content-between align-items-center bg-light">

                      <h5 className="mb-0">Specifications</h5>

                      <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          onClick={addSpecification}
                      >
                          + Add Specification
                      </button>

                  </div>

                  <div className="card-body">

                      {Object.entries(productData.specifications).map(([key,value],index)=>(
                          <div
                              className="row mb-2"
                              key={index}
                          >

                              <div className="col-md-5">

                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Specification"
                                      value={key}
                                      onChange={(e)=>
                                          updateSpecificationKey(key,e.target.value)
                                      }
                                  />

                              </div>

                              <div className="col-md-5">

                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Value"
                                      value={value}
                                      onChange={(e)=>
                                          updateSpecificationValue(key,e.target.value)
                                      }
                                  />

                              </div>

                              <div className="col-md-2">

                                  <button
                                      className="btn btn-danger w-100"
                                      onClick={()=>removeSpecification(key)}
                                  >
                                      Remove
                                  </button>

                              </div>

                          </div>
                      ))}

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
                      <p>
                        <strong>Collections:</strong>{' '}
                        {productData.collectionIds && productData.collectionIds.length > 0
                          ? productData.collectionIds
                              .map(id => getCollectionName(id))
                              .join(', ')
                          : 'None selected'}
                      </p>

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


