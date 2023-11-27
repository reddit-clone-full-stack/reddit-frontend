import axios from "axios"
// export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API
export const API_URL = "http://64.227.119.203:3333"
//eslint-disable-next-line
export const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
	return config
})
