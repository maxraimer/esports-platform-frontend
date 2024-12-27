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
		screens: {
			'sm': '320px',
			'md': '1280px',
			'lg': '1920px',
		},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#6d28d9",
					"primary-content": "#ded8fb",
					"secondary": "#38bdf8",
					"secondary-content": "#010d15",
					"accent": "#ef7338",
					"accent-content": "#140501",
					"neutral": "#bfdbfe",
					"neutral-content": "#0d1116",
					"base-100": "#181828",
					"base-200": "#12121c",
					"base-300": "#0e0e17",
					"base-content": "#cbcbd0",
					"info": "#00C8CA",
					"info-content": "#000b0b",
					"success": "#00BB00",
					"success-content": "#001000",
					"warning": "#FBC900",
					"warning-content": "#0f0b00",
					"error": "#C90606",
					"error-content": "#f5d3cd",
				},
			},
		]
	}
}