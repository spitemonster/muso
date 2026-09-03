<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Button from './Button.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/Button',
		component: Button,
		argTypes: {
			style: {
				control: {
					type: 'select',
					options: ['solid', 'outline'],
					description: 'Change button style.',
				},
			},
		},
	})
</script>

<Story name="Solid" args={{ style: 'solid' }}>Solid Button</Story>
<Story name="Outline" args={{ style: 'outline' }}>Outline Button</Story>
<Story name="Disabled" args={{ disabled: true }}>Disabled Button</Story>
