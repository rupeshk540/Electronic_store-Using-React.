// import { useState } from "react";
// import { Button, Card, Container, Form, FormGroup, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { addCategory } from "../../services/CategoryService";

// const AddCategory = () => {

//     const [category, setCategory]=useState({
//         title:'',
//         description:'',
//         coverImage:''
//     })

//     const [loading, setLoading]=useState(false);

//     const handleFieldChange = (event, property) => {
//         event.preventDefault()
//         setCategory({
//             ...category,
//             [property]: event.target.value
//         })
//     }

//     const handleFormSubmit = (event) =>{
//         event.preventDefault()
//         if(category.title===undefined || category.title.trim()==='')
//         {
//             toast.error("Category title required !!")
//             return
//         }

//         if(category.description===undefined || category.description.trim()==='')
//         {
//             toast.error("Category Description required !!")
//              return
//         }

//         //call server api to add category
//         setLoading(true)
//         addCategory(category)
//             .then((data)=>{
//                 //success
//                 toast.success("Category Added !")
//                 setCategory({
//                     title:'',
//                     description:'',
//                     coverImage:''
//                 })
//             })
//             .catch(error=>{
//                 toast.error("Error in adding category !!")
//             })
//             .finally(()=>{
//                 setLoading(false)
//             })
//     }

//     const clearForm = (event) =>{
//         event.preventDefault()
//         setCategory({
//             title:'',
//             description:'',
//             coverImage:''
//         })

//     }

//     return(
//         <>
//             <Container fluid>
//                 <Card className="border border-0 shadow-sm">
//                     <Card.Body>
//                         <h5>Add Category</h5>

//                         <Form onSubmit={handleFormSubmit}>
//                             <FormGroup className="mt-3">
//                                 <Form.Label>Category Title</Form.Label>

//                                 <Form.Control type="text" placeholder="Enter here"
//                                      onChange={(event)=>handleFieldChange(event, 'title')}
//                                      value={category.title}
//                                 />
//                             </FormGroup>

//                             <FormGroup className="mt-3">
//                                 <Form.Label>Category Description</Form.Label>
//                                 <Form.Control rows={6} as={'textarea'} placeholder="Enter here"
//                                     onChange={(event)=>handleFieldChange(event, 'description')}
//                                     value={category.description}
//                                 />
//                             </FormGroup>

//                             <FormGroup className="mt-3">
//                                 <Form.Label>Category Cover Image Url</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter here"
//                                         onChange={(event)=>handleFieldChange(event, 'coverImage')}
//                                         value={category.coverImage}
//                                 />
//                             </FormGroup>

//                             <Container className="text-center mt-2">
//                                 <Button type="submit" variant="success" size="sm" disabled={loading}>
//                                     <Spinner variant={'border'} size={'sm'} className="me-3" hidden={!loading}/>
//                                     <span hidden={!loading}>Please wait..</span>
//                                     <span hidden={loading}>Add Category</span>
                                    
//                                 </Button>
//                                 <Button onClick={clearForm} className="ms-2" variant="danger" size="sm">Clear</Button>
//                             </Container>

//                         </Form>
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     )
// }

// export default AddCategory;

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { addCategory } from "../../services/CategoryService";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!category.title.trim()) newErrors.title = "Category title is required";
    if (!category.description.trim())
      newErrors.description = "Category description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    //calling API 
    addCategory(category)
      .then(() => {
        toast.success("Category Added!");
        handleReset();
      })
      .catch(() => toast.error("Error in adding category !!"));
  };

  const handleReset = () => {
    setCategory({ title: "", description: "", coverImage: "" });
    setErrors({});
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-9 offset-lg-1">
          <div className="card shadow-sm border mb-4">
            <div className="card-header bg-light d-flex align-items-center">
              <Plus className="me-2 text-primary" size={28} />
              <div>
                <h1 className="h4 mb-0">Add New Category</h1>
                <small className="text-muted">
                  Create a new category to organize products and collections.
                </small>
              </div>
            </div>
            <div className="card-body">
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Category Title *</label>
                <input
                  type="text"
                  name="title"
                  value={category.title}
                  onChange={handleInputChange}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter category title"
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Category Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  value={category.description}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="Enter category description"
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Cover Image - Optional */}
              <div className="mb-3">
                <label className="form-label">Cover Image URL (Optional)</label>
                <input
                  type="text"
                  name="coverImage"
                  value={category.coverImage}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter cover image URL"
                />
                <small className="text-muted">
                  Skip if you don’t have an image.
                </small>
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button
                  onClick={handleReset}
                  className="btn btn-outline-secondary"
                >
                  Reset
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
