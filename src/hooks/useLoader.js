import React,{useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import { privateAxios } from '../services/AxiosService';


const useLoader = () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //request interceptor
        privateAxios.interceptors.request.use(
          (config) => {
            setLoading(true);
            return config;
          },
          (error) => {
          return Promise.reject(error);
        }
        );
    
        //response intercepter
        privateAxios.interceptors.response.use(
          (config) => {
            setLoading(false);
            return config;
          },
          (error) => {
            setLoading(false);
            if(error.code === "ERR_NETWORK"){
              Swal.fire({
                title: "Network Error",
                html: "Backend server is down",
                icon: "info",
              });
            }
          return Promise.reject(error);
        }
        );
    
    
      },[]);
    return loading ;
}

export default useLoader;