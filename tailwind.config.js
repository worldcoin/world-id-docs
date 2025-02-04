const defaultTheme = require('tailwindcss/defaultTheme')

const gridTemplates = {
	'1fr/auto': '1fr auto',
	'auto/1fr': 'auto 1fr',
	'auto/1fr/auto': 'auto 1fr auto',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./{src,mdx}/**/*.{js,mjs,jsx,mdx,tsx,ts}'],
	darkMode: 'class',

	theme: {
		fontSize: {
			'3xs': ['0.625rem', { lineHeight: '1rem' }],
			'2xs': ['0.75rem', { lineHeight: '1.25rem' }],
			xs: ['0.8125rem', { lineHeight: '1.5rem' }],
			sm: ['0.875rem', { lineHeight: '1.5rem' }],
			base: ['1rem', { lineHeight: '1.75rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '1' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '1' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1' }],
		},

		typography: require('./typography'),

		extend: {
			aspectRatio: {
				card: '394 / 226',
			},
			spacing: {
				4.5: 'calc(4.5 * 1rem / 4)',
			},

			gridTemplateColumns: gridTemplates,
			gridTemplateRows: gridTemplates,

			colors: {
				primary: '#4940E0',
				accents: {
					info: {
						700: '#506DFF',
					},
				},
				gray: {
					A1: '#2D2C2C',
					A5: '#575654',
					A7: '#E7E5E2',
					A9: '#F3F2F0',
					A10: '#F9F9F8',
					AG1: '#75726F',
					AG2: '#9D9B96',
					25: '#FBFBFC',
					50: '#F9FAFB',
					100: '#F3F4F5',
					200: '#EBECEF',
					300: '#D6D9DD',
					400: '#9BA3AE',
					500: '#657080',
					700: '#3C424B',
					900: '#191C20',
				},

				'black-A1': '#000000',
				'purple-H2': '#454EBA',

				accents: {
					info: {
						700: '#506DFF',
					},
				},
			},

			boxShadow: {
				card: '0px 10px 30px rgba(180 180 180 / 0.24)',
				glow: '0 0 4px rgb(0 0 0 / 0.1)',
				toggle: '0px 4px 6px -2px #191C2008, 0px 12px 16px -4px #191C2014',
			},

			maxWidth: {
				lg: '33rem',
				'2xl': '40rem',
				'3xl': '50rem',
				'5xl': '66rem',
			},

			fontFamily: {
				sans: ['"GT America"', ...defaultTheme.fontFamily.sans],
				sora: ['var(--font-sora)', ...defaultTheme.fontFamily.sans],
			},

			opacity: {
				1: '0.01',
				2.5: '0.025',
				7.5: '0.075',
				15: '0.15',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
