<script lang="ts">
	export let confirmation = false;

	import { EyeOpen, EyeClosed } from '$lib/icons'

	let passwordVisibilityToggle: HTMLButtonElement;
	let passwordEl: HTMLInputElement;
	let passwordConfirmEl: HTMLInputElement;

	let passwordType = 'password';

	function togglePasswordVisibility(e: Event) {
		e.preventDefault();
		passwordType = passwordType == 'password' ? 'text' : 'password';
		passwordEl.type = passwordType;
		if (passwordConfirmEl) passwordConfirmEl.type = passwordType;
	}
</script>

<label>
	<input bind:this={passwordEl} name="password" type="password" placeholder=" " required />
	<span>Password</span>
	<button
		bind:this={passwordVisibilityToggle}
		on:click={togglePasswordVisibility}
		id="password-visibility-toggle"
		><span class="sr-only">Toggle Password Visibility</span>
		{#if passwordType == 'password'}
			<EyeOpen />
		{:else}
			<EyeClosed />
		{/if}
	</button>
</label>
{#if confirmation}
<label>
	<input
		bind:this={passwordConfirmEl}
		name="password-confirm"
		type="password"
		placeholder=" "
		required
	/>
	<span>Confirm Password</span>
</label>
{/if}