import { convertDate } from "@/utils/functions"
import Link from "next/link"
import { BiCake } from "react-icons/bi"

import UserSvg from "@/public/userImage.svg"
import Image from "next/image"

type Props = {
	username: string
	createdAt: string
}
export const UserInfo = ({ username, createdAt }: Props) => (
	<div className="relative ml-3 hidden h-auto w-[312px] max-w-full  rounded-t border-t border-b border-solid lg:block">
		<div className="absolute top-0 left-0 h-[94px] w-full rounded-t bg-cyan-800 "></div>
		<div className="mt-2 bg-white p-3 dark:bg-dark-100 ">
			<Image src={UserSvg} alt="user" width={80} height={80} className=" bg-[#EDEFF1] dark:bg-dark-200" />
			<Link href={`/user/${username}`} target="_blank" className="block hover:underline dark:text-white">
				u/{username}
			</Link>
			<div className="mt-2 flex items-center dark:text-white">
				<BiCake />
				<p className="ml-2">Cake Day {convertDate(createdAt)}</p>
			</div>
		</div>
	</div>
)
