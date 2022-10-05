/** @type {import('tailwindcss').Config} */

const mirrorHexColors = (colors) =>
  Object.fromEntries(
    colors.map((color, index) => {
      if (!/#[a-f0-9]{6}/.test(color)) {
        throw new Error(
          'All colors should be lowercase hexadecimal strings 7 characters long with "#" sign at the beginning'
        )
      }

      if (colors.indexOf(color) !== index) {
        throw new Error('Colors should be unique')
      }

      if (colors[index - 1] > color) {
        throw new Error('Colors should be sorted alphabetically')
      }

      return [color.substring(1), color]
    })
  )

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      gridTemplateColumns: {
        'fr/auto': '1fr auto',
        'auto/fr': 'auto 1fr',
        'auto/fr/auto': 'auto 1fr auto',
        'auto/auto/fr': 'auto auto 1fr',
      },
      gridTemplateRows: {
        'fr/auto': '1fr auto',
        'auto/fr': 'auto 1fr',
        'auto/fr/auto': 'auto 1fr auto',
        'auto/auto/fr': 'auto auto 1fr',
      },

      colors: {
        ...mirrorHexColors([
          '#000000',
          '#111f24',
          '#161b22',
          '#181b1f',
          '#191c20',
          '#19272c',
          '#1a2436',
          '#211c29',
          '#22262c',
          '#262f41',
          '#2c393e',
          '#363a45',
          '#384361',
          '#576469',
          '#6047ec',
          '#6f7a85',
          '#70868f',
          '#858494',
          '#8e87ff',
          '#94a2b8',
          '#98c379',
          '#9eafc0',
          '#b37af0',
          '#cde0ec',
          '#d2e7f7',
          '#d7dae1',
          '#d8e1bd',
          '#e5c07b',
          '#e6cfcf',
          '#ebedef',
          '#edecfc',
          '#fb7e67',
          '#ff4880',
          '#ff6848',
          '#fff0ed',
          '#ffffff',
        ]),
      },

      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace']
      },

      fontSize: {
        14: ['calc(14 * 1rem / 16)', { lineHeight: '1' }],
        16: ['calc(16 * 1rem / 16)', { lineHeight: '1.2' }],
        20: ['calc(20 * 1rem / 16)', { lineHeight: '1.2' }],
        24: ['calc(24 * 1rem / 16)', { lineHeight: '1.3' }],
        26: ['calc(26 * 1rem / 16)', { lineHeight: '1.2' }],
        30: ['calc(30 * 1rem / 16)', { lineHeight: '1.2' }],
        34: ['calc(34 * 1rem / 16)', { lineHeight: '1.2' }],
        44: ['calc(44 * 1rem / 16)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
