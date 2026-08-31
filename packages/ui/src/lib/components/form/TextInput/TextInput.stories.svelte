<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TextInput from './TextInput.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/Form/TextInput',
		component: TextInput,
	})
</script>

<Story
	name="Default"
	args={{
		label: 'Text Input',
		name: 'text-input',
		type: 'text',
		helper: 'This is a helper message.',
	}}
/>

<Story
	name="Error"
	args={{
		label: 'Text Input',
		name: 'text-input',
		type: 'text',
		helper: 'This is a helper message.',
		error: 'This is a test error message',
	}}
/>
