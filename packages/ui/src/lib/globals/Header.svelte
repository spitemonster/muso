<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		brand?: string
		user?: { name: string } | null
		loginHref?: string
		logoutHref?: string
		children?: Snippet
	}

	const {
		brand = 'Muso',
		user = null,
		loginHref = '/login',
		logoutHref = '/logout',
		children,
	}: Props = $props()
</script>

<header class="mb-5">
	<nav class="flex content-center justify-between text-base max-w-content-wide-width mx-auto p-4">
		<a href="/">{brand}</a>
		<menu class="flex content-center justify-end gap-5">
			{@render children?.()}
			{#if user}
				<li>
					<form action={logoutHref} method="POST">
						<button class="cursor-pointer">Log Out</button>
					</form>
				</li>
			{:else}
				<li><a href="/about">About</a></li>
				<li><a href="/sign-up">Sign Up</a></li>
				<li><a href={loginHref}>Log In</a></li>
			{/if}
		</menu>
	</nav>
</header>
