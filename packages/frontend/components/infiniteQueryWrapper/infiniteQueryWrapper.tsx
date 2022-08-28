import Link from "next/link"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Post as PostT } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import { Post } from "../post"
import { PostLoader } from "../skeletons/post"

type Page = {
	posts: PostT[]
	cursor: number | null
}
interface Props {
	data: {
		pages: Page[]
	}
	fetchNextPage: () => void
	isFetchingNextPage: boolean
	hasNextPage: boolean
}
export const InfiniteQueryWrapper: React.FC<Props> = ({ data, fetchNextPage, isFetchingNextPage, hasNextPage }) => {
	const { ref, inView } = useInView()
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView])
	const Vote = useZustandStore((state) => state.user?.Vote)

	return (
		<>
			{data.pages.map((page) => (
				<React.Fragment key={page.cursor}>
					{page.posts.map((post) => (
						<Link href={`/r/${post.subReddit.title}/comments/${post.id}`} key={post.id}>
							<div className="cursor-pointer">
								<Post {...post} vote={Vote?.filter((item) => item.postId === post.id)[0]} />
							</div>
						</Link>
					))}
				</React.Fragment>
			))}
			{hasNextPage && <div ref={ref}></div>}
			{isFetchingNextPage && <PostLoader />}
		</>
	)
}
