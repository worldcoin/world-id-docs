const { remarkCodeHike } = require('@code-hike/mdx')
const theme = require('shiki/themes/nord.json')

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

// TODO: Temporary redirect for old docs URLs
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
        source: '/docs/:slug*',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/protocol',
        destination: '/id/protocol',
        permanent: true,
      },
      {
        source: '/test',
        destination: '/id/testing',
        permanent: true,
      },
      {
        source: '/simulator',
        destination: '/id/testing',
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
