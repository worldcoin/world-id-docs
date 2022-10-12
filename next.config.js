import nextMdx from '@next/mdx'
import rehypeHighlight from './src/utils/rehype-code-highlight.js'

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
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

export default withMDX(nextConfig)
