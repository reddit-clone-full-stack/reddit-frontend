export const RegisterDescription = () => {
	return (
		<>
			<h1 className="font-bold dark:text-white">Sign up</h1>
			<p className="mt-3 max-w-[280px] text-xs dark:text-white sm:text-base mb-2">
				By continuing, you are setting up a Reddit account and agree to our{" "}
				<a
					className="text-cyan-300"
					href="https://www.redditinc.com/policies/user-agreement"
					rel="noreferrer"
					target="_blank"
				>
					{" "}
					User Agreement
				</a>{" "}
				and{" "}
				<a
					className="text-cyan-300"
					href="https://www.reddit.com/policies/privacy-policy"
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy
				</a>
				.
			</p>
		</>
	)
}

export const LoginDescription = () => {
	return (
		<>
			<h1 className="font-bold dark:text-white">Log in</h1>
			<p className="mt-3 max-w-[280px] text-xs dark:text-white sm:text-base mb-2">
				By continuing, you agree to our{" "}
				<a
					className="text-cyan-300"
					href="https://www.redditinc.com/policies/user-agreement"
					rel="noreferrer"
					target="_blank"
				>
					{" "}
					User Agreement
				</a>{" "}
				and{" "}
				<a
					className="text-cyan-300"
					href="https://www.reddit.com/policies/privacy-policy"
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy
				</a>
				.
			</p>
		</>
	)
}
