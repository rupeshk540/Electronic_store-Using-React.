
import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Eye, Package, Star, Calendar, DollarSign, Tag, Archive, Plus, Search, Filter, Grid, List } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import {deleteProduct, getAllProducts, patchProduct, updateProduct } from '../../services/ProductService';
import { getAllCategories } from '../../services/CategoryService';
import ShowHtml from "../../components/ShowHtml";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewProductsPage = () => {
 const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([{ categoryId: 'all', title: 'All Categories' }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [categoryChangeId, setCategoryChangeId] = useState('');
  const editorRef = useRef();
  const navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
    lastPage: false
});

  // Load categories and products on page load
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts(pageInfo.pageNumber);
  }, [pageInfo.pageNumber]);

  const loadProducts = async (page = 0) => {
    try {

      const data = await getAllProducts(
          page,
          pageInfo.pageSize,
          "addedDate",
          "desc"
      );

      setProducts(data.content);
      setFilteredProducts(data.content);

      setPageInfo({
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          lastPage: data.lastPage
      });

    } catch (error) {
        console.log(error);
    }
  };

  const changePage = (page) => {

    if (page < 0) return;

    if (page >= pageInfo.totalPages) return;

    setPageInfo(prev => ({
        ...prev,
        pageNumber: page
    }));

  };
  const loadCategories = async () => {
    try {
      const data = await getAllCategories(0, 50); // load all categories
      if(data.content){
        setCategories([{ categoryId: 'all', title: 'All Categories' }, ...data.content]);
      } else {
        setCategories([{ categoryId: 'all', title: 'All Categories' }, ...data]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Filter products based on search & category
  useEffect(() => {
    let filtered = products;
    if(searchTerm){
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if(selectedCategory !== 'all'){
      filtered = filtered.filter(product => product.category.categoryId === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Helper functions
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  const getRatingStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-warning' : 'text-muted'}`} fill={i < rating ? 'currentColor' : 'none'} style={{ width:'14px', height:'14px' }} />
  ));
  const getStockStatus = (stock) => stock === 0 ? { class: 'bg-danger', text: 'Out of Stock' } : stock < 20 ? { class:'bg-warning', text:'Low Stock' } : { class:'bg-success', text:'In Stock' };


//Delete Product
const handleDelete = async (productId) => {
  try {
    await deleteProduct(productId); // API call to delete from backend
    toast.success("Product deleted successfully !")
    await loadProducts(); //refresh 
    setShowDeleteModal(null);
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product. Please try again.");
  }
};

//Navigate to singalview product
 const goToProductPage = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const goToAddProductPage = () => {
    navigate("/admin/add-product");
  };
  
  //handle product live
  const handleToggleLive = async (product) => {
    try {
      const updatedProduct = {live: !product.live };

      // update backend
      await patchProduct(updatedProduct, product.productId);

      // update frontend state
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === product.productId ? {...p, live: updatedProduct.live}:p
        )
      );

      toast.success(`Product is now ${updatedProduct.live ? "Live" : "Draft"}`);
    } catch (err) {
      toast.error("Failed to update product status");
    }
  };

  const handleUpdateStock = async (product, newStock) => {
  try {
    const updatedProduct = { ...product, stock: newStock };

    // call your existing updateProduct API
    await patchProduct(updatedProduct, product.productId);

    // update state locally
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === product.productId ? updatedProduct : p
      )
    );

    toast.success("Stock updated!");
  } catch (error) {
    console.error("Error updating stock:", error);
    toast.error("Failed to update stock");
  }
};





  // Table row component
  const ProductTableRow = ({ product }) => {
    const stockStatus = getStockStatus(product.stock);

    return (
      <tr onClick={()=> goToProductPage(product.productId)} style={{cursor:"pointer"}}>
        <td>
          <div className="d-flex align-items-center">
           <div className="me-3" style={{ minWidth:'50px', minHeight:'50px' }}>
            {product.productImageUrls && product.productImageUrls.length > 0 ? (
              <img 
                src={product.productImageUrls[0]}
                alt={product.title} 
                className="img-fluid rounded" 
                style={{ width:'50px', height:'50px', objectFit:'cover' }} 
              />
            ) : (
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width:'50px', height:'50px' }}>
                <Package size={20} className="text-muted" />
              </div>
            )}
          </div>
          <div>
            <div className="fw-bold">{product.title}</div>
          </div>

          </div>
        </td>
        
        <td><span className="badge bg-secondary">{product.category.title}</span></td>
        <td>
          <div className="fw-bold">${product.price}</div>
          {product.discountedPrice < product.price && <small className="text-success">${product.discountedPrice}</small>}
        </td>
        <td><div className="d-flex align-items-center">{getRatingStars(product.rating)}<span className="ms-1 small">({product.rating})</span></div></td>
        <td><small className="text-muted">{formatDate(product.addedDate)}</small></td>
          <td>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                if (product.stock > 0) {
                  handleUpdateStock(product, product.stock - 1);
                }
              }}
            >
              -
            </button>

            <span>{product.stock}</span>

            <button
              className="btn btn-sm btn-outline-success"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateStock(product, product.stock + 1);
              }}
            >
              +
            </button>
          </div>
        </td>
         <td>
          <div
            className="form-check form-switch"
            onClick={(e) => e.stopPropagation()} // prevent row click
            style={{ cursor: "pointer" }}  
          >
            <input
              className="form-check-input"
              type="checkbox"
              checked={product.live}
              onChange={() => handleToggleLive(product)}
              style={{
                transform: "scale(0.9)",
                cursor: "pointer"           
              }}
            />
            <label className="form-check-label">
              {product.live ? "Live" : "Draft"}
            </label>
          </div>
        </td>
        <td>
          <div className="d-flex gap-1">
            <button className="btn btn-outline-danger btn-sm" 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(product)} }
              title="Delete Product"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
    );
  };

