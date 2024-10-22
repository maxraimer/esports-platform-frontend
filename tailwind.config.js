/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito Sans', 'sans-serif']
			}
		},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#4357AD",
					"primary-content": "#d6ddf0",
					"secondary": "#12adcf",
					"secondary-content": "#000b10",
					"accent": "#D66853",
					"accent-content": "#100402",
					"neutral": "#bfdbfe",
					"neutral-content": "#0d1116",
					"base-100": "#181828",
					"base-200": "#12121c",
					"base-300": "#0e0e17",
					"base-content": "#cbcbd0",
					"info": "#00adaf",
					"info-content": "#000b0b",
					"success": "#00b000",
					"success-content": "#001000",
					"warning": "#cdaf00",
					"warning-content": "#0f0b00",
					"error": "#b00000",
					"error-content": "#f5d3cd",
				},
			},
		]
	}
}