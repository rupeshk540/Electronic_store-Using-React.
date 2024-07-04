import UserContext from "../../context/user.context";
import { useContext } from "react";
const Home = () => {

   const userContext=useContext(UserContext);
   return(
      <div>
         <h1>Welcome {userContext.userData?.user?.name} </h1>
         <h1>user is logged in {userContext.isLogin}</h1>
        
      </div>
   )
}

export default Home;