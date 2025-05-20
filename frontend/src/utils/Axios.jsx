

import axios from "axios";

const API = axios.create({
    baseURL:import.meta.env.VIT_API_URL || "http://localhost:8000/api",
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
});

export {API};