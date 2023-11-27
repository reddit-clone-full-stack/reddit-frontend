import * as yup from "yup"

export const schemaRegistration = yup.object().shape({
	email: yup.string().required().email(),
	password: yup
		.string()
		.required()
		.min(8, "Minimum of 8 characters")
		.matches(RegExp("(.*[a-z].*)"), "1 lowercase letter")
		.matches(RegExp("(.*[A-Z].*)"), "1 uppercase letter")
		.matches(RegExp("(.*\\d.*)"), "1 number"),
	passwordConfirm: yup
		.string()
		.required("confirm your passowrd")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	username: yup.string().required().min(3, "Minimum of 3 characters")
})

export const schemaLogin = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required()
})
