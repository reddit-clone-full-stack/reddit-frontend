import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import React, { memo, useState } from "react"

import homeBanner from "@/public/home-banner.png"
import reddit from "@/public/reddit-home.png"
import { WithAuthMethods } from "../authentication/withAuthMethods"

const DynamicCommunityPopup = dynamic(() =>
	import("@/components/createCommunityPopup").then((mod) => mod.CommunityPopup)
)

export const HomeInfo: React.FC = memo(() => {
	const [isOpen, setIsOpen] = useState(false)
	const handleModal = () => {
		setIsOpen(!isOpen)
	}

	const authShowPopup = (cb: () => void) => {
		const isAuth = cb()
		if (isAuth === null) return
		setIsOpen(!isOpen)
	}
	return (
		<div className="mt-4 rounded-t bg-white dark:bg-dark-100">
			<div className="relative h-[34px]">
				<Image src={homeBanner} alt="home banner" layout="fill" className="h-full w-full rounded-t" />
			</div>
			<div className="mt-[-23px] p-3">
				<div className="flex items-end">
					<Image src={reddit} alt="reddit" width={40} height={68} />
					<div className="ml-2 mb-3 dark:text-white">Home</div>
				</div>
				<p className="mt-2 dark:text-white">
					Your personal Reddit frontpage. Come here to check in with your favorite communities.
				</p>
				<Link href={"/submit"} legacyBehavior>
					<button className="btn-primary mt-1 w-full">Create Post</button>
				</Link>
				<WithAuthMethods>
					{({ isAuth }) => (
						<button onClick={() => authShowPopup(isAuth)} className="btn-secondary mt-2 w-full">
							Create Community
						</button>
					)}
				</WithAuthMethods>
				{isOpen && (
					<React.Suspense>
						<DynamicCommunityPopup isOpen={isOpen} handleModal={handleModal} />
					</React.Suspense>
				)}
			</div>
		</div>
	)
})
