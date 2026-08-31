<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		brand?: string
		children?: Snippet
	}

	const { brand = 'Muso', children }: Props = $props()
</script>

<footer class="p-5 mbs-5">
	<nav class="flex content-center justify-between text-base max-w-content-wide-width mx-auto p-4">
		<a href="/">{brand}</a>
		<menu class="flex content-center justify-end gap-5">
			{@render children?.()}
		</menu>
	</nav>
</footer>
