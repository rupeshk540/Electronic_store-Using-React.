import { useEffect, useState } from "react";
import CategoryView from "../../components/CategoryView";
import {deleteCategory, getCategories, updateCategory} from "../../services/CategoryService";
import { toast } from "react-toastify";
import {Swal} from "sweetalert2";
import { Button, Container, FormGroup,Form, Modal, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
const ViewCategories = () => {

    const [categories, setCategories] = useState({
        content:[]
    })

    const [currentPage, setCurrentPage]=useState(0)

    const [selectedCategory, setSelectedCategory] = useState(undefined)

    const [loading, setLoading] = useState(false)

    //view modal variables
    const [show, setShow]= useState(false);
    const handleClose = () => setShow(false);
    const handleShow= () => setShow(true);

    //update variables
    const [showUpdate, setShowUpdate]= useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate= () => setShowUpdate(true);

    //to load intial page
    useEffect(()=>{
        setLoading(true)
        getCategories(0,6)
            .then(data=>{
                setCategories(data)
            })
            .catch(error=>{
                toast.error("Error in loading categories from server !!")
            })
            .finally(()=>{
                setLoading(false)
            })
    },[])

    //to load current page
    useEffect(()=>{
        if(currentPage>0){
            getCategories(currentPage,6)
            .then(data=>{
                setCategories(
                    {
                        content:[...categories.content,...data.content],
                        lastPage:data.lastPage,
                        pageNumber:data.pageNumber,
                        pageSize: data.pageSize,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages
                    }
                )
            })
            .catch(error=>{
                toast.error("Error in loading categories from server !!")
            })
            
        }
    },[currentPage])

    

    //delete category main funnction 
    const deleteCategoryMain=(categoryId)=>{
      
        //sweat alert 
        Swal.fire({
            title:'Are you sure ?',
            text:"You won't be able to revert this !",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Yes, delete it !'
        }).then((result)=>{
            if(result.isConfirmed){
                //api call for delete 
                deleteCategory(categoryId)
                .then(data=>{
                    Swal.fire(
                        'Deleted',
                        'Your file has been deleted',
                        'success'
                    )
                    const newArray=categories.content.filter((c)=>{
                        return c.categoryId!=categoryId
                    })

                    setCategories({
                        ...categories,
                        content:newArray
                    })
                })
                .catch(error=>{
                    toast.error("Error in deleting category")
                })
            }
        })
    }
    //handle view button of category
    const handleView = (category) => {
        setSelectedCategory(category)
        handleShow()
    }

    //handle update button of category
    const handleUpdate = (category) => {
        setSelectedCategory(category)
        handleShowUpdate()
    }

    //update the category to server
    const updateCategoryClicked = (event) => {
        event.preventDefault()

        if(selectedCategory.title == undefined || selectedCategory.title.trim() === ''){
            toast.error("Title required !!")
            return
        }
        
        updateCategory(selectedCategory)
            .then(data=>{
                toast.success("category Updated")

             const newCategories =  categories.content.map(cat=>{
                    if(cat.categoryId===selectedCategory.categoryId){
                        cat.title=data.title
                        cat.description=data.description
                        cat.coverImage=data.coverImage
                    }
                    return cat;
                })
                setCategories({
                    ...categories,
                    content:newCategories
                })

                handleCloseUpdate()
            })
            .catch(error=>{
                toast.error("Error in updating category")
            })
    }

    //load next page function
    const loadNextPage = () =>{
        setCurrentPage(currentPage+1)
    }

    //modal view : view 
    const modalView = () => {
        return(
            <>
                

                <Modal  show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCategory.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <img style={{
                                width:'100%',
                                height:'250px',
                                objectFit:'contain'
                            }} src={selectedCategory.coverImage}/>
                        </Container>
                        <div className="mt-3">{selectedCategory.description}</div>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer> 
                </Modal>
            </>
        )
    }

    //update modal 
    const  modalUpdate= () => {
        return(
            <>
                

                <Modal  show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCategory.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <FormGroup>
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter here"
                                    value={selectedCategory.title}
                                    onChange={(event)=>setSelectedCategory({
                                        ...selectedCategory,
                                        title:event.target.value
                                    })}
                                />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label>Category Description</Form.Label>
                                <FormGroup.Control as={'textarea'} 
                                    value={selectedCategory.description}
                                    rows={6}
                                    onChange={(event)=>setSelectedCategory({
                                        ...selectedCategory,
                                        description:event.target.value
                                    })}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Container className="py-3">
                                    <img src={selectedCategory.coverImage}
                                        className="img-fluid"
                                    />
                                </Container>
                                <Form.Label>Category Image Url</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter here"
                                    value={selectedCategory.coverImage}
                                />
                            </FormGroup>

                        </Form>

                    </Modal.Body>
                        
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                        <Button variant="success" onClick={updateCategoryClicked}>Save Changes</Button>
                    </Modal.Footer> 
                </Modal>
            </>
        )
    }



    return (
        <div>
            {/* Loader */}
            <Container className="text-center p-3" hidden={!loading}>
                <Spinner/>
                <div>
                    <h3>Loading...</h3>
                </div>
            </Container>

            {
                (
                    categories.content.length > 0 ? (
                        <>
                        
                        <InfiniteScroll 
                            dataLength={categories.content.length}
                            next={loadNextPage}
                            hasMore={!categories.lastPage}
                            loader={<h2 className="p-2 text-center">Loading...</h2>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                  <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                        {
                            categories.content.map((category)=>{
                                return (
                                    <CategoryView
                                        viewCat={handleView}
                                        updateCat={handleUpdate}
                                        deleteCat={deleteCategoryMain}
                                        category={category}
                                        key={category.categoryId}
                                    />
                                )
                            })
                       }
                        </InfiniteScroll>
                        </>
                     ): <h5 className="text-center">NO Categories in database</h5>
                )
            }

            {
               selectedCategory ? modalView(): ''
            }
        </div>
    )
}

export default ViewCategories;