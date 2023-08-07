/*eslint-disable @typescript-eslint/no-var-requires*/
const { join } = require("path")

module.exports = {
	content: [
		join(__dirname, "pages/**/*.tsx"),
		join(__dirname, "components/**/*.tsx"),
		join(__dirname, "app/**/*.tsx")
	],
	darkMode: ["class", '[data-theme="dark"]'],
	theme: {
		extend: {
			colors: {
				custom: {
					100: "#f6fafd",
					200: "#70819b"
				},
				dark: {
					100: "#1a1a1a",
					200: "#343536",
					300: "#161616"
				}
			},
			animation: {
				progress1: "progress1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
				progress2: "progress2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite"
			},
			keyframes: {
				progress1: {
					"0%": {
						left: "-35%",
						right: "100%"
					},
					"60%": {
						left: "100%",
						right: "-90%"
					},
					"100%": {
						left: "100%",
						right: "-90%"
					}
				},
				progress2: {
					"0%": {
						left: "-200%",
						right: " 100%"
					},
					"60%": {
						left: "107%",
						right: "-8%"
					},
					"100%": {
						left: " 107%",
						right: "-8%"
					}
				}
			}
		}
	}
}
