import Image from "next/image"
import Link from "next/link"

type Props = {
	image?: string
	title: string
}
export const SubRedditInfo = ({ image, title }: Props) => {
	return (
		<span className="mr-2 inline-flex items-center">
			{image ? (
				<Image src={image} alt={title} width={20} height={20} className="rounded-full" />
			) : (
				<div className="h-[20px] w-[20px] rounded-full bg-cyan-400"></div>
			)}
			<Link href={`/r/${title}`}>
				<span className="ml-1 font-bold text-black hover:underline dark:text-white">r/{title}</span>
			</Link>
		</span>
	)
}
