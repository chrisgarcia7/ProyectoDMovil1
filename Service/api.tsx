import axios from "axios";

const api= axios.create({

    baseURL:'http://192.168.210.108:5000'



})

export default api;
