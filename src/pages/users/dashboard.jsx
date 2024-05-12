import { Outlet } from "react-router-dom";

const Dashboard=()=>{
    return (
        <div>
            <h1>this is user dashboard</h1>
            {/* nested components */}
            <Outlet/>
        </div>
    );
}

export default Dashboard;