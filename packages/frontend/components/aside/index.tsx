import Image from "next/image"
import Link from "next/link"

import React from "react"

import { usePopularCommunities } from "@/hooks/react-query/"

import communityPic from "@/public/community.png"

import { CommunityLoader } from "../skeletons/community"
import { Community } from "./community"
import { HomeInfo } from "./homeInfo"

export const Aside: React.FC = () => {
	const { data, isLoading } = usePopularCommunities()
	return (
		<aside className="hidden lg:block">
			<div className="before:content relative flex h-[80px] items-end before:absolute before:top-0 before:left-0 before:z-[3] before:h-full before:w-full before:rounded-t before:bg-[#00000042]">
				<Image
					className="rounded-t"
					layout="fill"
					src={communityPic}
					priority
					alt="Top community"
					objectFit="cover"
				/>
				<h3 className="relative z-[4] pb-2 pl-2 font-semibold text-white">Top Communities</h3>
			</div>
			<div className="">
				{isLoading ? (
					<CommunityLoader />
				) : (
					data.map((item, index) => (
						<Community
							title={item.title}
							image={item.image}
							key={item.title}
							index={index + 1}
							subRedditId={item.id}
						/>
					))
				)}
			</div>
			<div className="flex items-center justify-center rounded-b bg-white py-3 px-6 dark:bg-dark-100">
				<Link href={"/leaderboard"} legacyBehavior>
					<div className="btn-secondary w-full text-center">View All</div>
				</Link>
			</div>
			<HomeInfo />
		</aside>
	)
}
