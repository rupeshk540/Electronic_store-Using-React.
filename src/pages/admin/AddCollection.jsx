import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { addCategory } from "../../services/CategoryService";
import { addCollection } from "../../services/CollectionService";
import { toast } from "react-toastify";

const AddCollection = () => {
  const [collectionData, setCollectionData] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  // const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollectionData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!collectionData.title.trim())
      newErrors.title = "Collection title is required";
    if (!collectionData.description.trim())
      newErrors.description = "Collection description is required";
    // if (!collectionData.coverImage)
    //   newErrors.coverImage = "Cover image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = () => {
    if (!validateForm()) return;

    const finalCollectionData = {
      title: collectionData.title,
      description: collectionData.description,
      coverImageName: collectionData.coverImage,
      // addedDate: new Date().toISOString(),
    };
    
    //call server api to add category
      // setLoading(true)
      addCollection(finalCollectionData)
          .then((data)=>{
              //success
              toast.success("Collection Added !")
              handleReset();
          })
          .catch(error=>{
              toast.error("Error in adding category !!")
          })
          // .finally(()=>{
          //     setLoading(false)
          // })
  };

   const handleReset = () =>{
        setCollectionData({
            title:'',
            description:'',
            coverImage:''
        });
        setErrors({});
    }


  return (
    <div className="container-fluid" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="row">
        <div className="col-lg-9 offset-lg-1">
          <div className="card shadow-sm border mb-4">
            <div className="card-header bg-light d-flex align-items-center">
              <Plus className="me-2 text-primary" size={28} />
              <div>
                <h1 className="h4 mb-0">Add New Collection</h1>
                <small className="text-muted">
                  Create a new collection like Hot Deals, Trending, Best Seller etc.
                </small>
              </div>
            </div>
            <div className="card-body">
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Collection Title *</label>
                <input
                  type="text"
                  name="title"
                  value={collectionData.title}
                  onChange={handleInputChange}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter collection title"
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Collection Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  value={collectionData.description}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="Enter description..."
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              {/* Cover Image */}
              <div className="mb-3">
                <label className="form-label">Cover Imagename URL*</label>
                <input
                  type="text"
                  name="coverImage"
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.coverImage ? "is-invalid" : ""
                  }`}
                />
                {errors.coverImage && (
                  <div className="invalid-feedback">{errors.coverImage}</div>
                )}
              </div>

              {/* Preview
              {previewImage && (
                <div className="mb-3 position-relative" style={{ maxWidth: "250px" }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-fluid rounded border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              )} */}

              {/* Actions */}
              <div className="d-flex justify-content-end mt-4 gap-2">
                <button
                  onClick={handleReset}
                  className="btn btn-outline-secondary"
                >
                  Reset
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Add Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
