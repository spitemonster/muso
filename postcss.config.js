import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'

export default {
    plugins: [
        tailwindcss(),
        autoprefixer(),
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
}
