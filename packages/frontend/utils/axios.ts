import axios from "axios"
// export const API_URL = "https://fullstack-reddit-clone-production.up.railway.app/"
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API
//eslint-disable-next-line
export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
