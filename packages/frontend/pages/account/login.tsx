import Link from "next/link"

import { LogInForm } from "@/components/forms/LogInForm"
import { FormLayout } from "@/components/forms/formLayout"

const LogIn = () => {
	return (
		<FormLayout>
			<div className="flex justify-end text-xs">
				New to Reddit?{" "}
				<Link href={"/account/register"} legacyBehavior>
					<button className="ml-1 text-cyan-400">SIGN UP</button>
				</Link>
			</div>
			<LogInForm />
		</FormLayout>
	)
}
export default LogIn
