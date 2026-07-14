export const BASE_URL = `https://zeptra-app-latest.onrender.com`;
// export const BASE_URL =`http://localhost:9090`
export const PRODUCT_PAGE_SIZE =10;
export const ADMIN_ORDER_PAGE_SIZE = 10;
export const USER_PAGE_SIZE=10;
export const STORE_PAGE_PRODUCT_SIZE=9;
export const PAYMENT_STATUS ="NOTPAID";
export const ORDER_STATUS = "PENDING";


export const getUserImageUrl=(userId)=>{
    return `${BASE_URL}/users/image/${userId}`
};

export const getProductImageUrl = (imageUrlOrId) => {
  if (!imageUrlOrId) return null;

  // If backend saves secure_url  just return it
  if (imageUrlOrId.startsWith("http")) {
    return imageUrlOrId;
  }

  // Otherwise, assume it's a Cloudinary public_id
  return `https://res.cloudinary.com/dmvg3s0m8/image/upload/${imageUrlOrId}`;
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