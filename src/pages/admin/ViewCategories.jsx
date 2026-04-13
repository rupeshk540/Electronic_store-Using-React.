// import { useEffect, useState } from "react";
// import CategoryView from "../../components/CategoryView";
// import {deleteCategory, getAllCategories, updateCategory} from "../../services/CategoryService";
// import { toast } from "react-toastify";
// import {Swal} from "sweetalert2";
// import { Button, Container, FormGroup,Form, Modal, Spinner } from "react-bootstrap";
// import InfiniteScroll from "react-infinite-scroll-component";
// const ViewCategories = () => {

//     const [categories, setCategories] = useState({
//         content:[]
//     })

//     const [currentPage, setCurrentPage]=useState(0)

//     const [selectedCategory, setSelectedCategory] = useState(undefined)

//     const [loading, setLoading] = useState(false)

//     //view modal variables
//     const [show, setShow]= useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow= () => setShow(true);

//     //update variables
//     const [showUpdate, setShowUpdate]= useState(false);
//     const handleCloseUpdate = () => setShowUpdate(false);
//     const handleShowUpdate= () => setShowUpdate(true);

//     //to load intial page
//     useEffect(()=>{
//         setLoading(true)
//         getAllCategories(0,6)
//             .then(data=>{
//                 setCategories(data)
//             })
//             .catch(error=>{
//                 toast.error("Error in loading categories from server !!")
//             })
//             .finally(()=>{
//                 setLoading(false)
//             })
//     },[])

//     //to load current page
//     useEffect(()=>{
//         if(currentPage>0){
//             getAllCategories(currentPage,6)
//             .then(data=>{
//                 setCategories(
//                     {
//                         content:[...categories.content,...data.content],
//                         lastPage:data.lastPage,
//                         pageNumber:data.pageNumber,
//                         pageSize: data.pageSize,
//                         totalElements: data.totalElements,
//                         totalPages: data.totalPages
//                     }
//                 )
//             })
//             .catch(error=>{
//                 toast.error("Error in loading categories from server !!")
//             })
            
//         }
//     },[currentPage])

    

//     //delete category main funnction 
//     const deleteCategoryMain=(categoryId)=>{
      
//         //sweat alert 
//         Swal.fire({
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
//                 deleteCategory(categoryId)
//                 .then(data=>{
//                     Swal.fire(
//                         'Deleted',
//                         'Your file has been deleted',
//                         'success'
//                     )
//                     const newArray=categories.content.filter((c)=>{
//                         return c.categoryId!=categoryId
//                     })

//                     setCategories({
//                         ...categories,
//                         content:newArray
//                     })
//                 })
//                 .catch(error=>{
//                     toast.error("Error in deleting category")
//                 })
//             }
//         })
//     }
//     //handle view button of category
//     const handleView = (category) => {
//         setSelectedCategory(category)
//         handleShow()
//     }

//     //handle update button of category
//     const handleUpdate = (category) => {
//         setSelectedCategory(category)
//         handleShowUpdate()
//     }

//     //update the category to server
//     const updateCategoryClicked = (event) => {
//         event.preventDefault()

//         if(selectedCategory.title == undefined || selectedCategory.title.trim() === ''){
//             toast.error("Title required !!")
//             return
//         }
        
//         updateCategory(selectedCategory)
//             .then(data=>{
//                 toast.success("category Updated")

//              const newCategories =  categories.content.map(cat=>{
//                     if(cat.categoryId===selectedCategory.categoryId){
//                         cat.title=data.title
//                         cat.description=data.description
//                         cat.coverImage=data.coverImage
//                     }
//                     return cat;
//                 })
//                 setCategories({
//                     ...categories,
//                     content:newCategories
//                 })

//                 handleCloseUpdate()
//             })
//             .catch(error=>{
//                 toast.error("Error in updating category")
//             })
//     }

//     //load next page function
//     const loadNextPage = () =>{
//         setCurrentPage(currentPage+1)
//     }

//     //modal view : view 
//     const modalView = () => {
//         return(
//             <>
                

//                 <Modal  show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>{selectedCategory.title}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Container>
//                             <img style={{
//                                 width:'100%',
//                                 height:'250px',
//                                 objectFit:'contain'
//                             }} src={selectedCategory.coverImage}/>
//                         </Container>
//                         <div className="mt-3">{selectedCategory.description}</div>
//                         </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>Close</Button>
//                     </Modal.Footer> 
//                 </Modal>
//             </>
//         )
//     }

