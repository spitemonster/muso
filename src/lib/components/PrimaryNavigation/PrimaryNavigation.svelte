<script lang="ts">
	import { activeUser, type SessionUserData } from "$lib/store";
	// import type { PageData } from '../../routes/$types';
	// export let data: PageData;
	// const { user } = data;

	let u: SessionUserData;

	activeUser.subscribe((value) => {
		u = value;
	})
</script>
<!-- <h1>{ data.user.email }</h1> -->
<nav class="container">
	<menu class="unstyled">
		<li><a href="/">Home</a></li>
		<div class="spacer"></div>
		{#if u.email}
			<li><form method="POST" action="?/logout"><button>Logout</button></form></li>
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
	}

	menu {
		display: flex;
		gap: 1rem;

		li {
			white-space: nowrap;
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
