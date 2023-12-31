import Image from "next/image"

import React, { Fragment, memo, useState } from "react"
import { BsSearch } from "react-icons/bs"

import { useZustandStore } from "@/utils/zustand"
import { Combobox, Transition } from "@headlessui/react"

import UserSvg from "@/public/userImage.svg"

import { UsersCommunities } from "@/utils/types"
import { ComboxOption } from "./selectOption"

interface Props {
	selectedCommuity: UsersCommunities
	communities: UsersCommunities[]
	setCommunity: React.Dispatch<React.SetStateAction<UsersCommunities>>
	disabled?: boolean
}
export const SelectComminity: React.FC<Props> = memo(({ selectedCommuity, communities, setCommunity, disabled }) => {
	const { subReddit } = selectedCommuity
	const [query, setQuery] = useState("")
	const { username } = useZustandStore((state) => ({
		username: state.user?.username
	}))
	const filteredCommunity =
		communities?.length > 0
			? query === ""
				? communities
				: communities?.filter((item) =>
						item.subReddit.title
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query.toLowerCase().replace(/\s+/g, ""))
				  )
			: []
	return (
		<div className="">
			<Combobox value={selectedCommuity} onChange={setCommunity} disabled={disabled}>
				{({ open }) => (
					<div className="relative z-30 mt-1 mb-2">
						<div className="relative z-30 max-w-[300px] cursor-default overflow-hidden rounded-lg  bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:bg-dark-100 sm:text-sm">
							<div className="ml-2 flex items-center dark:bg-dark-100">
								{selectedCommuity?.username ? (
									<>
										<Image
											src={UserSvg}
											className="h-[30px] w-[30px] rounded-full bg-[#EDEFF1]"
											alt="user"
											width={30}
											height={30}
										/>
										<Combobox.Input
											className="w-full border-none py-2 pl-3 pr-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0 dark:bg-dark-100 dark:text-white"
											displayValue={(person) => `u/${person.username}`}
											onChange={(event) => setQuery(event.target.value)}
											onBlur={(event) => {
												if (!event.target.value) setCommunity("")
											}}
										/>
									</>
								) : subReddit ? (
									<>
										{subReddit.image ? (
											<Image
												src={subReddit?.image}
												height={30}
												width={30}
												className="rounded-full object-cover"
												alt={subReddit?.title}
											/>
										) : (
											<div className="h-[30px] w-[35px] rounded-full bg-cyan-400"></div>
										)}
										<Combobox.Input
											className="w-full border-none py-2 pl-3 pr-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0 dark:bg-dark-100 dark:text-white"
											displayValue={(person) => `r/${person.subReddit?.title}`}
											onChange={(event) => setQuery(event.target.value)}
											onBlur={(event) => {
												if (!event.target.value) setCommunity("")
											}}
										/>
									</>
								) : disabled ? (
									<>
										{subReddit?.image ? (
											<Image
												src={subReddit.image}
												height={30}
												width={30}
												className="rounded-full object-cover"
												alt={subReddit.title}
											/>
										) : (
											<div className="h-[22px] w-[22px] rounded-full border border-dashed border-[#878A8C]"></div>
										)}
										<div className="py-2 pl-3 pr-2 dark:text-white">{subReddit.title}</div>
									</>
								) : (
									<>
										<div className="h-[22px] w-[22px] rounded-full border border-dashed border-[#878A8C]"></div>
										<div className="py-2 pl-3 pr-2 dark:text-white">Select a community</div>
									</>
								)}
							</div>
							<Combobox.Button className="absolute  inset-y-0 right-0 flex  w-full cursor-default items-center justify-end pr-2">
								<BsSearch className="h-5 w-5 cursor-pointer text-gray-400" aria-hidden="true" />
							</Combobox.Button>
						</div>
						<Transition
							as={Fragment}
							show={open}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options
								static
								className="absolute mt-1 max-h-60 w-full max-w-[300px] overflow-auto rounded-md bg-white  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
							>
								{filteredCommunity?.length === 0 && query !== "" ? (
									<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
										Nothing found.
									</div>
								) : (
									<div>
										<Combobox.Option
											className={({ active }) =>
												`relative cursor-default select-none border-b border-solid border-gray-400 p-3 py-2 pl-3 pr-4 ${
													active ? "bg-teal-600 text-white dark:bg-dark-300" : "text-gray-900"
												}`
											}
											value={{ username }}
										>
											<p className="tracking-wider">Your Profile</p>
											<div className="mt-2 flex items-center">
												<Image
													src={UserSvg}
													className="h-[33px] w-[33px] rounded bg-[#EDEFF1]"
													alt="user"
													width={33}
													height={33}
												/>
												<div className="ml-2 font-bold">u/{username}</div>
											</div>
										</Combobox.Option>
										<div className="p-3 tracking-wider">Your Communities</div>
										{filteredCommunity?.map((community) => (
											<ComboxOption key={community.subRedditId} community={community} />
										))}
									</div>
								)}
							</Combobox.Options>
						</Transition>
					</div>
				)}
			</Combobox>
		</div>
	)
})
