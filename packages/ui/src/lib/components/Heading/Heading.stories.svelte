<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Heading from './Heading.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/Heading',
		component: Heading,
        argTypes: {
            size: {
                control: 'select',
                options: ['base', 'lg', 'xl', '2xl', '3xl', 'display-sm', 'display-md', 'display-lg'],
                defaultValue: 'xl'
            },
            level: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], defaultValue: 'h1' },
        }
	})
</script>

<Story name="Heading" args={{ size: 'xl', level: 'h1' }}>Heading</Story>