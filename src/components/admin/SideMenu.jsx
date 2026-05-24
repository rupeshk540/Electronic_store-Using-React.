import { Badge, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {GrHome} from 'react-icons/gr';
import { BiCategory } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FcViewDetails } from 'react-icons/fc';
import { MdDashboard, MdOutlineCategory, MdViewDay } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaOpencart, FaUserSecret } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getOrderStats } from "../../services/OrderService";

const SideMenu = () => {

    const {logout} = useContext(UserContext)
    const [stats, setStats] = useState({
      totalOrders: 0,
      totalRevenue: 0,
      placedOrders: 0,
      deliveredOrders: 0
    });

    useEffect(() => {

        loadStats();

        const interval = setInterval(loadStats, 60000);

        return () => clearInterval(interval);

    }, []);

    const loadStats = async () => {
    
      try {
        const data = await getOrderStats();
        setStats(data);
    
      } catch (error) {
    
        console.log(error);
      }
    };
    
    return(
        <>
            <ListGroup variant="flush">
                <ListGroup.Item as={NavLink} to="/admin/home" action>
                    <GrHome size={20}/>
                    <span className="ms-2">Home</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-category" action>
                    <BiCategory size={20}/>
                    <span className="ms-2">Add Category</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/categories" action>
                    <MdOutlineCategory size={20}/>
                    <span className="ms-2">View Category</span>
                </ListGroup.Item>

                 <ListGroup.Item as={NavLink} to="/admin/add-collection" action>
                    <AiOutlineAppstoreAdd size={20}/>
                    <span className="ms-2">Add Collection</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/collections" action>
                    <FcViewDetails size={20}/>
                    <span className="ms-2">View Collections</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                    <MdAddBox size={20}/>
                    <span className="ms-2">Add Product</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/products" action>
                    <MdViewDay size={20}/>
                    <span className="ms-2"> View Products</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/orders"className="d-flex justify-content-between align-items-start"action>
                <div>
                    <FaOpencart size={20}/>
                    <span className="ms-2"> Orders</span>
                </div>
                    <Badge bg="danger" pill>
                        {stats.placedOrders}
                    </Badge>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/users"className="d-flex justify-content-between align-items-start"action>
                <div>
                    <FaUserSecret size={20}/>
                    <span className="ms-2"> Users</span>
                </div>
                    {/* <Badge bg="danger" pill>
                        New
                    </Badge> */}
                </ListGroup.Item>

                {/* <ListGroup.Item as={NavLink} to="/users/home" action>
                    <MdDashboard size={20}/>
                    <span className="ms-2">Dashboard</span>
                </ListGroup.Item> */}

                <ListGroup.Item action onClick={(event) => {
                    logout()
                    }}
                >
                    <HiOutlineLogout size={20}/>
                    <span className="ms-2"> Logout</span>         
                </ListGroup.Item>
                
            </ListGroup>
        </>
    )
}

export default SideMenu;
