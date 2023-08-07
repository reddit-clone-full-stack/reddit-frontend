import Image from "next/image"
import Link from "next/link"

import React from "react"

import { SubscriptionButtons } from "../helpersComponents/subscribe/subscription"

interface Props {
	title: string
	image: string
	index: number
	subRedditId: number
}

export const Community: React.FC<Props> = ({ title, image, index, subRedditId }) => {
	return (
		<div className="flex items-center border-b border-solid border-[#CBD5E0] bg-white p-3 last:border-b-0 dark:border-dark-200 dark:bg-dark-100">
			<p className="mr-5 dark:text-white">{index}.</p>
			{image ? (
				<Image className="rounded-full" width={28} height={28} src={image} alt="test" />
			) : (
				<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-cyan-400"> /r </div>
			)}
			<Link href={`/r/${title}`} className="">
				<p className="ml-2  max-w-[125px] cursor-pointer overflow-hidden text-ellipsis hover:underline dark:text-white">
					r/{title}
				</p>
			</Link>
			<div className="ml-auto max-w-[96px]">
				<SubscriptionButtons id={subRedditId} />
			</div>
		</div>
	)
}
