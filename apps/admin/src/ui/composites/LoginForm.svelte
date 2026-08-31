<script lang="ts">
	import { enhance, applyAction } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { TextInput, PasswordInput, Button } from '@muso/ui'

	let loginFormError: boolean = $state(false)
	let loginErrorMessage: string = $state('')

	const onLoginFormSubmit: SubmitFunction = () => {
		loginFormError = false
		loginErrorMessage = ''

		return async ({ result }) => {
			if (result.type === 'failure') {
				loginFormError = true
				loginErrorMessage = result.data?.message ?? 'Login failed.'
			}
			await applyAction(result)
		}
	}
</script>

<form
	method="POST"
	use:enhance={onLoginFormSubmit}
	class="grid grid-cols-2 gap-4 max-w-content-max-width"
>
	<TextInput
		label="Email"
		name="email"
		type="email"
		autocomplete="email"
		placeholder="david@duchovny.com"
		outerClass="col-span-2 sm:col-span-1"
		required
	/>
	<PasswordInput label="Password" name="password" />
	{#if loginFormError}
		<div class="col-span-2 flex align-center justify-center border-2 border-danger p-5">
			<p>{loginErrorMessage}</p>
		</div>
	{/if}
	<div class="col-span-2 flex align-center justify-end">
		<Button style="solid" type="submit" class="">Login</Button>
	</div>
</form>
