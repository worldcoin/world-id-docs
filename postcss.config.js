module.exports = {
	plugins: {
		'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-selector-matches': {},
		tailwindcss: {},
		'postcss-focus-visible': {
			replaceWith: '[data-focus-visible-added]',
		},
		autoprefixer: {},
	},
}
