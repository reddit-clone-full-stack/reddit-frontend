import axios from "axios"
// export const API_URL = "https://fullstack-reddit-clone-production.up.railway.app/"
export const API_URL = "http://localhost:3333"
//eslint-disable-next-line
console.log(API_URL)
export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
