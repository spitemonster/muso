<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TextInput from './TextInput.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/Form/TextInput',
		component: TextInput,
		argTypes: {
			type: {
				control: 'select',
				options: ['text', 'email', 'tel'],
				defaultValue: 'text',
			},
		},
	})
</script>

<Story
	name="Default"
	args={{
		label: 'Text Input',
		name: 'text-input',
		type: 'text',
		placeholder: 'Text Input',
		helper: 'This is a helper message.',
	}}
/>

<Story
	name="Email"
	args={{
		label: 'Email Input',
		name: 'email-input',
		type: 'email',
		placeholder: 'email@input.com',
		helper: 'This is a helper message.',
	}}
/>

<Story
	name="Phone"
	args={{
		label: 'Phone Input',
		name: 'phone-input',
		type: 'tel',
		placeholder: '123-456-7890',
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
