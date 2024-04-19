<script lang="ts">
	import { EyeOpen, EyeClosed } from '$lib/Icons';
	let form: HTMLFormElement;
	let passwordVisibilityToggle: HTMLButtonElement;
	let passwordEl: HTMLInputElement;
	let passwordConfirmEl: HTMLInputElement;

	let passwordType = 'password';

	function togglePasswordVisibility(e: Event) {
		e.preventDefault();
		passwordType = passwordType == 'password' ? 'text' : 'password';
		passwordEl.type = passwordConfirmEl.type = passwordType;
	}

	async function submit(e: Event) {
		const fd: FormData = new FormData(form);

		e.preventDefault();

		const pw = fd.get('password');
		const pwc = fd.get('password-confirm');

		if (pw !== pwc) {
			alert('Confirm passwords match and try again.');
			return;
		}

		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			body: fd
		});

		const json = await res.json();

		console.log(json);
	}
</script>

<form method="POST" bind:this={form} on:submit={submit}>
	<label>
		<input name="name" type="text" placeholder=" " required />
		<span>Name</span>
	</label>
	<label>
		<input name="email" type="email" placeholder=" " required />
		<span>Email</span>
	</label>
	<label>
		<input bind:this={passwordEl} name="password" type="password" placeholder=" " required />
		<span>Password</span>
		<button
			bind:this={passwordVisibilityToggle}
			on:click={togglePasswordVisibility}
			id="password-visibility-toggle"
			><span class="visually-hidden">Toggle Password Visibility</span>
			{#if passwordType == 'password'}
				<EyeOpen />
			{:else}
				<EyeClosed />
			{/if}
		</button>
	</label>
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
	<label>
		<input type="checkbox" name="isArtist" id="isArtist" />
		<span>Sign me up for an artist account!</span>
	</label>
	<button>Sign Up</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	#password-visibility-toggle {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background: transparent;
		height: 2rem;
		aspect-ratio: 1;
		fill: var(--color-foreground);
	}

	label {
		position: relative;
		width: 100%;
		margin-bottom: var(--spacer-md);

		input:not([type='checkbox']) + span {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			color: var(--color-foreground);
		}

		input:not([type='checkbox']) {
			background: transparent;
			color: var(--color-foreground);
			border: none;
			border-bottom: 1px solid var(--color-foreground);
			width: 100%;
			padding-block: var(--spacer-xs);
		}

		input:not([type='checkbox']):focus + span,
		input:not([type='checkbox']):not(:placeholder-shown) + span {
			visibility: hidden;
		}
	}
</style>
