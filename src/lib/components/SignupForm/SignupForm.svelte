<script lang="ts">
	import { EmailField, NameField, PasswordField } from '$lib/components/form-fields';
	import { enhance } from '$app/forms';

	let form: HTMLFormElement;

	function checkPasswords(e: Event) {
		const fd: FormData = new FormData(form);
		const pw = fd.get('password');
		const pwc = fd.get('password-confirm');

		if (pw !== pwc) {
			alert('Confirm passwords match and try again.');
			e.preventDefault();
		}
	}
</script>

<form method="POST" bind:this={form} on:submit={checkPasswords} use:enhance>
	<NameField />
	<EmailField />
	<PasswordField confirmation={true} />
	<label>
		<input type="checkbox" name="isArtist" id="isArtist" />
		<span>Sign me up for an artist account!</span>
	</label>
	<button>Sign Up</button>
</form>