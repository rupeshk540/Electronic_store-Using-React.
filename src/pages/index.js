import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";

function Index(){

    function showSuccessToast(){
        toast.success("This is success message !!")
    }
    return (
        <Base title="Shop what you need"
         description="welcome to Trending Store, We provide best items as you need."
          buttonEnabled={true}
          buttonText="Start Shoping"
          buttonType="primary">
        <h1>working on home page</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur, veniam dolorem aliquid saepe non neque.</p>

        <Button variant="success" onClick={showSuccessToast}>Toastify Success</Button>
        </Base>
    )
}

export default Index;