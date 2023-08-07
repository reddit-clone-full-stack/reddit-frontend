import Link from "next/link"

import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { Post as PostT } from "@/utils/types"

import { PostWrapper } from "../post/postWrapper"
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
	const isSubReddit = (title: string | null, id: number, username?: string) =>
		`${title ? "/r/" + title : "/user/" + username}/comments/${id}`

	return (
		<>
			{data.pages.map((page) => (
				<React.Fragment key={page.cursor}>
					{page.posts.map((post) => (
						<Link
							href={`${isSubReddit(post.subReddit?.title, post.id, post.user.username)}`}
							target="_blank"
							key={post.id}
							legacyBehavior
						>
							<div className="cursor-pointer">
								<PostWrapper
									{...post}
									path={isSubReddit(post.subReddit?.title, post.id, post.user.username)}
								/>
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
