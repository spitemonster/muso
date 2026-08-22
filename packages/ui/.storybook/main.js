import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],

	framework: {
		name: '@storybook/svelte-vite',
		options: {},
	},

	addons: ['@storybook/addon-a11y', '@storybook/addon-svelte-csf'],

	async viteFinal(config) {
		config.plugins ??= []
		config.plugins.unshift(svelte(), tailwindcss())
		return config
	},
}
