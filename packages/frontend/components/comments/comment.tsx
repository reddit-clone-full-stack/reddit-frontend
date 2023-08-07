import Image from "next/image"
import Link from "next/link"

import { memo, useRef, useState } from "react"
import { AiFillLike } from "react-icons/ai"

import { $api } from "@/utils/axios"
import { objectsEqual, timeAgo } from "@/utils/functions"
import { Comment as CommentT, Like } from "@/utils/types"
import { useZustandStore } from "@/utils/zustand"

import UserSvg from "@/public/userImage.svg"
import { WithAuthMethods } from "../authentication/withAuthMethods"

type Props = CommentT & {
	likeData?: Like
}
export const Comment: React.FC<Props> = memo(
	({ user, text, createdAt, like: likeNumber, id, likeData }) => {
		const setLike = useZustandStore((state) => state.setLike)
		const [isLiking, setIsLiking] = useState(false)

		const handleSubscribe = async (cb: () => void) => {
			const isAuth = cb()
			if (isAuth === null) return
			if (isLiking) return
			setIsLiking(true)

			const response = await $api("/post/rate", {
				method: "PATCH",
				data: {
					rateId: likeData?.id,
					commentId: id
				}
			})
			setLike(response.data.Likes)

			const content = Number(ref.current.innerHTML)
			ref.current.innerHTML = `${content + (likeData ? -1 : 1)}`

			setIsLiking(false)
		}

		const ref = useRef<HTMLDivElement>()
		return (
			<div className="my-3">
				<div className="flex items-center">
					<Image src={UserSvg} alt="user" width={36} height={36} className=" rounded-full bg-[#EDEFF1]" />
					<Link href={`/user/${user.username}`} className="ml-2 hover:underline dark:text-white">
						{user.username}
					</Link>
					<div className="ml-2 dark:text-white">{timeAgo(createdAt)}</div>
				</div>
				<div className="ml-[45px]">
					<p className="dark:text-white">{text}</p>
					<div className="mt-2 flex items-center">
						<p className="mr-2 dark:text-white" ref={ref}>
							{likeNumber}
						</p>
						<WithAuthMethods>
							{({ isAuth }) => (
								<AiFillLike
									className={`${
										likeData && "fill-[red] hover:fill-[#c90909]"
									} cursor-pointer hover:fill-[#2d2b2b] dark:text-white dark:hover:text-[#d4d2d2]`}
									onClick={() => handleSubscribe(isAuth)}
								/>
							)}
						</WithAuthMethods>
					</div>
				</div>
			</div>
		)
	},
	(prevProps, nextProps) => {
		if (prevProps.likeData === nextProps.likeData) return true
		if (objectsEqual(prevProps.likeData, nextProps.likeData)) return true
		return false
	}
)
