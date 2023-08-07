import Link from "next/link"

export const SubRedditError = () => {
	return (
		<div className="container flex h-[calc(100vh_-_80px)] flex-col items-center justify-center">
			<div className="h-[100px] w-[100px] rounded-full bg-[#a8a8a8]"></div>
			<p className="my-4 font-bold">Sorry, there aren’t any communities on Reddit with that name.</p>
			<p className="my-4 font-bold">This community may have been banned or the community name is incorrect.</p>
			<Link href={"/"} legacyBehavior>
				<button className="btn-secondary">GO HOME</button>
			</Link>
		</div>
	)
}
