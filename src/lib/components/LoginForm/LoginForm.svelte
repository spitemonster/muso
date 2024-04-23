<script lang="ts">
	import { EmailField, PasswordField } from "$lib/components/form-fields";
	import { enhance } from '$app/forms';
	import { deserialize } from "$app/forms";

	import { type LoginFormResponse } from '$lib/types/login'

	let formError = false;
	let formErrorMessage = "";

	async function login(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		try {
			const res = await fetch('/login', {
				method: 'POST',
				body: new FormData(e.target as HTMLFormElement)
			})

			console.log('res: ', res);

			const rj = deserialize(await res.text())
			console.log("rj: ", rj)
			const loginResponse: LoginFormResponse = rj.data as LoginFormResponse;

			console.log("login response: ", loginResponse);

			if (loginResponse.error) {
				console.log('shit!')
				console.log(loginResponse.message)
				throw new Error(loginResponse.message);
			}

		} catch (err) {
			let str = '';
			if (err instanceof Error) {
				str += err.message
            } else {
                str = err as string
            }
			formError = true;
			formErrorMessage = err as string;
		}
	}
</script>

<form method="POST" on:submit={login} use:enhance>
	<EmailField />
	<PasswordField />
	{#if formError}
		<p>{formErrorMessage}</p>
	{/if}
	<button>Log In</button>
</form>