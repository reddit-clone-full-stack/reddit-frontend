import { useRouter } from "next/router"

import { useZustandStore } from "@/utils/zustand"

type Props = {
	children(options: { isAuth: () => void }): React.ReactNode
}
export const WithAuthMethods = ({ children }: Props) => {
	const isLogin = useZustandStore((state) => state.isAuthenticated)
	const router = useRouter()
	const isAuth = () => {
		if (!isLogin) {
			router.push("/account/login")
			return null
		}
		return true
	}
	return <div>{children({ isAuth })}</div>
}
