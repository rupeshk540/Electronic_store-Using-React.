import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth.js";
import UserContext from "../../context/UserContext.js";
import { useContext } from "react";

const AdminDashboard = () => {

    const userContext = useContext(UserContext);

   const dashboardView=()=>{
    return (
        <div>
          <h1>
             tHIS IS admin dashboard 
         </h1>
 
         <Outlet/>
        </div>
     )
   }

   return(
    (isAdminUser()) ? dashboardView(): <Navigate to ="/users/home"/>
   )
}

export default AdminDashboard;