<nav class="container">
	<menu class="unstyled">
		<li><a href="/">Home</a></li>
		<li><a href="/sign-up">Sign Up</a></li>
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
	}

	a {
		color: var(--foreground);
		text-decoration: none;
	}
</style>
