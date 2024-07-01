<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SafeUser } from "$lib/types/user";
	export let user: SafeUser | undefined;
</script>

<nav class="container">
	<menu class="unstyled">
		<li><a href="/">Home</a></li>
		<li><a href="/discover">Discover</a></li>
		<div class="spacer"></div>
		{#if user}
			<li><a href="/dashboard">Dashboard</a></li>
		{/if}
		{#if user != undefined && user.email != "" }
			<li><form method="POST" action="/logout" use:enhance><button class="text">Logout</button></form></li>
		{:else }
			<li><a href="/login">Log In</a></li>
			<li><a class="btn" href="/sign-up">Sign Up</a></li>
		{/if}
	</menu>
</nav>
<style lang="postcss">
	nav {
		border-bottom: 1px solid var(--color-foreground);
		margin: 0 0 var(--spacer-sm) 0;
		padding-block: var(--spacer-sm);
		font-family: "IBM Plex", monospace;
	}

	menu {
		display: flex;
		gap: var(--spacer-base);
		list-style: none;
		padding: 0;
		margin: 0;

		& > li {
			white-space: nowrap;
			margin: 0;
			padding: 0;
		}
	}

	.spacer {
		width: 100%;
		flex-shrink: 1;
	}
	a {
		color: var(--foreground);
		text-decoration: none;
	}

	a.btn {
		padding: var(--spacer-xs) var(--spacer-sm);
		background: var(--color-green);
		color: var(--color-background);
	}
</style>
