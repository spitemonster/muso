<script lang="ts">
	import type { User } from '$lib/types'

	interface Props {
		user: User
	}

	const { user } = $props()
</script>

<header class="">
	<nav class="flex content-center justify-between text-base max-w-content-wide-width mx-auto p-4">
		<a href="/">Muso Admin</a>
		<menu class="flex content-center justify-end gap-5">
			{#if user}
				<li>
					<form action="/logout" method="POST">
						<button class="cursor-pointer">Log Out</button>
					</form>
				</li>
			{:else}
				<li>About</li>
				<li>Sign Up</li>
				<li>
					<a href="/login">Log In</a>
				</li>
			{/if}
		</menu>
	</nav>
</header>
