import { useRouter } from "next/router"

import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FormProvider, useForm } from "react-hook-form"
import { AiOutlineLoading } from "react-icons/ai"

import { $api } from "@/utils/axios"
import { useZustandStore } from "@/utils/zustand"
import { yupResolver } from "@hookform/resolvers/yup"

import { FormInput } from "./formInput"
import { PasswordErrorHelper } from "./passwordErrorHelper"
import { schemaRegistration } from "./schema"
import { EPasswordErrorTexts, HookRegistrationFormValues } from "./types"

const passwordErrorsText = [
	EPasswordErrorTexts.Low,
	EPasswordErrorTexts.Up,
	EPasswordErrorTexts.Number,
	EPasswordErrorTexts.Min
]


export const RegistrationForm = () => {
	const { setUser, logIn } = useZustandStore((state) => ({ setUser: state.setUser, logIn: state.isLogin }))
	const methods = useForm<HookRegistrationFormValues>({
		resolver: yupResolver(schemaRegistration),
		criteriaMode: "all",
		mode: "all"
	})
	const router = useRouter()
	const {
		handleSubmit,
		setValue,
		setError,
		formState: { isSubmitting, errors }
	} = methods

	const [isPasswordTyped, setIsPasswordTyped] = useState(false)
	const onError = (errors, e) => {
		//eslint-disable-next-line
		console.log(errors, e)
	}
	const onSubmit = async (data) => {
		try {
			const response = await $api("auth/signup", {
				method: "POST",
				data: {
					...data
				}
			})
			window.localStorage.setItem("token", response.data.accessToken)
			setUser(response.data.user)
			logIn(true)
			router.push("/")
		} catch (error) {
			setError("email", { message: "email or username is already taken" })
			setError("username", { message: "email or username is already taken" })
		}
	}


	return (
		<FormProvider {...methods}>
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
				<FormInput name="email" type="text" />
				<FormInput name="username" type="text" />
				<FormInput setIsPasswordTyped={setIsPasswordTyped} name="password" type="password" />

				<div className="mt-2">
					{passwordErrorsText.map((item) => (
						<PasswordErrorHelper key={item} isPasswordTyped={isPasswordTyped} text={item} />
					))}
				</div>
				<FormInput name="passwordConfirm" type="password" />

				<button
					type="submit"
					className="mt-3 rounded bg-[#0079d3] px-[10px] py-[5px] text-center text-white transition-colors hover:bg-[#2279bc]"
					disabled={isSubmitting}
				>
					<p className="flex justify-center">
						{isSubmitting ? <AiOutlineLoading className="animate-spin" /> : "SIGN UP"}
					</p>
				</button>
			</form>
		</FormProvider>
	)
}
