
import { Breadcrumb, Col, Container,Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProductCard from "../../components/users/SingleProductCard";
import CategoryView from "../../components/users/CategoryView";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/HelperService";
import { getProductsOfCategories } from "../../services/ProductService";
import { toast } from "react-toastify";

const CategoryStorePage = () => {
    
    const {categoryId, categoryTitle} = useParams()
    const [products, setProducts] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        loadProductOfCategories(0, STORE_PAGE_PRODUCT_SIZE,'addedDate', 'desc')
    },[categoryId])

    useEffect(() => {
        if(currentPage > 0){
            loadProductOfCategories(currentPage, STORE_PAGE_PRODUCT_SIZE,'addedDate', 'desc')
        }
    },[currentPage])

    const loadProductOfCategories = (pageNumber, pageSize, sortBy, sortDir) => {
        getProductsOfCategories(categoryId, pageNumber, pageSize, sortBy, sortDir)
            .then(data => {
                if(currentPage > 0) {
                    setCurrentPage({
                        content: [...products.content, ...data.content],
                        lastPage: data.lastPage,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages
                    })
                }else{
                    setProducts({...data})
                }
            })
            .catch(error => {
                toast.error("Error in fetching products !!")
            })
    }

    //loading next page
    const loadNextPage = () => {
        setCurrentPage(currentPage+1)
    }


   //for productview
   const productsView=()=>{
    return products && (
        
           <InfiniteScroll
                dataLength={products.content.length}
                next={loadNextPage}
                hasMore={!products.lastPage}
                loader={<h3 className="my-5 text-center">Loading more products...</h3>}
                endMessage={<p className="my-4 text-center">All Products Loaded !!</p>}
            >
                <Container fluid>
                    <Row>
                        {
                            products.content.map(p => (
                                <Col key={p.productId} md={4}>
                                    <SingleProductCard product={p}/>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
           </InfiniteScroll>
        
    )}

    
    return products &&(
        <>
            <Container fluid className="px-2 pt-5">
                <Row>
                    <Container>
                        <Breadcrumb className="mx-5">
                            <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                            <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                    <Col md={2}>
                        <CategoryView/>
                    </Col>
                    <Col md={10}>
                        {products.content.length>0 ? productsView(): <h3 className="mt-5 text-center">No items in this category</h3>}
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default CategoryStorePage;