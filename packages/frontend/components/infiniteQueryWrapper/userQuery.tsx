import Link from "next/link"

import { usePostsUser } from "@/hooks/react-query"

import { PostLoader } from "../skeletons/post"
import { InfiniteQueryWrapper } from "./infiniteQueryWrapper"

export const UserQuery = () => {
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = usePostsUser()
	return (
		<>
			{isLoading ? (
				[...Array(5)].map((item, index) => <PostLoader key={index} />)
			) : data.pages[0].posts.length > 0 ? (
				<InfiniteQueryWrapper
					data={data}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
					hasNextPage={hasNextPage}
				/>
			) : (
				<div className="mt-5 w-full lg:w-[640px] lg:max-w-[640px]">
					<p className="rounded-md bg-white p-3 text-center dark:bg-dark-200">
						<Link href={"/leaderboard"} className="dark:text-white">
							Currently you don't subscribe on any subReddit go to check all{" "}
							<span className="text-cyan-400">communities</span>{" "}
						</Link>
					</p>
				</div>
			)}
		</>
	)
}
