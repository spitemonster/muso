<script lang="ts">
	import type { Snippet } from 'svelte'
	import { tv } from 'tailwind-variants'
	interface Props {
		children?: Snippet
		align?: 'start' | 'center' | 'end'
		class?: string
		wide?: boolean
	}

	const calcClass = tv({
		base: 'px-4',
		variants: {
			wide: {
				false: 'max-w-content-max-width',
				true: 'max-w-content-wide-width',
			},
			align: {
				start: 'mr-auto',
				center: 'mx-auto',
				end: 'ml-auto',
			},
		},
	})

	let {
		children,
		wide = false,
		align = 'center',
		class: className = '',
		...attrs
	}: Props = $props()
</script>

<div class={calcClass({ wide, align, class: className })} {...attrs}>
	{@render children?.()}
</div>
