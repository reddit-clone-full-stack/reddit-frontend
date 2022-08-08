import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { BsBlockquoteLeft, BsCodeSlash } from "react-icons/bs"

import { SelectComminity } from "@/components/submitpost/selectCommunity"
import { useAuth } from "@/hooks/useAuth"
import { $api, API_URL } from "@/utils/axios"
import { EditorState, convertToRaw } from "draft-js"

import bold from "@/public/texteditor/bold.svg"
import gallery from "@/public/texteditor/gallery.svg"
import italic from "@/public/texteditor/italic.svg"
import link from "@/public/texteditor/link.svg"
import ordered from "@/public/texteditor/ordered.svg"
import strikeStrough from "@/public/texteditor/strikeStrough.svg"
import underline from "@/public/texteditor/underline.svg"
import unordered from "@/public/texteditor/unordered.svg"

//eslint-disable-next-line
const expression = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)

const editorLabels = {
	"components.controls.blocktype.blockquote": (
		<div
			title="blockquote"
			className="relative group  hover:bg-[#F1F1F1] flex items-center justify-center w-[25px] h-[20px]"
		>
			<BsBlockquoteLeft />
		</div>
	),
	"components.controls.blocktype.code": (
		<div
			title="Inline code"
			className="relative group  hover:bg-[#F1F1F1] flex items-center justify-center w-[25px] h-[20px]"
		>
			<BsCodeSlash />
		</div>
	)
}

export const PostForm: React.FC = () => {
	const { user } = useAuth()
	const [title, setTitle] = useState("")
	const [community, setCommunity] = useState<{ subReddit: { id: number; title: string } } | string>("")
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState)
	}

	const uploadImageCallBack = async (file) => {
		const formData = new FormData()
		formData.append("file", file)

		const { data } = await $api("/post/image", {
			method: "PUT",
			data: formData
		})

		return new Promise((resolve, reject) => {
			resolve({ data: { link: `${API_URL}/posts/${data.filename}` } })
		})
	}

	const allowed = title && community !== "" && editorState.getCurrentContent().hasText() ? true : false
	const sendPost = async () => {
		if (!allowed) return
		try {
			await $api("/post/create", {
				method: "POST",
				data: {
					title,
					body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
					type: typeof community === "string" ? "USER" : "SUBREDDIT",
					subRedditId: typeof community === "string" ? null : community.subReddit.id
				}
			})
		} catch (error) {
			//
		}
	}

	return (
		<div className="flex-auto">
			<h1 className=" text-lg mb-4 pb-1 pl-2 border-b border-solid border-b-[#EDEFF1]">Create Post</h1>
			<SelectComminity community={community} setCommunity={setCommunity} username={user?.username} />
			<input
				className="w-full p-2 mb-2 focus:outline-none border-2 border-solid border-white focus:border-sky-400    rounded-lg"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Editor
				localization={{ locale: "en", translations: editorLabels }}
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={onEditorStateChange}
				editorStyle={{
					border: "1px solid #f1f1f1",
					borderRadius: "2px",
					minHeight: "200px",
					backgroundColor: "#fff",
					padding: "0px 10px"
				}}
				embedded={true}
				toolbar={{
					options: ["link", "inline", "blockType", "list", "image"],
					inline: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						options: ["bold", "italic", "underline", "strikethrough"],
						bold: { icon: bold.src, className: "bold-icon" },
						italic: { icon: italic.src, className: "bold-icon" },
						underline: { icon: underline.src, className: "bold-icon" },
						strikethrough: { icon: strikeStrough.src, className: "bold-icon" }
					},
					list: {
						inDropdown: false,
						options: ["unordered", "ordered"],
						unordered: { icon: unordered.src, className: "bold-icon" },
						ordered: { icon: ordered.src, className: "bold-icon" }
					},
					blockType: {
						inDropdown: false,
						options: ["Code", "Blockquote"]
					},
					link: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						dropdownClassName: undefined,
						defaultTargetOption: "_self",
						link: { icon: link.src, className: "bold-icon" },
						options: ["link"],
						linkCallback: (link) => {
							if (!expression.test(link.target)) {
								const input = document.querySelector("#linkTarget") as HTMLInputElement
								input.classList.add("error")
								return
							}
							return link
						}
					},
					image: {
						icon: gallery.src,
						className: "bold-icon",
						component: undefined,
						popupClassName: undefined,
						urlEnabled: true,
						uploadEnabled: true,
						alignmentEnabled: true,
						uploadCallback: uploadImageCallBack,
						previewImage: true,
						inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
						alt: { present: false, mandatory: false },
						defaultSize: {
							height: "auto",
							width: "auto"
						}
					}
				}}
			/>
			<button
				className={`ml-auto mt-2 ${
					allowed ? "text-white bg-cyan-400 cursor-pointer" : "text-[#bebebe] bg-[#848484] cursor-not-allowed"
				} py-1 px-4 rounded-full  block`}
				onClick={sendPost}
			>
				Post
			</button>
		</div>
	)
}
