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
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'mdx'],
	experimental: {
		scrollRestoration: true,
	},
	async redirects() {
		return [
			{
				source: '/apps',
				destination: 'https://world.org/apps',
				permanent: true,
			},
			{
				source: '/world-id-2',
				destination: 'https://world.org/blog/announcements/introducing-world-id-2.0',
				permanent: true,
			},
			{
				source: '/idkit',
				destination: '/world-id/cloud',
				permanent: true,
			},
			{
				source: '/js',
				destination: '/world-id/cloud',
				permanent: true,
			},
			{
				source: '/id',
				destination: '/world-id',
				permanent: true,
			},
			{
				source: '/id/sign-in',
				destination: '/world-id/sign-in',
				permanent: true,
			},
			{
				source: '/protocol',
				destination: 'https://whitepaper.world.org/#protocol',
				permanent: false,
			},
			{
				source: '/test',
				destination: '/quick-start',
				permanent: false,
			},
			{
				source: '/simulator',
				destination: '/world-id/quick-start/testing',
				permanent: false,
			},
			{
				source: '/privacy',
				destination: 'https://whitepaper.world.org/technical-implementation#privacy',
				permanent: false,
			},
			{
				source: '/zkp',
				destination: '/world-id/advanced/zero-knowledge-proofs',
				permanent: false,
			},
			{
				source: '/id/anonymous-actions',
				destination: '/world-id/incognito-actions',
				permanent: false,
			},
		]
	},
}

export default withMDX(nextConfig)
