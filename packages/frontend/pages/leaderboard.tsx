import { GetStaticProps } from "next"
import Link from "next/link"

import { SubscriptionButtons } from "@/components/helpersComponents/subscribe/subscription"
import { ImageWrapper } from "@/components/imageWrapepr"
import { Community } from "@/utils/types"
import { PrismaClient } from "@prisma/client"

type Props = {
	subReddits: Community[]
}
const LeaderBoard = ({ subReddits }: Props) => {
	return (
		<div>
			<div className="border-t border-t-[#e4e7ec] bg-white dark:border-dark-200 dark:bg-dark-100">
				<div className="container ">
					<h1 className=" text-2xl text-black dark:text-white">Today&apos;s Top Growing Communities</h1>
					<h2 className=" mt-1 text-xs text-[#7c7c7c]">
						Browse Reddit&apos;s top growing communities. Find the top communities in your favorite
						category.
					</h2>
				</div>
			</div>
			<div className="md:container">
				<div className="m-auto md:max-w-[646px]">
					<div className="border-b-[thin] border-b-[#edeff1] bg-[#f6f7f8] p-2 text-black">
						<h3>Today&apos;s Top Growing Communities</h3>
					</div>
					{subReddits.map((item, index) => (
						<Link key={item.id} href={`/r/${item.title}`}>
							<div className="flex items-center border-b-[thin] border-b-[#edeff1] bg-white p-2 px-6 dark:bg-dark-100">
								<span className="font-medium text-black dark:text-white">{++index}</span>
								<div className=" ml-10 h-[40px]">
									<ImageWrapper width={40} heigth={40} image={item.image} title={item.title} />
								</div>
								<p className="ml-2 text-[#1c1c1c] dark:text-white">r/{item.title}</p>
								<div className="ml-auto max-w-[96px]">
									<SubscriptionButtons id={item.id} />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async (req) => {
	const prisma = new PrismaClient()
	const response = await prisma.subReddit.findMany({
		orderBy: {
			subscribers: "desc"
		},
		take: 5
	})
	return {
		props: {
			subReddits: JSON.parse(JSON.stringify(response))
		},
		revalidate: 60 * 60 * 24
	}
}
export default LeaderBoard
