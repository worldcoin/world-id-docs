import nextMDX from '@next/mdx'
import { recmaPlugins } from './mdx/recma.mjs'
import { remarkPlugins } from './mdx/remark.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'

const withMDX = nextMDX({
	options: {
		remarkPlugins,
		rehypePlugins,
		recmaPlugins,
		providerImportSource: '@mdx-js/react',
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'mdx'],
	experimental: {
		scrollRestoration: true,
	},
	async redirects() {
		return [
			{
				source: '/js',
				destination: '/idkit',
				permanent: true,
			},
			{
				source: '/js/:slug',
				destination: '/idkit/:slug',
				permanent: true,
			},
			{
				source: '/protocol',
				destination: '/id/protocol',
				permanent: false,
			},
			{
				source: '/test',
				destination: '/id/testing',
				permanent: false,
			},
			{
				source: '/simulator',
				destination: '/id/testing',
				permanent: false,
			},
			{
				source: '/privacy',
				destination: '/advanced/privacy',
				permanent: false,
			},
			{
				source: '/zkp',
				destination: '/advanced/zero-knowledge-proofs',
				permanent: false,
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: '/api-docs/:slug*',
			},
		]
	},
}

export default withMDX(nextConfig)
