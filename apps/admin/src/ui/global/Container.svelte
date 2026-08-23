<script lang="ts">
	import { tv } from 'tailwind-variants'
	interface Props {
		wide?: boolean
	}

	const calcClass = tv({
		base: 'mx-auto px-4',
		variants: {
			wide: {
				false: 'max-w-content-max-width',
				true: 'max-w-content-wide-width',
			},
		},
	})

	let { children, wide = false, class: className = '', ...attrs } = $props()
</script>

<div class={calcClass({ wide, class: className })} {...attrs}>
	{@render children?.()}
</div>
