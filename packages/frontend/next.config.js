// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nx/next/plugins/with-nx")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true"
})

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: false
	},
	experimental: {
		outputFileTracingRoot: path.join(__dirname, "../../")
	},
	images: {
		domains: ["play-lh.googleusercontent.com", "localhost", "res.cloudinary.com"]
	},
	async rewrites() {
		return [
			{
				source: "/user/:id/comments/:commentId",
				destination: "/r/:id/comments/:commentId"
			}
		]
	},
	typescript: {
		ignoreBuildErrors: true
	},
	experimental: {
		appDir: true
	}
}

module.exports = withNx(withBundleAnalyzer(nextConfig))
