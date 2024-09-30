/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        container: {
            center: true,
            padding: `var(--container-min-padding)`,
        },
        screens: {
            sm: '30rem',
            md: '45rem',
            lg: '60rem',
            xl: '80rem',
        },
        colors: {
            black: '#303036',
            white: '#E9E3E6',
            red: '#AC2F40',
            blue: '#2191FB',
            green: '#417B5A',
            transparent: 'transparent',
            current: 'currentColor',
        },
        fontFamily: {
            mono: ['IBM Plex Mono', 'mono'],
            sans: ['IBM Plex Sans', 'sans'],
        },
        spacing: {
            xs: '0.625rem',
            sm: '0.8125rem',
            base: '1rem',
            md: '1.125rem',
            lg: '2.5rem',
            xl: '3rem',
            xxl: '4rem',
        },
        fontSize: {
            xs: 'var(--font-size-xs',
            sm: 'var(--font-size-sm)',
            base: 'var(--font-size-base)',
            lg: 'var(--font-size-lg)',
            xl: 'var(--font-size-xl)',
            '2xl': 'var(--font-size-2xl)',
            '3xl': 'var(--font-size-3xl)',
            'display-sm': 'var(--font-size-display-sm)',
            'display-md': 'var(--font-size-display-md)',
            'display-lg': 'var(--font-size-display-lg)',
        },
    },
    plugins: [],
}
