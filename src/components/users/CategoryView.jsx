import { useEffect, useState } from 'react'
import {ListGroup} from "react-bootstrap";
import { toast } from "react-toastify";
import { getCategories } from "../../services/CategoryService";
import defaultCategoryImage from "../../assets/default_profilepic.jpg";
import { Link } from "react-router-dom";

const CategoryView = () => {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategories(0, 10000)
    },[])


    const loadCategories=(pageNumber, pageSize)=>{
        
        getCategories(pageNumber, pageSize)
            .then(data => {
                setCategories({...data})
            })
            .catch(error => {
                toast.error("Error in loading categories !")
            })
    }


    
    const categoryView=()=>{
        return categories &&(
            <>
                <ListGroup variant="flush" className="stick-top">
                    <ListGroup.Item action as={Link} to={`/store`}>
                        <img 
                            className="rounded-circle"
                            src={defaultCategoryImage} alt="default_img" 
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover"
                            }}
                            onError={event => {
                                event.currentTarget.setAttribute('src' ,defaultCategoryImage)
                            }}
                        />
                        <span className="ms-2">All Products</span>
                    </ListGroup.Item>

                    {categories.content.map(cat => (
                        <ListGroup.Item as={Link} to={`/store/${cat.categoryId}/${cat.title}`} key={cat.categoryId}>
                            <img 
                                className="rounded-circle"
                                src={cat.coverImage} alt={cat.title} 
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover"
                                }}
                                onError={event => {
                                    event.currentTarget.setAttribute('src' ,defaultCategoryImage)
                                }}
                            />
                            <span className="ms-2">{cat.title}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </>
        )
    }
  return categories && categoryView()
}

export default CategoryView;