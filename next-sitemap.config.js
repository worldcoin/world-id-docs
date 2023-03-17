/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	generateRobotsTxt: true,
	transform: async (config, path) => {
		if (path.includes('/api-docs')) {
			return {
				loc: path.replace('/api-docs', '/api'),
				changefreq: config.changefreq,
				priority: config.priority,
				lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
				alternateRefs: config.alternateRefs ?? [],
			}
		}
		// Use default transformation for all other cases
		return {
			loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
			changefreq: config.changefreq,
			priority: config.priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			alternateRefs: config.alternateRefs ?? [],
		}
	},
}
