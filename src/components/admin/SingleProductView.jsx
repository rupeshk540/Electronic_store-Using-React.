import { Button, Modal } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {Swal} from "sweetalert2";
import { deleteProduct } from "../../services/ProductService";
import { useState } from "react";

const SingleProductView = ({
    index,
    product,
    updateProductList,
    openProductViewModal,
    openEditProductModel
})=>{

    
    const formatDate=(time)=>{
        return new Date(time).toLocaleString()
    }

    const getBackgroundForProduct = () => {
        //live+stock ==> green
        //not live ==> red
        //not stock ==> yellow

        if(product.live && product.stock){
            return "table-success"
        }else if(!product.live){
            return "table-danger"
        }else if(!product.stock){
            return "table-warning"
        }else{

        }
    }

    //delete product
    const deleteProductLocal = (productId) =>{
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
              
                deleteProduct(product.productId).then(data=>{
                    toast.success("Product Deleted")

                    updateProductList(productId)
                })
                .catch(error=>{
                    toast.error("Error in deleting product !!")
                })
            }
        })
    }
   

    return (
        <tr className={getBackgroundForProduct()}>
        <td className="px-3 small">{index+1}</td>
        <td className="px-3 small">{product.title}</td>
        <td className="px-3 small">{product.quantity}</td>
        <td className="px-3 small">₹{product.price}</td>
        <td className="px-3 small">₹{product.discountedPrice}</td>
        <td className="px-3 small">{product.live ? 'Live': 'Not Live'}</td>
        <td className="px-3 small">{product.stock ? 'In Stock': 'Out of Stock'}</td>
        <td className="px-3 small">{product.category ? product.category.title : ''}</td>
        <td className="px-3 small">{formatDate(product.addedDate)}</td>
        <td className="px-3 small d-flex table-light">
            
            {/* delete button */}
            <Button variant="danger" size="sm" onClick={(event)=> deleteProductLocal(product.productId)}>
                <MdDelete/>    
            </Button>
            {/* view button */}
            <Button className="ms-2" onClick={(event)=>openProductViewModal(event,product)} variant="warning" size="sm">
                <GrFormView/>    
            </Button>
            {/* update button */}
            <Button onClick={(event=> openEditProductModel(event,product))}variant="dark" size="sm">
                <BsFillPencilFill/>    
            </Button>
        </td>
    </tr>
    )
}

export default SingleProductView;