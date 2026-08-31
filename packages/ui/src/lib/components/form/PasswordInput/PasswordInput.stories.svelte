<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PasswordInput from './PasswordInput.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/Form/PasswordInput',
		component: PasswordInput,
	})
</script>

<Story
	name="Default"
	args={{
		label: 'Password',
		name: 'password',
		helper: 'This is a helper message.',
	}}
/>

<Story
	name="Error"
	args={{
		label: 'Password',
		name: 'password',
		helper: 'This is a helper message.',
		error: 'This is a test error message',
	}}
/>
