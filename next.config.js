const { remarkCodeHike } = require('@code-hike/mdx')
const theme = require('shiki/themes/min-light.json')

// cspell:ignore
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
    // cspell:disable-next-line
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    newNextLinkBehavior: true,
  },
  async redirects() {
    return [
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
      {
        source: '/waitlist',
        destination: 'https://toolsforhumanity.typeform.com/sdk-waitlist',
        permanent: true,
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

module.exports = withMDX(nextConfig)
