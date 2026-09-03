<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { tv } from 'tailwind-variants'

	type Props = HTMLButtonAttributes & {
		style: 'outline' | 'solid'
		disabled?: boolean
		children?: Snippet
	}

	const calcStyles = tv({
		base: 'inline-flex items-center justify-center cursor-pointer text-base px-4 py-2 transition-all',
		variants: {
			style: {
				solid: 'bg-accent text-background border border-accent hover:bg-accent-light hover:text-foreground hover:border-accent-light focus:text-foreground focus:border-accent-light',
				outline:
					'bg-transparent text-accent border border-current hover:bg-accent hover:text-background focus:bg-accent focus:text-background',
			},
			disabled: {
				true: 'bg-inactive hover:bg-inactive hover:text-background text-background cursor-not-allowed',
				false: '',
			},
		},
	})

	const { style, children, disabled, class: className = '', ...attr } = $props()
</script>

<button class={calcStyles({ class: className, style, disabled })} {...attr}>
	{@render children?.()}
</button>
