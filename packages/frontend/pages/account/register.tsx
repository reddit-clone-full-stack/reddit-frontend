import { NextPage } from "next"
import Link from "next/link"

import { FormLayout } from "@/components/forms/formLayout"
import { RegistrationForm } from "@/components/forms/registrationForm"

const Register: NextPage = () => {
	return (
		<FormLayout>
			<div className="flex justify-end text-xs dark:text-white">
				Already a redditor?{" "}
				<Link href={"/account/login"} legacyBehavior>
					<button className="ml-1 text-cyan-400 ">LOG IN</button>
				</Link>
			</div>
			<RegistrationForm />
		</FormLayout>
	)
}
export default Register
