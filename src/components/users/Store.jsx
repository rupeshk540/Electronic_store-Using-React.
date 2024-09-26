import { Breadcrumb, Col, Container,Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {getAllLiveProducts} from "../../services/ProductService";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { STORE_PAGE_PRODUCT_SIZE } from "../../services/HelperService";
import CategoryView from "./CategoryView";
import { Link } from "react-router-dom";



const Store = () => {


    const [products, setProducts] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
    },[])

    useEffect(()=>{
        if(currentPage>0){
            loadProducts(currentPage, STORE_PAGE_PRODUCT_SIZE, 'addedDate', 'desc')
        }
    },[currentPage])

    //loading nextpage
    const loadNextPage = () => {
        setCurrentPage(currentPage+1)
    }

    const loadProducts=(pageNumber, pageSize, sortBy, sortDir)=>{
        getAllLiveProducts(pageNumber, pageSize, sortBy, sortDir)
            .then(data => {
               if(currentPage > 0){
                    setProducts({
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
                toast.error("Error in loading products !!")
            })
    }



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
            
        )
    }

    return(
        <Container fluid className="px-5 pt-5">
            <Row>
                <Container>
                        <Breadcrumb className="mx-5">
                            <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                            <Breadcrumb.Item>All Products</Breadcrumb.Item>
                        </Breadcrumb>
                </Container>
                <Col md={2}>
                    <CategoryView/>
                </Col>
                <Col md={10}>
                    {productsView()}
                </Col>
            </Row>
        </Container>
    )
}

export default Store;