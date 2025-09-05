import { Alert, Button, Col, Container, Modal, Row, Card, Table, Form, Spinner, InputGroup } from "react-bootstrap"
import { toast } from "react-toastify"
import UserProfileView from "../../components/users/UserProfileView"
import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'; 
import UserContext from "../../context/UserContext"
import { getUser, updateUser, updateUserProfilePicture } from "../../services/UserService"
import defaultImage from "../../assets/default_profilepic.jpg"


const Profile=()=>{

    const userContext=useContext(UserContext)
    const {userId }=useParams()
    const [user, setUser]=useState(null)

    //state for handle image
    const [image, setImage]=useState({
        placeholder:defaultImage,
        file:null
    })

    //modals state
    const [show, setShow]= useState(false);

    const [updateLoading, setUpdateLoading]=useState(false);

    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);

    useEffect(()=>{
        // if(userContext.userData){
            getUserDataFromServer()
        // }
    },[])

    const getUserDataFromServer=()=>{
        //api call to server through userid

        

        getUser(userId)
            .then(data=>{
                setUser(data)
            })
            .catch(error=>{
                setUser(null)
                toast.error("Error in loading information from server")
            })

    }

    const updateFieldHandler = (event,property) => {
        setUser({
            ...user,
            [property]:event.target.value
        })
    }

    //update user data by calling api
    const updateUserData=()=>{
        if(user.name===undefined || user.name.trim()===''){
            toast.error("user name required !!")
            return
        }

        //...rest of the field
        setUpdateLoading(true)
        updateUser(user)
        .then(updateUser=>{
            toast.success("User details updated !!")
            //update image
            if(image.file==null){
                setUpdateLoading(false)
                handleClose()
                return
            }
            updateUserProfilePicture(image.file, user.userId)
                .then(data=>{
                    toast.success(data.message)
                    handleClose()
                    
                })
                .catch(error=>{
                    toast.error("Image not uploaded")
                })
                .finally(()=>{
                    setUpdateLoading(false)
                })
            
        })
        .catch(error=>{
            // if(error.response.status == 400){
            //     toast.error(error.response.data.name)
            // }
            toast.error("Not updated !! Error")
            setUpdateLoading(false)
        })
        
    }

    //function for image change
    const handleProfileImageChange = (event) => {

        if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg'){
            //preview show
            const reader=new FileReader()
            reader.onload=(r)=>{
                setImage({
                    placeholder:r.target.result,
                    file:event.target.files[0]
                })
            }

            reader.readAsDataURL(event.target.files[0])
        }else{
            toast.error("Invalid file !!")
            image.file=null
        }
    }

    //clear image button function
    const clearImage=(event)=>{
        setImage({
            placeholder: defaultImage,
            file: null
        })
    }

    //update view 

    const updateViewModal = () =>{
        return(
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update the information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Card className="border-0 shadow-sm" style={{borderRadius:"50px" }}>
                            <Card.Body>
                                 <Table  responsive  hover>

                                <tbody>

                                    <tr>
                                        <td>
                                            Profile Image
                                        </td>
                                        <td>
                                            {/* image tag for preview */}
                                           <Container className="text-center mb-3">
                                                <img style={{objectFit:'cover'}}height={200} width={200} src={image.placeholder} alt="" />
                                           </Container>
                                            <InputGroup>
                                            <Form.Control type='file' onChange={handleProfileImageChange}/>
                                            <Button onClick={clearImage} variant="outline-secondary">Clear</Button>
                                            </InputGroup>   
                                            <p className="mt-2 text-muted">Select profile picture</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Name</td>
                                        <td><Form.Control 
                                         type="text" 
                                        value={user.name}
                                        onChange={(event)=> updateFieldHandler(event,'name')}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>New Password</td>
                                        <td><Form.Control 
                                        placeholder="Enter new password"
                                        type="password"
                                        onChange={(event)=> updateFieldHandler(event,'password')} 
                                         />
                                         <p>Leave the field blank for same password</p></td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>About</td>
                                        <td><Form.Control as={'textarea'} value={user.about} rows={8}
                                        onChange={(event)=> updateFieldHandler(event,'about')}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>Roles</td>
                                        <td>{user.roles.map(role=><div key={role.roleId}>{role.roleName}</div>)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            </Card.Body>
                           </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={updateUserData} disabled={updateLoading}>
                            <Spinner
                                animation="border"
                                size="sm"
                                hidden={!updateLoading}
                                className="me-2"
                            />
                            <span hidden={!updateLoading}>Updating</span>
                            <span hidden={updateLoading}> Save Changes</span>
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    return (
       <div>
       <Container className="mt-3">
            <Row>
                <Col md={{
                    span:10,
                    offset:1
                }}>
                {(user?(
                    <>
                        <UserProfileView 
                            user={
                                {
                                    // name:"Rupesh kumar",
                                    // email:"rupesh@123",
                                    // gender:"male",
                                    // about:"I am a react developer",
                                    // roles:[{roleId:1, rolename:"Admin"}, {roleId:2, roleName:'NORMAL'}]
                                    
                                   user
                                
                                }
                            }

                            handleShowModal={handleShowModal}
                        />
                        {updateViewModal()}
                    </>
                ):<Alert><h3 className="text-center text-uppercase m-2">User not loaded from server !</h3></Alert>)}
       
                </Col>
            </Row>
        </Container>
       </div>
    )
}

export default Profile;