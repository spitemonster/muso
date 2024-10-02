<script lang="ts">
	import { EmailField, PasswordField } from "$lib/components";
	import { enhance } from '$app/forms';
	import { deserialize } from "$app/forms";

	import { type LoginFormResponse } from '$lib/types/login.type'

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

			const rj = deserialize(await res.text()) as { data?: LoginFormResponse }
			const loginResponse: LoginFormResponse = rj.data as LoginFormResponse;

			if (loginResponse.error) {
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