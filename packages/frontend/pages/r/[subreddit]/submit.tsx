import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import { BiCake } from "react-icons/bi"

import { WithAuth } from "@/components/authentication/withAuth"
import { SubRedditInfoLoader } from "@/components/skeletons/SubRedditInfo"
import { Rules } from "@/components/submitpost/rules"
import { useCommunityInfo } from "@/hooks/react-query"
import { convertDate } from "@/utils/functions"

const DynamicPostForm = dynamic(() => import("@/components/submitpost").then((mod) => mod.PostForm), {
	ssr: false
})
const SubReddit = () => {
	const { data } = useCommunityInfo()
	return (
		<div className="container">
			<div className="flex justify-end">
				{data && <DynamicPostForm disabled={true} data={{ subReddit: data }} />}
				<div className="mt-3 ml-3 hidden lg:block">
					{data ? (
						<div className="mb-3 rounded bg-white">
							<div className="h-[34px] w-full rounded-t bg-[#0079D3]"></div>
							<div className="p-3">
								<div className="mt-2 flex items-center">
									{data.image ? (
										<Image
											src={data.image}
											alt="test"
											height={54}
											width={54}
											className="rounded-full"
										/>
									) : (
										<div className="h-[54px] w-[54px] rounded-full border border-dashed border-[#878A8C]"></div>
									)}
									<Link href={`/r/${data.title}`} className="ml-2 cursor-pointer hover:underline">
										{data.title}
									</Link>
								</div>
								<div className="mt-2">Welcome to {data.title}</div>
								<p className="my-2">{data.subscribers} Members</p>
								<hr />
								<div className="mt-2 flex items-center">
									<BiCake className="h-5 w-5" />
									<p className="ml-2">Created {convertDate(data.createdAt)}</p>
								</div>
							</div>
						</div>
					) : (
						<SubRedditInfoLoader height={237} />
					)}
					<Rules />
				</div>
			</div>
		</div>
	)
}

export default WithAuth(SubReddit)
