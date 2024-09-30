import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import postcssPresetEnv from 'postcss-preset-env'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess({
        postcss: {
            plugins: [
                postcssPresetEnv({
                    features: {
                        'nesting-rules': true,
                        'custom-media-queries': true,
                        'media-query-ranges': true,
                        'nested-calc': true,
                        'logical-properties-and-values': true,
                    },
                }),
            ],
        },
    }),

    kit: {
        adapter: adapter(),
        alias: {
            '@components/*': '/src/lib/components/*',
        },
    },
}

export default config
