import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					500: "oklch(59.59% 0.24 255.09)",
					600: "oklch(47.62% 0.24 255.09)",
				},
				secondary: {
					500: "oklch(63.05% 0.25 22.72)",
					600: "oklch(53.05% 0.25 22.72)",
				},
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
			},
			boxShadow: {
				soft: "0 4px 20px -2px rgb(0 0 0 / 0.05)",
			},
		},
	},
	plugins: [],
} satisfies Config;
