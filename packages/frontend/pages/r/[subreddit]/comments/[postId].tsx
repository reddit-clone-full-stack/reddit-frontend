import Link from "next/link"
import { useRouter } from "next/router"

import { RiCakeLine } from "react-icons/ri"

import { CommentForm } from "@/components/comments/commentForm"
import { SubscriptionButtons } from "@/components/helpersComponents/subscribe/subscription"
import { PostWrapper } from "@/components/post/postWrapper"
import { PostLoader } from "@/components/skeletons/post"
import { PostInfoLoader } from "@/components/skeletons/postInfo"
import { usePost } from "@/hooks/react-query/"
import { convertDate } from "@/utils/functions"

import { CommentList } from "@/components/comments/commentList"
import { UserInfo } from "@/components/helpersComponents/userInfo"
import { ImageWrapper } from "@/components/imageWrapepr"

const PostPage = () => {
	const router = useRouter()
	const { data, isLoading } = usePost(Number(router.query.postId))

	return (
		<div className="container">
			<div className="flex">
				{isLoading ? (
					<PostLoader />
				) : (
					<div className="flex-[67%]">
						<PostWrapper {...data} />
						<div className="border-l border-r border-b border-solid border-[#ccc] bg-white pl-[48px] pr-2 dark:border-dark-200 dark:bg-dark-100">
							<CommentForm postId={data.id} />
							<div className="my-5">{<CommentList data={data.comments} />}</div>
						</div>
					</div>
				)}
				{data && router.asPath.includes("user") ? (
					<UserInfo username={data.user.username} createdAt={data.user.createdAt} />
				) : data?.subReddit ? (
					<div className="ml-3 hidden w-[312px] max-w-full lg:block ">
						<Link href={`/r/${router.query.subreddit}`} legacyBehavior>
							<div className="cursor-pointer rounded border border-solid border-gray-400 dark:border-dark-200">
								<div className="rounded-t bg-cyan-500 p-3  text-white">About Community</div>
								<div className="bg-white p-3 dark:bg-dark-100">
									<div className="flex items-center">
										<ImageWrapper
											width={54}
											heigth={54}
											title={data.subReddit.title}
											image={data.subReddit.image}
										/>
										<p className="ml-3 dark:text-white">r/{data.subReddit.title}</p>
									</div>
									<div className="mt-2 border-b border-solid border-gray-500 pb-2 dark:border-b-white dark:text-white">
										{data.subReddit.subscribers} Members
									</div>
									<div className="mt-2 flex items-center">
										<RiCakeLine className="dark:text-white" />
										<p className="ml-3 dark:text-white">
											Created {convertDate(data.subReddit.createdAt)}
										</p>
									</div>
									<div className="mt-3">
										<SubscriptionButtons id={data.subRedditId} />
									</div>
								</div>
							</div>
						</Link>
					</div>
				) : (
					<PostInfoLoader />
				)}
			</div>
		</div>
	)
}

export default PostPage