//     //update modal 
//     const  modalUpdate= () => {
//         return(
//             <>
                

//                 <Modal  show={showUpdate} onHide={handleCloseUpdate}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>{selectedCategory.title}</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>

//                         <Form>
//                             <FormGroup>
//                                 <Form.Label>Category Title</Form.Label>
//                                 <Form.Control 
//                                     type="text"
//                                     placeholder="Enter here"
//                                     value={selectedCategory.title}
//                                     onChange={(event)=>setSelectedCategory({
//                                         ...selectedCategory,
//                                         title:event.target.value
//                                     })}
//                                 />
//                             </FormGroup>
//                             <FormGroup className="mt-3">
//                                 <Form.Label>Category Description</Form.Label>
//                                 <FormGroup.Control as={'textarea'} 
//                                     value={selectedCategory.description}
//                                     rows={6}
//                                     onChange={(event)=>setSelectedCategory({
//                                         ...selectedCategory,
//                                         description:event.target.value
//                                     })}
//                                 />
//                             </FormGroup>

//                             <FormGroup>
//                                 <Container className="py-3">
//                                     <img src={selectedCategory.coverImage}
//                                         className="img-fluid"
//                                     />
//                                 </Container>
//                                 <Form.Label>Category Image Url</Form.Label>
//                                 <Form.Control 
//                                     type="text"
//                                     placeholder="Enter here"
//                                     value={selectedCategory.coverImage}
//                                 />
//                             </FormGroup>

//                         </Form>

//                     </Modal.Body>
                        
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
//                         <Button variant="success" onClick={updateCategoryClicked}>Save Changes</Button>
//                     </Modal.Footer> 
//                 </Modal>
//             </>
//         )
//     }



//     return (
//         <div>
//             {/* Loader */}
//             <Container className="text-center p-3" hidden={!loading}>
//                 <Spinner/>
//                 <div>
//                     <h3>Loading...</h3>
//                 </div>
//             </Container>

//             {
//                 (
//                     categories.content.length > 0 ? (
//                         <>
                        
//                         <InfiniteScroll 
//                             dataLength={categories.content.length}
//                             next={loadNextPage}
//                             hasMore={!categories.lastPage}
//                             loader={<h2 className="p-2 text-center">Loading...</h2>}
//                             endMessage={
//                                 <p style={{ textAlign: 'center' }}>
//                                   <b>Yay! You have seen it all</b>
//                                 </p>
//                             }
//                         >
//                         {
//                             categories.content.map((category)=>{
//                                 return (
//                                     <CategoryView
//                                         viewCat={handleView}
//                                         updateCat={handleUpdate}
//                                         deleteCat={deleteCategoryMain}
//                                         category={category}
//                                         key={category.categoryId}
//                                     />
//                                 )
//                             })
//                        }
//                         </InfiniteScroll>
//                         </>
//                      ): <h5 className="text-center">NO Categories in database</h5>
//                 )
//             }

//             {
//                selectedCategory ? modalView(): ''
//             }
//         </div>
//     )
// }

// export default ViewCategories;


import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, Image } from 'lucide-react';
import { getAllCategories, updateCategory, deleteCategory, addCategory } from '../../services/CategoryService';
import { toast } from 'react-toastify';

