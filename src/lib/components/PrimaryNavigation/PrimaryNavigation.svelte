<script lang="ts">
	import { enhance } from "$app/forms";
	import { activeUser } from "$lib/store";
	import type { SessionUserData } from "$lib/store";
	let user: SessionUserData;

	activeUser.subscribe((value) => {
		user = value;

		console.log('user in navigation: ', user);
	})

	// function logoutUser(e) {
	// 	// e.preventDefault();
	// 	// activeUser.set({ email: "", name: ""});
	// 	// e.target.submit();
	// }
</script>
<nav class="container">
	<menu class="unstyled">
		<li><a href="/">Home</a></li>
		<div class="spacer"></div>
		{#if user != undefined && Object.keys(user).length > 0 && user.email != "" }
			<li><form method="POST" action="?/logout"><button class="text">Logout</button></form></li>
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
