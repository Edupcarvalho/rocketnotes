//Habilitar o Back-End

import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:3333"  
    baseURL: "https://rocketnotes-api-8emz.onrender.com"
});