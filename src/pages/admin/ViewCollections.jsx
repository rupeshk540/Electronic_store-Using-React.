import { useState, useEffect, useCallback } from 'react';
import { getAllCollections } from '../../services/CollectionService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewCollections = () => {
  const [collections, setCollections] = useState({
    content: [],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: false
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCollections =useCallback ((page, size) => {
    setLoading(true);
    getAllCollections(page, size)
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error in loading collections");
        setLoading(false);
      });
  },[]);

  useEffect(() => {
    loadCollections(0, 10);
  }, [loadCollections]);


  const handleNextPage = () => {
    if (!collections.lastPage) {
      loadCollections(collections.pageNumber + 1, collections.pageSize);
    }
  };

  const handlePrevPage = () => {
    if (collections.pageNumber > 0) {
      loadCollections(collections.pageNumber - 1, collections.pageSize);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (collections.content.length === 0) {
    return (
      <div className="container-fluid py-4">
        <h4 className="text-center text-muted">No collections found.</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3 mb-0 text-gray-800 d-flex align-items-center">
            <i className="fas fa-layer-group me-3 text-primary"></i>
            Zepta Collections
          </h1>
          <p className="text-muted mt-2">Discover our curated product collections with exclusive deals and offers</p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="row">
        {collections.content.map((collection) => (
          <div key={collection.collectionId} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
            <div 
              className="card shadow-sm border-0 h-100 collection-card" 
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => navigate(`/collections/${collection.collectionId}`)}
            >
              <div className="card-body p-4">
                {/* Icon and Title */}
                <div className="d-flex align-items-center mb-3">
                  <div className="collection-icon me-3" style={{ fontSize: '2rem' }}>
                    {collection.icon || '📦'}
                  </div>
                  <div>
                    <h5 className="card-title mb-0 fw-bold text-dark">{collection.title}</h5>
                  </div>
                </div>

                {/* Description */}
                <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {collection.description}
                </p>

                {/* Stats */}
                <div className="row text-center mb-3">
                  <div className="col-6 border-end">
                    <h4 className="mb-0 text-primary fw-bold">{collection.productCount}</h4>
                    <small className="text-muted text-uppercase">Products</small>
                  </div>
                  <div className="col-6">
                    <h6 className="mb-0 text-success fw-bold">
                      {new Date(collection.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </h6>
                    <small className="text-muted text-uppercase">Created</small>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="card-footer bg-gradient text-center py-2 border-0" 
                   style={{ background: `linear-gradient(135deg, rgba(13, 110, 253, 0.1), rgba(13, 110, 253, 0.05))`, borderRadius: '0 0 0.375rem 0.375rem' }}>
                <small className="text-primary fw-semibold">
                  <i className="fas fa-mouse-pointer me-1"></i>
                  Click to explore
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button onClick={handlePrevPage} className="btn btn-outline-primary" disabled={collections.pageNumber === 0}>Previous</button>
        <button onClick={handleNextPage} className="btn btn-outline-primary" disabled={collections.lastPage}>Next</button>
      </div>

      {/* Summary Statistics */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light border-0 py-3">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="fas fa-chart-bar me-2 text-primary"></i>
                Collection Overview
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded">
                    <div className="h3 mb-1 text-primary fw-bold">{collections.content.length}</div>
                    <div className="text-muted small text-uppercase fw-semibold">Total Collections</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="p-3 bg-success bg-opacity-10 rounded">
                    <div className="h3 mb-1 text-success fw-bold">{collections.content.reduce((sum, col) => sum + col.productCount, 0)}</div>
                    <div className="text-muted small text-uppercase fw-semibold">Total Products</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="p-3 bg-info bg-opacity-10 rounded">
                    <div className="h3 mb-1 text-info fw-bold">
                    {collections.content && collections.content.length > 0 
                      ? collections.content.reduce((sum, col) => sum + (col.productCount || 0), 0)
                      : 0
                    }
                    </div>
                    <div className="text-muted small text-uppercase fw-semibold">Avg Per Collection</div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="p-3 bg-warning bg-opacity-10 rounded">
                    <div className="h3 mb-1 text-warning fw-bold">
                      {collections.content.filter(col => new Date(col.addedDate) >= new Date('2024-02-01')).length}
                    </div>
                    <div className="text-muted small text-uppercase fw-semibold">Recent Collections</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .collection-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .collection-icon {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        .border-end {
          border-right: 1px solid #dee2e6 !important;
        }
        @media (max-width: 576px) {
          .collection-icon {
            font-size: 1.5rem !important;
          }
          .card-title {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewCollections;
