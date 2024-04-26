<script lang="ts">
	import { enhance } from "$app/forms";
	import { activeUser } from "$lib/store";
	import type { SafeUser } from "$lib/types/user";
	export let user: SafeUser | undefined;
</script>

<nav class="container">
	<menu class="unstyled">
		<li><a href="/">Home</a></li>
		{#if user}
			<li><a href="/">Dashboard</a></li>
		{/if}
		<div class="spacer"></div>
		{#if user != undefined && user.email != "" }
			<li><form method="POST" action="/logout" use:enhance><button class="text">Logout</button></form></li>
		{:else }
			<li><a href="/login">Log In</a></li>
			<li><a href="/sign-up">Sign Up</a></li>
		{/if}
	</menu>
</nav>

<style lang="scss">
	nav {
		border-bottom: 1px solid var(--color-foreground);
		margin: 0 0 var(--spacer-sm) 0;
		padding-block: var(--spacer-sm);
		font-family: "IBM Plex", monospace;
	}

	menu {
		display: flex;
		gap: 1rem;

		li {
			white-space: nowrap;
			
			&:not(:last-child) {
				margin-right: 1rem;
			}
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
</style>
