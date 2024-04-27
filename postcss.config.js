// import postcssFunctions from 'postcss-functions'
import postcssPresetEnv from 'postcss-preset-env'

export default {
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
}
