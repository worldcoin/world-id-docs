const colorVariable = require('@mertasan/tailwindcss-variables/colorVariable')

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
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],

  theme: {
    variables: {
      DEFAULT: {
        colors: {
          surface: {
            DEFAULT: '#ffffff',
          },
          typography: {
            DEFAULT: '#191c20',
            900: '#191c20',
            700: '#3c424b',
            500: '#657080',
            400: '#9ba3ae',
          }
        }
      }
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          surface: {
            DEFAULT: '#000000',
          },
          typography: {
            DEFAULT: '#ffffff',
            900: '#ffffff',
            700: '#f3f4f5',
            500: '#f9fafb',
            400: '#9ba3ae',
          }
        }
      }
    },
    extend: {
      boxShadow: {
        '1px': '0 0 0 1px transparent'
      },
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
        surface: {
          DEFAULT: colorVariable('var(--colors-surface)'),
        },
        typography: {
          DEFAULT: colorVariable('var(--colors-typography)'),
          900: colorVariable('var(--colors-typography-900)'),
          700: colorVariable('var(--colors-typography-700)'),
          500: colorVariable('var(--colors-typography-500)'),
          400: colorVariable('var(--colors-typography-400)'),
        },
        ...mirrorHexColors([
          '#000000',
          '#111f24',
          '#161718',
          '#161b22',
          '#181b1f',
          '#182d96',
          '#191c20',
          '#19272c',
          '#1a2436',
          '#211c29',
          '#22262c',
          '#252526',
          '#262f41',
          '#2c393e',
          '#2e2936',
          '#363a45',
          '#384361',
          '#3c424b',
          '#4940e0',
          '#576469',
          '#596673',
          '#6047ec',
          '#64b483',
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
          '#d5dee8',
          '#d7dae1',
          '#d8e1bd',
          '#e5c07b',
          '#e6cfcf',
          '#ebedef',
          '#edecfc',
          '#eeeef7',
          '#f3f4f5',
          '#f4f4f4',
          '#fb7e67',
          '#fbfbfc',
          '#fd684a',
          '#ff4880',
          '#ff5a76',
          '#ff6848',
          '#fff0ed',
          '#ffffff',
        ]),
      },

      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        default: ['gt_america', 'Rubik', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@mertasan/tailwindcss-variables')({
      colorVariables: true,
      darkToRoot: false,
    }),
  ],
}
