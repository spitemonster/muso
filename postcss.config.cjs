const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')
const csso = require('postcss-csso')

const config = {
    plugins: [
        postcssPresetEnv({
            features: {
                'nesting-rules': true,
                'custom-media-queries': true,
                'media-query-ranges': true,
            },
        }),
        autoprefixer(),
        csso(),
    ],
}

module.exports = config
