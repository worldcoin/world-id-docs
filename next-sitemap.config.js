/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	generateRobotsTxt: true,
	transform: async (config, path) => {
		if (path.includes('/api-docs')) {
			return {
				...config,
				loc: path.replace('/api-docs', '/api'),
			}
		}

		return config
	},
}
