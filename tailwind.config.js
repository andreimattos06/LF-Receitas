/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
      extend: {
        colors:{
          'backgroundBase': '#fee5ca',
          'redBase': '#b00e2f',
          'hoverBase': '#fef2e4',
        },
        boxShadow: {
          'buttonShadow': '4px 4px',
        },
        fontFamily:{
          padrao:["Oswald"],
        },
        animation:{
          'ping-padrao':	'ping 2s cubic-bezier(0, 0, 0.2, 0.5) infinite',
        },
      },
    },
    plugins: [],
  }
  