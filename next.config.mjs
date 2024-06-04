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
            // remove when world chain docs are live 
			{
				source: '/world-chain',
				destination: 'https://worldcoin.notion.site/World-Chain-Developer-Preview-Guide-23c94a67683f4e71986e5303ab88c9f3',
				permanent: false,
			},
			{
				source: '/apps',
				destination: 'https://worldcoin.org/apps',
				permanent: true,
			},
			{
				source: '/world-id-2',
				destination: 'https://worldcoin.org/blog/announcements/introducing-world-id-2.0',
				permanent: true,
			},
			{
				source: '/idkit',
				destination: '/world-id/id/cloud',
				permanent: true,
			},
			{
				source: '/js',
				destination: '/world-id/id/cloud',
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
				source: '/',
				destination: '/mini-apps',
				permanent: false,
			},
			{
				source: '/protocol',
				destination: 'https://whitepaper.worldcoin.org/technical-implementation#worldcoin-protocol',
				permanent: false,
			},
			{
				source: '/test',
				destination: '/world-id/quick-start/testing',
				permanent: false,
			},
			{
				source: '/simulator',
				destination: '/world-id/quick-start/testing',
				permanent: false,
			},
			{
				source: '/privacy',
				destination: 'https://whitepaper.worldcoin.org/technical-implementation#privacy',
				permanent: false,
			},
			{
				source: '/zkp',
				destination: '/world-id/further-reading/zero-knowledge-proofs',
				permanent: false,
			},
			{
				source: '/id/anonymous-actions',
				destination: '/world-id/id/incognito-actions',
				permanent: false,
			},
		]
	},
}

export default withMDX(nextConfig)
