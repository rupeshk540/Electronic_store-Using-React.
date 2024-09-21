export const BASE_URL = `http://localhost:9090`;
export const PRODUCT_PAGE_SIZE =10;
export const ADMIN_ORDER_PAGE_SIZE = 10;

export const getProductImageUrl = (productId) => {
    return `${BASE_URL}/products/image/${productId}`;
};

export const formatDate = (timeInLongs) => {
    if(!timeInLongs){
        return null;
    }
    // var options={
    //     weekday: "Long",
    //     year: "numeric",
    //     month: "Long",
    //     day: "numeric",
    // };

   const date= new Date(timeInLongs);
   // return date.toLocaleString("en-US", options);
   return date.toLocaleString();
};