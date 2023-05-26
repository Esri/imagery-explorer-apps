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
          DEFAULT: '#C2EEFE',
          90: 'rgba(191,238,254, .9)',
          80: 'rgba(191,238,254, .8)',
          50: 'rgba(191,238,254, .5)',
          0: 'rgba(191,238,254, .0)'
        },
        'background': {
          DEFAULT: 'rgb(0,35,47)',
          95: 'rgba(0,35,47, .95)',
          90: 'rgba(0,35,47, .9)',
          85: 'rgba(0,35,47, .85)',
          70: 'rgba(0,35,47, .7)',
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
        'cloud-slider-height': '80px'
      },
      dropShadow: {
        'custom-light-blue': '0px 0px 4px rgba(191,238,254, 1)',
        'custom-light-blue-90': '0px 0px 4px rgba(191,238,254, .9)',
        'custom-light-blue-50': '1px 1px 4px rgba(191,238,254, .5)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
