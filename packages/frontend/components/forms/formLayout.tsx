import Image from "next/image"
import { useRouter } from "next/router"

import { AiOutlineTwitter } from "react-icons/ai"

import { $api, API_URL } from "@/utils/axios"

import authSrc from "@/public/auth.png"
import google from "@/public/brands/google.svg"

import { useZustandStore } from "@/utils/zustand"
import { LoginDescription, RegisterDescription } from "./descriptions"

export const FormLayout = ({ children }) => {
	const router = useRouter()

	return (
		<main className="flex  flex-auto justify-center dark:bg-dark-100 sm:justify-start">
			<div className="relative hidden min-h-[430px] w-[154px] sm:block">
				<Image src={authSrc} layout="fill" priority alt="register" />
			</div>
			<div className="flex flex-col justify-center p-2 sm:p-6">
				{router.pathname === "/account/register" ? <RegisterDescription /> : <LoginDescription />}
				{children}
			</div>
		</main>
	)
}
