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
				destination: '/world-id/id/sign-in',
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
				destination: '/world-id/further-reading/zero-knowledge-proofs',
				permanent: false,
			},
			{
				source: '/id/anonymous-actions',
				destination: '/world-id/id/incognito-actions',
				permanent: false,
			},
			{
				source: '/quick-start',
				destination: '/world-chain/quick-start',
				permanent: true,
				basePath: false,
			},
			{
				source: '/id/incognito-actions',
				destination: '/world-id/id/cloud',
				permanent: true,
			},
			{
				source: '/id/idkit',
				destination: '/world-id/reference/idkit',
				permanent: true,
			},
			{
				source: '/apps/discord',
				destination: 'https://discord.com/invite/worldnetwork',
				permanent: true,
			},
			{
				source: '/api-docs',
				destination: '/world-id/reference/api',
				permanent: true,
			},
			{
				source: '/advanced/zero-knowledge-proofs',
				destination: '/world-id/further-reading/zero-knowledge-proofs',
				permanent: true,
			},
			{
				source: '/advanced/privacy',
				destination:
					'https://vault.pactsafe.io/s/8a18d792-fd76-44db-9b92-b0bb7981c248/legal.html#contract-s1ytru6kk',
				permanent: true,
			},
			{
				source: '/advanced/on-chain',
				destination: '/world-id/id/on-chain',
				permanent: true,
			},
			{
				source: '/world-chain/providers/worldchain-mainnet.explorer.alchemy.com',
				destination: '/world-chain/providers/explorers',
				permanent: true,
			},
			{
				source: '/world-chain/providers/thirdweb.com',
				destination: '/world-chain/providers/developer-tooling#thirdweb',
				permanent: true,
			},
			{
				source: '/world-id/idkit/reference',
				destination: '/world-id/reference/idkit',
				permanent: true,
			},
		]
	},
}

export default withMDX(nextConfig)
