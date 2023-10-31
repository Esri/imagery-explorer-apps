const colors = require('tailwindcss/colors')
module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      custom: {
        'light-blue': {
          DEFAULT: 'rgb(191,238,254)',
          90: 'var(--custom-light-blue-90)',
          80: 'var(--custom-light-blue-80)',
          50: 'var(--custom-light-blue-50)',
          25: 'var(--custom-light-blue-25)',
          0: 'var(--custom-light-blue-0)'
        },
        'background': {
          DEFAULT: 'rgb(0,35,47)',
          95: 'var(--custom-background-95)',
          90: 'var(--custom-background-90)',
          85: 'var(--custom-background-85)',
          70: 'var(--custom-background-70)',
        },
        'calendar': {
          border: {
            DEFAULT: '#1C3D48',
            // 'cloudy': '#678A97',
            'available': '#678A97',
            'selected': '#C2EEFE',
          },
          background: {
            DEFAULT: '#03232F',
            // 'cloudy': '#03232F',
            'available': '#678A97',
            'selected': '#C2EEFE',
          }
        }
      }
    },
    extend: {
      spacing: {
        'bottom-panel-height': '230px',
        'app-header-size': '40px',
        'app-header-position': '15px',
        'layer-toggle-top-position': '15px',
        'layer-toggle-top-position-mobile': '55px',
        'search-widget-top-position': '50px',
        'search-widget-top-position-mobile': '90px',
        'cloud-slider-height': '80px',
        'space-between-main-secondary-selectors': 'var(--space-between-main-secondary-selectors)',
        'analysis-tool-container-width': '255px',
        'search-widget-width': '270px',
        'map-action-button-size': '32px'
      },
      dropShadow: {
        'custom-light-blue': '0px 0px 4px rgba(191,238,254, 1)',
        'custom-light-blue-90': '0px 0px 4px rgba(191,238,254, .9)',
        'custom-light-blue-50': '1px 1px 4px rgba(191,238,254, .5)',
      },
      screens: {
        'bottom-panel-content-min-width': '1540px',
        '2xl': '1620px',
        '3xl': '1920px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