const CategoriesView = () => {
  const [categories, setCategories] = useState({ content: [], pageNumber: 0, pageSize: 10, totalElements: 0, lastPage: false });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editForm, setEditForm] = useState({ title: '', description: '', coverImage: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Load categories on mount
  useEffect(() => {
    loadCategories(0);
  }, []);

  const loadCategories = (page) => {
    setLoading(true);
    getAllCategories(page, 10)
      .then(data => {
        if (page === 0) {
          setCategories(data);
        } else {
          setCategories(prev => ({
            ...data,
            content: [...prev.content, ...data.content]
          }));
        }
      })
      .catch(error => toast.error("Error loading categories"))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditForm({
      title: category.title,
      description: category.description,
      image: category.coverImage || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    if (!editForm.title.trim() || !editForm.description.trim()) {
      toast.error("Name and description required!");
      return;
    }

    if (!selectedCategory) {
      // Add new category
      addCategory(editForm)
        .then(data => {
          toast.success("Category added successfully");
          setCategories(prev => ({ ...prev, content: [data, ...prev.content] }));
          setShowEditModal(false);
          setEditForm({ title: '', description: '', image: '' });
        })
        .catch(err => toast.error("Error adding category"));
    } else {
      // Update existing category
      updateCategory({ ...editForm, categoryId: selectedCategory.categoryId })
        .then(data => {
          toast.success("Category updated successfully");
          setCategories(prev => ({
            ...prev,
            content: prev.content.map(cat => cat.categoryId === selectedCategory.categoryId ? data : cat)
          }));
          setShowEditModal(false);
          setSelectedCategory(null);
        })
        .catch(err => toast.error("Error updating category"));
    }
  };

  const handleConfirmDelete = () => {
    deleteCategory(selectedCategory.categoryId)
      .then(() => {
        toast.success("Category deleted successfully");
        setCategories(prev => ({
          ...prev,
          content: prev.content.filter(cat => cat.categoryId !== selectedCategory.categoryId)
        }));
        setShowDeleteModal(false);
        setSelectedCategory(null);
      })
      .catch(err => toast.error("Error deleting category"));
  };

  const loadNextPage = () => {
    if (!categories.lastPage) {
      const nextPage = currentPage + 1;
      loadCategories(nextPage);
      setCurrentPage(nextPage);
    }
  };

  // Filter categories by search term
  const filteredCategories = categories.content.filter(category =>
  (category.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (category.description || '').toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h2>Categories Management</h2>
            <p className="text-muted">Manage all product categories</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setSelectedCategory(null); setEditForm({ title: '', description: '', image: '' }); setShowEditModal(true); }}>
            <Plus size={18} className="me-2" />
            Add New Category
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><Search size={18} /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="badge bg-secondary fs-6">
            Total: {filteredCategories.length} categories
          </span>
        </div>
      </div>

      {/* Categories Table */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary"></div>
                  <p>Loading categories...</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="text-center py-4">No categories found</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 ps-4">Category</th>
                        <th className="border-0">Description</th>
                        <th className="border-0">Added Date</th>  
                        <th className="border-0 pe-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map(category => (
                        <tr key={category.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                {category.coverImage ? (
                                  <img src={category.coverImage} alt={category.name} className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                ) : (
                                  <div className="rounded bg-light d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                    <Image size={24} className="text-muted" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-1 fw-semibold">{category.title}</h6>
                                <small className="text-muted">ID: {category.categoryId}</small>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">{category.description}</td>
                          <td className="align-middle">
                            {category.addedDate ? new Date(category.addedDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                            }) : "-"}
                            </td>
                          <td className="pe-4 text-center align-middle">
                            <div className="btn-group">
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(category)}>
                                <Edit size={16} />
                              </button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {categories.totalPages > 1 && (
                    <div className="text-center my-3">
                      <button className="btn btn-outline-primary btn-sm" onClick={loadNextPage} disabled={categories.lastPage}>
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCategory ? 'Edit Category' : 'Add Category'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name *</label>
                      <input type="text" className="form-control" name="title" value={editForm.title} onChange={handleInputChange} placeholder="Enter category name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Description *</label>
                      <textarea className="form-control" name="description" value={editForm.description} onChange={handleInputChange} rows={4} placeholder="Enter category description" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Image URL (Optional)</label>
                      <input type="url" className="form-control" name="coverImage" value={editForm.coverImage} onChange={handleInputChange} placeholder="Enter image URL" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Preview</label>
                    <div className="border rounded p-3 text-center">
                      {editForm.coverImage ? (
                        <img src={editForm.coverImage} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: '150px' }} />
                      ) : (
                        <div className="bg-light rounded d-flex align-items-center justify-content-center mb-2" style={{ height: '150px' }}>
                          <Image size={48} className="text-muted" />
                        </div>
                      )}
                      <small className="text-muted">{editForm.coverImage ? 'Image preview' : 'No image'}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                  {selectedCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Category</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                {selectedCategory?.image && <img src={selectedCategory.image} alt={selectedCategory.name} className="rounded mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />}
                <p>Are you sure you want to delete <strong>{selectedCategory?.name}</strong>?</p>
                <div className="alert alert-warning"><small>This action cannot be undone.</small></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete Category</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoriesView;
