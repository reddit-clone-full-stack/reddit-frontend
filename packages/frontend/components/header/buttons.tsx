import Link from "next/link"

import { useZustandStore } from "@/utils/zustand"

export const Buttons = () => {
	const isAuthenticated = useZustandStore((state) => state.isAuthenticated)
	return (
		<>
			{!isAuthenticated && (
				<>
					<Link href={"/account/login"} legacyBehavior>
						<button className="btn-primary hidden  lg:block">Log In</button>
					</Link>
					<Link href={"/account/register"} legacyBehavior>
						<button className="btn-secondary ml-4 hidden lg:block">Sign Up</button>
					</Link>
				</>
			)}
		</>
	)
}
