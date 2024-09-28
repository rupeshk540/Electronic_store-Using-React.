import Base from "../components/Base";
import { contactForm } from "./HomePageComponents";

const Contact=()=>{
    return(
        <Base 
        title="Electro Store / Contact us"
        description={null}
        >
         <div className="my-5"> {contactForm()}</div>
        </Base>
    )
}

export default Contact;