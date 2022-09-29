// cspell:ignore
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
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
        destination: '/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
