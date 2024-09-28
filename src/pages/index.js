import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import { contactForm, infoWithImageInLeftSection, infoWithImageInRightSection, trendingProducts } from "./HomePageComponents";
import { useState } from "react";

function Index(){

    const [products, setProducts] = useState([
        {
            addedDate: "2020-03-06",
            category:{
                categoryId: "String",
                coverImage: "string",
                description: "string",
                title: "string",
            },
            description: "string",
            discountedPrice: 0,
            live: true,
            price: 0,
            productId: "string",
            productImageName: "string",
            quantity: 0,
            stock: true,
            title: "Product title",
        },
        {
            addedDate: "2020-03-06",
            category:{
                categoryId: "String",
                coverImage: "string",
                description: "string",
                title: "string",
            },
            description: "string",
            discountedPrice: 0,
            live: true,
            price: 0,
            productId: "string",
            productImageName: "string",
            quantity: 0,
            stock: true,
            title: "Product title",
        },
        {
            addedDate: "2020-03-06",
            category:{
                categoryId: "String",
                coverImage: "string",
                description: "string",
                title: "string",
            },
            description: "string",
            discountedPrice: 0,
            live: true,
            price: 0,
            productId: "string",
            productImageName: "string",
            quantity: 0,
            stock: true,
            title: "Product title",
        },
    ])

    return (
        <Base title="Shop what you need"
         description={"welcome to Trending Store, We provide best items as you need."}
         buttonEnabled={true}
         buttonText="Start Shoping"
         buttonType="primary"
         buttonLink="/store"
        >
           <div className="my-4"> {trendingProducts(products)}</div>
           <div style={{margin: "100px 0px"}}>{infoWithImageInRightSection(
            "https://random.imagecdn.app/500/150",
            "Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat veniam quas repudiandae inventore adipisci voluptatibus !"
           )}</div>
           <div style={{margin: "100px 0px"}}>{infoWithImageInLeftSection(
            "https://random.imagecdn.app/500/150",
            "Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat veniam quas repudiandae inventore adipisci voluptatibus !"
           )}</div>

           <div className="my-4">{contactForm()}</div>
        </Base>
    )
}

export default Index;