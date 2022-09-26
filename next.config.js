const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);
