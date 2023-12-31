import { useState } from "react"

import { $api } from "@/utils/axios"

interface Props {
	subreddit: number
}
export const UploadImage: React.FC<Props> = ({ subreddit }) => {
	const [file, setFile] = useState<File | null>(null)
	const loadImage = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append("subRedditId", subreddit.toString())
		formData.append("file", file)
		await $api("community/image", {
			method: "PUT",
			data: formData
		})
		location.reload()
	}
	return (
		<div className="p-3 dark:bg-dark-100">
			<form>
				<div className="flex items-center justify-between">
					<p className="dark:text-white">Select image:</p>
					<label htmlFor="inputTag" className="">
						<div className="btn-primary">select</div>
					</label>
				</div>
				<input
					id="inputTag"
					type="file"
					accept="image/jpeg,image/png"
					className="hidden"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				{file && (
					<div className="mt-3 flex flex-wrap items-center justify-between">
						<div className="text-cyan-400 underline">{file.name}</div>
						<button className="btn-primary mt-3 w-[124px]" onClick={(e) => loadImage(e)}>
							send
						</button>
					</div>
				)}
			</form>
		</div>
	)
}