const ProductGridCard = ({ product }) => {
  const stockStatus = getStockStatus(product.stock);
  
  // Stock status styling
  const getStockBadge = () => {
    if (product.stock === 0) return "bg-danger";
    if (product.stock <= 10) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
      <div
        className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
        style={{ 
          cursor: "pointer", 
          transition: "all 0.2s ease",
          borderRadius: "10px"
        }}
        onClick={() => goToProductPage(product.productId)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        }}
      >
        {/* Live Status Indicator */}
        <div 
          className={`position-absolute top-0 start-0 w-100 ${product.live ? 'bg-success' : 'bg-secondary'}`}
          style={{ height: "3px", zIndex: 10 }}
        />

        {/* Image Container */}
        <div className="position-relative" style={{ height: "160px", overflow: "hidden" }}>
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

          {/* Top Actions */}
          <div className="position-absolute top-0 end-0 p-2">
            <button
              className="btn btn-sm btn-danger border-0 rounded-circle shadow-sm opacity-90 hover-opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(product);
              }}
              style={{ 
                width: '32px', 
                height: '32px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Trash2 size={14} className="text-white" />
            </button>
          </div>

          {/* Badges */}
          <div className="position-absolute bottom-0 start-0 end-0 p-2 d-flex justify-content-between">
            {product.discountedPrice < product.price && (
              <span className="badge bg-danger text-white" style={{ fontSize: '0.7rem' }}>
                -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
              </span>
            )}
            <span className={`badge ${getStockBadge()} text-white ms-auto`} style={{ fontSize: '0.7rem' }}>
              {product.stock} units
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="card-body p-3">
          {/* Title & Category */}
          <div className="mb-2">
            <h6 
              className="card-title mb-1 fw-semibold"
              style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.3',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {product.title}
            </h6>
            <span className="badge bg-light text-muted border" style={{ fontSize: '0.65rem' }}>
              {product.category.title}
            </span>
          </div>

          {/* Price & Rating */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="fw-bold text-primary" style={{ fontSize: '1rem' }}>
                ${product.discountedPrice < product.price ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
              </div>
              {product.discountedPrice < product.price && (
                <small className="text-muted text-decoration-line-through" style={{ fontSize: '0.75rem' }}>
                  ${product.price.toFixed(2)}
                </small>
              )}
            </div>
            <div className="text-end">
              <div className="d-flex align-items-center justify-content-end mb-1">
                {getRatingStars(product.rating)}
                <small className="text-muted ms-1">({product.rating})</small>
              </div>
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                {formatDate(product.addedDate)}
              </small>
            </div>
          </div>

          {/* Actions Row */}
          <div className="d-flex align-items-center justify-content-between">
            {/* Live Toggle */}
            <div className="d-flex align-items-center">
              <span className={`badge ${product.live ? 'bg-success' : 'bg-secondary'} me-2`} style={{ fontSize: '0.65rem' }}>
                {product.live ? '● Live' : '○ Draft'}
              </span>
              <div 
                className="form-check form-switch m-0"
                onClick={(e) => e.stopPropagation()}
                style={{ cursor: "pointer" }} 
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={product.live}
                  onChange={() => handleToggleLive(product)}
                  style={{ transform: 'scale(0.9)', cursor: "pointer"  }}
                />
              </div>
            </div>

            {/* Stock Controls */}
            <div className="d-flex align-items-center bg-light rounded-pill px-1">
              <button
                className="btn btn-sm border-0 rounded-circle"
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.stock > 0) {
                    handleUpdateStock(product, product.stock - 1);
                  }
                }}
                disabled={product.stock === 0}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  fontSize: '12px',
                  backgroundColor: 'transparent'
                }}
              >
                −
              </button>
              <span className="px-2 fw-medium" style={{ fontSize: '0.8rem', minWidth: '24px', textAlign: 'center' }}>
                {product.stock}
              </span>
              <button
                className="btn btn-sm border-0 rounded-circle"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateStock(product, product.stock + 1);
                }}
                style={{ 
                  width: '24px', 
                  height: '24px',
                  fontSize: '12px',
                  backgroundColor: 'transparent'
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="container-fluid py-1">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <h2 className="text-primary mb-1"><Package className="me-2" size={28} />Products Management</h2>
          <nav aria-label="breadcrumb"><ol className="breadcrumb">
            <li className="breadcrumb-item"><a onClick={() =>navigate("/admin/home")}style={{ cursor: "pointer"}} className="text-decoration-none">Admin</a></li>
            <li className="breadcrumb-item active" aria-current="page">View Products</li></ol>
          </nav>
        </div>
        <button className="btn btn-primary" onClick={goToAddProductPage}><Plus size={16} className="me-1" />Add New Product</button>
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text"><Search size={16} /></span>
                <input type="text" className="form-control" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <select className="form-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(category => (<option key={category.categoryId} value={category.categoryId}>{category.title}</option>))}
              </select>
            </div>
            <div className="col-md-3 mb-3 mb-md-0"><div className="text-muted">Showing {filteredProducts.length} of {products.length} products</div></div>
            <div className="col-md-2">
              <div className="btn-group w-100" role="group">
                <button type="button" className={`btn ${viewMode==='table'?'btn-primary':'btn-outline-primary'}`} onClick={()=>setViewMode('table')}><List size={16} /></button>
                <button type="button" className={`btn ${viewMode==='grid'?'btn-primary':'btn-outline-primary'}`} onClick={()=>setViewMode('grid')}><Grid size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      {viewMode==='table' ? (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr><th>Product</th><th>Category</th><th>Price</th><th>Rating</th><th>Added</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>{filteredProducts.map(product => <ProductTableRow key={product.productId} product={product} />)}</tbody>
              </table>
              {filteredProducts.length===0 && <div className="text-center py-4"><Package size={48} className="text-muted mb-3" /><h5 className="text-muted">No products found</h5><p className="text-muted">Try adjusting your search or filter criteria</p></div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="row">{filteredProducts.map(product => <ProductGridCard key={product.productId} product={product} />)}
          {filteredProducts.length===0 && <div className="col-12"><div className="card"><div className="card-body text-center py-5"><Package size={48} className="text-muted mb-3" /><h5 className="text-muted">No products found</h5><p className="text-muted">Try adjusting your search or filter criteria</p></div></div></div>}
        </div>
      )}

    <div className="d-flex justify-content-between align-items-center mt-4">

    <button
        className="btn btn-outline-primary"
        disabled={pageInfo.pageNumber === 0}
        onClick={() => changePage(pageInfo.pageNumber - 1)}
    >
        Previous
    </button>

    <span>
        Page {pageInfo.pageNumber + 1} of {pageInfo.totalPages}
    </span>

    <button
        className="btn btn-outline-primary"
        disabled={pageInfo.lastPage}
        onClick={() => changePage(pageInfo.pageNumber + 1)}
    >
        Next
    </button>

  </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger"><Trash2 size={20} className="me-2"/>Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={()=>setShowDeleteModal(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete "<strong>{showDeleteModal.title}</strong>"?</p>
                <div className="bg-light p-3 rounded mb-3">
                  <small className="text-muted"><strong>Product ID:</strong> {showDeleteModal.productId}<br/><strong>Category:</strong> {showDeleteModal.category.title}<br/><strong>Current Stock:</strong> {showDeleteModal.stock} units</small>
                </div>
                <p className="text-danger small"><strong>Warning:</strong> This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>setShowDeleteModal(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={()=>handleDelete(showDeleteModal.productId)}><Trash2 size={16} className="me-1"/>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProductsPage;
