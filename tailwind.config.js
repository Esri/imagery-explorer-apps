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
          DEFAULT: '#BFEEFF',
          90: 'rgba(191,238,255, .9)',
          80: 'rgba(191,238,255, .8)',
          50: 'rgba(191,238,255, .5)',
          0: 'rgba(191,238,255, .0)'
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
            // 'available': '#678A97',
            'selected': '#678A97',
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
        'bottom-panel-height': '250px',
        'app-header-size': '40px',
        'app-header-position': '15px',
        'layer-toggle-top-position': '15px',
        'layer-toggle-top-position-mobile': '55px',
        'search-widget-top-position': '50px',
        'search-widget-top-position-mobile': '90px',
        'cloud-slider-height': '80px'
      },
      dropShadow: {
        'custom-light-blue': '1px 1px 4px rgba(191,238,255, .5)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
