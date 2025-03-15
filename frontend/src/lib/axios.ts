import axios from "axios"

// create axios instance
// axios is a library that allows you to make HTTP requests from the browser
// we are using it to make requests to the backend  
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
})

export default axiosInstance