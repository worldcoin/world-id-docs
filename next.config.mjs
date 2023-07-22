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
				source: '/idkit',
				destination: '/id/idkit',
				permanent: true,
			},
			{
				source: '/js',
				destination: '/id/idkit',
				permanent: true,
			},
			{
				source: '/id',
				destination: '/id/world-id',
				permanent: true,
			},
			{
				source: '/protocol',
				destination: 'https://whitepaper.worldcoin.org', // TODO: add proper anchor
				permanent: false,
			},
			{
				source: '/test',
				destination: '/quick-start',
				permanent: false,
			},
			{
				source: '/simulator',
				destination: '/quick-start',
				permanent: false,
			},
			{
				source: '/privacy',
				destination: 'https://whitepaper.worldcoin.org', // TODO: add proper anchor
				permanent: false,
			},
			{
				source: '/zkp',
				destination: '/advanced/zero-knowledge-proofs',
				permanent: false,
			},
		]
	},
}

export default withMDX(nextConfig)
